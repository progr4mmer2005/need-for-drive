import { RATE_TYPES_API } from '@/shared/api/citiesApi';

export async function deleteRateType(id: number): Promise<void> {
  await RATE_TYPES_API.delete(id);
}
