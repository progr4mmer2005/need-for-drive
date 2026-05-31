import type { Dispatch, SetStateAction } from 'react';
import { loadOrderStatus } from '../api/loadOrderStatus';

type TDeps = {
  setName: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function initOrderStatus(id: string | undefined, isNew: boolean, deps: TDeps): Promise<void> {
  if (isNew || !id) return;
  deps.setLoading(true);
  try {
    const name = await loadOrderStatus(Number(id));
    deps.setName(name);
  } catch (error) {
    console.error(error);
  } finally {
    deps.setLoading(false);
  }
}
