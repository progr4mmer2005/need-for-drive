import type { City } from '@/shared/api/types';
import { PAGE_SIZE } from '@/shared/lib/pagination';

export function getPageCities(cities: City[], page: number): City[] {
  return cities.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
}
