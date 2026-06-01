import { CATEGORIES_API } from '@/shared/api/citiesApi';
import type { TCategoryDto } from '../form/buildCategoryDto';

export async function saveCategory(
  isNew: boolean,
  id: number,
  dto: TCategoryDto
): Promise<number | undefined> {
  if (isNew) {
    const res = await CATEGORIES_API.create(dto);
    return res.data.id;
  }
  await CATEGORIES_API.update(id, dto);
  return undefined;
}
