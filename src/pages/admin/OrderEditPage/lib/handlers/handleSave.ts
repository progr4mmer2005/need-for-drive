import type { Dispatch, SetStateAction } from 'react';
import type { Order } from '@/shared/api/types';
import type { IFormState } from '../../types';
import { saveOrder } from '../api/saveOrder';

type TDeps = {
  id: string | undefined;
  order: Order | null;
  setSaving: Dispatch<SetStateAction<boolean>>;
  showToast: (message: string, type: 'success' | 'error') => void;
};

export async function handleSave(form: IFormState | null, deps: TDeps): Promise<void> {
  if (!form || !deps.id) return;
  deps.setSaving(true);
  try {
    await saveOrder(Number(deps.id), form, deps.order);
    deps.showToast('Заказ сохранён', 'success');
  } catch (err: unknown) {
    const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
    deps.showToast(msg || 'Ошибка при сохранении', 'error');
  } finally {
    deps.setSaving(false);
  }
}
