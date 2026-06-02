import { RATE_TYPES_API } from '@/shared/api/rateTypesApi';
import type { RateType } from '@/shared/api/types';

export async function loadRateTypes(): Promise<RateType[]> {
  const res = await RATE_TYPES_API.getAll();
  return res.data;
}
