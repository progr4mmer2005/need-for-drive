import { ReactNode } from 'react';
import { Header } from '@/widgets/Header';
import { HorizontalContentContainer } from '@/shared/components/HorizontalContentContainer';
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
        <HorizontalContentContainer>
          <Header isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle} />
        </HorizontalContentContainer>
      </div>

      <div className={styles.content}>{children}</div>
    </section>
  );
}
