import { useState, useCallback } from 'react';
import { ORDER_DEFAULTS } from '../utils/orderDefaults';
import { getDefaultDateRange } from '../utils/dateUtils';
import type { Step } from '../types';

export type TOrderState = {
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
  isCancelConfirmOpen: boolean;
  orderId: string;
  backendOrderId: number | null;
};

export function useOrderState() {
  const [defaultRange] = useState(getDefaultDateRange);

  const [orderState, setOrderState] = useState<TOrderState>(() => ({
    step: 1 as Step,
    cityInput: ORDER_DEFAULTS.CITY,
    pickupInput: '',
    selectedPickupId: null,
    selectedCategory: ORDER_DEFAULTS.CATEGORY,
    selectedCarId: null,
    selectedColor: ORDER_DEFAULTS.COLOR,
    dateFrom: defaultRange.from,
    dateTo: defaultRange.to,
    selectedRateId: ORDER_DEFAULTS.RATE_ID,
    selectedExtraIds: [...ORDER_DEFAULTS.EXTRAS],
    isConfirmOpen: false,
    isCancelConfirmOpen: false,
    orderId: '',
    backendOrderId: null,
  }));

  const resetAfterLocationChange = useCallback(
    (prev: TOrderState): TOrderState => ({
      ...prev,
      selectedCategory: ORDER_DEFAULTS.CATEGORY,
      selectedCarId: null,
      selectedColor: ORDER_DEFAULTS.COLOR,
      dateFrom: defaultRange.from,
      dateTo: defaultRange.to,
      selectedRateId: ORDER_DEFAULTS.RATE_ID,
      selectedExtraIds: [...ORDER_DEFAULTS.EXTRAS],
      step: 1 as Step,
    }),
    [defaultRange]
  );

  const resetAfterModelChange = useCallback(
    (prev: TOrderState): TOrderState => ({
      ...prev,
      selectedColor: ORDER_DEFAULTS.COLOR,
      dateFrom: defaultRange.from,
      dateTo: defaultRange.to,
      selectedRateId: ORDER_DEFAULTS.RATE_ID,
      selectedExtraIds: [...ORDER_DEFAULTS.EXTRAS],
      step: 2 as Step,
    }),
    [defaultRange]
  );

  return {
    orderState,
    setOrderState,
    resetAfterLocationChange,
    resetAfterModelChange,
  };
}
