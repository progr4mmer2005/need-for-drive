import { memo } from 'react';
import orderData from '@/shared/model/orderData.json';
import { TCar } from '@/widgets/OrderSection/model/types';
import { ModelCard } from '@/widgets/OrderSection/ui/ModelCard';
import { RadioOption } from '@/widgets/OrderSection/ui/RadioOption';
import * as styles from './StepModels.module.scss';

type TStepModelsProps = {
  selectedCategory: string;
  selectedCarId: string | null;
  cars: TCar[];
  onCategoryChange: (category: string) => void;
  onCarSelect: (carId: string) => void;
};

export const StepModels = memo(function StepModels({
  selectedCategory,
  selectedCarId,
  cars,
  onCategoryChange,
  onCarSelect,
}: TStepModelsProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.filtersRow}>
        {orderData.carCategories.map((category) => (
          <RadioOption
            key={category}
            checked={selectedCategory === category}
            name="category"
            label={category}
            onChange={() => onCategoryChange(category)}
          />
        ))}
      </div>

      <div className={styles.modelsGrid}>
        {cars.map((car) => (
          <ModelCard key={car.id} car={car} selected={selectedCarId === car.id} onSelect={onCarSelect} />
        ))}
      </div>
    </div>
  );
});
