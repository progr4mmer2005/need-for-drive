import React from 'react';
import * as styles from './OrderDetails.module.scss';

interface IOrderItem {
  label: string;
  value?: string | null;
}

interface IOrderDetailsProps {
  items: IOrderItem[];
  priceText: string;
}

export function OrderDetails({ items, priceText }: IOrderDetailsProps) {
  return (
    <div className={styles.orderDetails}>
      <ul className={styles.list}>
        {items.map(
          (item) => item.value && (
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
