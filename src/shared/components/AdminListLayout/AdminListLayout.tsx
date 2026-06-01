import { Link } from 'react-router-dom';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { AdminPagination } from '@/shared/components/AdminPagination';
import { Loader } from '@/shared/components/Loader';
import type { TAdminListLayoutProps, TCx } from './types';
import styles from './AdminListLayout.module.scss';

export function AdminListLayout<T>({
  title,
  addLink,
  loading,
  items,
  emptyText,
  columns,
  renderRow,
  page,
  totalPages,
  onPageChange,
}: TAdminListLayoutProps<T>) {
  const cx: TCx = { editLink: styles.editLink };

  return (
    <div>
      <AdminPageTitle>{title}</AdminPageTitle>

      <div className={styles.tableWrap}>
        {addLink && (
          <div className={styles.addRow}>
            <Link className={styles.addBtn} to={addLink}>Добавить</Link>
          </div>
        )}
        <div className={styles.scrollArea}>
          {loading ? (
            <Loader />
          ) : items.length === 0 ? (
            <p className={styles.empty}>{emptyText}</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  {columns.map((col, i) => <th key={i}>{col}</th>)}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => renderRow(item, cx))}
              </tbody>
            </table>
          )}
        </div>

        <AdminPagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
