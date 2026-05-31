import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import type { IFormState } from '../../types';
import { validate } from '../form/validate';
import { buildRateTypeDto } from '../form/buildRateTypeDto';
import { saveRateType } from '../api/saveRateType';

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
  if (Object.keys(errs).length > 0) { deps.setErrors(errs); return; }
  deps.setSaving(true);
  try {
    await saveRateType(deps.isNew, deps.id, buildRateTypeDto(form));
    deps.showToast(deps.isNew ? 'Тип тарифа добавлен' : 'Тип тарифа сохранён', 'success');
    if (deps.isNew) setTimeout(() => deps.navigate('/admin/rate-types'), 1200);
  } catch (err: unknown) {
    const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
    deps.showToast(msg || 'Ошибка при сохранении', 'error');
  } finally {
    deps.setSaving(false);
  }
}
