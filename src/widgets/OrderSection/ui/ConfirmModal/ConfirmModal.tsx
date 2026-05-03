import * as styles from './ConfirmModal.module.scss';

type ConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({ isOpen, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.title}>Подтвердить заказ</p>
        <div className={styles.modalActions}>
          <button className={styles.mainAction} type="button" onClick={onConfirm}>
            Подтвердить
          </button>
          <button className={styles.cancelAction} type="button" onClick={onCancel}>
            Вернуться
          </button>
        </div>
      </div>
    </div>
  );
}
