import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface IMapControllerProps {
  center: [number, number];
  pointCenter: [number, number] | null;
}

export function MapController({ center, pointCenter }: IMapControllerProps) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 12, { animate: true });
  }, [center, map]);
  useEffect(() => {
    if (pointCenter) map.setView(pointCenter, 15, { animate: true });
  }, [pointCenter, map]);
  return null;
}
