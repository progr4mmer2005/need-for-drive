import { BurgerButton } from '@/shared/components/BurgerButton';
import { LanguageToggle } from '@/shared/components/LanguageToggle';
import * as styles from './Sidebar.module.scss';

type TSidebarProps = {
  isMenuOpen: boolean;
  language: string;
  onMenuToggle: () => void;
  onLanguageToggle: () => void;
};

export function Sidebar({
  isMenuOpen, language, onMenuToggle, onLanguageToggle,
}: TSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <BurgerButton isActive={isMenuOpen} onClick={onMenuToggle} />
      <LanguageToggle label={language} onClick={onLanguageToggle} />
    </aside>
  );
}
