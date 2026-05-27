import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import * as styles from './AutocompleteInput.module.scss';

interface IAutocompleteInputProps {
  label: string;
  value: string;
  placeholder?: string;
  options: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
}

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
    () => options.filter((option) => option.toLowerCase().includes(inputValue.toLowerCase())),
    [inputValue, options],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setInputValue(nextValue);
    onChange(nextValue);
    setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    setIsOpen(true);
  };

  return (
    <div className={styles.autocomplete} ref={wrapperRef}>
      <label className={styles.autocompleteLabel}>{label}</label>
      <div className={styles.autocompleteInputWrapper}>
        <input
          type="text"
          className={styles.autocompleteInput}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
        />
        {inputValue && !disabled && (
          <button className={styles.autocompleteClear} type="button" onClick={handleClear}>
            ×
          </button>
        )}
        {isOpen && !disabled && filteredOptions.length > 0 && (
          <div className={styles.autocompleteDropdown}>
            {filteredOptions.map((option) => (
              <button
                key={option}
                className={styles.autocompleteOption}
                type="button"
                onClick={() => handleOptionClick(option)}
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
