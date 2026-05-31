import { useMemo, useEffect, type Dispatch, type SetStateAction } from 'react';
import { ORDER_DEFAULTS } from '../utils/orderDefaults';
import { useNearestLocation } from './useNearestLocation';
import { formatAvailableAt, formatDuration } from '../utils/dateUtils';
import { ORDER_TEXT } from '../utils/orderConstants';
import type { ApiOrderData } from './useApiOrderData';
import type { TOrderState } from './useOrderState';

function isDateRangeValidFn(dateFrom: string, dateTo: string): boolean {
  const from = new Date(dateFrom).getTime();
  const to = new Date(dateTo).getTime();
  return Number.isFinite(from) && Number.isFinite(to) && to > from;
}

function syncRateIfMissing(
  rentalRates: ApiOrderData['rentalRates'],
  selectedRateId: string,
  setOrderState: Dispatch<SetStateAction<TOrderState>>,
) {
  if (!rentalRates.length) return;
  const hasCurrentRate = rentalRates.some((rate) => rate.id === selectedRateId);
  if (!hasCurrentRate) {
    setOrderState((prev) => ({ ...prev, selectedRateId: rentalRates[0].id }));
  }
}

function syncColorIfMissing(
  selectedCarColors: string[] | undefined,
  selectedColor: string,
  setOrderState: Dispatch<SetStateAction<TOrderState>>,
) {
  if (!selectedCarColors?.length) return;
  if (selectedCarColors.includes(selectedColor)) return;
  setOrderState((prev) => ({ ...prev, selectedColor: selectedCarColors[0] }));
}

export function useOrderSelections(
  orderState: TOrderState,
  orderData: ApiOrderData | null,
  setOrderState: Dispatch<SetStateAction<TOrderState>>,
) {
  const cities = orderData?.cities || [];
  const cityOptions = cities.map((city) => city.name);
  const nearestLocation = useNearestLocation(cities);

  const categories = useMemo(
    () => [ORDER_DEFAULTS.CATEGORY, ...new Set((orderData?.cars || []).map((car) => car.category))],
    [orderData?.cars],
  );

  const selectedCity = useMemo(
    () => cities.find(
      (city) => city.name.toLowerCase() === orderState.cityInput.trim().toLowerCase(),
    ) ?? null,
    [cities, orderState.cityInput],
  );

  const pickupOptions = selectedCity ? selectedCity.pickupPoints.map((p) => p.name) : [];

  const selectedPickup = useMemo(() => {
    if (!selectedCity) return null;
    if (orderState.selectedPickupId) {
      return selectedCity.pickupPoints.find((p) => p.id === orderState.selectedPickupId) ?? null;
    }
    return selectedCity.pickupPoints.find(
      (p) => p.name.toLowerCase() === orderState.pickupInput.trim().toLowerCase(),
    ) ?? null;
  }, [orderState.pickupInput, selectedCity, orderState.selectedPickupId]);

  const filteredCars = useMemo(() => {
    if (orderState.selectedCategory === ORDER_DEFAULTS.CATEGORY) return orderData?.cars || [];
    return (orderData?.cars || []).filter((car) => car.category === orderState.selectedCategory);
  }, [orderData?.cars, orderState.selectedCategory]);

  const selectedCar = (orderData?.cars || []).find((car) => car.id === orderState.selectedCarId) ?? null;
  const selectedRate = (orderData?.rentalRates || []).find((rate) => rate.id === orderState.selectedRateId) ?? null;
  const selectedExtras = (orderData?.extras || []).filter((extra) => orderState.selectedExtraIds.includes(extra.id));

  const availableAt = formatAvailableAt(orderState.dateFrom || orderState.dateTo, ORDER_TEXT.notSelected);
  const durationLabel = formatDuration(orderState.dateFrom, orderState.dateTo, ORDER_TEXT.notSelected);

  useEffect(() => {
    syncRateIfMissing(orderData?.rentalRates ?? [], orderState.selectedRateId, setOrderState);
  }, [orderData?.rentalRates, orderState.selectedRateId, setOrderState]);

  useEffect(() => {
    syncColorIfMissing(selectedCar?.colors, orderState.selectedColor, setOrderState);
  }, [selectedCar, orderState.selectedColor, setOrderState]);

  const isLocationStepComplete = Boolean(selectedCity && selectedPickup);
  const isModelStepComplete = Boolean(isLocationStepComplete && selectedCar);
  const isDateRangeValid = isDateRangeValidFn(orderState.dateFrom, orderState.dateTo);
  const isExtrasStepComplete = Boolean(isModelStepComplete && selectedRate && orderState.selectedColor && isDateRangeValid);

  const globalMinPrice = useMemo(() => {
    const mins = (orderData?.cars || []).map((c) => c.priceMin).filter(Boolean);
    return mins.length ? Math.min(...mins) : ORDER_DEFAULTS.MIN_PRICE;
  }, [orderData?.cars]);

  const globalMaxPrice = useMemo(() => {
    const maxs = (orderData?.cars || []).map((c) => c.priceMax).filter(Boolean);
    return maxs.length ? Math.max(...maxs) : ORDER_DEFAULTS.MAX_PRICE;
  }, [orderData?.cars]);

  return {
    cities,
    cityOptions,
    nearestLocation,
    categories,
    selectedCity,
    pickupOptions,
    selectedPickup,
    filteredCars,
    selectedCar,
    selectedRate,
    selectedExtras,
    availableAt,
    durationLabel,
    isDateRangeValid,
    canGoToStep2: isLocationStepComplete,
    canGoToStep3: isModelStepComplete,
    canGoToStep4: isExtrasStepComplete,
    globalMinPrice,
    globalMaxPrice,
  };
}
