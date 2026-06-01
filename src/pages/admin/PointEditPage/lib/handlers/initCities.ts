import type { Dispatch, SetStateAction } from 'react';
import type { City } from '@/shared/api/types';
import type { IFormState } from '../../types';
import { loadCities } from '../api/loadCities';

type TDeps = {
  isNew: boolean;
  setCities: Dispatch<SetStateAction<City[]>>;
  setForm: Dispatch<SetStateAction<IFormState>>;
};

export async function initCities(deps: TDeps): Promise<void> {
  const data = await loadCities();
  deps.setCities(data);
  if (deps.isNew && data.length > 0) {
    deps.setForm((p) => ({ ...p, cityId: p.cityId || String(data[0].id) }));
  }
}
