import { Button } from '@/shared/components/Button';
import { HorizontalContentContainer } from '@/shared/components/HorizontalContentContainer';
import { BaseSection } from '@/widgets/BaseSection';
import { Link } from 'react-router-dom';
import * as styles from './HeroSection.module.scss';

type THeroSectionProps = {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
};

export function HeroSection({ isMenuOpen, onMenuToggle }: THeroSectionProps) {
  return (
    <BaseSection isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle}>
      <div className={styles.heroContent}>
            <div className={styles.promoContainer}>
          <HorizontalContentContainer>
            <div className={styles.promo}>
              <h1 className={styles.title}>
                <span className={styles.titleBlack}>Каршеринг</span>
                <br />
                Need for drive
              </h1>

              <p className={styles.subtitle}>Поминутная аренда авто твоего города</p>
            </div>
          </HorizontalContentContainer>

          <div className={styles.promoButtonContainer}>
            <Link className={styles.bookLink} to="/order">
              <Button fullWidthOnMobile size="hero" squareOnMobile>
                Забронировать
              </Button>
            </Link>
          </div>
        </div>

        <footer className={styles.footer}>
          <HorizontalContentContainer>
            <div className={styles.footerInner}>
              <p className={styles.copyright}>© 2016-2019 «Need for drive»</p>

              <a className={styles.phone} href="tel:84952342244">
                8 (495) 234-22-44
              </a>
            </div>
          </HorizontalContentContainer>
        </footer>
      </div>
    </BaseSection>
  );
}
