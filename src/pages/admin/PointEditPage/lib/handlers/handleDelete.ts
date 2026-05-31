import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { deletePoint } from '../api/deletePoint';

type TDeps = {
  id: number;
  setSaving: Dispatch<SetStateAction<boolean>>;
  showToast: (message: string, type: 'success' | 'error') => void;
  navigate: NavigateFunction;
};

export async function handleDelete(deps: TDeps): Promise<void> {
  if (!window.confirm('Удалить пункт выдачи?')) return;
  deps.setSaving(true);
  try {
    await deletePoint(deps.id);
    deps.showToast('Пункт выдачи удалён', 'success');
    setTimeout(() => deps.navigate('/admin/points'), 1200);
  } catch {
    deps.showToast('Ошибка при удалении', 'error');
  } finally {
    deps.setSaving(false);
  }
}
