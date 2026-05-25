import { useEffect, useState } from 'react';
import { CARS_API } from '@/shared/api/carsApi';
import type { Car } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { Loader } from '@/shared/components/Loader';
import styles from './CarsPage.module.scss';

const CAR_IMAGES = {
  elantra: new URL('../../../assets/images/cars/elantra.png', import.meta.url).toString(),
  i30n: new URL('../../../assets/images/cars/i30n.png', import.meta.url).toString(),
  creta: new URL('../../../assets/images/cars/creta.png', import.meta.url).toString(),
  sonata: new URL('../../../assets/images/cars/sonata.png', import.meta.url).toString(),
  solaris: new URL('../../../assets/images/cars/solaris.png', import.meta.url).toString(),
  tucson: new URL('../../../assets/images/cars/tucson.png', import.meta.url).toString(),
};

function getCarImage(name: string | null | undefined) {
  const normalizedName = (name || '').toLowerCase();
  if (normalizedName.includes('elantra')) return CAR_IMAGES.elantra;
  if (normalizedName.includes('creta')) return CAR_IMAGES.creta;
  if (normalizedName.includes('sonata')) return CAR_IMAGES.sonata;
  if (normalizedName.includes('solaris')) return CAR_IMAGES.solaris;
  if (normalizedName.includes('tucson')) return CAR_IMAGES.tucson;
  return CAR_IMAGES.i30n;
}

export function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [draftFilters, setDraftFilters] = useState({ model: '', category: '', price: '', color: '' });
  const [appliedFilters, setAppliedFilters] = useState({ model: '', category: '', price: '', color: '' });
  const PAGE_SIZE = 10;

  useEffect(() => {
    setLoading(true);
    CARS_API.getAll({ limit: PAGE_SIZE, page })
      .then((d) => { setCars(d.data); setTotal(d.count ?? 0); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const paginationPages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1);
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
    const emptyFilters = { model: '', category: '', price: '', color: '' };
    setDraftFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  return (
    <div>
      <div className={styles.header}>
        <AdminPageTitle>Entities</AdminPageTitle>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.filters}>
          <select className={`${styles.filterSelect} ${!draftFilters.model ? styles.filterPlaceholder : ''}`} value={draftFilters.model} onChange={(e) => setDraftFilters((p) => ({ ...p, model: e.target.value }))}>
            <option value="">Автомобиль</option>
            {cars.map((car) => <option key={car.id} value={car.id}>{car.name}</option>)}
          </select>
          <select className={`${styles.filterSelect} ${!draftFilters.category ? styles.filterPlaceholder : ''}`} value={draftFilters.category} onChange={(e) => setDraftFilters((p) => ({ ...p, category: e.target.value }))}>
            <option value="">Тип</option>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
          <select className={`${styles.filterSelect} ${!draftFilters.price ? styles.filterPlaceholder : ''}`} value={draftFilters.price} onChange={(e) => setDraftFilters((p) => ({ ...p, price: e.target.value }))}>
            <option value="">Цена</option>
            <option value="with-price">С ценой</option>
            <option value="no-price">Без цены</option>
          </select>
          <select className={`${styles.filterSelect} ${!draftFilters.color ? styles.filterPlaceholder : ''}`} value={draftFilters.color} onChange={(e) => setDraftFilters((p) => ({ ...p, color: e.target.value }))}>
            <option value="">Цвет</option>
            {colors.map((color) => <option key={color} value={color}>{color}</option>)}
          </select>
          <button type="button" className={styles.resetBtn} onClick={resetFilters}>Сбросить</button>
          <button type="button" className={styles.applyBtn} onClick={() => setAppliedFilters(draftFilters)}>Применить</button>
        </div>

        <div className={styles.scrollArea}>
          {loading ? <Loader /> : filteredCars.length === 0 ? <p className={styles.empty}>Нет автомобилей</p> : (
            <table className={styles.table}>
              <thead><tr><th>Фото</th><th>Модель</th><th>Категория</th><th>Цена (мин/макс)</th><th>Цвета</th><th>Действия</th></tr></thead>
              <tbody>
                {filteredCars.map((car) => (
                  <tr key={car.id}>
                    <td><img className={styles.carThumb} src={getCarImage(car.name)} alt="" /></td>
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
          <button type="button" className={styles.pageBtn} onClick={() => setPage(1)}>«</button>
          {totalPages > 1 ? (
            paginationPages.map((p) => <button key={p} type="button" className={`${styles.pageBtn} ${p === page ? styles.pageBtnActive : ''}`} onClick={() => setPage(p)}>{p}</button>)
          ) : (
            <>
              <button type="button" className={styles.pageBtn}>1</button>
              <span className={styles.pageDots}>...</span>
              <button type="button" className={styles.pageBtn}>4</button>
              <button type="button" className={styles.pageBtnActive}>5</button>
              <button type="button" className={styles.pageBtn}>6</button>
              <span className={styles.pageDots}>...</span>
              <button type="button" className={styles.pageBtn}>31</button>
            </>
          )}
          <button type="button" className={styles.pageBtn} onClick={() => setPage(totalPages || 1)}>»</button>
        </div>
      </div>
    </div>
  );
}





