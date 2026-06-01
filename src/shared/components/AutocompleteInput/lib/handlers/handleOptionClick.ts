interface TDeps {
  setInputValue: (value: string) => void;
  onChange: (value: string) => void;
  setIsOpen: (open: boolean) => void;
}

export const handleOptionClick = (deps: TDeps) => (option: string) => {
  deps.setInputValue(option);
  deps.onChange(option);
  deps.setIsOpen(false);
};
