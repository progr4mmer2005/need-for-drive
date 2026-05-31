import type { Dispatch, SetStateAction } from 'react';
import type { City } from '@/shared/api/types';
import { loadCities } from '../api/loadCities';

type TDeps = {
  setCities: Dispatch<SetStateAction<City[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function initCities(deps: TDeps): Promise<void> {
  deps.setLoading(true);
  try {
    const data = await loadCities();
    deps.setCities(data);
  } catch (error) {
    console.error(error);
  } finally {
    deps.setLoading(false);
  }
}
