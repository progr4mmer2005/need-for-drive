import { useOutletContext } from 'react-router-dom';

import { HeroSection } from '../../widgets/HeroSection';
import { PromoSlider } from '../../widgets/PromoSlider';
import styles from './HomePage.module.scss';

type ContextType = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export function HomePage() {
  const { isMenuOpen, toggleMenu } = useOutletContext<ContextType>();

  return (
    <>
      <div className={styles.homePageContent}>
      <HeroSection
        isMenuOpen={isMenuOpen}
        onMenuToggle={toggleMenu}
      />
      <PromoSlider isDimmed={isMenuOpen} />
      </div>
    </>
  );
}