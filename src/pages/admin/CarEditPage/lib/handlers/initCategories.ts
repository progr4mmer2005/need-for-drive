import type { Dispatch, SetStateAction } from 'react';
import type { Category } from '@/shared/api/types';
import type { IFormState } from '../../types';
import { loadCategories } from '../api/loadCategories';

type TDeps = {
  setCategories: Dispatch<SetStateAction<Category[]>>;
  setForm: Dispatch<SetStateAction<IFormState>>;
};

export async function initCategories(isNew: boolean, deps: TDeps): Promise<void> {
  const data = await loadCategories();
  deps.setCategories(data);
  if (isNew && data.length > 0) {
    deps.setForm((prev) => ({ ...prev, categoryId: prev.categoryId || String(data[0].id) }));
  }
}
