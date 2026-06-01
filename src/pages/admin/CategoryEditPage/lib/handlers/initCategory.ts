import type { Dispatch, SetStateAction } from 'react';
import type { IFormState } from '../../types';
import { loadCategory } from '../api/loadCategory';

type TDeps = {
  setForm: Dispatch<SetStateAction<IFormState>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function initCategory(
  id: string | undefined,
  isNew: boolean,
  deps: TDeps
): Promise<void> {
  if (isNew || !id) return;
  deps.setLoading(true);
  try {
    const category = await loadCategory(Number(id));
    deps.setForm({ name: category.name || '', description: '' });
  } catch (error) {
    console.error(error);
  } finally {
    deps.setLoading(false);
  }
}
