import type { ReactNode } from 'react';
import styles from './AdminPageTitle.module.scss';

interface AdminPageTitleProps {
  children: ReactNode;
}

export function AdminPageTitle({ children }: AdminPageTitleProps) {
  return <h1 className={styles.title}>{children}</h1>;
}
