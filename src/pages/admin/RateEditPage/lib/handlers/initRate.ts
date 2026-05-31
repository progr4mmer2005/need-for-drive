import type { Dispatch, SetStateAction } from 'react';
import type { IFormState } from '../../types';
import { loadRate } from '../api/loadRate';

type TDeps = {
  setForm: Dispatch<SetStateAction<IFormState>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function initRate(id: string | undefined, isNew: boolean, deps: TDeps): Promise<void> {
  if (!isNew && id) {
    deps.setLoading(true);
    try {
      const form = await loadRate(Number(id));
      deps.setForm(form);
    } catch (error) {
      console.error(error);
    } finally {
      deps.setLoading(false);
    }
  } else {
    deps.setLoading(false);
  }
}
