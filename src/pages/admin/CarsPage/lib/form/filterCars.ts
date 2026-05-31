import type { Car } from '@/shared/api/types';
import type { TFilters } from '../../types';

export function filterCars(cars: Car[], filters: TFilters): Car[] {
  return cars.filter((car) => {
    if (filters.model && car.id !== Number(filters.model)) return false;
    if (filters.category && car.categoryId?.name !== filters.category) return false;
    if (filters.color && !(car.colors || []).includes(filters.color)) return false;
    if (filters.price === 'with-price' && (!car.priceMin || !car.priceMax)) return false;
    if (filters.price === 'no-price' && (car.priceMin || car.priceMax)) return false;
    return true;
  });
}
