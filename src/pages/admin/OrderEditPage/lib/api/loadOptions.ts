import { CARS_API } from '@/shared/api/carsApi';
import { CITIES_API } from '@/shared/api/citiesApi';
import { RATES_API } from '@/shared/api/ratesApi';
import { ORDER_STATUS_API } from '@/shared/api/orderStatusApi';
import type { Car, City, Rate, OrderStatus } from '@/shared/api/types';

export async function loadOptions(): Promise<{
  statuses: OrderStatus[];
  cities: City[];
  cars: Car[];
  rates: Rate[];
}> {
  const [s, c, ca, r] = await Promise.all([
    ORDER_STATUS_API.getAll(),
    CITIES_API.getAll(),
    CARS_API.getAll({ limit: 1000 }),
    RATES_API.getAll(),
  ]);
  return {
    statuses: s.data,
    cities: c.data,
    cars: ca.data,
    rates: r.data,
  };
}
