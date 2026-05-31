import type { Car } from '@/shared/api/types';

export function getCategories(cars: Car[]): string[] {
  return Array.from(new Set(cars.map((car) => car.categoryId?.name).filter(Boolean))) as string[];
}
