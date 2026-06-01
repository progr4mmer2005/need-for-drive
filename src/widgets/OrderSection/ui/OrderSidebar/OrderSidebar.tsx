import { memo } from 'react';
import { Button } from '@/shared/components/Button';
import { OrderDetails } from '@/shared/components/OrderDetails';
import { OrderContainer } from '@/widgets/OrderSection/ui/OrderContainer';
import { Step } from '@/widgets/OrderSection/model/types';
import * as styles from './OrderSidebar.module.scss';

type TOrderSidebarProps = {
  step: Step;
  items: Array<{ label: string; value: string | null }>;
  priceText: string;
  canGoToStep2: boolean;
  canGoToStep3: boolean;
  canGoToStep4: boolean;
  onStepChange: (step: Step) => void;
  onOpenConfirm: () => void;
  onOpenCancelConfirm: () => void;
};

const TEXT = {
  yourOrder: 'Ваш заказ:',
  chooseModel: 'Выбрать модель',
  additionally: 'Дополнительно',
  total: 'Итого',
  order: 'Заказать',
  cancel: 'Отменить',
};

export const OrderSidebar = memo(
  ({
    step,
    items,
    priceText,
    canGoToStep2,
    canGoToStep3,
    canGoToStep4,
    onStepChange,
    onOpenConfirm,
    onOpenCancelConfirm,
  }: TOrderSidebarProps) => (
    <aside className={styles.sidebar}>
      <OrderContainer>
        <div className={styles.box}>
          <h3 className={styles.title}>{TEXT.yourOrder}</h3>
          <OrderDetails items={items} priceText={priceText} />
          <div className={styles.buttonContainer}>
            {step === 1 && (
              <Button size="full" disabled={!canGoToStep2} onClick={() => onStepChange(2)}>
                {TEXT.chooseModel}
              </Button>
            )}

            {step === 2 && (
              <Button
                size="full"
                disabled={!canGoToStep3}
                type="button"
                onClick={() => onStepChange(3)}
              >
                {TEXT.additionally}
              </Button>
            )}

            {step === 3 && (
              <Button size="full" disabled={!canGoToStep4} onClick={() => onStepChange(4)}>
                {TEXT.total}
              </Button>
            )}

            {step === 4 && (
              <Button size="full" onClick={onOpenConfirm}>
                {TEXT.order}
              </Button>
            )}

            {step === 5 && (
              <Button size="full" tone="darkRed" onClick={onOpenCancelConfirm}>
                {TEXT.cancel}
              </Button>
            )}
          </div>
        </div>
      </OrderContainer>
    </aside>
  )
);

OrderSidebar.displayName = 'OrderSidebar';
