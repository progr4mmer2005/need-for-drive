import { CATEGORIES_API } from '@/shared/api/citiesApi';

export async function deleteCategory(id: number): Promise<void> {
  await CATEGORIES_API.delete(id);
}
