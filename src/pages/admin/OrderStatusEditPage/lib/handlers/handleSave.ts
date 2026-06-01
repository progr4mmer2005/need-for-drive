import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { validate } from '../form/validate';
import { saveOrderStatus } from '../api/saveOrderStatus';

type TDeps = {
  isNew: boolean;
  id: number;
  setError: Dispatch<SetStateAction<string>>;
  setSaving: Dispatch<SetStateAction<boolean>>;
  showToast: (message: string, type: 'success' | 'error') => void;
  navigate: NavigateFunction;
};

export async function handleSave(name: string, deps: TDeps): Promise<void> {
  const error = validate(name);
  if (error) {
    deps.setError(error);
    return;
  }
  deps.setSaving(true);
  try {
    const newId = await saveOrderStatus(deps.isNew, deps.id, name.trim());
    deps.showToast(deps.isNew ? 'Статус добавлен' : 'Статус сохранён', 'success');
    if (deps.isNew && newId) deps.navigate(`/admin/order-statuses/${newId}`, { replace: true });
  } catch (err: unknown) {
    const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
    deps.showToast(msg || 'Ошибка при сохранении', 'error');
  } finally {
    deps.setSaving(false);
  }
}
