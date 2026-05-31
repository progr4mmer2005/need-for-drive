import type { Dispatch, SetStateAction } from 'react';
import type { TFilters } from '../../types';

export function handleFilterChange(
  key: keyof TFilters,
  value: string,
  setDraftFilters: Dispatch<SetStateAction<TFilters>>,
): void {
  setDraftFilters((prev) => ({ ...prev, [key]: value }));
}
