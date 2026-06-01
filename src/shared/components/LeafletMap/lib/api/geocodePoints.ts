import { ILeafletMapPoint, IGeoPoint } from '../../types';
import { geocodeAddress } from './geocodeAddress';

export const geocodePoints = async (
  cityName: string,
  points: ILeafletMapPoint[]
): Promise<{ center: [number, number] | null; geoPoints: IGeoPoint[] }> => {
  const center = await geocodeAddress(cityName);

  const results = await Promise.all(
    points.map(async (point) => {
      const query = point.address ? `${cityName}, ${point.address}` : `${cityName}, ${point.name}`;
      const coords = await geocodeAddress(query);
      return coords ? { ...point, coords } : null;
    })
  );

  return {
    center,
    geoPoints: results.filter((r): r is IGeoPoint => r !== null),
  };
};
