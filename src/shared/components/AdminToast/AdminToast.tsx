import type { TAdminToast } from '@/shared/lib/useAdminToast';
import styles from './AdminToast.module.scss';

type TAdminToastProps = {
  toast: TAdminToast | null;
  onClose: () => void;
};

export function AdminToast({ toast, onClose }: TAdminToastProps) {
  if (!toast) return null;

  return (
    <div
      className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}
    >
      <span>{toast.message}</span>
      <button
        type="button"
        className={styles.toastClose}
        onClick={onClose}
        aria-label="Закрыть уведомление"
      >
        <span className={styles.toastCloseIcon} />
      </button>
    </div>
  );
}
