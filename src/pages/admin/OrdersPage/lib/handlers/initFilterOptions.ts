import type { Dispatch, SetStateAction } from 'react';
import type { Car, City, OrderStatus } from '@/shared/api/types';
import { loadFilterOptions } from '../api/loadFilterOptions';

type TDeps = {
  setCars: Dispatch<SetStateAction<Car[]>>;
  setCities: Dispatch<SetStateAction<City[]>>;
  setStatuses: Dispatch<SetStateAction<OrderStatus[]>>;
};

export async function initFilterOptions(deps: TDeps): Promise<void> {
  const { cars, cities, statuses } = await loadFilterOptions();
  deps.setCars(cars);
  deps.setCities(cities);
  deps.setStatuses(statuses);
}
