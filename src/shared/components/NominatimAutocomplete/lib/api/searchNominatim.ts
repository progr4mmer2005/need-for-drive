import { INominatimResult } from '../../types';

export async function searchNominatim(
  query: string,
  cityName: string,
  mode: 'address' | 'city'
): Promise<INominatimResult[]> {
  const fullQuery = mode === 'address' && cityName ? `${cityName}, ${query}` : query;

  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', fullQuery);
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', '8');
  url.searchParams.set('countrycodes', 'ru');
  url.searchParams.set('addressdetails', '1');

  const res = await fetch(url.toString(), {
    headers: {
      'Accept-Language': 'ru',
      'User-Agent': 'NeedForDrive/1.0',
    },
  });
  return res.json();
}
