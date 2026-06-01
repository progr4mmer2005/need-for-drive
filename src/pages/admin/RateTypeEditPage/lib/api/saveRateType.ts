import { RATE_TYPES_API } from '@/shared/api/citiesApi';

type TDto = { name: string; unit: string };

export async function saveRateType(
  isNew: boolean,
  id: number,
  dto: TDto
): Promise<number | undefined> {
  if (isNew) {
    const res = await RATE_TYPES_API.create(dto);
    return res.data.id;
  }
  await RATE_TYPES_API.update(id, dto);
  return undefined;
}
