import { useCallback } from 'react';
import { ORDER_STORAGE_KEY, Step, type TCompletedOrder } from './types';
import { formatPrice } from './formatPrice';

type TOrderState = {
  step: Step;
  cityInput: string;
  pickupInput: string;
  selectedPickupId: string | null;
  selectedCategory: string;
  selectedCarId: string | null;
  selectedColor: string;
  dateFrom: string;
  dateTo: string;
  selectedRateId: string;
  selectedExtraIds: string[];
  isConfirmOpen: boolean;
  orderId: string;
};

type TOrderSubmitDeps = {
  selectedCity: { name: string } | null;
  selectedPickup: { name: string; id: string } | null;
  selectedCar: { id: string; brand: string; name: string; image?: string; priceMin: number } | null;
  selectedRate: { id: string; price: number } | null;
  selectedColor: string;
  selectedExtraIds: string[];
  availableAt: string;
  totalPrice: string;
};

export function useOrderSubmit(
  orderState: TOrderState,
  deps: TOrderSubmitDeps,
  setOrderState: React.Dispatch<React.SetStateAction<TOrderState>>,
) {
  const { selectedCity, selectedPickup, selectedCar, selectedRate, selectedColor, selectedExtraIds, availableAt, totalPrice } = deps;

  const handleSubmitOrder = useCallback(() => {
    if (!selectedCity || !selectedPickup || !selectedCar) {
      return;
    }

    const orderId = `RUS${Date.now()}${Math.floor(Math.random() * 1000)}`;

    setOrderState((prev) => ({ ...prev, orderId }));

    const completedOrder: TCompletedOrder = {
      orderId,
      city: selectedCity.name,
      pickupPoint: selectedPickup.name,
      carName: `${selectedCar.brand}, ${selectedCar.name}`,
      carImage: selectedCar.image,
      color: selectedColor,
      duration: '1д 2ч',
      rate: selectedRate?.id === 'daily' ? 'На сутки' : 'Поминутно',
      fullTank: selectedExtraIds.includes('fullTank') ? 'Да' : 'Нет',
      totalPrice,
      availableAt,
    };

    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(completedOrder));

    setOrderState((prev) => ({
      ...prev,
      isConfirmOpen: false,
      step: 5 as Step,
      orderId,
    }));
  }, [selectedCity, selectedPickup, selectedCar, selectedRate, selectedColor, selectedExtraIds, availableAt, totalPrice, setOrderState]);

  return { handleSubmitOrder };
}