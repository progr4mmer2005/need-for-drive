import { ORDER_STATUS_API } from '@/shared/api/orderStatusApi';

export async function deleteOrderStatus(id: number): Promise<void> {
  await ORDER_STATUS_API.delete(id);
}
