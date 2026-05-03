import { useState } from 'react';

import { Car } from '../../model/types';
import { formatPrice } from '../../model/formatPrice';
import { carImages } from './carImages';
import * as styles from './ModelCard.module.scss';

type ModelCardProps = {
  car: Car;
  selected: boolean;
  onSelect: (carId: string) => void;
};

export function ModelCard({ car, selected, onSelect }: ModelCardProps) {
  const [hasImageError, setHasImageError] = useState(false);
  
  const imageSrc = carImages[car.id];
  const hasImage = Boolean(imageSrc) && !hasImageError;

  const handleImageError = () => {
    console.error('Failed to load image for:', car.id, imageSrc);
    setHasImageError(true);
  };

  return (
    <button
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      type="button"
      onClick={() => onSelect(car.id)}
    >
      <div className={styles.name}>{car.name}</div>
      <div className={styles.price}>{`${formatPrice(car.priceMin)} - ${formatPrice(car.priceMax)}`}</div>

      <div className={styles.imageWrap}>
        {hasImage ? <img className={styles.image} src={imageSrc} alt={car.name} onError={handleImageError} /> : null}
      </div>
    </button>
  );
}