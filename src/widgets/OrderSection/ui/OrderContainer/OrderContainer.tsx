import { ReactNode } from 'react';
import * as styles from './OrderContainer.module.scss';

type TOrderContainerProps = {
  children: ReactNode;
};

export function OrderContainer({ children }: TOrderContainerProps) {
  return <div className={styles.container}>{children}</div>;
}
