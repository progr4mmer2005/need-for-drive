import { useEffect, useState } from 'react';
import type { RateType } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { Loader } from '@/shared/components/Loader';
import { buildPaginationPages } from '@/shared/lib/pagination';
import { calcTotalPages } from './lib/form/calcTotalPages';
import { getPageRateTypes } from './lib/form/getPageRateTypes';
import { initRateTypes } from './lib/handlers/initRateTypes';
import styles from './RateTypesPage.module.scss';

export function RateTypesPage() {
  const [rateTypes, setRateTypes] = useState<RateType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    void initRateTypes({ setRateTypes, setLoading });
  }, []);

  const totalPages = calcTotalPages(rateTypes.length);
  const paginationPages = buildPaginationPages(page, totalPages);
  const pageItems = getPageRateTypes(rateTypes, page);

  return (
    <div>
      <div className={styles.header}>
        <AdminPageTitle>Типы тарифов</AdminPageTitle>
        <a className={styles.addBtn} href="#/admin/rate-types/new">+ Добавить</a>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.scrollArea}>
          {loading ? <Loader /> : pageItems.length === 0 ? (
            <p className={styles.empty}>Нет типов тарифов</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Название</th>
                  <th>Единица</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((rateType) => (
                  <tr key={rateType.id}>
                    <td>{rateType.id}</td>
                    <td>{rateType.name}</td>
                    <td>{rateType.unit}</td>
                    <td>
                      <a className={styles.editBtn} href={`#/admin/rate-types/${rateType.id}`}>Изменить</a>
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
            if (pageItem === '...') return <span key={`dots-${pageIndex}`} className={styles.pageDots}>...</span>;
            const isActive = pageItem === page;
            return (
              <button key={pageItem} type="button" className={isActive ? styles.pageBtnActive : styles.pageBtn} onClick={() => setPage(pageItem)}>
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
