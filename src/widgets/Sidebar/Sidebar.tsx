import { BurgerButton } from '@/shared/components/BurgerButton';
import { LanguageToggle } from '@/shared/components/LanguageToggle';
import * as styles from './Sidebar.module.scss';

type SidebarProps = {
  isMenuOpen: boolean;
  language: string;
  onMenuToggle: () => void;
  onLanguageToggle: () => void;
};

export function Sidebar({
  isMenuOpen, language, onMenuToggle, onLanguageToggle,
}: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <BurgerButton isActive={isMenuOpen} onClick={onMenuToggle} />
      <LanguageToggle label={language} onClick={onLanguageToggle} />
    </aside>
  );
}
