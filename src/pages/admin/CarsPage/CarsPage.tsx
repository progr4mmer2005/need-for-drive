import { useEffect, useState, type ChangeEvent } from 'react';
import { CARS_API } from '@/shared/api/carsApi';
import type { Car } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { Loader } from '@/shared/components/Loader';
import styles from './CarsPage.module.scss';

const PAGE_SIZE = 10;
const DEFAULT_FILTERS = { model: '', category: '', price: '', color: '' };

function buildPaginationPages(current: number, total: number): Array<number | '...'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

export function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [draftFilters, setDraftFilters] = useState(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    setLoading(true);

    const params: Record<string, unknown> = {
      limit: PAGE_SIZE,
      page: page - 1,
    };

    CARS_API.getAll(params)
      .then((carsResponse) => {
        setCars(carsResponse.data);
        setTotal(carsResponse.count ?? 0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const paginationPages = buildPaginationPages(page, totalPages);
  const categories = Array.from(new Set(cars.map((car) => car.categoryId?.name).filter(Boolean)));
  const colors = Array.from(new Set(cars.flatMap((car) => car.colors || [])));

  const filteredCars = cars.filter((car) => {
    if (appliedFilters.model && car.id !== Number(appliedFilters.model)) return false;
    if (appliedFilters.category && car.categoryId?.name !== appliedFilters.category) return false;
    if (appliedFilters.color && !(car.colors || []).includes(appliedFilters.color)) return false;
    if (appliedFilters.price === 'with-price' && (!car.priceMin || !car.priceMax)) return false;
    if (appliedFilters.price === 'no-price' && (car.priceMin || car.priceMax)) return false;
    return true;
  });

  const resetFilters = () => {
    setDraftFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
  };

  const handleModelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDraftFilters((prevFilters) => ({ ...prevFilters, model: event.target.value }));
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDraftFilters((prevFilters) => ({ ...prevFilters, category: event.target.value }));
  };

  const handlePriceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDraftFilters((prevFilters) => ({ ...prevFilters, price: event.target.value }));
  };

  const handleColorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDraftFilters((prevFilters) => ({ ...prevFilters, color: event.target.value }));
  };

  return (
    <div>
      <div className={styles.header}>
        <AdminPageTitle>Entities</AdminPageTitle>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.filters}>
          <select className={`${styles.filterSelect} ${!draftFilters.model ? styles.filterPlaceholder : ''}`} value={draftFilters.model} onChange={handleModelChange}>
            <option value="">Автомобиль</option>
            {cars.map((car) => <option key={car.id} value={car.id}>{car.name}</option>)}
          </select>
          <select className={`${styles.filterSelect} ${!draftFilters.category ? styles.filterPlaceholder : ''}`} value={draftFilters.category} onChange={handleCategoryChange}>
            <option value="">Тип</option>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
          <select className={`${styles.filterSelect} ${!draftFilters.price ? styles.filterPlaceholder : ''}`} value={draftFilters.price} onChange={handlePriceChange}>
            <option value="">Цена</option>
            <option value="with-price">С ценой</option>
            <option value="no-price">Без цены</option>
          </select>
          <select className={`${styles.filterSelect} ${!draftFilters.color ? styles.filterPlaceholder : ''}`} value={draftFilters.color} onChange={handleColorChange}>
            <option value="">Цвет</option>
            {colors.map((color) => <option key={color} value={color}>{color}</option>)}
          </select>
          <button type="button" className={styles.resetBtn} onClick={resetFilters}>Сбросить</button>
          <button
            type="button"
            className={styles.applyBtn}
            onClick={() => {
              setPage(1);
              setAppliedFilters(draftFilters);
            }}
          >
            Применить
          </button>
        </div>

        <div className={styles.scrollArea}>
          {loading ? <Loader /> : filteredCars.length === 0 ? <p className={styles.empty}>Нет автомобилей</p> : (
            <table className={styles.table}>
              <thead><tr><th>Фото</th><th>Модель</th><th>Категория</th><th>Цена (мин/макс)</th><th>Цвета</th><th>Действия</th></tr></thead>
              <tbody>
                {filteredCars.map((car) => (
                  <tr key={car.id}>
                    <td>
                      {car.thumbnail?.path ? <img className={styles.carThumb} src={car.thumbnail.path} alt="" /> : null}
                    </td>
                    <td>{car.name}</td>
                    <td>{car.categoryId?.name || '—'}</td>
                    <td>{car.priceMin ? `${car.priceMin.toLocaleString('ru-RU')}` : '—'} / {car.priceMax ? `${car.priceMax.toLocaleString('ru-RU')} ₽` : '—'}</td>
                    <td>{(car.colors || []).slice(0, 3).join(', ')}</td>
                    <td><a className={styles.editBtn} href={`#/admin/cars/${car.id}`}>Изменить</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className={styles.pagination}>
          <button type="button" className={styles.pageBtn} disabled={page === 1} onClick={() => setPage(1)}>«</button>
          {paginationPages.map((pageItem, pageIndex) => {
            if (pageItem === '...') {
              return <span key={`dots-${pageIndex}`} className={styles.pageDots}>...</span>;
            }

            const isActive = pageItem === page;
            return (
              <button
                key={pageItem}
                type="button"
                className={isActive ? styles.pageBtnActive : styles.pageBtn}
                onClick={() => setPage(pageItem)}
              >
                {pageItem}
              </button>
            );
          })}
          <button type="button" className={styles.pageBtn} disabled={page === totalPages} onClick={() => setPage(totalPages)}>»</button>
        </div>
      </div>
    </div>
  );
}
