import { RATES_API } from '@/shared/api/ratesApi';
import type { Rate } from '@/shared/api/types';

export async function loadRates(): Promise<Rate[]> {
  const res = await RATES_API.getAll();
  return res.data;
}
