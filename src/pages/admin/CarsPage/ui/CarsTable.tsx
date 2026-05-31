import type { Car } from '@/shared/api/types';
import styles from '../CarsPage.module.scss';

type TCarsTableProps = {
  cars: Car[];
};

export function CarsTable({ cars }: TCarsTableProps) {
  if (cars.length === 0) {
    return <p className={styles.empty}>Нет автомобилей</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Фото</th>
          <th>Модель</th>
          <th>Категория</th>
          <th>Цена (мин/макс)</th>
          <th>Цвета</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr key={car.id}>
            <td>
              {car.thumbnail?.path
                ? <img className={styles.carThumb} src={car.thumbnail.path} alt="" />
                : null}
            </td>
            <td>{car.name}</td>
            <td>{car.categoryId?.name || '—'}</td>
            <td>
              {car.priceMin ? car.priceMin.toLocaleString('ru-RU') : '—'}
              {' / '}
              {car.priceMax ? `${car.priceMax.toLocaleString('ru-RU')} ₽` : '—'}
            </td>
            <td>{(car.colors || []).slice(0, 3).join(', ')}</td>
            <td>
              <a className={styles.editBtn} href={`#/admin/cars/${car.id}`}>Изменить</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
