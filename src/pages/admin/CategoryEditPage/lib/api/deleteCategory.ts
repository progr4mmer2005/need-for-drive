import { CATEGORIES_API } from '@/shared/api/categoriesApi';

export async function deleteCategory(id: number): Promise<void> {
  await CATEGORIES_API.delete(id);
}
