import { memo } from 'react';
import { TCar } from '@/widgets/OrderSection/model/types';
import { ModelCard } from '@/widgets/OrderSection/ui/ModelCard';
import { RadioOption } from '@/widgets/OrderSection/ui/RadioOption';
import * as styles from './StepModels.module.scss';

type TStepModelsProps = {
  categories: string[];
  selectedCategory: string;
  selectedCarId: string | null;
  cars: TCar[];
  onCategoryChange: (category: string) => void;
  onCarSelect: (carId: string) => void;
};

export const StepModels = memo(
  ({
    categories,
    selectedCategory,
    selectedCarId,
    cars,
    onCategoryChange,
    onCarSelect,
  }: TStepModelsProps) => (
    <div className={styles.panel}>
      <div className={styles.filtersRow}>
        {categories.map((category) => (
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
          <ModelCard
            key={car.id}
            car={car}
            selected={selectedCarId === car.id}
            onSelect={onCarSelect}
          />
        ))}
      </div>
    </div>
  )
);

StepModels.displayName = 'StepModels';
