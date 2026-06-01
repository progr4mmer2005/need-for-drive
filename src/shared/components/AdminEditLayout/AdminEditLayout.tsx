import { useNavigate } from 'react-router-dom';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { AdminToast } from '@/shared/components/AdminToast';
import { Loader } from '@/shared/components/Loader';
import type { TAdminEditLayoutProps } from './types';
import styles from './AdminEditLayout.module.scss';

export function AdminEditLayout({
  title,
  cardTitle,
  isNew,
  loading,
  saving,
  cancelPath,
  onSave,
  onDelete,
  toast,
  onCloseToast,
  children,
}: TAdminEditLayoutProps) {
  const navigate = useNavigate();

  if (loading) return <Loader />;

  return (
    <div>
      <AdminToast toast={toast} onClose={onCloseToast} />

      <AdminPageTitle>{title}</AdminPageTitle>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{cardTitle}</h2>

        {children}

        <div className={styles.bottomActions}>
          <div className={styles.leftActions}>
            <button type="button" className={styles.saveBtn} disabled={saving} onClick={onSave}>
              Сохранить
            </button>
            <button type="button" className={styles.cancelBtn} onClick={() => navigate(cancelPath)}>
              Отменить
            </button>
          </div>
          {!isNew && (
            <button type="button" className={styles.deleteBtn} disabled={saving} onClick={onDelete}>
              Удалить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
