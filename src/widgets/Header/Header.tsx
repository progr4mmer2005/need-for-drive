import { BurgerButton } from '@/shared/components/BurgerButton';
import { Logo } from '@/shared/components/Logo';
import { Waypoint } from '@/shared/components/Waypoint';
import { useNearestCity } from '@/shared/lib/useNearestCity';
import * as styles from './Header.module.scss';

type THeaderProps = {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
};

export function Header({ isMenuOpen, onMenuToggle }: THeaderProps) {
  const nearestCity = useNearestCity();

  return (
    <header className={styles.header}>
      <BurgerButton color="dark" isActive={isMenuOpen} mobileOnly onClick={onMenuToggle} />
      <Logo />
      <Waypoint city={nearestCity || '...'} />
    </header>
  );
}
