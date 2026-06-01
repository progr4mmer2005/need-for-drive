export const filterOptions = (options: string[], inputValue: string): string[] =>
  options.filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()));
