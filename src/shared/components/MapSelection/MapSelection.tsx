import React from 'react';
import styles from './MapSelection.module.scss';

interface MapPoint {
  id: number;
  x: number;
  y: number;
  address: string;
}

interface MapSelectionProps {
  points: MapPoint[];
  onPointSelect?: (point: MapPoint) => void;
}

export const MapSelection: React.FC<MapSelectionProps> = ({ points, onPointSelect }) => {
  return (
    <div className={styles.mapSelection}>
      <div className={styles.mapSelection__title}>Выбрать на карте:</div>
      <div className={styles.mapSelection__map}>
        {points.map((point) => (
          <div
            key={point.id}
            className={styles.mapSelection__marker}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            onClick={() => onPointSelect?.(point)}
            title={point.address}
          />
        ))}
      </div>
    </div>
  );
};