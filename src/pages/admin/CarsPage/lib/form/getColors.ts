import type { Car } from '@/shared/api/types';

export function getColors(cars: Car[]): string[] {
  return Array.from(new Set(cars.flatMap((car) => car.colors || [])));
}
