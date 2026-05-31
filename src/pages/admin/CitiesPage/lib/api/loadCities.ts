import { CITIES_API } from '@/shared/api/citiesApi';
import type { City } from '@/shared/api/types';

export async function loadCities(): Promise<City[]> {
  const res = await CITIES_API.getAll();
  return res.data;
}
