import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { deleteOrder } from '../api/deleteOrder';

type TDeps = {
  id: string | undefined;
  setSaving: Dispatch<SetStateAction<boolean>>;
  showToast: (message: string, type: 'success' | 'error') => void;
  navigate: NavigateFunction;
};

export async function handleDelete(deps: TDeps): Promise<void> {
  if (!deps.id || !window.confirm('Удалить заказ?')) return;
  deps.setSaving(true);
  try {
    await deleteOrder(Number(deps.id));
    deps.showToast('Заказ удалён', 'success');
    setTimeout(() => deps.navigate('/admin/orders'), 1200);
  } catch {
    deps.showToast('Ошибка при удалении', 'error');
  } finally {
    deps.setSaving(false);
  }
}
