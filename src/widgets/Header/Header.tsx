import { BurgerButton } from '@/shared/components/BurgerButton';
import { Logo } from '@/shared/components/Logo';
import { Waypoint } from '@/shared/components/Waypoint';
import * as styles from './Header.module.scss';

type THeaderProps = {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
};

export function Header({ isMenuOpen, onMenuToggle }: THeaderProps) {
  return (
    <header className={styles.header}>
      <BurgerButton color="dark" isActive={isMenuOpen} mobileOnly onClick={onMenuToggle} />
      <Logo />
      <Waypoint city="Ульяновск" />
    </header>
  );
}
