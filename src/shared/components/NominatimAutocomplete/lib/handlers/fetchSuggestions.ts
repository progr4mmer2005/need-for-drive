import { INominatimResult } from '../../types';
import { MIN_LENGTH } from '../../constants';
import { searchNominatim } from '../api/searchNominatim';

interface TDeps {
  cityName: string;
  mode: 'address' | 'city';
  setAllSuggestions: (results: INominatimResult[]) => void;
  setIsOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const fetchSuggestions = (deps: TDeps) => async (query: string) => {
  if (query.length < MIN_LENGTH) {
    deps.setAllSuggestions([]);
    deps.setIsOpen(false);
    return;
  }
  deps.setLoading(true);
  try {
    const results = await searchNominatim(query, deps.cityName, deps.mode);
    deps.setAllSuggestions(results);
    deps.setIsOpen(results.length > 0);
  } catch {
    deps.setAllSuggestions([]);
  } finally {
    deps.setLoading(false);
  }
};
