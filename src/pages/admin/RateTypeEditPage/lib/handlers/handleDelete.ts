import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { deleteRateType } from '../api/deleteRateType';

type TDeps = {
  id: number;
  setSaving: Dispatch<SetStateAction<boolean>>;
  showToast: (message: string, type: 'success' | 'error') => void;
  navigate: NavigateFunction;
};

export async function handleDelete(deps: TDeps): Promise<void> {
  if (!window.confirm('Удалить тип тарифа?')) return;
  deps.setSaving(true);
  try {
    await deleteRateType(deps.id);
    deps.showToast('Тип тарифа удалён', 'success');
    setTimeout(() => deps.navigate('/admin/rate-types'), 1200);
  } catch {
    deps.showToast('Ошибка при удалении', 'error');
  } finally {
    deps.setSaving(false);
  }
}
