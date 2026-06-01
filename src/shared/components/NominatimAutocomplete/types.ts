export interface INominatimResult {
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

export interface INominatimAutocompleteProps {
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
