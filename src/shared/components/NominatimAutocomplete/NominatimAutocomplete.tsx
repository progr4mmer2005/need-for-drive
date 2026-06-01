import { useState, useEffect, useRef } from 'react';
import { INominatimAutocompleteProps, INominatimResult } from './types';
import { formatAddress } from './lib/utils/formatAddress';
import { formatCity } from './lib/utils/formatCity';
import { getSubtitle } from './lib/utils/getSubtitle';
import { fetchSuggestions } from './lib/handlers/fetchSuggestions';
import { handleInputChange } from './lib/handlers/handleInputChange';
import { handleSelect } from './lib/handlers/handleSelect';
import { handleClear } from './lib/handlers/handleClear';
import styles from './NominatimAutocomplete.module.scss';

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

  const suggestions =
    requireHouseNumber && mode === 'address'
      ? allSuggestions.filter((r) => Boolean(r.address.house_number))
      : allSuggestions;

  const showHouseNumberHint =
    requireHouseNumber &&
    mode === 'address' &&
    allSuggestions.length > 0 &&
    suggestions.length === 0;

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  const fetchDeps = {
    cityName,
    mode,
    setAllSuggestions,
    setIsOpen,
    setLoading,
  };
  const onFetch = fetchSuggestions(fetchDeps);
  const onInputChange = handleInputChange({
    setInputValue,
    onChange,
    debounceRef,
    fetchSuggestions: onFetch,
  });
  const onSelect = handleSelect({
    mode,
    setInputValue,
    onChange,
    onConfirm,
    setAllSuggestions,
    setIsOpen,
  });
  const onClear = handleClear({
    setInputValue,
    onChange,
    setAllSuggestions,
    setIsOpen,
  });

  const dropdownVisible = isOpen && (suggestions.length > 0 || showHouseNumberHint);

  const rowClass = [
    styles.inputRow,
    error ? styles.inputRowError : '',
    disabled ? styles.inputRowDisabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrap} ref={wrapperRef}>
      <div className={rowClass}>
        <input
          type="text"
          className={styles.input}
          value={inputValue}
          placeholder={disabled ? 'Сначала выберите город' : placeholder}
          disabled={disabled}
          onChange={onInputChange}
          onFocus={() => (suggestions.length > 0 || showHouseNumberHint) && setIsOpen(true)}
          autoComplete="off"
        />
        {loading && <span className={styles.spinner} />}
        {inputValue && !disabled && !loading && (
          <button
            type="button"
            className={styles.clear}
            onClick={onClear}
            aria-label="Очистить поле"
          >
            <span className={styles.clearIcon} />
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
              onClick={() => onSelect(result)}
            >
              <span className={styles.optionMain}>
                {mode === 'city' ? formatCity(result) : formatAddress(result)}
              </span>
              <span className={styles.optionSub}>{getSubtitle(result, mode)}</span>
            </button>
          ))}
          {showHouseNumberHint && (
            <div className={styles.dropdownHint}>Добавьте номер дома для выбора адреса</div>
          )}
        </div>
      )}
    </div>
  );
}
