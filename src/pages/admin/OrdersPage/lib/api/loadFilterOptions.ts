import { CARS_API } from '@/shared/api/carsApi';
import { CITIES_API } from '@/shared/api/citiesApi';
import { ORDER_STATUS_API } from '@/shared/api/orderStatusApi';
import type { Car, City, OrderStatus } from '@/shared/api/types';

export async function loadFilterOptions(): Promise<{
  cars: Car[];
  cities: City[];
  statuses: OrderStatus[];
}> {
  const [carsRes, citiesRes, statusesRes] = await Promise.all([
    CARS_API.getAll({ limit: 1000 }),
    CITIES_API.getAll(),
    ORDER_STATUS_API.getAll(),
  ]);
  return { cars: carsRes.data, cities: citiesRes.data, statuses: statusesRes.data };
}
