interface TDeps {
  setInputValue: (value: string) => void;
  onChange: (value: string) => void;
  setIsOpen: (open: boolean) => void;
}

export const handleClear = (deps: TDeps) => () => {
  deps.setInputValue('');
  deps.onChange('');
  deps.setIsOpen(true);
};
