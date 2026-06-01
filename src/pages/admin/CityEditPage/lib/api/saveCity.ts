import { CITIES_API } from '@/shared/api/citiesApi';

export async function saveCity(
  isNew: boolean,
  id: number,
  name: string
): Promise<number | undefined> {
  if (isNew) {
    const res = await CITIES_API.create({ name });
    return res.data.id;
  }
  await CITIES_API.update(id, { name });
  return undefined;
}
