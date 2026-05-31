import type { ChangeEvent } from 'react';
import type { Car } from '@/shared/api/types';
import styles from '../CarsPage.module.scss';

type TFilters = { model: string; category: string; price: string; color: string };

type TCarFiltersProps = {
  filters: TFilters;
  cars: Car[];
  categories: string[];
  colors: string[];
  onFilterChange: (key: keyof TFilters, value: string) => void;
  onApply: () => void;
  onReset: () => void;
};

export function CarFilters({
  filters, cars, categories, colors, onFilterChange, onApply, onReset,
}: TCarFiltersProps) {
  const handleChange = (key: keyof TFilters) => (e: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(key, e.target.value);
  };

  return (
    <div className={styles.filters}>
      <select
        className={`${styles.filterSelect} ${!filters.model ? styles.filterPlaceholder : ''}`}
        value={filters.model}
        onChange={handleChange('model')}
      >
        <option value="">Автомобиль</option>
        {cars.map((car) => <option key={car.id} value={car.id}>{car.name}</option>)}
      </select>

      <select
        className={`${styles.filterSelect} ${!filters.category ? styles.filterPlaceholder : ''}`}
        value={filters.category}
        onChange={handleChange('category')}
      >
        <option value="">Тип</option>
        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      <select
        className={`${styles.filterSelect} ${!filters.price ? styles.filterPlaceholder : ''}`}
        value={filters.price}
        onChange={handleChange('price')}
      >
        <option value="">Цена</option>
        <option value="with-price">С ценой</option>
        <option value="no-price">Без цены</option>
      </select>

      <select
        className={`${styles.filterSelect} ${!filters.color ? styles.filterPlaceholder : ''}`}
        value={filters.color}
        onChange={handleChange('color')}
      >
        <option value="">Цвет</option>
        {colors.map((color) => <option key={color} value={color}>{color}</option>)}
      </select>

      <button type="button" className={styles.resetBtn} onClick={onReset}>Сбросить</button>
      <button type="button" className={styles.applyBtn} onClick={onApply}>Применить</button>
    </div>
  );
}
