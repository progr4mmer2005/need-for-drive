import { useCallback, type Dispatch, type SetStateAction, type MutableRefObject } from 'react';
import type { TOrderState } from './useOrderState';
import type { TCity } from '../types';

type THandlersParams = {
  setOrderState: Dispatch<SetStateAction<TOrderState>>;
  resetAfterLocationChange: (prev: TOrderState) => TOrderState;
  resetAfterModelChange: (prev: TOrderState) => TOrderState;
  selectedCity: TCity | null;
  userHasInteracted: MutableRefObject<boolean>;
};

export function useOrderHandlers({
  setOrderState,
  resetAfterLocationChange,
  resetAfterModelChange,
  selectedCity,
  userHasInteracted,
}: THandlersParams) {
  const handleCityChange = useCallback(
    (value: string) => {
      // eslint-disable-next-line no-param-reassign
      userHasInteracted.current = true;
      setOrderState((prev) =>
        resetAfterLocationChange({
          ...prev,
          cityInput: value,
          pickupInput: '',
          selectedPickupId: null,
        })
      );
    },
    [setOrderState, resetAfterLocationChange, userHasInteracted]
  );

  const handlePickupChange = useCallback(
    (value: string) => {
      // eslint-disable-next-line no-param-reassign
      userHasInteracted.current = true;
      setOrderState((prev) =>
        resetAfterLocationChange({
          ...prev,
          pickupInput: value,
          selectedPickupId: null,
        })
      );
    },
    [setOrderState, resetAfterLocationChange, userHasInteracted]
  );

  const handlePickupSelectFromMap = useCallback(
    (pickupId: string) => {
      setOrderState((prev) => {
        if (!selectedCity) return prev;
        const point = selectedCity.pickupPoints.find((p) => p.id === pickupId);
        if (!point) return prev;
        return {
          ...resetAfterLocationChange(prev),
          selectedPickupId: point.id,
          pickupInput: point.name,
        };
      });
    },
    [setOrderState, resetAfterLocationChange, selectedCity]
  );

  const handleCarSelect = useCallback(
    (carId: string) => {
      setOrderState((prev) => resetAfterModelChange({ ...prev, selectedCarId: carId }));
    },
    [setOrderState, resetAfterModelChange]
  );

  const handleExtraToggle = useCallback(
    (extraId: string) => {
      setOrderState((prev) => ({
        ...prev,
        selectedExtraIds: prev.selectedExtraIds.includes(extraId)
          ? prev.selectedExtraIds.filter((item) => item !== extraId)
          : [...prev.selectedExtraIds, extraId],
      }));
    },
    [setOrderState]
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      setOrderState((prev) =>
        prev.selectedCategory === category ? prev : { ...prev, selectedCategory: category }
      );
    },
    [setOrderState]
  );

  const handleColorChange = useCallback(
    (color: string) => {
      setOrderState((prev) => ({ ...prev, selectedColor: color }));
    },
    [setOrderState]
  );

  const handleDateFromChange = useCallback(
    (value: string) => {
      setOrderState((prev) => ({ ...prev, dateFrom: value }));
    },
    [setOrderState]
  );

  const handleDateToChange = useCallback(
    (value: string) => {
      setOrderState((prev) => ({ ...prev, dateTo: value }));
    },
    [setOrderState]
  );

  const handleRateChange = useCallback(
    (rateId: string) => {
      setOrderState((prev) => ({ ...prev, selectedRateId: rateId }));
    },
    [setOrderState]
  );

  return {
    handleCityChange,
    handlePickupChange,
    handlePickupSelectFromMap,
    handleCarSelect,
    handleExtraToggle,
    handleCategoryChange,
    handleColorChange,
    handleDateFromChange,
    handleDateToChange,
    handleRateChange,
  };
}
