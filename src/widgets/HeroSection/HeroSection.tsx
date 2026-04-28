import { BurgerButton } from '../../shared/components/BurgerButton';
import { Button } from '../../shared/components/Button';
import { Logo } from '../../shared/components/Logo';
import { Waypoint } from '../../shared/components/Waypoint';
import * as styles from './HeroSection.module.scss';

type HeroSectionProps = {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
};

export function HeroSection({ isMenuOpen, onMenuToggle }: HeroSectionProps) {
  return (
    <section className={styles.hero}>
      <header className={styles.header}>
        <BurgerButton color="dark" isActive={isMenuOpen} mobileOnly onClick={onMenuToggle} />
        <Logo />
        <Waypoint city="Ульяновск" />
      </header>

      <div className={styles.promo}>
        <h1 className={styles.title}>
          <span className={styles.titleBlack}>Каршеринг</span>
          <br />
          Need for drive
        </h1>

        <p className={styles.subtitle}>Поминутная аренда авто твоего города</p>

        <Button fullWidthOnMobile size="hero">
          Забронировать
        </Button>
      </div>

      <footer className={styles.footer}>
        <p className={styles.copyright}>© 2016-2019 «Need for drive»</p>
        <a className={styles.phone} href="tel:84952342244">
          8 (495) 234-22-44
        </a>
      </footer>
    </section>
  );
}
