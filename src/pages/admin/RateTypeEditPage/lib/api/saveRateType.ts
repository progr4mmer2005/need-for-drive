import { RATE_TYPES_API } from '@/shared/api/citiesApi';

type TDto = { name: string; unit: string };

export async function saveRateType(isNew: boolean, id: number, dto: TDto): Promise<void> {
  if (isNew) {
    await RATE_TYPES_API.create(dto);
  } else {
    await RATE_TYPES_API.update(id, dto);
  }
}
