import { useState, useEffect, useRef } from 'react';
import { geocodeAddress } from '@/shared/lib/geocode';
import { getUserPosition } from '@/shared/lib/geolocation';
import type { TCity, TPickupPoint } from '../types';

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export type TNearestLocation = {
  cityName: string;
  pickupId: string | null;
  pickupName: string;
};

export function useNearestLocation(cities: TCity[]): TNearestLocation | null {
  const [result, setResult] = useState<TNearestLocation | null>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!cities.length || ranRef.current) return undefined;
    ranRef.current = true;
    let cancelled = false;

    async function detect() {
      const position = await getUserPosition();
      if (cancelled) return;

      if (!position) return;

      const { latitude: userLat, longitude: userLon } = position.coords;

      const geocodedCities = await Promise.all(
        cities.map(async (city) => {
          const coords = await geocodeAddress(city.name);
          return coords ? { city, coords } : null;
        })
      );
      if (cancelled) return;

      const sorted = geocodedCities
        .filter((g): g is { city: TCity; coords: [number, number] } => g !== null)
        .sort(
          (a, b) =>
            haversineKm(userLat, userLon, a.coords[0], a.coords[1]) -
            haversineKm(userLat, userLon, b.coords[0], b.coords[1])
        );

      const nearestEntry = sorted.find((g) => g.city.pickupPoints.length > 0) ?? sorted[0];
      if (!nearestEntry) return;

      const nearestCity = nearestEntry.city;

      if (!nearestCity.pickupPoints.length) {
        setResult({ cityName: nearestCity.name, pickupId: null, pickupName: '' });
        return;
      }

      const geocodedPoints = await Promise.all(
        nearestCity.pickupPoints.map(async (point) => {
          const query = point.address
            ? `${nearestCity.name}, ${point.address}`
            : `${nearestCity.name}, ${point.name}`;
          const coords = await geocodeAddress(query);
          return coords ? { point, coords } : null;
        })
      );
      if (cancelled) return;

      const validPoints = geocodedPoints.filter(
        (g): g is { point: TPickupPoint; coords: [number, number] } => g !== null
      );

      const nearestPickup = validPoints.length
        ? validPoints.reduce((best, curr) =>
            haversineKm(userLat, userLon, curr.coords[0], curr.coords[1]) <
            haversineKm(userLat, userLon, best.coords[0], best.coords[1])
              ? curr
              : best
          ).point
        : nearestCity.pickupPoints[0];

      setResult({
        cityName: nearestCity.name,
        pickupId: nearestPickup.id,
        pickupName: nearestPickup.name,
      });
    }

    detect();
    return () => {
      cancelled = true;
    };
  }, [cities]);

  return result;
}
