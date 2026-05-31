import {
  useState, useEffect, useRef, useCallback,
} from 'react';
import styles from './NominatimAutocomplete.module.scss';

interface INominatimResult {
  place_id: number;
  display_name: string;
  address: {
    road?: string;
    house_number?: string;
    suburb?: string;
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    state?: string;
  };
}

interface INominatimAutocompleteProps {
  cityName?: string;
  value: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  mode?: 'address' | 'city';
  requireHouseNumber?: boolean;
  onChange: (value: string) => void;
  onConfirm?: () => void;
}

const DEBOUNCE_MS = 400;
const MIN_LENGTH = 2;

async function searchNominatim(
  query: string,
  cityName: string,
  mode: 'address' | 'city',
): Promise<INominatimResult[]> {
  const fullQuery = mode === 'address' && cityName
    ? `${cityName}, ${query}`
    : query;

  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', fullQuery);
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', '8');
  url.searchParams.set('countrycodes', 'ru');
  url.searchParams.set('addressdetails', '1');

  const res = await fetch(url.toString(), {
    headers: {
      'Accept-Language': 'ru',
      'User-Agent': 'NeedForDrive/1.0',
    },
  });
  return res.json();
}

function formatAddress(result: INominatimResult): string {
  const { road, house_number } = result.address;
  if (road && house_number) return `${road}, ${house_number}`;
  if (road) return road;
  return result.display_name.split(',').slice(0, 2).join(',').trim();
}

function formatCity(result: INominatimResult): string {
  const { city, town, village, county } = result.address;
  return city || town || village || county || result.display_name.split(',')[0].trim();
}

function getSubtitle(result: INominatimResult, mode: 'address' | 'city'): string {
  if (mode === 'city') {
    return result.address.state ?? result.display_name.split(',').slice(1, 3).join(',').trim();
  }
  return result.display_name.split(',').slice(2, 4).join(',').trim();
}

export function NominatimAutocomplete({
  cityName = '',
  value,
  placeholder = 'Начните вводить...',
  error,
  disabled = false,
  mode = 'address',
  requireHouseNumber = false,
  onChange,
  onConfirm,
}: INominatimAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value);
  const [allSuggestions, setAllSuggestions] = useState<INominatimResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const suggestions = (requireHouseNumber && mode === 'address')
    ? allSuggestions.filter((r) => Boolean(r.address.house_number))
    : allSuggestions;

  const showHouseNumberHint = requireHouseNumber
    && mode === 'address'
    && allSuggestions.length > 0
    && suggestions.length === 0;

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < MIN_LENGTH) {
      setAllSuggestions([]);
      setIsOpen(false);
      return;
    }
    setLoading(true);
    try {
      const results = await searchNominatim(query, cityName, mode);
      setAllSuggestions(results);
      setIsOpen(results.length > 0);
    } catch {
      setAllSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, [cityName, mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onChange(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), DEBOUNCE_MS);
  };

  const handleSelect = (result: INominatimResult) => {
    const formatted = mode === 'city' ? formatCity(result) : formatAddress(result);
    setInputValue(formatted);
    onChange(formatted);
    onConfirm?.();
    setAllSuggestions([]);
    setIsOpen(false);
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    setAllSuggestions([]);
    setIsOpen(false);
  };

  const dropdownVisible = isOpen && (suggestions.length > 0 || showHouseNumberHint);

  const rowClass = [
    styles.inputRow,
    error ? styles.inputRowError : '',
    disabled ? styles.inputRowDisabled : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.wrap} ref={wrapperRef}>
      <div className={rowClass}>
        <input
          type="text"
          className={styles.input}
          value={inputValue}
          placeholder={disabled ? 'Сначала выберите город' : placeholder}
          disabled={disabled}
          onChange={handleInputChange}
          onFocus={() => (suggestions.length > 0 || showHouseNumberHint) && setIsOpen(true)}
          autoComplete="off"
        />
        {loading && <span className={styles.spinner} />}
        {inputValue && !disabled && !loading && (
          <button type="button" className={styles.clear} onClick={handleClear}>
            &#xd7;
          </button>
        )}
      </div>

      {error && <span className={styles.errMsg}>{error}</span>}

      {dropdownVisible && (
        <div className={styles.dropdown}>
          {suggestions.map((result) => (
            <button
              key={result.place_id}
              type="button"
              className={styles.option}
              onClick={() => handleSelect(result)}
            >
              <span className={styles.optionMain}>
                {mode === 'city' ? formatCity(result) : formatAddress(result)}
              </span>
              <span className={styles.optionSub}>{getSubtitle(result, mode)}</span>
            </button>
          ))}
          {showHouseNumberHint && (
            <div className={styles.dropdownHint}>
              Добавьте номер дома для выбора адреса
            </div>
          )}
        </div>
      )}
    </div>
  );
}
