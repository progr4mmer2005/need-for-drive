import type { Order } from '@/shared/api/types';
import { formatDate, formatPrice } from '@/shared/lib/adminFormatters';
import styles from '../OrdersPage.module.scss';

type TOrderCardProps = {
  order: Order;
  onComplete: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

export function OrderCard({ order, onComplete, onDelete, onEdit }: TOrderCardProps) {
  return (
    <div className={styles.orderCard}>
      <div className={styles.carImg}>
        {order.carId?.thumbnail?.path ? <img src={order.carId.thumbnail.path} alt="" /> : null}
      </div>

      <div className={styles.orderInfo}>
        <div className={styles.orderTitle}>
          <span>{order.carId?.name?.toUpperCase()}</span>
          <span className={styles.orderMuted}> в </span>
          <span>{order.cityId?.name}</span>
          <span className={styles.orderMuted}>, </span>
          <span className={styles.orderAddress}>{order.pointId?.address}</span>
        </div>
        <div className={styles.orderDates}>
          {formatDate(order.dateFrom)} – {formatDate(order.dateTo)}
        </div>
        <div className={styles.orderColor}>
          Цвет: <span>{order.color || '—'}</span>
        </div>
      </div>

      <div className={styles.orderExtras}>
        <span className={`${styles.checkbox} ${order.isFullTank ? styles.checkboxChecked : ''}`}>
          <span className={styles.checkboxBox}>{order.isFullTank ? '✓' : ''}</span>
          Полный бак
        </span>
        <span
          className={`${styles.checkbox} ${order.isNeedChildChair ? styles.checkboxChecked : ''}`}
        >
          <span className={styles.checkboxBox}>{order.isNeedChildChair ? '✓' : ''}</span>
          Детское кресло
        </span>
        <span className={`${styles.checkbox} ${order.isRightWheel ? styles.checkboxChecked : ''}`}>
          <span className={styles.checkboxBox}>{order.isRightWheel ? '✓' : ''}</span>
          Правый руль
        </span>
      </div>

      <div className={styles.orderPrice}>{formatPrice(order.price)}</div>

      <div className={styles.orderActions}>
        <button
          className={`${styles.actionBtn} ${styles.successBtn}`}
          type="button"
          onClick={onComplete}
        >
          ✓ Готово
        </button>
        <button
          className={`${styles.actionBtn} ${styles.dangerBtn}`}
          type="button"
          onClick={onDelete}
        >
          ✕ Отмена
        </button>
        <button className={`${styles.actionBtn} ${styles.editBtn}`} type="button" onClick={onEdit}>
          ⋮ Изменить
        </button>
      </div>
    </div>
  );
}
