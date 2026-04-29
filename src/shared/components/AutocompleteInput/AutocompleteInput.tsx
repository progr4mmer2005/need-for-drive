import React, { useState, useRef, useEffect } from 'react';
import styles from './AutocompleteInput.module.scss';

interface AutocompleteInputProps {
  label: string;
  value: string;
  placeholder?: string;
  options: string[];
  onChange: (value: string) => void;
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  label,
  value,
  placeholder,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().startsWith(inputValue.toLowerCase())
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
  };

  return (
    <div className={styles.autocomplete} ref={wrapperRef}>
      <label className={styles.autocomplete__label}>{label}</label>
      <div className={styles.autocomplete__inputWrapper}>
        <input
          type="text"
          className={styles.autocomplete__input}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
        />
        {inputValue && (
          <button className={styles.autocomplete__clear} onClick={handleClear}>
            ✕
          </button>
        )}
        {isOpen && filteredOptions.length > 0 && (
          <div className={styles.autocomplete__dropdown}>
            {filteredOptions.map((option) => (
              <div
                key={option}
                className={styles.autocomplete__option}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};