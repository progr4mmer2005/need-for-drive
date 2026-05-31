import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { deleteRate } from '../api/deleteRate';

type TDeps = {
  id: number;
  setSaving: Dispatch<SetStateAction<boolean>>;
  showToast: (message: string, type: 'success' | 'error') => void;
  navigate: NavigateFunction;
};

export async function handleDelete(deps: TDeps): Promise<void> {
  if (!window.confirm('Удалить тариф?')) return;
  deps.setSaving(true);
  try {
    await deleteRate(deps.id);
    deps.showToast('Тариф удалён', 'success');
    setTimeout(() => deps.navigate('/admin/rates'), 1200);
  } catch {
    deps.showToast('Ошибка при удалении', 'error');
  } finally {
    deps.setSaving(false);
  }
}
