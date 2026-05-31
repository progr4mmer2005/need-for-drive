import { CATEGORIES_API } from '@/shared/api/citiesApi';
import type { Category } from '@/shared/api/types';

export async function loadCategory(id: number): Promise<Category> {
  const res = await CATEGORIES_API.getOne(id);
  return res.data;
}
