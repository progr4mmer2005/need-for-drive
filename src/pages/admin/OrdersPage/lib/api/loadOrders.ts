import { ORDERS_API } from '@/shared/api/ordersApi';
import type { Order } from '@/shared/api/types';
import type { TFilters } from '../../types';
import { PAGE_SIZE } from '../../constants';

export async function loadOrders(page: number, filters: TFilters): Promise<{ data: Order[]; count: number }> {
  const params: Record<string, number> = { limit: PAGE_SIZE, page: page - 1 };
  if (filters.car) params.carId = Number(filters.car);
  if (filters.city) params.cityId = Number(filters.city);
  if (filters.status) params.orderStatusId = Number(filters.status);
  const res = await ORDERS_API.getAll(params);
  return { data: res.data, count: res.count ?? 0 };
}
