import type { Category } from '@/shared/api/types';
import { PAGE_SIZE } from '../../constants';

export function getPageCategories(categories: Category[], page: number): Category[] {
  return categories.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
}
