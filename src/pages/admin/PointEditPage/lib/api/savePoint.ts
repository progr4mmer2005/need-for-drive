import { POINTS_API } from '@/shared/api/citiesApi';

type TDto = { name: string; address: string; cityId: { id: number } };

export async function savePoint(isNew: boolean, id: number, dto: TDto): Promise<number | undefined> {
  if (isNew) {
    const res = await POINTS_API.create(dto);
    return res.data.id;
  }
  await POINTS_API.update(id, dto);
  return undefined;
}
