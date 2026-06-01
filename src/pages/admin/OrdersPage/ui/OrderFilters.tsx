import type { ChangeEvent } from 'react';
import type { Car, City, OrderStatus } from '@/shared/api/types';
import styles from '../OrdersPage.module.scss';

type TFilters = { period: string; car: string; city: string; status: string };

type TOrderFiltersProps = {
  filters: TFilters;
  cars: Car[];
  cities: City[];
  statuses: OrderStatus[];
  onFilterChange: (key: keyof TFilters, value: string) => void;
  onApply: () => void;
};

export function OrderFilters({
  filters,
  cars,
  cities,
  statuses,
  onFilterChange,
  onApply,
}: TOrderFiltersProps) {
  const handleChange = (key: keyof TFilters) => (e: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(key, e.target.value);
  };

  return (
    <div className={styles.filters}>
      <select
        className={`${styles.filterSelect} ${!filters.period ? styles.filterPlaceholder : ''}`}
        value={filters.period}
        onChange={handleChange('period')}
      >
        <option value="">Время</option>
        <option value="week">За неделю</option>
        <option value="month">За месяц</option>
        <option value="all">За всё время</option>
      </select>

      <select
        className={`${styles.filterSelect} ${!filters.car ? styles.filterPlaceholder : ''}`}
        value={filters.car}
        onChange={handleChange('car')}
      >
        <option value="">Автомобиль</option>
        {cars.map((car) => (
          <option key={car.id} value={car.id}>
            {car.name}
          </option>
        ))}
      </select>

      <select
        className={`${styles.filterSelect} ${!filters.city ? styles.filterPlaceholder : ''}`}
        value={filters.city}
        onChange={handleChange('city')}
      >
        <option value="">Город</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      <select
        className={`${styles.filterSelect} ${!filters.status ? styles.filterPlaceholder : ''}`}
        value={filters.status}
        onChange={handleChange('status')}
      >
        <option value="">В процессе</option>
        {statuses.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <button className={styles.applyBtn} type="button" onClick={onApply}>
        Применить
      </button>
    </div>
  );
}
