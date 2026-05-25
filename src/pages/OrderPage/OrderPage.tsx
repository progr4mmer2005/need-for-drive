import { useMemo } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import { OrderSection } from '@/widgets/OrderSection/OrderSection';

import orderData from '@/shared/model/orderData.json';
import { ORDER_STORAGE_KEY } from '@/widgets/OrderSection/model/types';

type TContextType = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

type TStoredOrder = {
  orderId: string;
  city: string;
  pickupPoint: string;
  carName: string;
  color: string;
  duration: string;
  rate: string;
  fullTank: string;
  totalPrice: string;
  availableAt: string;
};

export function OrderPage() {
  const { isMenuOpen, toggleMenu } = useOutletContext<TContextType>();
  const { orderId } = useParams();

  const storedOrder = useMemo(() => {
    if (!orderId) return null;
    try {
      const raw = localStorage.getItem(ORDER_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as TStoredOrder;
      return parsed.orderId === orderId ? parsed : null;
    } catch {
      return null;
    }
  }, [orderId]);

  if (!orderId || !storedOrder) {
    return <OrderSection isMenuOpen={isMenuOpen} onMenuToggle={toggleMenu} />;
  }

  const car = orderData.cars.find(
    (carModel) => `${carModel.brand}, ${carModel.name}` === storedOrder.carName,
  ) ?? orderData.cars[0];

  const orderItems = [
    { label: 'Пункт выдачи', value: `${storedOrder.city}, ${storedOrder.pickupPoint}` },
    { label: 'Модель', value: storedOrder.carName },
    { label: 'Цвет', value: storedOrder.color },
    { label: 'Длительность аренды', value: storedOrder.duration },
    { label: 'Тариф', value: storedOrder.rate },
    { label: 'Полный бак', value: storedOrder.fullTank },
  ];
}
