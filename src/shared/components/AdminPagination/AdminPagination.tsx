import { buildPaginationPages } from '@/shared/lib/pagination';
import styles from './AdminPagination.module.scss';

type TAdminPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function AdminPagination({ page, totalPages, onPageChange }: TAdminPaginationProps) {
  const pages = buildPaginationPages(page, totalPages);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.pageBtn}
        disabled={page === 1}
        onClick={() => onPageChange(1)}
      >
        «
      </button>

      {pages.map((pageItem, index) => {
        if (pageItem === '...') {
          return (
            <span key={`dots-${index}`} className={styles.pageDots}>
              ...
            </span>
          );
        }
        return (
          <button
            key={pageItem}
            type="button"
            className={pageItem === page ? styles.pageBtnActive : styles.pageBtn}
            onClick={() => onPageChange(pageItem as number)}
          >
            {pageItem}
          </button>
        );
      })}

      <button
        type="button"
        className={styles.pageBtn}
        disabled={page === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        »
      </button>
    </div>
  );
}
