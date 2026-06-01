import React from 'react';
import { DEBOUNCE_MS } from '../../constants';

interface TDeps {
  setInputValue: (value: string) => void;
  onChange: (value: string) => void;
  debounceRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
  fetchSuggestions: (query: string) => Promise<void>;
}

export const handleInputChange = (deps: TDeps) => (e: React.ChangeEvent<HTMLInputElement>) => {
  const val = e.target.value;
  deps.setInputValue(val);
  deps.onChange(val);

  if (deps.debounceRef.current) clearTimeout(deps.debounceRef.current);
  deps.debounceRef.current = setTimeout(() => deps.fetchSuggestions(val), DEBOUNCE_MS);
};
