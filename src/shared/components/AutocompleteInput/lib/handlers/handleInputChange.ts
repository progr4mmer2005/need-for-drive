import React from 'react';

interface TDeps {
  setInputValue: (value: string) => void;
  onChange: (value: string) => void;
  setIsOpen: (open: boolean) => void;
}

export const handleInputChange = (deps: TDeps) => (event: React.ChangeEvent<HTMLInputElement>) => {
  const nextValue = event.target.value;
  deps.setInputValue(nextValue);
  deps.onChange(nextValue);
  deps.setIsOpen(true);
};
