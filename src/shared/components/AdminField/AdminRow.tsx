import type { ReactNode } from 'react';
import styles from './AdminRow.module.scss';

type TAdminRowProps = {
  children: ReactNode;
};

export function AdminRow({ children }: TAdminRowProps) {
  return <div className={styles.row}>{children}</div>;
}
