import { geocodeCache } from '../../constants';

export async function geocodeAddress(query: string): Promise<[number, number] | null> {
  const cached = geocodeCache.get(query);
  if (cached) return cached;
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
      { headers: { 'Accept-Language': 'ru' } },
    );
    const data = await res.json();
    if (!data?.length) return null;
    const coords: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    geocodeCache.set(query, coords);
    return coords;
  } catch {
    return null;
  }
}
