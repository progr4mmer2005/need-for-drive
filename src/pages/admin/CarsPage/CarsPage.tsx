import { useEffect, useState } from 'react';
import type { Car } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { AdminPagination } from '@/shared/components/AdminPagination';
import { Loader } from '@/shared/components/Loader';
import { CarFilters } from './ui/CarFilters';
import { CarsTable } from './ui/CarsTable';
import type { TFilters } from './types';
import { DEFAULT_FILTERS } from './constants';
import { calcTotalPages } from './lib/form/calcTotalPages';
import { filterCars } from './lib/form/filterCars';
import { getCategories } from './lib/form/getCategories';
import { getColors } from './lib/form/getColors';
import { initCars } from './lib/handlers/initCars';
import { handleFilterChange } from './lib/handlers/handleFilterChange';
import { handleApplyFilters } from './lib/handlers/handleApplyFilters';
import { handleResetFilters } from './lib/handlers/handleResetFilters';
import styles from './CarsPage.module.scss';

export function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [draftFilters, setDraftFilters] = useState<TFilters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<TFilters>(DEFAULT_FILTERS);

  useEffect(() => {
    void initCars(page, { setCars, setTotal, setLoading });
  }, [page]);

  const totalPages = calcTotalPages(total);
  const filteredCars = filterCars(cars, appliedFilters);
  const categories = getCategories(cars);
  const colors = getColors(cars);

  return (
    <div>
      <div className={styles.header}>
        <AdminPageTitle>Список авто</AdminPageTitle>
      </div>

      <div className={styles.tableWrap}>
        <CarFilters
          filters={draftFilters}
          cars={cars}
          categories={categories}
          colors={colors}
          onFilterChange={(key, value) => handleFilterChange(key, value, setDraftFilters)}
          onApply={() => handleApplyFilters(draftFilters, { setPage, setAppliedFilters })}
          onReset={() => handleResetFilters({ setDraftFilters, setAppliedFilters })}
        />

        <div className={styles.scrollArea}>
          {loading ? <Loader /> : <CarsTable cars={filteredCars} />}
        </div>

        <AdminPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
