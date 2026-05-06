import React from 'react';
import * as styles from './Breadcrumbs.module.scss';

export interface IBreadcrumbItem {
  key: number;
  label: string;
  active?: boolean;
  enabled?: boolean;
}

interface IBreadcrumbsProps {
  items: IBreadcrumbItem[];
  onStepClick?: (step: number) => void;
}

export const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({ items, onStepClick }) => (
    <div className={styles.breadcrumbs}>
      {items.map((item, index) => {
        const isClickable = Boolean(item.enabled && onStepClick);

        return (
          <React.Fragment key={item.key}>
            <button
              className={`${styles.item} ${item.active ? styles.active : ''} ${!item.enabled ? styles.disabled : ''}`}
              disabled={!isClickable}
              type="button"
              onClick={() => onStepClick?.(item.key)}
            >
              {item.label}
            </button>
            {index < items.length - 1 && <span className={styles.separator}>▶</span>}
          </React.Fragment>
        );
      })}
    </div>
);
