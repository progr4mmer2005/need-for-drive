import styles from './AdminToast.module.scss';

type TAdminToastProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

export function AdminToast({ message, type, onClose }: TAdminToastProps) {
  return (
    <div className={`${styles.toast} ${type === 'success' ? styles.toastSuccess : styles.toastError}`}>
      <span>{message}</span>
      <button type="button" className={styles.toastClose} onClick={onClose}>×</button>
    </div>
  );
}
