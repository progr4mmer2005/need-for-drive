import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import type { IFormState } from '../../types';
import { validate } from '../form/validate';
import { buildCategoryDto } from '../form/buildCategoryDto';
import { saveCategory } from '../api/saveCategory';

type TDeps = {
  isNew: boolean;
  id: number;
  setErrors: Dispatch<SetStateAction<Partial<Record<keyof IFormState, string>>>>;
  setSaving: Dispatch<SetStateAction<boolean>>;
  showToast: (message: string, type: 'success' | 'error') => void;
  navigate: NavigateFunction;
};

export async function handleSave(form: IFormState, deps: TDeps): Promise<void> {
  const errs = validate(form);
  if (Object.keys(errs).length > 0) {
    deps.setErrors(errs);
    return;
  }
  deps.setSaving(true);
  try {
    const dto = buildCategoryDto(form);
    const newId = await saveCategory(deps.isNew, deps.id, dto);
    deps.showToast(deps.isNew ? 'Категория добавлена' : 'Категория сохранена', 'success');
    if (deps.isNew && newId) deps.navigate(`/admin/categories/${newId}`, { replace: true });
  } catch (err: unknown) {
    const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
    deps.showToast(msg || 'Ошибка при сохранении', 'error');
  } finally {
    deps.setSaving(false);
  }
}
