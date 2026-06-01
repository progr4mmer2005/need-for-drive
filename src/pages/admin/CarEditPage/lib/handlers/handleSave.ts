import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import type { IFormState } from '../../types';
import { validate } from '../form/validate';
import { buildCarDto } from '../form/buildCarDto';
import { saveCar } from '../api/saveCar';

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
    const dto = buildCarDto(form);
    const newId = await saveCar(deps.isNew, deps.id, dto);
    deps.showToast(deps.isNew ? 'Успех! Машина добавлена' : 'Успех! Машина сохранена', 'success');
    if (deps.isNew && newId) deps.navigate(`/admin/cars/${newId}`, { replace: true });
  } catch (error: unknown) {
    const msg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
    deps.showToast(msg || 'Ошибка при сохранении', 'error');
  } finally {
    deps.setSaving(false);
  }
}
