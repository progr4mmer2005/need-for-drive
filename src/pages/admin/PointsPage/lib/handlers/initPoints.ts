import type { Dispatch, SetStateAction } from 'react';
import type { Point } from '@/shared/api/types';
import { loadPoints } from '../api/loadPoints';

type TDeps = {
  setPoints: Dispatch<SetStateAction<Point[]>>;
  setTotal: Dispatch<SetStateAction<number>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function initPoints(page: number, deps: TDeps): Promise<void> {
  deps.setLoading(true);
  try {
    const { data, count } = await loadPoints(page);
    deps.setPoints(data);
    deps.setTotal(count);
  } catch (error) {
    console.error(error);
  } finally {
    deps.setLoading(false);
  }
}
