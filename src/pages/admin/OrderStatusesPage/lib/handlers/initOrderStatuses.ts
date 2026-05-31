import type { Dispatch, SetStateAction } from 'react';
import type { OrderStatus } from '@/shared/api/types';
import { loadOrderStatuses } from '../api/loadOrderStatuses';

type TDeps = {
  setStatuses: Dispatch<SetStateAction<OrderStatus[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function initOrderStatuses(deps: TDeps): Promise<void> {
  deps.setLoading(true);
  try {
    const data = await loadOrderStatuses();
    deps.setStatuses(data);
  } catch (error) {
    console.error(error);
  } finally {
    deps.setLoading(false);
  }
}
