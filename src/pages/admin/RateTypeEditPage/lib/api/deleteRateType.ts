import { RATE_TYPES_API } from '@/shared/api/rateTypesApi';

export async function deleteRateType(id: number): Promise<void> {
  await RATE_TYPES_API.delete(id);
}
