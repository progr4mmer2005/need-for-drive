import { ORDER_STATUS_API } from '@/shared/api/orderStatusApi';
import type { OrderStatus } from '@/shared/api/types';

export async function loadOrderStatuses(): Promise<OrderStatus[]> {
  const res = await ORDER_STATUS_API.getAll();
  return res.data;
}
