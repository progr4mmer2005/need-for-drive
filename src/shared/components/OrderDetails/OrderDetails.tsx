import React from 'react';
import * as styles from './OrderDetails.module.scss';

interface OrderItem {
  label: string;
  value: string | null | undefined;
}

interface OrderDetailsProps {
  items: OrderItem[];
  priceMin?: number;
  priceMax?: number;
}

export function OrderDetails({ items, priceMin, priceMax }: OrderDetailsProps) {
  return (
    <div className={styles.orderDetails}>
      <ul className={styles.list}>
        {items.map((item, index) => (
          item.value && (
            <li key={index} className={styles.item}>
              <span className={styles.label}>{item.label}</span>
              <div className={styles.dots} />
              <span className={styles.value}>{item.value}</span>
            </li>
          )
        ))}
      </ul>

      {(priceMin || priceMax) && (
        <div className={styles.price}>
          <span className={styles.priceLabel}>Цена: </span>
          <span className={styles.priceValue}>
            {priceMin && `от ${priceMin.toLocaleString()} `}
            {priceMax && `до ${priceMax.toLocaleString()} `}
            ₽
          </span>
        </div>
      )}
    </div>
  );
}