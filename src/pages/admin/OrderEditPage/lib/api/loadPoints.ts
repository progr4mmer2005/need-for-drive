import { POINTS_API } from '@/shared/api/pointsApi';
import type { Point } from '@/shared/api/types';

export async function loadPoints(cityId: string): Promise<Point[]> {
  if (!cityId) return [];
  const res = await POINTS_API.getAll({ cityId: Number(cityId) });
  return res.data;
}
