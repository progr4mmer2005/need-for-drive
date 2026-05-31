import { POINTS_API } from '@/shared/api/citiesApi';
import type { IFormState } from '../../types';

export async function loadPoint(id: number): Promise<{ form: IFormState; cityId: string }> {
  const res = await POINTS_API.getOne(id);
  const cityId = String(res.data.cityId?.id ?? '');
  return {
    form: { name: res.data.name || '', address: res.data.address || '', cityId },
    cityId,
  };
}
