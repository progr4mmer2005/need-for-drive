import { useEffect, useState } from 'react';
import { CITIES_API, POINTS_API, RATES_API } from '@/shared/api/citiesApi';
import { CARS_API } from '@/shared/api/carsApi';
import type { City, Point, Car as ApiCar, Rate } from '@/shared/api/types';

const ECONOMY_CATEGORY = 'Эконом';
const PREMIUM_CATEGORY = 'Премиум';
const DEFAULT_BRAND = 'Авто';
const DEFAULT_PLATE = 'К 761 НА 73';
const DEFAULT_RATE_LABEL = 'Тариф';
const RATE_DAILY_MARKER = 'сут';
const RUBLE_SIGN = '₽';
const LOAD_ERROR = 'Ошибка загрузки данных';

const COLOR_RU_MAP: Record<string, string> = {
  red: 'Красный',
  blue: 'Синий',
  white: 'Белый',
  black: 'Чёрный',
  grey: 'Серый',
  gray: 'Серый',
  orange: 'Оранжевый',
};

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
  { id: 'fullTank', label: `Полный бак, 500${RUBLE_SIGN}`, price: 500 },
  { id: 'childChair', label: `Детское кресло, 200${RUBLE_SIGN}`, price: 200 },
  { id: 'rightWheel', label: `Правый руль, 1600${RUBLE_SIGN}`, price: 1600 },
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



