import { useEffect, useState } from 'react';

import { Car } from '../../model/types';
import { formatPrice } from '../../model/formatPrice';
import * as styles from './ModelCard.module.scss';

type ModelCardProps = {
  car: Car;
  selected: boolean;
  onSelect: (carId: string) => void;
};

const getCarImageCandidates = (source: string) => {
  if (!source) {
    return [];
  }

  const fileName = source.split('/').filter(Boolean).pop();
  if (!fileName) {
    return [source];
  }

  const routeDepth = window.location.pathname.split('/').filter(Boolean).length;
  const relativePrefix = routeDepth > 0 ? '../'.repeat(routeDepth) : '';
  const absolutePath = `/uploads/cars/${fileName}`;
  const relativePath = `${relativePrefix}uploads/cars/${fileName}`;

  return [absolutePath, relativePath];
};

export function ModelCard({ car, selected, onSelect }: ModelCardProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const imageCandidates = getCarImageCandidates(car.image);
  const imageSrc = imageCandidates[candidateIndex] || '';
  const hasImage = Boolean(imageSrc) && !hasImageError;

  useEffect(() => {
    setCandidateIndex(0);
    setHasImageError(false);
  }, [car.image]);

  const handleImageError = () => {
    if (candidateIndex < imageCandidates.length - 1) {
      setCandidateIndex((current) => current + 1);
      return;
    }

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
