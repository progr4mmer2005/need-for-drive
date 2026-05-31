import { CATEGORIES_API } from '@/shared/api/citiesApi';
import type { Category } from '@/shared/api/types';

export async function loadCategories(): Promise<Category[]> {
  const res = await CATEGORIES_API.getAll();
  return res.data;
}
