import { useState, useEffect } from 'react';
import { CITIES_API } from '@/shared/api/citiesApi';
import { geocodeAddress } from './geocode';
import { getUserPosition } from './geolocation';

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function useNearestCity(): string {
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function detect() {
      const response = await CITIES_API.getAll().catch(() => null);
      const cities = response?.data;
      if (!cities?.length || cancelled) return;

      const position = await getUserPosition();

      if (!position) {
        if (!cancelled) setCityName(cities[0].name);
        return;
      }

      const { latitude: userLat, longitude: userLon } = position.coords;

      const geocoded = await Promise.all(
        cities.map(async (city) => {
          const coords = await geocodeAddress(city.name);
          return coords ? { name: city.name, coords } : null;
        })
      );

      if (cancelled) return;

      const valid = geocoded.filter(
        (g): g is { name: string; coords: [number, number] } => g !== null
      );

      if (!valid.length) {
        setCityName(cities[0].name);
        return;
      }

      const nearest = valid.reduce((best, curr) => {
        const dCurr = haversineKm(userLat, userLon, curr.coords[0], curr.coords[1]);
        const dBest = haversineKm(userLat, userLon, best.coords[0], best.coords[1]);
        return dCurr < dBest ? curr : best;
      });

      setCityName(nearest.name);
    }

    detect();
    return () => {
      cancelled = true;
    };
  }, []);

  return cityName;
}
