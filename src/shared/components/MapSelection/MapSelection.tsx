import React from 'react';
import * as styles from './MapSelection.module.scss';

interface MapPoint {
  id: string;
  x: number;
  y: number;
  address: string;
}

interface MapSelectionProps {
  points: MapPoint[];
  selectedId?: string;
  onPointSelect?: (point: MapPoint) => void;
}

export const MapSelection: React.FC<MapSelectionProps> = ({ points, selectedId, onPointSelect }) => (
    <div className={styles.mapSelection}>
      <div className={styles.mapSelection__title}>Выбрать на карте:</div>
      <div className={styles.mapSelection__map}>
        {points.map((point) => (
          <button
            key={point.id}
            className={`${styles.mapSelection__marker} ${selectedId === point.id ? styles.selected : ''}`}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            type="button"
            onClick={() => onPointSelect?.(point)}
            title={point.address}
          />
        ))}
      </div>
    </div>
);
