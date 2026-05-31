import { CITIES_API } from '@/shared/api/citiesApi';

export async function saveCity(isNew: boolean, id: number, name: string): Promise<void> {
  if (isNew) {
    await CITIES_API.create({ name });
  } else {
    await CITIES_API.update(id, { name });
  }
}
