import { Suspense, lazy } from 'react';
import { useOutletContext } from 'react-router-dom';

import { HeroSection } from '@/widgets/HeroSection';
import { Loader } from '@/shared/components/Loader';
import * as styles from './HomePage.module.scss';

const PromoSlider = lazy(() => import('@/widgets/PromoSlider').then((m) => ({ default: m.PromoSlider })));

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
      <Suspense fallback={<Loader />}>
        <PromoSlider isDimmed={isMenuOpen} />
      </Suspense>
      </div>
    </>
  );
}
