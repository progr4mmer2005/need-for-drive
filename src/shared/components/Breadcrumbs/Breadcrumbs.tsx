import React from 'react';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbItem {
  label: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className={`${styles.breadcrumbs__item} ${item.active ? styles.active : ''}`}>
            {item.label}
          </span>
          {index < items.length - 1 && (
            <span className={styles.breadcrumbs__separator}>▶</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};