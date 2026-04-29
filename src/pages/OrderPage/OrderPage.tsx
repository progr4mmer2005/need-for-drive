import { useState } from 'react';


import { SideMenu } from '../../widgets/SideMenu';
import { Sidebar } from '../../widgets/Sidebar';
import * as styles from './OrderPage.module.scss';

export function OrderPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'Eng' | 'Рус'>('Eng');

  const toggleMenu = () => setIsMenuOpen((value) => !value);
  const toggleLanguage = () => setLanguage((value) => (value === 'Eng' ? 'Рус' : 'Eng'));

  return (
    <>
      
    </>
  );
}
