import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { SideMenu } from '@/widgets/SideMenu';
import { Sidebar } from '@/widgets/Sidebar';
import * as styles from './Layout.module.scss';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'Eng' | 'Рус'>('Eng');

  const toggleMenu = () => setIsMenuOpen((value) => !value);
  const toggleLanguage = () => setLanguage((value) => (value === 'Eng' ? 'Рус' : 'Eng'));

  return (
    <>
      <SideMenu
        activeItem=""
        isOpen={isMenuOpen}
        language={language}
        onClose={toggleMenu}
        onLanguageToggle={toggleLanguage}
      />

      <Sidebar
        isMenuOpen={isMenuOpen}
        language={language}
        onMenuToggle={toggleMenu}
        onLanguageToggle={toggleLanguage}
      />

      <main className={styles.layout}>
        <Outlet context={{ isMenuOpen, toggleMenu }} />
      </main>
    </>
  );
}
