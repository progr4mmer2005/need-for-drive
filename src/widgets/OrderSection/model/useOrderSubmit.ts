import { useCallback, Dispatch, SetStateAction } from 'react';
import {
  ORDER_STORAGE_KEY,
  Step,
  type TCompletedOrder,
  type TSelectedCity,
  type TSelectedPickup,
  type TSelectedCar,
  type TSelectedRate,
} from './types';
import { ORDERS_API } from '@/shared/api/ordersApi';

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
  selectedCity: TSelectedCity;
  selectedPickup: TSelectedPickup;
  selectedCar: TSelectedCar;
  selectedRate: TSelectedRate;
  selectedColor: string;
  selectedExtraIds: string[];
  availableAt: string;
  totalPrice: string;
  durationLabel: string;
};

function extractId(prefixed: string | undefined | null): number | null {
  if (!prefixed) return null;
  const m = String(prefixed).match(/(\d+)$/);
  return m ? Number(m[1]) : null;
}

function priceToNumber(price: string): number {
  const n = parseInt(String(price).replace(/[^\d]/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}

export function useOrderSubmit(
  orderState: TOrderState,
  deps: TOrderSubmitDeps,
  setOrderState: Dispatch<SetStateAction<TOrderState>>,
) {
  const {
    selectedCity,
    selectedPickup,
    selectedCar,
    selectedRate,
    selectedColor,
    selectedExtraIds,
    availableAt,
    totalPrice,
    durationLabel,
  } = deps;

  const handleSubmitOrder = useCallback(async () => {
    if (!selectedCity || !selectedPickup || !selectedCar) {
      return;
    }

    let orderId = `RUS${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const cityId = extractId((selectedCity as { id?: string }).id);
    const pointId = extractId((selectedPickup as { id?: string }).id);
    const carId = extractId((selectedCar as { id?: string }).id);
    const rateBackendId =
      (selectedRate as unknown as { backendId?: number })?.backendId ?? null;

    if (cityId && pointId && carId) {
      try {
        const dto = {
          cityId: { id: cityId },
          pointId: { id: pointId },
          carId: { id: carId },
          rateId: rateBackendId ? { id: rateBackendId } : { id: 1 },
          color: selectedColor || 'Любой',
          dateFrom: orderState.dateFrom ? new Date(orderState.dateFrom).getTime() : Date.now(),
          dateTo: orderState.dateTo
            ? new Date(orderState.dateTo).getTime()
            : Date.now() + 86400000,
          price: priceToNumber(totalPrice),
          isFullTank: selectedExtraIds.includes('fullTank'),
          isNeedChildChair: selectedExtraIds.includes('childChair'),
          isRightWheel: selectedExtraIds.includes('rightWheel'),
        };
        const res = await ORDERS_API.create(dto);
        if (res?.data?.id) {
          orderId = `RU${res.data.id}`;
        }
      } catch (e) {
        console.warn('Order POST failed, using local id', e);
      }
    }

    setOrderState((prev) => ({ ...prev, orderId }));

    const completedOrder: TCompletedOrder = {
      orderId,
      city: selectedCity.name,
      pickupPoint: selectedPickup.name,
      carName: `${selectedCar.brand}, ${selectedCar.name}`,
      carImage: selectedCar.image,
      color: selectedColor,
      duration: durationLabel,
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
  }, [
    selectedCity,
    selectedPickup,
    selectedCar,
    selectedRate,
    selectedColor,
    selectedExtraIds,
    availableAt,
    totalPrice,
    durationLabel,
    setOrderState,
    orderState.dateFrom,
    orderState.dateTo,
  ]);

  return { handleSubmitOrder };
}

