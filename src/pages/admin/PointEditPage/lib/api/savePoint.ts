import { POINTS_API } from '@/shared/api/citiesApi';

type TDto = { name: string; address: string; cityId: { id: number } };

export async function savePoint(isNew: boolean, id: number, dto: TDto): Promise<void> {
  if (isNew) {
    await POINTS_API.create(dto);
  } else {
    await POINTS_API.update(id, dto);
  }
}
