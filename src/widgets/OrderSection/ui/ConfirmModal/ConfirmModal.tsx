import { useEffect } from 'react';
import { Button } from '@/shared/components/Button';
import * as styles from './ConfirmModal.module.scss';

type TConfirmModalProps = {
  isOpen: boolean;
  title?: string;
  confirmText?: string;
  backText?: string;
  confirmTone?: 'green' | 'red';
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  isOpen,
  title = 'Подтвердить заказ',
  confirmText = 'Подтвердить',
  backText = 'Вернуться',
  confirmTone = 'green',
  onConfirm,
  onCancel,
}: TConfirmModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.title}>{title}</p>
        <div className={styles.modalActions}>
          <Button
            tone={confirmTone === 'red' ? 'darkRed' : 'primary'}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
          <Button
            tone={confirmTone === 'red' ? 'primary' : 'darkRed'}
            onClick={onCancel}
          >
            {backText}
          </Button>
        </div>
      </div>
    </div>
  );
}
