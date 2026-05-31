import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { deleteCity } from '../api/deleteCity';

type TDeps = {
  id: number;
  setSaving: Dispatch<SetStateAction<boolean>>;
  showToast: (message: string, type: 'success' | 'error') => void;
  navigate: NavigateFunction;
};

export async function handleDelete(deps: TDeps): Promise<void> {
  if (!window.confirm('Удалить город?')) return;
  deps.setSaving(true);
  try {
    await deleteCity(deps.id);
    deps.showToast('Город удалён', 'success');
    setTimeout(() => deps.navigate('/admin/cities'), 2500);
  } catch {
    deps.showToast('Ошибка при удалении', 'error');
  } finally {
    deps.setSaving(false);
  }
}
