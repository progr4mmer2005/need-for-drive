import { memo, useState } from 'react';

import { TCar } from '@/widgets/OrderSection/model/types';
import { getCarImage } from '@/widgets/OrderSection/ui/ModelCard/carImages';
import * as styles from './StepSummary.module.scss';

type TStepSummaryProps = {
  car: TCar;
  dateFrom: string;
};

const RU = String.fromCharCode;
const TEXT = {
  defaultPlate: RU(1050, 32, 55, 54, 49, 32, 1053, 1040, 32, 55, 51),
  fuel: RU(1058, 1086, 1087, 1083, 1080, 1074, 1086),
  availableFrom: RU(1044, 1086, 1089, 1090, 1091, 1087, 1085, 1072, 32, 1089),
};

export const StepSummary = memo(function StepSummary({ car, dateFrom }: TStepSummaryProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const carWithDetails = car as TCar & { plate?: string; fuel?: string };

  const imageSrc = getCarImage(car);
  const hasImage = Boolean(imageSrc) && !hasImageError;
  const plate = carWithDetails.plate || TEXT.defaultPlate;
  const fuel = carWithDetails.fuel || '100%';

  return (
    <div className={styles.panel}>
      <div className={styles.top}>
        <div>
          <div className={styles.carName}>{`${car.brand}, ${car.name}`}</div>
          <div className={styles.plate}>{plate}</div>
          <div className={styles.line}>
            <b>{TEXT.fuel}</b> {fuel}
          </div>
          <div className={styles.line}>
            <b>{TEXT.availableFrom}</b> {dateFrom}
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


