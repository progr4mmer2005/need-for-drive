import { useMemo, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import { OrderSection } from '../../widgets/OrderSection/OrderSection';
import { BaseSection } from '../../widgets/BaseSection';
import { HorizontalContentContainer } from '../../shared/components/HorizontalContentContainer';
import { OrderDetails } from '../../shared/components/OrderDetails';
import * as styles from './OrderPage.module.scss';

type ContextType = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

type StoredOrder = {
  orderId: string;
  city: string;
  pickupPoint: string;
  carName: string;
  carImage?: string;
  color: string;
  duration: string;
  rate: string;
  fullTank: string;
  totalPrice: string;
  availableAt: string;
};

const orderStorageKey = 'need-for-drive-order';

export function OrderPage() {
  const { isMenuOpen, toggleMenu } = useOutletContext<ContextType>();
  const { orderId } = useParams();
  const [hasImageError, setHasImageError] = useState(false);

  const storedOrder = useMemo(() => {
    if (!orderId) {
      return null;
    }

    try {
      const raw = localStorage.getItem(orderStorageKey);
      if (!raw) {
        return null;
      }

      const parsed = JSON.parse(raw) as StoredOrder;
      return parsed.orderId === orderId ? parsed : null;
    } catch {
      return null;
    }
  }, [orderId]);

  if (!orderId || !storedOrder) {
    return <OrderSection isMenuOpen={isMenuOpen} onMenuToggle={toggleMenu} />;
  }

  return (
    <BaseSection isMenuOpen={isMenuOpen} onMenuToggle={toggleMenu}>
      <div className={styles.successHeader}>
        <HorizontalContentContainer>
          <div className={styles.successOrderNumber}>Заказ номер {storedOrder.orderId}</div>
        </HorizontalContentContainer>
      </div>

      <div className={styles.successSplit}>
        <section className={styles.successMain}>
          <HorizontalContentContainer>
            <h1 className={styles.successTitle}>Ваш заказ подтверждён</h1>
            <p className={styles.successCar}>{storedOrder.carName}</p>
            <div className={styles.successPlate}>К 761 НА 73</div>
            <div className={styles.successLine}>
              <b>Топливо</b> 100%
            </div>
            <div className={styles.successLine}>
              <b>Доступна с</b> {storedOrder.availableAt}
            </div>
            <div className={styles.successCarMock}>
              {storedOrder.carImage && !hasImageError ? (
                <img
                  className={styles.successImage}
                  src={storedOrder.carImage}
                  alt={storedOrder.carName}
                  onError={() => setHasImageError(true)}
                />
              ) : null}
            </div>
          </HorizontalContentContainer>
        </section>

        <aside className={styles.successAside}>
          <h3 className={styles.successAsideTitle}>Ваш заказ:</h3>
          <OrderDetails
            items={[
              { label: 'Пункт выдачи', value: `${storedOrder.city}, ${storedOrder.pickupPoint}` },
              { label: 'Модель', value: storedOrder.carName },
              { label: 'Цвет', value: storedOrder.color },
              { label: 'Длительность аренды', value: storedOrder.duration },
              { label: 'Тариф', value: storedOrder.rate },
              { label: 'Полный бак', value: storedOrder.fullTank },
            ]}
            priceText={storedOrder.totalPrice}
          />
          <button className={styles.cancelButton} type="button">
            Отменить
          </button>
        </aside>
      </div>
    </BaseSection>
  );
}
