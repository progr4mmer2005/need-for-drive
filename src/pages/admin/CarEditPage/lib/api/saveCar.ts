import { CARS_API } from '@/shared/api/carsApi';
import type { TCarDto } from '../form/buildTCarDto';

export async function saveCar(
  isNew: boolean,
  id: number,
  dto: TCarDto
): Promise<number | undefined> {
  if (isNew) {
    const res = await CARS_API.create(dto);
    return res.data.id;
  }
  await CARS_API.update(id, dto);
  return undefined;
}
