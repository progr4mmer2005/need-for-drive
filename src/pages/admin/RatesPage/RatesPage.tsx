import { useEffect, useState } from 'react';
import type { Rate } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { Loader } from '@/shared/components/Loader';
import { buildPaginationPages } from '@/shared/lib/pagination';
import { calcTotalPages } from './lib/form/calcTotalPages';
import { getPageRates } from './lib/form/getPageRates';
import { initRates } from './lib/handlers/initRates';
import styles from './RatesPage.module.scss';

export function RatesPage() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    void initRates({ setRates, setLoading });
  }, []);

  const totalPages = calcTotalPages(rates.length);
  const paginationPages = buildPaginationPages(page, totalPages);
  const pageItems = getPageRates(rates, page);

  return (
    <div>
      <div className={styles.header}>
        <AdminPageTitle>Тарифы</AdminPageTitle>
        <a className={styles.addBtn} href="#/admin/rates/new">+ Добавить</a>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.scrollArea}>
          {loading ? <Loader /> : pageItems.length === 0 ? (
            <p className={styles.empty}>Нет тарифов</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Тип</th>
                  <th>Цена</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((rate) => (
                  <tr key={rate.id}>
                    <td>{rate.id}</td>
                    <td>{rate.rateTypeId?.name || '—'} ({rate.rateTypeId?.unit || '—'})</td>
                    <td>{rate.price.toLocaleString('ru-RU')} ₽</td>
                    <td>
                      <a className={styles.editBtn} href={`#/admin/rates/${rate.id}`}>Изменить</a>
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
