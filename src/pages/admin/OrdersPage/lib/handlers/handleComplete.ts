import type { Order } from '@/shared/api/types';
import { completeOrder } from '../api/completeOrder';

export async function handleComplete(
  order: Order,
  refetch: () => void,
  showToast: (message: string, type: 'success' | 'error') => void,
): Promise<void> {
  try {
    await completeOrder(order);
    refetch();
  } catch {
    showToast('Ошибка при обновлении', 'error');
  }
}
