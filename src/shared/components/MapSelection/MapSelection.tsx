import React from 'react';
import * as styles from './MapSelection.module.scss';

interface IMapPoint {
  id: string;
  x: number;
  y: number;
  address: string;
}

interface IMapSelectionProps {
  points: IMapPoint[];
  selectedId?: string;
  onPointSelect?: (point: IMapPoint) => void;
}

export const MapSelection: React.FC<IMapSelectionProps> = ({ points, selectedId, onPointSelect }) => (
    <div className={styles.mapSelection}>
      <div className={styles.mapSelectionTitle}>Выбрать на карте:</div>
      <div className={styles.mapSelectionMap}>
        {points.map((point) => (
          <button
            key={point.id}
            className={`${styles.mapSelectionMarker} ${selectedId === point.id ? styles.selected : ''}`}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            type="button"
            onClick={() => onPointSelect?.(point)}
            title={point.address}
          />
        ))}
      </div>
    </div>
);
