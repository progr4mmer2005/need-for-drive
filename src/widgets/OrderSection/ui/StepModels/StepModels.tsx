import orderData from '../../../../shared/model/orderData.json';
import { Car } from '../../model/types';
import { ModelCard } from '../ModelCard';
import { RadioOption } from '../RadioOption';
import * as styles from './StepModels.module.scss';

type StepModelsProps = {
  selectedCategory: string;
  selectedCarId: string | null;
  cars: Car[];
  onCategoryChange: (category: string) => void;
  onCarSelect: (carId: string) => void;
};

export function StepModels({
  selectedCategory,
  selectedCarId,
  cars,
  onCategoryChange,
  onCarSelect,
}: StepModelsProps) {
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
}
