import type { Dispatch, SetStateAction, MutableRefObject } from 'react';
import type { IFormState } from '../../types';
import { loadPoint } from '../api/loadPoint';

type TDeps = {
  setForm: Dispatch<SetStateAction<IFormState>>;
  setIsAddressConfirmed: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  prevCityIdRef: MutableRefObject<string>;
};

export async function initPoint(id: string | undefined, isNew: boolean, deps: TDeps): Promise<void> {
  if (!isNew && id) {
    deps.setLoading(true);
    try {
      const { form, cityId } = await loadPoint(Number(id));
      deps.prevCityIdRef.current = cityId;
      deps.setForm(form);
      deps.setIsAddressConfirmed(true);
    } catch (error) {
      console.error(error);
    } finally {
      deps.setLoading(false);
    }
  } else {
    deps.setLoading(false);
  }
}
