import type { Dispatch, SetStateAction } from 'react';
import type { Car } from '@/shared/api/types';
import { loadCars } from '../api/loadCars';

type TDeps = {
  setCars: Dispatch<SetStateAction<Car[]>>;
  setTotal: Dispatch<SetStateAction<number>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function initCars(page: number, deps: TDeps): Promise<void> {
  deps.setLoading(true);
  try {
    const { data, count } = await loadCars(page);
    deps.setCars(data);
    deps.setTotal(count);
  } catch (error) {
    console.error(error);
  } finally {
    deps.setLoading(false);
  }
}
