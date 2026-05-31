import type { Dispatch, SetStateAction } from 'react';
import type { TFilters } from '../../types';

type TDeps = {
  setPage: Dispatch<SetStateAction<number>>;
  setAppliedFilters: Dispatch<SetStateAction<TFilters>>;
};

export function handleApplyFilters(draftFilters: TFilters, deps: TDeps): void {
  deps.setPage(1);
  deps.setAppliedFilters(draftFilters);
}
