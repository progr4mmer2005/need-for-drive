import { useOutletContext } from 'react-router-dom';

import { HeroSection } from '../../widgets/HeroSection';
import { PromoSlider } from '../../widgets/PromoSlider';

type ContextType = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export function HomePage() {
  const { isMenuOpen, toggleMenu } = useOutletContext<ContextType>();

  return (
    <>
      <HeroSection
        isMenuOpen={isMenuOpen}
        onMenuToggle={toggleMenu}
      />
      <PromoSlider isDimmed={isMenuOpen} />
    </>
  );
}