import { OrderDetails } from '../../../../shared/components/OrderDetails';
import { Step } from '../../model/types';
import * as styles from './OrderSidebar.module.scss';

type OrderSidebarProps = {
  step: Step;
  items: Array<{ label: string; value: string | null }>;
  priceText: string;
  canGoToStep2: boolean;
  canGoToStep3: boolean;
  onStepChange: (step: Step) => void;
  onOpenConfirm: () => void;
};

export function OrderSidebar({
  step,
  items,
  priceText,
  canGoToStep2,
  canGoToStep3,
  onStepChange,
  onOpenConfirm,
}: OrderSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.box}>
        <h3 className={styles.title}>Ваш заказ:</h3>
        <OrderDetails items={items} priceText={priceText} />

        {step === 1 && (
          <button className={styles.mainAction} disabled={!canGoToStep2} type="button" onClick={() => onStepChange(2)}>
            Выбрать модель
          </button>
        )}

        {step === 2 && (
          <button className={styles.mainAction} disabled={!canGoToStep3} type="button" onClick={() => onStepChange(3)}>
            Дополнительно
          </button>
        )}

        {step === 3 && (
          <button className={styles.mainAction} type="button" onClick={() => onStepChange(4)}>
            Итого
          </button>
        )}

        {step === 4 && (
          <button className={styles.mainAction} type="button" onClick={onOpenConfirm}>
            Заказать
          </button>
        )}
      </div>
    </aside>
  );
}
