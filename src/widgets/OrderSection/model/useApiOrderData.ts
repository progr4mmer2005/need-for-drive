import { useEffect, useState } from 'react';
import { CITIES_API, POINTS_API, RATES_API } from '@/shared/api/citiesApi';
import { CARS_API } from '@/shared/api/carsApi';
import type { City, Point, Car as ApiCar, Rate } from '@/shared/api/types';

const RU = String.fromCharCode;
const ECONOMY_CATEGORY = RU(1069, 1082, 1086, 1085, 1086, 1084);
const PREMIUM_CATEGORY = RU(1055, 1088, 1077, 1084, 1080, 1091, 1084);
const DEFAULT_BRAND = RU(1040, 1074, 1090, 1086);
const DEFAULT_PLATE = RU(1050, 32, 55, 54, 49, 32, 1053, 1040, 32, 55, 51);
const DEFAULT_RATE_LABEL = RU(1058, 1072, 1088, 1080, 1092);
const RATE_DAILY_MARKER = RU(1089, 1091, 1090);
const RUBLE_SIGN = RU(8381);
const LOAD_ERROR = RU(1054, 1096, 1080, 1073, 1082, 1072, 32, 1079, 1072, 1075, 1088, 1091, 1079, 1082, 1080, 32, 1076, 1072, 1085, 1085, 1099, 1093);

export interface ApiOrderData {
  cities: Array<{
    id: string;
    name: string;
    mapCenter: { x: number; y: number };
    pickupPoints: Array<{ id: string; name: string; x: number; y: number }>;
    backendId: number;
  }>;
  cars: Array<{
    id: string;
    brand: string;
    name: string;
    category: string;
    image: string;
    priceMin: number;
    priceMax: number;
    backendId: number;
    colors: string[];
    plate: string;
    fuel: string;
  }>;
  rentalRates: Array<{
    id: string;
    label: string;
    price: number;
    backendId: number;
  }>;
  extras: Array<{ id: string; label: string; price: number }>;
}

const EXTRAS_STATIC = [
  { id: 'fullTank', label: `${RU(1055, 1086, 1083, 1085, 1099, 1081, 32, 1073, 1072, 1082)}, 500${RU(1088)}`, price: 500 },
  { id: 'childChair', label: `${RU(1044, 1077, 1090, 1089, 1082, 1086, 1077, 32, 1082, 1088, 1077, 1089, 1083, 1086)}, 200${RU(1088)}`, price: 200 },
  { id: 'rightWheel', label: `${RU(1055, 1088, 1072, 1074, 1099, 1081, 32, 1088, 1091, 1083, 1100)}, 1600${RU(1088)}`, price: 1600 },
];

function pseudoCoord(seed: number, offset: number) {
  return ((seed * 7919 + offset) % 80) + 10;
}

export function useApiOrderData() {
  const [data, setData] = useState<ApiOrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      CITIES_API.getAll(),
      POINTS_API.getAll({ limit: 1000 }),
      CARS_API.getAll({ limit: 1000 }),
      RATES_API.getAll(),
    ])
      .then(([citiesRes, pointsRes, carsRes, ratesRes]) => {
        if (cancelled) return;
        const cities = citiesRes.data;
        const points = pointsRes.data;
        const cars = carsRes.data;
        const rates = ratesRes.data;

        const mapped: ApiOrderData = {
          cities: cities.map((city: City) => {
            const cityPoints = points.filter((point: Point) => point.cityId?.id === city.id);
            return {
              id: `city-${city.id}`,
              backendId: city.id,
              name: city.name,
              mapCenter: { x: 50, y: 50 },
              pickupPoints: cityPoints.map((point: Point, pointIndex: number) => ({
                id: `point-${point.id}`,
                name: point.name,
                x: pseudoCoord(point.id, pointIndex * 13),
                y: pseudoCoord(point.id + 1, pointIndex * 17),
              })),
            };
          }),
          cars: cars.map((car: ApiCar) => {
            const parts = (car.name || '').split(' ');
            const brand = parts[0] || car.name || DEFAULT_BRAND;
            const rest = parts.slice(1).join(' ') || car.name;
            const rawFuel = String(car.tank || '').trim();
            const fuel = rawFuel ? (rawFuel.includes('%') ? rawFuel : `${rawFuel}%`) : '100%';

            return {
              id: `car-${car.id}`,
              backendId: car.id,
              brand,
              name: rest,
              category: car.categoryId?.id === 1 ? ECONOMY_CATEGORY : PREMIUM_CATEGORY,
              image: car.thumbnail?.path || '',
              priceMin: car.priceMin || 0,
              priceMax: car.priceMax || 0,
              colors: car.colors || [],
              plate: car.number || DEFAULT_PLATE,
              fuel,
            };
          }),
          rentalRates: rates.map((rate: Rate) => ({
            id: rate.rateTypeId?.name?.toLowerCase().includes(RATE_DAILY_MARKER) ? 'daily' : 'minute',
            label: `${rate.rateTypeId?.name || DEFAULT_RATE_LABEL}, ${rate.price} ${RUBLE_SIGN}/${rate.rateTypeId?.unit || ''}`,
            price: rate.price,
            backendId: rate.id,
          })),
          extras: EXTRAS_STATIC,
        };
        setData(mapped);
      })
      .catch((error: Error) => {
        if (!cancelled) setError(error.message || LOAD_ERROR);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}



