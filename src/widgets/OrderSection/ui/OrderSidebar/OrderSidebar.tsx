import { memo } from 'react';
import { Button } from '@/shared/components/Button';
import { OrderDetails } from '@/shared/components/OrderDetails';
import { Step } from '@/widgets/OrderSection/model/types';
import * as styles from './OrderSidebar.module.scss';

type TOrderSidebarProps = {
  step: Step;
  items: Array<{ label: string; value: string | null }>;
  priceText: string;
  canGoToStep2: boolean;
  canGoToStep3: boolean;
  onStepChange: (step: Step) => void;
  onOpenConfirm: () => void;
};

export const OrderSidebar = memo(function OrderSidebar({
  step,
  items,
  priceText,
  canGoToStep2,
  canGoToStep3,
  onStepChange,
  onOpenConfirm,
}: TOrderSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.box}>
        <h3 className={styles.title}>Ваш заказ:</h3>
        <OrderDetails items={items} priceText={priceText} />
          <div className={styles.buttonContainer}>

            {step === 1 && (
              <Button size='full' disabled={!canGoToStep2} onClick={() => onStepChange(2)}>
                Выбрать модель
              </Button>
            )}

            {step === 2 && (
              <Button size='full' disabled={!canGoToStep3} type="button" onClick={() => onStepChange(3)}>
                Дополнительно
              </Button>
            )}

            {step === 3 && (
              <Button size='full' onClick={() => onStepChange(4)}>
                Итого
              </Button>
            )}

            {step === 4 && (
              <Button size='full' onClick={onOpenConfirm}>
                Заказать
              </Button>
            )}

            {step === 5 && (
              <Button size='full' tone='darkRed'>
                Отменить
              </Button>
            )

            }
        </div>
      </div>
    </aside>
  );
});
