import { useEffect, useState } from 'react';
import type { City } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { Loader } from '@/shared/components/Loader';
import { buildPaginationPages } from '@/shared/lib/pagination';
import { calcTotalPages } from './lib/form/calcTotalPages';
import { getPageCities } from './lib/form/getPageCities';
import { initCities } from './lib/handlers/initCities';
import styles from './CitiesPage.module.scss';

export function CitiesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    void initCities({ setCities, setLoading });
  }, []);

  const totalPages = calcTotalPages(cities.length);
  const paginationPages = buildPaginationPages(page, totalPages);
  const pageCities = getPageCities(cities, page);

  return (
    <div>
      <div className={styles.header}>
        <AdminPageTitle>Города</AdminPageTitle>
        <a className={styles.addBtn} href="#/admin/cities/new">+ Добавить</a>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.scrollArea}>
          {loading ? <Loader /> : pageCities.length === 0 ? (
            <p className={styles.empty}>Нет городов</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Название</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {pageCities.map((city) => (
                  <tr key={city.id}>
                    <td>{city.id}</td>
                    <td>{city.name}</td>
                    <td>
                      <a className={styles.editBtn} href={`#/admin/cities/${city.id}`}>Изменить</a>
                    </td>
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
