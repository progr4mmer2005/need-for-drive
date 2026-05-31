import type { Dispatch, SetStateAction } from 'react';
import type { Rate } from '@/shared/api/types';
import { loadRates } from '../api/loadRates';

type TDeps = {
  setRates: Dispatch<SetStateAction<Rate[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function initRates(deps: TDeps): Promise<void> {
  deps.setLoading(true);
  try {
    const data = await loadRates();
    deps.setRates(data);
  } catch (error) {
    console.error(error);
  } finally {
    deps.setLoading(false);
  }
}
