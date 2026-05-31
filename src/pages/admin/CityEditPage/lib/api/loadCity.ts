import { CITIES_API } from '@/shared/api/citiesApi';

export async function loadCity(id: number): Promise<string> {
  const res = await CITIES_API.getOne(id);
  return res.data.name || '';
}
