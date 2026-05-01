import React from 'react';
import * as styles from './OrderDetails.module.scss';

interface OrderItem {
  label: string;
  value: string | null | undefined;
}

interface OrderDetailsProps {
  items: OrderItem[];
  priceText: string;
}

export function OrderDetails({ items, priceText }: OrderDetailsProps) {
  return (
    <div className={styles.orderDetails}>
      <ul className={styles.list}>
        {items.map(
          (item) =>
            item.value && (
              <li key={item.label} className={styles.item}>
                <span className={styles.label}>{item.label}</span>
                <div className={styles.dots} />
                <span className={styles.value}>{item.value}</span>
              </li>
            ),
        )}
      </ul>

      <div className={styles.price}>
        <span className={styles.priceLabel}>Цена: </span>
        <span className={styles.priceValue}>{priceText}</span>
      </div>
    </div>
  );
}
