import { useState } from 'react';


import { SideMenu } from '../../widgets/SideMenu';
import { Sidebar } from '../../widgets/Sidebar';
import * as styles from './OrderPage.module.scss';
import { OrderSection } from '../../widgets/OrderSection/OrderSection';
import { useOutletContext } from 'react-router-dom';

export function OrderPage() {
  type ContextType = {
    isMenuOpen: boolean;
    toggleMenu: () => void;
  };
  
  const { isMenuOpen, toggleMenu } = useOutletContext<ContextType>();

  return (
    <>
      <OrderSection
      isMenuOpen={isMenuOpen}
        onMenuToggle={toggleMenu}>

      </OrderSection>
    </>
  );
}
