import { CARS_API } from '@/shared/api/carsApi';
import type { Car } from '@/shared/api/types';

export async function loadCar(id: number): Promise<Car> {
  const res = await CARS_API.getOne(id);
  return res.data;
}
