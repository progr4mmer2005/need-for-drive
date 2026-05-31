import { useEffect, useState } from 'react';
import type { OrderStatus } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { Loader } from '@/shared/components/Loader';
import { buildPaginationPages } from '@/shared/lib/pagination';
import { calcTotalPages } from './lib/form/calcTotalPages';
import { getPageStatuses } from './lib/form/getPageStatuses';
import { initOrderStatuses } from './lib/handlers/initOrderStatuses';
import styles from './OrderStatusesPage.module.scss';

export function OrderStatusesPage() {
  const [statuses, setStatuses] = useState<OrderStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    void initOrderStatuses({ setStatuses, setLoading });
  }, []);

  const totalPages = calcTotalPages(statuses.length);
  const paginationPages = buildPaginationPages(page, totalPages);
  const pageStatuses = getPageStatuses(statuses, page);

  return (
    <div>
      <div className={styles.header}>
        <AdminPageTitle>Статусы заказов</AdminPageTitle>
        <a className={styles.addBtn} href="#/admin/order-statuses/new">+ Добавить</a>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.scrollArea}>
          {loading ? <Loader /> : pageStatuses.length === 0 ? (
            <p className={styles.empty}>Нет статусов</p>
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
                {pageStatuses.map((status) => (
                  <tr key={status.id}>
                    <td>{status.id}</td>
                    <td>{status.name}</td>
                    <td>
                      <a className={styles.editBtn} href={`#/admin/order-statuses/${status.id}`}>Изменить</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className={styles.pagination}>
          <button type="button" className={styles.pageBtn} disabled={page === 1} onClick={() => setPage(1)}>«</button>
          {paginationPages.map((pageItem, idx) => {
            if (pageItem === '...') return <span key={`dots-${idx}`} className={styles.pageDots}>...</span>;
            return (
              <button
                key={pageItem}
                type="button"
                className={pageItem === page ? styles.pageBtnActive : styles.pageBtn}
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
