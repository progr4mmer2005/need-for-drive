import { useState } from 'react';

import { Car } from '../../model/types';
import { carImages } from '../ModelCard/carImages';
import * as styles from './StepOrderConfirmed.module.scss';

type StepOrderConfirmed = {
  car: Car;
  dateFrom: string;
};

export function StepOrderConfirmed({ car, dateFrom}: StepOrderConfirmed) {
  const [hasImageError, setHasImageError] = useState(false);

  const imageSrc = carImages[car.id];
  const hasImage = Boolean(imageSrc) && !hasImageError;

  return (
    <div className={styles.panel}>

      <div className={styles.top}>
        
        <div>
          <div className={styles.successTitle}>Ваш заказ подтверждён</div>
          <div className={styles.carName}>{`${car.brand}, ${car.name}`}</div>
          <div className={styles.plate}>{car.plate}</div>
          <div className={styles.line}>
            <b>Топливо</b> {car.fuel}
          </div>
          <div className={styles.line}>
            <b>Доступна с</b> {dateFrom}
          </div>
        </div>
        <div className={styles.imageWrap}>
          {hasImage ? (
            <img
              className={styles.image}
              src={imageSrc}
              alt={car.name}
              onError={() => setHasImageError(true)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}