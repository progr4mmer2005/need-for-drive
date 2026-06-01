import { useEffect, useState } from 'react';
import { ILeafletMapPoint, IGeoPoint } from '../../types';
import { DEFAULT_CENTER } from '../../constants';
import { geocodePoints } from '../api/geocodePoints';

export const useGeoPoints = (cityName: string, points: ILeafletMapPoint[]) => {
  const [cityCenter, setCityCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [geoPoints, setGeoPoints] = useState<IGeoPoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cityName) return;
    let cancelled = false;
    setLoading(true);
    setGeoPoints([]);

    (async () => {
      const { center, geoPoints: resolved } = await geocodePoints(cityName, points);
      if (cancelled) return;
      if (center) setCityCenter(center);
      setGeoPoints(resolved);
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [cityName, points.length]);

  return { cityCenter, geoPoints, loading };
};
