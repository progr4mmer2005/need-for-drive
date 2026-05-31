import { CATEGORIES_API } from '@/shared/api/citiesApi';
import type { TCategoryDto } from '../form/buildCategoryDto';

export async function saveCategory(isNew: boolean, id: number, dto: TCategoryDto): Promise<void> {
  if (isNew) {
    await CATEGORIES_API.create(dto);
  } else {
    await CATEGORIES_API.update(id, dto);
  }
}
