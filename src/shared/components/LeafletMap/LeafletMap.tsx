import { useEffect, useState, memo } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './LeafletMap.module.scss';

const geocodeCache = new Map<string, [number, number]>();

async function geocodeAddress(query: string): Promise<[number, number] | null> {
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

const makeIcon = (selected: boolean) => L.divIcon({
  className: '',
  html: `<div style="
    width:18px;
    height:18px;
    border-radius:50%;
    background:${selected ? '#005bff' : '#0ec261'};
    border:3px solid #fff;
    box-shadow:0 2px 4px rgba(0,0,0,0.16);
    transition:background .15s;
  "></div>`,
  iconAnchor: [9, 9],
});

function MapController({ center, pointCenter }: { center: [number, number]; pointCenter: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 12, { animate: true });
  }, [center, map]);
  useEffect(() => {
    if (pointCenter) map.setView(pointCenter, 15, { animate: true });
  }, [pointCenter, map]);
  return null;
}

export interface ILeafletMapPoint {
  id: string;
  name: string;
  address: string;
}

interface IGeoPoint extends ILeafletMapPoint {
  coords: [number, number];
}

interface ILeafletMapProps {
  cityName: string;
  points: ILeafletMapPoint[];
  selectedId?: string;
  onPointSelect: (id: string) => void;
}

const DEFAULT_CENTER: [number, number] = [55.751244, 37.618423];

export const LeafletMap = memo(function LeafletMap({
  cityName,
  points,
  selectedId,
  onPointSelect,
}: ILeafletMapProps) {
  const [cityCenter, setCityCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [geoPoints, setGeoPoints] = useState<IGeoPoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cityName) return;
    let cancelled = false;
    setLoading(true);
    setGeoPoints([]);

    (async () => {
      const center = await geocodeAddress(cityName);
      if (cancelled) return;
      if (center) setCityCenter(center);

      const results = await Promise.all(
        points.map(async (point) => {
          const query = point.address
            ? `${cityName}, ${point.address}`
            : `${cityName}, ${point.name}`;
          const coords = await geocodeAddress(query);
          return coords ? { ...point, coords } : null;
        }),
      );

      if (!cancelled) {
        setGeoPoints(results.filter((r): r is IGeoPoint => r !== null));
        setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [cityName, points.length]);

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Выбрать на карте:</div>
      <div className={styles.mapContainer}>
        {loading && <div className={styles.overlay}>Загрузка карты...</div>}
        <MapContainer
          center={cityCenter}
          zoom={12}
          className={styles.map}
          zoomControl
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <MapController center={cityCenter} pointCenter={geoPoints.find((p) => p.id === selectedId)?.coords ?? null} />
          {geoPoints.map((point) => (
            <Marker
              key={point.id}
              position={point.coords}
              icon={makeIcon(point.id === selectedId)}
              title={point.address ? `${point.name}\n${point.address}` : point.name}
              eventHandlers={{ click: () => onPointSelect(point.id) }}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
});
