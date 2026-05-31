import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import type { Order } from '@/shared/api/types';
import type { TFilters } from '../../types';
import { loadOrders } from '../api/loadOrders';

type TDeps = {
  setOrders: Dispatch<SetStateAction<Order[]>>;
  setTotal: Dispatch<SetStateAction<number>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  navigate: NavigateFunction;
};

export async function fetchOrders(page: number, filters: TFilters, deps: TDeps): Promise<void> {
  deps.setLoading(true);
  try {
    const { data, count } = await loadOrders(page, filters);
    deps.setOrders(data);
    deps.setTotal(count);
  } catch (error: unknown) {
    if ((error as { response?: { status?: number } })?.response?.status === 401) {
      deps.navigate('/admin/login');
    }
  } finally {
    deps.setLoading(false);
  }
}
