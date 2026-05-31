import type { OrderStatus } from '@/shared/api/types';
import { PAGE_SIZE } from '../../constants';

export function getPageStatuses(statuses: OrderStatus[], page: number): OrderStatus[] {
  return statuses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
}
