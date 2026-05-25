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

const RU = String.fromCharCode;
const TEXT = {
  yourOrder: RU(1042, 1072, 1096, 32, 1079, 1072, 1082, 1072, 1079, 58),
  chooseModel: RU(1042, 1099, 1073, 1088, 1072, 1090, 1100, 32, 1084, 1086, 1076, 1077, 1083, 1100),
  additionally: RU(1044, 1086, 1087, 1086, 1083, 1085, 1080, 1090, 1077, 1083, 1100, 1085, 1086),
  total: RU(1048, 1090, 1086, 1075, 1086),
  order: RU(1047, 1072, 1082, 1072, 1079, 1072, 1090, 1100),
  cancel: RU(1054, 1090, 1084, 1077, 1085, 1080, 1090, 1100),
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
        <h3 className={styles.title}>{TEXT.yourOrder}</h3>
        <OrderDetails items={items} priceText={priceText} />
        <div className={styles.buttonContainer}>
          {step === 1 && (
            <Button size="full" disabled={!canGoToStep2} onClick={() => onStepChange(2)}>
              {TEXT.chooseModel}
            </Button>
          )}

          {step === 2 && (
            <Button size="full" disabled={!canGoToStep3} type="button" onClick={() => onStepChange(3)}>
              {TEXT.additionally}
            </Button>
          )}

          {step === 3 && (
            <Button size="full" onClick={() => onStepChange(4)}>
              {TEXT.total}
            </Button>
          )}

          {step === 4 && (
            <Button size="full" onClick={onOpenConfirm}>
              {TEXT.order}
            </Button>
          )}

          {step === 5 && (
            <Button size="full" tone="darkRed">
              {TEXT.cancel}
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
});


