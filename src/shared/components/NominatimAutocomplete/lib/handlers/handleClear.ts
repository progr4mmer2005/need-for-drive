import { INominatimResult } from '../../types';

interface TDeps {
  setInputValue: (value: string) => void;
  onChange: (value: string) => void;
  setAllSuggestions: (results: INominatimResult[]) => void;
  setIsOpen: (open: boolean) => void;
}

export const handleClear = (deps: TDeps) => () => {
  deps.setInputValue('');
  deps.onChange('');
  deps.setAllSuggestions([]);
  deps.setIsOpen(false);
};
