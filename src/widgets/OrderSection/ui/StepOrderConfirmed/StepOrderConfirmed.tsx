import { memo, useState } from 'react';

import { TCar } from '@/widgets/OrderSection/model/types';
import { carImages } from '@/widgets/OrderSection/ui/ModelCard/carImages';
import * as styles from './StepOrderConfirmed.module.scss';

type TStepOrderConfirmed = {
  car: TCar;
  dateFrom: string;
};

export const StepOrderConfirmed = memo(function StepOrderConfirmed({ car, dateFrom }: TStepOrderConfirmed) {
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
});
