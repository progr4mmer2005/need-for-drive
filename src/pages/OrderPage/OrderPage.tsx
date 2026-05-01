import { useEffect, useMemo, useState } from 'react';
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
const getCarImageCandidates = (source: string) => {
  if (!source) {
    return [];
  }

  const fileName = source.split('/').filter(Boolean).pop();
  if (!fileName) {
    return [source];
  }

  const routeDepth = window.location.pathname.split('/').filter(Boolean).length;
  const relativePrefix = routeDepth > 0 ? '../'.repeat(routeDepth) : '';
  const absolutePath = `/uploads/cars/${fileName}`;
  const relativePath = `${relativePrefix}uploads/cars/${fileName}`;

  return [absolutePath, relativePath];
};

export function OrderPage() {
  const { isMenuOpen, toggleMenu } = useOutletContext<ContextType>();
  const { orderId } = useParams();
  const [hasImageError, setHasImageError] = useState(false);
  const [candidateIndex, setCandidateIndex] = useState(0);

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

  const [imageSource, setImageSource] = useState('');
  const imageCandidates = getCarImageCandidates(imageSource);
  const imageSrc = imageCandidates[candidateIndex] || '';

  useEffect(() => {
    setImageSource(storedOrder?.carImage || '');
    setCandidateIndex(0);
    setHasImageError(false);
  }, [storedOrder?.carImage]);

  const handleImageError = () => {
    if (candidateIndex < imageCandidates.length - 1) {
      setCandidateIndex((current) => current + 1);
      return;
    }
    setHasImageError(true);
  };

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
              {imageSrc && !hasImageError ? (
                <img
                  className={styles.successImage}
                  src={imageSrc}
                  alt={storedOrder.carName}
                  onError={handleImageError}
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
