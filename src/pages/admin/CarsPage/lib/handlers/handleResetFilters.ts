import type { Dispatch, SetStateAction } from 'react';
import type { TFilters } from '../../types';
import { DEFAULT_FILTERS } from '../../constants';

type TDeps = {
  setDraftFilters: Dispatch<SetStateAction<TFilters>>;
  setAppliedFilters: Dispatch<SetStateAction<TFilters>>;
};

export function handleResetFilters(deps: TDeps): void {
  deps.setDraftFilters(DEFAULT_FILTERS);
  deps.setAppliedFilters(DEFAULT_FILTERS);
}
