import type { Order } from '@/shared/api/types';
import { deleteOrder } from '../api/deleteOrder';

export async function handleDelete(
  order: Order,
  refetch: () => void,
  showToast: (message: string, type: 'success' | 'error') => void,
): Promise<void> {
  if (!window.confirm('Удалить заказ?')) return;
  try {
    await deleteOrder(order.id);
    refetch();
  } catch {
    showToast('Ошибка при удалении', 'error');
  }
}
