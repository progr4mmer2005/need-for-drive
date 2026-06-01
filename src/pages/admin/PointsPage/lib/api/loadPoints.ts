import { POINTS_API } from '@/shared/api/citiesApi';
import type { Point } from '@/shared/api/types';
import { PAGE_SIZE } from '@/shared/lib/pagination';

export async function loadPoints(page: number): Promise<{ data: Point[]; count: number }> {
  const res = await POINTS_API.getAll({ limit: PAGE_SIZE, page: page - 1 });
  return { data: res.data, count: res.count ?? 0 };
}
