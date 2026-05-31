import type { Dispatch, SetStateAction } from 'react';
import type { IFormState } from '../../types';
import { loadRateType } from '../api/loadRateType';

type TDeps = {
  setForm: Dispatch<SetStateAction<IFormState>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function initRateType(id: string | undefined, isNew: boolean, deps: TDeps): Promise<void> {
  if (isNew || !id) return;
  deps.setLoading(true);
  try {
    const form = await loadRateType(Number(id));
    deps.setForm(form);
  } catch (error) {
    console.error(error);
  } finally {
    deps.setLoading(false);
  }
}
