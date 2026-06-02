import { RATE_TYPES_API } from '@/shared/api/rateTypesApi';
import type { IFormState } from '../../types';

export async function loadRateType(id: number): Promise<IFormState> {
  const res = await RATE_TYPES_API.getOne(id);
  return { name: res.data.name || '', unit: res.data.unit || '' };
}
