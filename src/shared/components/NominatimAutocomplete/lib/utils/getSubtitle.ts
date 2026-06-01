import { INominatimResult } from '../../types';

export function getSubtitle(result: INominatimResult, mode: 'address' | 'city'): string {
  if (mode === 'city') {
    return result.address.state ?? result.display_name.split(',').slice(1, 3).join(',').trim();
  }
  return result.display_name.split(',').slice(2, 4).join(',').trim();
}
