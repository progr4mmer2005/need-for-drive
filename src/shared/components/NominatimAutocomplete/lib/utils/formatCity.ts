import { INominatimResult } from '../../types';

export function formatCity(result: INominatimResult): string {
  const {
    city, town, village, county,
  } = result.address;
  return city || town || village || county || result.display_name.split(',')[0].trim();
}
