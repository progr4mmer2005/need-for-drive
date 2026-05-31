import { POINTS_API } from '@/shared/api/citiesApi';

export async function deletePoint(id: number): Promise<void> {
  await POINTS_API.delete(id);
}
