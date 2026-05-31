import type { Dispatch, SetStateAction } from 'react';
import type { Order } from '@/shared/api/types';
import type { IFormState } from '../../types';
import { loadOrder } from '../api/loadOrder';
import { orderToForm } from '../form/orderToForm';

type TDeps = {
  setOrder: Dispatch<SetStateAction<Order | null>>;
  setForm: Dispatch<SetStateAction<IFormState | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function initOrder(id: string | undefined, deps: TDeps): Promise<void> {
  if (!id) return;
  deps.setLoading(true);
  try {
    const order = await loadOrder(Number(id));
    deps.setOrder(order);
    deps.setForm(orderToForm(order));
  } catch (error) {
    console.error(error);
  } finally {
    deps.setLoading(false);
  }
}
