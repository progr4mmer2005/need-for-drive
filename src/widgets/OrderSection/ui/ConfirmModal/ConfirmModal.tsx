import * as styles from './ConfirmModal.module.scss';

type TConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const TEXT = {
  title: 'Подтвердить заказ',
  confirm: 'Подтвердить',
  back: 'Вернуться',
};

export function ConfirmModal({ isOpen, onConfirm, onCancel }: TConfirmModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.title}>{TEXT.title}</p>
        <div className={styles.modalActions}>
          <button className={styles.mainAction} type="button" onClick={onConfirm}>
            {TEXT.confirm}
          </button>
          <button className={styles.cancelAction} type="button" onClick={onCancel}>
            {TEXT.back}
          </button>
        </div>
      </div>
    </div>
  );
}
