import { INominatimResult } from '../../types';
import { formatAddress } from '../utils/formatAddress';
import { formatCity } from '../utils/formatCity';

interface TDeps {
  mode: 'address' | 'city';
  setInputValue: (value: string) => void;
  onChange: (value: string) => void;
  onConfirm?: () => void;
  setAllSuggestions: (results: INominatimResult[]) => void;
  setIsOpen: (open: boolean) => void;
}

export const handleSelect = (deps: TDeps) => (result: INominatimResult) => {
  const formatted = deps.mode === 'city' ? formatCity(result) : formatAddress(result);
  deps.setInputValue(formatted);
  deps.onChange(formatted);
  deps.onConfirm?.();
  deps.setAllSuggestions([]);
  deps.setIsOpen(false);
};
