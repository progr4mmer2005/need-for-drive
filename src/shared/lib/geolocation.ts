let cached: Promise<GeolocationPosition | null> | null = null;

export function getUserPosition(): Promise<GeolocationPosition | null> {
  if (cached) return cached;
  cached = new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(resolve, () => resolve(null), { timeout: 6000 });
  });
  return cached;
}
