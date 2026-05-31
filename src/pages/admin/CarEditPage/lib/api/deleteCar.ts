import { CARS_API } from '@/shared/api/carsApi';

export async function deleteCar(id: number): Promise<void> {
  await CARS_API.delete(id);
}
