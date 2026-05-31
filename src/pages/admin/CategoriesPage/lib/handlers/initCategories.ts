import type { Dispatch, SetStateAction } from 'react';
import type { Category } from '@/shared/api/types';
import { loadCategories } from '../api/loadCategories';

type TDeps = {
  setCategories: Dispatch<SetStateAction<Category[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function initCategories(deps: TDeps): Promise<void> {
  deps.setLoading(true);
  try {
    const data = await loadCategories();
    deps.setCategories(data);
  } catch (error) {
    console.error(error);
  } finally {
    deps.setLoading(false);
  }
}
