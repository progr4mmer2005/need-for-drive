import { RATES_API } from '@/shared/api/ratesApi';
import type { IFormState } from '../../types';

export async function loadRate(id: number): Promise<IFormState> {
  const res = await RATES_API.getOne(id);
  return {
    price: String(res.data.price ?? ''),
    rateTypeId: String(res.data.rateTypeId?.id ?? ''),
  };
}
