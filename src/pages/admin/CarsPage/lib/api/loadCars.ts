import { CARS_API } from '@/shared/api/carsApi';
import type { Car } from '@/shared/api/types';
import { PAGE_SIZE } from '../../constants';

export async function loadCars(page: number): Promise<{ data: Car[]; count: number }> {
  const res = await CARS_API.getAll({ limit: PAGE_SIZE, page: page - 1 });
  return { data: res.data, count: res.count ?? 0 };
}
