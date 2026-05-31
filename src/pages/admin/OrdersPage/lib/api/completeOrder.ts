import { ORDERS_API } from '@/shared/api/ordersApi';
import type { Order } from '@/shared/api/types';
import { toOrderDto } from '../form/toOrderDto';

export async function completeOrder(order: Order): Promise<void> {
  await ORDERS_API.update(order.id, toOrderDto(order, 4));
}
