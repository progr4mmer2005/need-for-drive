import { CITIES_API } from '@/shared/api/citiesApi';

export async function deleteCity(id: number): Promise<void> {
  await CITIES_API.delete(id);
}
