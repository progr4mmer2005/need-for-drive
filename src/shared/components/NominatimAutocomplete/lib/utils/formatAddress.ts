import { INominatimResult } from '../../types';

export function formatAddress(result: INominatimResult): string {
  // eslint-disable-next-line camelcase
  const { road, house_number } = result.address;
  // eslint-disable-next-line camelcase
  if (road && house_number) return `${road}, ${house_number}`;
  if (road) return road;
  return result.display_name.split(',').slice(0, 2).join(',').trim();
}
