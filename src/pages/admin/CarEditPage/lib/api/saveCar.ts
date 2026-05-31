import { CARS_API } from '@/shared/api/carsApi';
import type { TCarDto } from '../form/buildTCarDto';

export async function saveCar(isNew: boolean, id: number, dto: TCarDto): Promise<void> {
  if (isNew) {
    await CARS_API.create(dto);
  } else {
    await CARS_API.update(id, dto);
  }
}
