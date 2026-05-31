import type { Dispatch, SetStateAction } from 'react';
import { loadCity } from '../api/loadCity';

type TDeps = {
  setName: Dispatch<SetStateAction<string>>;
  setIsCityConfirmed: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function initCity(id: string | undefined, isNew: boolean, deps: TDeps): Promise<void> {
  if (isNew || !id) return;
  deps.setLoading(true);
  try {
    const name = await loadCity(Number(id));
    deps.setName(name);
    deps.setIsCityConfirmed(true);
  } catch (error) {
    console.error(error);
  } finally {
    deps.setLoading(false);
  }
}
