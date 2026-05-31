import { useEffect, useState } from 'react';
import type { Point } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { Loader } from '@/shared/components/Loader';
import { buildPaginationPages } from '@/shared/lib/pagination';
import { calcTotalPages } from './lib/form/calcTotalPages';
import { initPoints } from './lib/handlers/initPoints';
import styles from './PointsPage.module.scss';

export function PointsPage() {
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    void initPoints(page, { setPoints, setTotal, setLoading });
  }, [page]);

  const totalPages = calcTotalPages(total);
  const paginationPages = buildPaginationPages(page, totalPages);

  return (
    <div>
      <div className={styles.header}>
        <AdminPageTitle>Пункты выдачи</AdminPageTitle>
        <a className={styles.addBtn} href="#/admin/points/new">+ Добавить</a>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.scrollArea}>
          {loading ? <Loader /> : points.length === 0 ? (
            <p className={styles.empty}>Нет пунктов выдачи</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Название</th>
                  <th>Адрес</th>
                  <th>Город</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {points.map((point) => (
                  <tr key={point.id}>
                    <td>{point.id}</td>
                    <td>{point.name}</td>
                    <td>{point.address}</td>
                    <td>{point.cityId?.name || '—'}</td>
                    <td>
                      <a className={styles.editBtn} href={`#/admin/points/${point.id}`}>Изменить</a>
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
