import type { Dispatch, SetStateAction } from 'react';
import type { Car, City, Rate, OrderStatus } from '@/shared/api/types';
import { loadOptions } from '../api/loadOptions';

type TDeps = {
  setStatuses: Dispatch<SetStateAction<OrderStatus[]>>;
  setCities: Dispatch<SetStateAction<City[]>>;
  setCars: Dispatch<SetStateAction<Car[]>>;
  setRates: Dispatch<SetStateAction<Rate[]>>;
};

export async function initOptions(deps: TDeps): Promise<void> {
  const { statuses, cities, cars, rates } = await loadOptions();
  deps.setStatuses(statuses);
  deps.setCities(cities);
  deps.setCars(cars);
  deps.setRates(rates);
}
