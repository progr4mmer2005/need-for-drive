import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { deleteCar } from '../api/deleteCar';

type TDeps = {
  id: number;
  setSaving: Dispatch<SetStateAction<boolean>>;
  showToast: (message: string, type: 'success' | 'error') => void;
  navigate: NavigateFunction;
};

export async function handleDelete(deps: TDeps): Promise<void> {
  if (!window.confirm('Удалить автомобиль?')) return;
  deps.setSaving(true);
  try {
    await deleteCar(deps.id);
    deps.showToast('Успех! Машина удалена', 'success');
    setTimeout(() => deps.navigate('/admin/cars'), 1200);
  } catch {
    deps.showToast('Ошибка при удалении', 'error');
  } finally {
    deps.setSaving(false);
  }
}
