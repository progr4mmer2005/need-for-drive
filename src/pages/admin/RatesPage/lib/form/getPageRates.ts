import type { Rate } from '@/shared/api/types';
import { PAGE_SIZE } from '@/shared/lib/pagination';

export function getPageRates(rates: Rate[], page: number): Rate[] {
  return rates.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
}
