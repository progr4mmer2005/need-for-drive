import { useEffect, useState } from 'react';
import type { Category } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { Loader } from '@/shared/components/Loader';
import { buildPaginationPages } from '@/shared/lib/pagination';
import { calcTotalPages } from './lib/form/calcTotalPages';
import { getPageCategories } from './lib/form/getPageCategories';
import { initCategories } from './lib/handlers/initCategories';
import styles from './CategoriesPage.module.scss';

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    void initCategories({ setCategories, setLoading });
  }, []);

  const totalPages = calcTotalPages(categories.length);
  const paginationPages = buildPaginationPages(page, totalPages);
  const pageCategories = getPageCategories(categories, page);

  return (
    <div>
      <div className={styles.header}>
        <AdminPageTitle>Категории автомобилей</AdminPageTitle>
        <a className={styles.addBtn} href="#/admin/categories/new">+ Добавить</a>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.scrollArea}>
          {loading ? <Loader /> : pageCategories.length === 0 ? (
            <p className={styles.empty}>Нет категорий</p>
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
                {pageCategories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                      <a className={styles.editBtn} href={`#/admin/categories/${category.id}`}>Изменить</a>
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
