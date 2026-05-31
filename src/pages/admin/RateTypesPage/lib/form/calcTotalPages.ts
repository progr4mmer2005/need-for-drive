import { PAGE_SIZE } from '../../constants';

export function calcTotalPages(total: number): number {
  return Math.max(1, Math.ceil(total / PAGE_SIZE));
}
