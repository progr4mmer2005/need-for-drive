import { RATES_API } from '@/shared/api/citiesApi';

export async function deleteRate(id: number): Promise<void> {
  await RATES_API.delete(id);
}
