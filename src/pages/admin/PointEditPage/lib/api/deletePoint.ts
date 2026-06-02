import { POINTS_API } from '@/shared/api/pointsApi';

export async function deletePoint(id: number): Promise<void> {
  await POINTS_API.delete(id);
}
