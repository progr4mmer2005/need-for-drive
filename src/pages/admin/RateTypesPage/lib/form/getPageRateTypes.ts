import type { RateType } from '@/shared/api/types';
import { PAGE_SIZE } from '../../constants';

export function getPageRateTypes(rateTypes: RateType[], page: number): RateType[] {
  return rateTypes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
}
