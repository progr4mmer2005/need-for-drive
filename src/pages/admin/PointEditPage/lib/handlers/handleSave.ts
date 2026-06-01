import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import type { IFormState } from '../../types';
import { validate } from '../form/validate';
import { buildPointDto } from '../form/buildPointDto';
import { savePoint } from '../api/savePoint';

type TDeps = {
  isNew: boolean;
  id: number;
  isAddressConfirmed: boolean;
  setErrors: Dispatch<SetStateAction<Partial<Record<keyof IFormState, string>>>>;
  setSaving: Dispatch<SetStateAction<boolean>>;
  showToast: (message: string, type: 'success' | 'error') => void;
  navigate: NavigateFunction;
};

export async function handleSave(form: IFormState, deps: TDeps): Promise<void> {
  const errs = validate(form, deps.isAddressConfirmed);
  if (Object.keys(errs).length > 0) {
    deps.setErrors(errs);
    return;
  }
  deps.setSaving(true);
  try {
    const newId = await savePoint(deps.isNew, deps.id, buildPointDto(form));
    deps.showToast(deps.isNew ? 'Пункт выдачи добавлен' : 'Пункт выдачи сохранён', 'success');
    if (deps.isNew && newId) deps.navigate(`/admin/points/${newId}`, { replace: true });
  } catch (err: unknown) {
    const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
    deps.showToast(msg || 'Ошибка при сохранении', 'error');
  } finally {
    deps.setSaving(false);
  }
}
