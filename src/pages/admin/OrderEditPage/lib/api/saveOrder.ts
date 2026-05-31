import { ORDERS_API } from '@/shared/api/ordersApi';
import type { Order } from '@/shared/api/types';
import { buildOrderDto } from '../form/buildOrderDto';
import type { IFormState } from '../../types';

export async function saveOrder(id: number, form: IFormState, order: Order | null): Promise<void> {
  await ORDERS_API.update(id, buildOrderDto(form, order));
}
