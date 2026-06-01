export interface IAutocompleteInputProps {
  label: string;
  value: string;
  placeholder?: string;
  options: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
}
