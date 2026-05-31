import { ORDERS_API } from '@/shared/api/ordersApi';
import type { Order } from '@/shared/api/types';

export async function loadOrder(id: number): Promise<Order> {
  const res = await ORDERS_API.getOne(id);
  return res.data;
}
