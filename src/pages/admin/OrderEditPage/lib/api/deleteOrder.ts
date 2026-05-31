import { ORDERS_API } from '@/shared/api/ordersApi';

export async function deleteOrder(id: number): Promise<void> {
  await ORDERS_API.delete(id);
}
