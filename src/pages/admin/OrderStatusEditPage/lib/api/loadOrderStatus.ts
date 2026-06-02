import { ORDER_STATUS_API } from '@/shared/api/orderStatusApi';

export async function loadOrderStatus(id: number): Promise<string> {
  const res = await ORDER_STATUS_API.getOne(id);
  return res.data.name || '';
}
