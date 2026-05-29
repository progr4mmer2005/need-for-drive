import { useOutletContext } from 'react-router-dom';
import { OrderSection } from '@/widgets/OrderSection/OrderSection';

type TContextType = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export function OrderPage() {
  const { isMenuOpen, toggleMenu } = useOutletContext<TContextType>();
  return <OrderSection isMenuOpen={isMenuOpen} onMenuToggle={toggleMenu} />;
}
