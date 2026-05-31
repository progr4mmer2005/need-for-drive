import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { deleteOrderStatus } from '../api/deleteOrderStatus';

type TDeps = {
  id: number;
  setSaving: Dispatch<SetStateAction<boolean>>;
  showToast: (message: string, type: 'success' | 'error') => void;
  navigate: NavigateFunction;
};

export async function handleDelete(deps: TDeps): Promise<void> {
  if (!window.confirm('Удалить статус?')) return;
  deps.setSaving(true);
  try {
    await deleteOrderStatus(deps.id);
    deps.showToast('Статус удалён', 'success');
    setTimeout(() => deps.navigate('/admin/order-statuses'), 2500);
  } catch {
    deps.showToast('Ошибка при удалении', 'error');
  } finally {
    deps.setSaving(false);
  }
}
