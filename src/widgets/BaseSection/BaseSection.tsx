import { ReactNode } from 'react';
import { Header } from '../Header';
import * as styles from './BaseSection.module.scss';

type BaseSectionProps = {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  children: ReactNode;
};

export function BaseSection({
  isMenuOpen,
  onMenuToggle,
  children,
}: BaseSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.headerContainer}>
        <Header isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle} />
      </div>

      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
}