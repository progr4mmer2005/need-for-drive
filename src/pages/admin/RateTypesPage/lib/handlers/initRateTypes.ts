import type { Dispatch, SetStateAction } from 'react';
import type { RateType } from '@/shared/api/types';
import { loadRateTypes } from '../api/loadRateTypes';

type TDeps = {
  setRateTypes: Dispatch<SetStateAction<RateType[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function initRateTypes(deps: TDeps): Promise<void> {
  deps.setLoading(true);
  try {
    const data = await loadRateTypes();
    deps.setRateTypes(data);
  } catch (error) {
    console.error(error);
  } finally {
    deps.setLoading(false);
  }
}
