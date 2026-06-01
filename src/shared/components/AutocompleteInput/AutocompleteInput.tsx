import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { IAutocompleteInputProps } from './types';
import { filterOptions } from './lib/utils/filterOptions';
import { handleInputChange } from './lib/handlers/handleInputChange';
import { handleOptionClick } from './lib/handlers/handleOptionClick';
import { handleClear } from './lib/handlers/handleClear';
import * as styles from './AutocompleteInput.module.scss';

export const AutocompleteInput: React.FC<IAutocompleteInputProps> = ({
  label,
  value,
  placeholder,
  options,
  disabled = false,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const filteredOptions = useMemo(
    () => filterOptions(options, inputValue),
    [inputValue, options],
  );

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  const deps = { setInputValue, onChange, setIsOpen };
  const onInputChange = handleInputChange(deps);
  const onOptionClick = handleOptionClick(deps);
  const onClear = handleClear(deps);

  return (
    <div className={styles.autocomplete} ref={wrapperRef}>
      <label className={styles.autocompleteLabel}>{label}</label>
      <div className={styles.autocompleteInputWrapper}>
        <input
          type="text"
          className={styles.autocompleteInput}
          value={inputValue}
          onChange={onInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
        />
        {inputValue && !disabled && (
          <button className={styles.autocompleteClear} type="button" onClick={onClear} aria-label="Очистить поле">
            <span className={styles.autocompleteClearIcon} />
          </button>
        )}
        {isOpen && !disabled && filteredOptions.length > 0 && (
          <div className={styles.autocompleteDropdown}>
            {filteredOptions.map((option, index) => (
              <button
                key={`${option}-${index}`}
                className={styles.autocompleteOption}
                type="button"
                onClick={() => onOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
