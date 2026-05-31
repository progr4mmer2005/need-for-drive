import { useEffect, useState } from 'react';
import type { User } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { Loader } from '@/shared/components/Loader';
import { buildPaginationPages } from '@/shared/lib/pagination';
import { calcTotalPages } from './lib/form/calcTotalPages';
import { initUsers } from './lib/handlers/initUsers';
import styles from './UsersPage.module.scss';

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    void initUsers(page, { setUsers, setTotal, setLoading });
  }, [page]);

  const totalPages = calcTotalPages(total);
  const paginationPages = buildPaginationPages(page, totalPages);

  return (
    <div>
      <div className={styles.header}>
        <AdminPageTitle>Пользователи</AdminPageTitle>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.scrollArea}>
          {loading ? <Loader /> : users.length === 0 ? (
            <p className={styles.empty}>Нет пользователей</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Имя пользователя</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>
                      <a className={styles.editBtn} href={`#/admin/users/${user.id}`}>Изменить</a>
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
