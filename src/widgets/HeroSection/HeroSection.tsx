import { Button } from '../../shared/components/Button';
import { BaseSection } from '../BaseSection';
import * as styles from './HeroSection.module.scss';
import { Link } from 'react-router-dom';

type HeroSectionProps = {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
};

export function HeroSection({ isMenuOpen, onMenuToggle }: HeroSectionProps) {
  return (
    <BaseSection isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle}>
      <div className={styles.heroContent}>

        <div className={styles['promo-container']}>
          <div className={styles.container}>
            <div className={styles.promo}>
              <h1 className={styles.title}>
                <span className={styles.titleBlack}>Каршеринг</span>
                <br />
                Need for drive
              </h1>

              <p className={styles.subtitle}>
                Поминутная аренда авто твоего города
              </p>

              
            </div>
          </div>

          <div className={styles['promo-button-container']}>
            <Link to="/order">
              <Button fullWidthOnMobile size="hero" squareOnMobile>
                Забронировать
              </Button>
            </Link>
          </div>

        </div>

        

        <footer className={styles.footer}>
          <div className={styles.container}>
            <p className={styles.copyright}>
              © 2016-2019 «Need for drive»
            </p>

            <a className={styles.phone} href="tel:84952342244">
              8 (495) 234-22-44
            </a>
          </div>
        </footer>

      </div>
    </BaseSection>
  );
}