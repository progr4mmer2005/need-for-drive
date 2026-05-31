import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { deleteUser } from '../api/deleteUser';

type TDeps = {
  id: number;
  setSaving: Dispatch<SetStateAction<boolean>>;
  showToast: (message: string, type: 'success' | 'error') => void;
  navigate: NavigateFunction;
};

export async function handleDelete(deps: TDeps): Promise<void> {
  if (!window.confirm('Удалить пользователя?')) return;
  deps.setSaving(true);
  try {
    await deleteUser(deps.id);
    deps.showToast('Пользователь удалён', 'success');
    setTimeout(() => deps.navigate('/admin/users'), 1200);
  } catch {
    deps.showToast('Ошибка при удалении', 'error');
  } finally {
    deps.setSaving(false);
  }
}
