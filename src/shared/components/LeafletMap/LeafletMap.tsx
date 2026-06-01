import { memo } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ILeafletMapProps } from './types';
import { makeIcon } from './lib/utils/makeIcon';
import { useGeoPoints } from './lib/hooks/useGeoPoints';
import { MapController } from './lib/components/MapController';
import styles from './LeafletMap.module.scss';

export const LeafletMap = memo(function LeafletMap({
  cityName,
  points,
  selectedId,
  onPointSelect,
}: ILeafletMapProps) {
  const { cityCenter, geoPoints, loading } = useGeoPoints(cityName, points);

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Выбрать на карте:</div>
      <div className={styles.mapContainer}>
        {loading && <div className={styles.overlay}>Загрузка карты...</div>}
        <MapContainer center={cityCenter} zoom={12} className={styles.map} zoomControl>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <MapController
            center={cityCenter}
            pointCenter={geoPoints.find((p) => p.id === selectedId)?.coords ?? null}
          />
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
