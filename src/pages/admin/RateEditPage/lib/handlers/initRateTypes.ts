import type { Dispatch, SetStateAction } from 'react';
import type { RateType } from '@/shared/api/types';
import type { IFormState } from '../../types';
import { loadRateTypes } from '../api/loadRateTypes';

type TDeps = {
  isNew: boolean;
  setRateTypes: Dispatch<SetStateAction<RateType[]>>;
  setForm: Dispatch<SetStateAction<IFormState>>;
};

export async function initRateTypes(deps: TDeps): Promise<void> {
  const data = await loadRateTypes();
  deps.setRateTypes(data);
  if (deps.isNew && data.length > 0) {
    deps.setForm((p) => ({ ...p, rateTypeId: p.rateTypeId || String(data[0].id) }));
  }
}
