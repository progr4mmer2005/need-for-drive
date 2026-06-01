import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { validate } from '../form/validate';
import { saveCity } from '../api/saveCity';

type TDeps = {
  isNew: boolean;
  id: number;
  isCityConfirmed: boolean;
  setError: Dispatch<SetStateAction<string>>;
  setSaving: Dispatch<SetStateAction<boolean>>;
  showToast: (message: string, type: 'success' | 'error') => void;
  navigate: NavigateFunction;
};

export async function handleSave(name: string, deps: TDeps): Promise<void> {
  const error = validate(name, deps.isCityConfirmed);
  if (error) {
    deps.setError(error);
    return;
  }
  deps.setSaving(true);
  try {
    const newId = await saveCity(deps.isNew, deps.id, name.trim());
    deps.showToast(deps.isNew ? 'Город добавлен' : 'Город сохранён', 'success');
    if (deps.isNew && newId) deps.navigate(`/admin/cities/${newId}`, { replace: true });
  } catch (err: unknown) {
    const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
    deps.showToast(msg || 'Ошибка при сохранении', 'error');
  } finally {
    deps.setSaving(false);
  }
}
