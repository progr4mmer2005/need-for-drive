import * as styles from './ConfirmModal.module.scss';

type TConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ru = String.fromCharCode;
const TEXT = {
  title: ru(1055, 1086, 1076, 1090, 1074, 1077, 1088, 1076, 1080, 1090, 1100, 32, 1079, 1072, 1082, 1072, 1079),
  confirm: ru(1055, 1086, 1076, 1090, 1074, 1077, 1088, 1076, 1080, 1090, 1100),
  back: ru(1042, 1077, 1088, 1085, 1091, 1090, 1100, 1089, 1103),
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
