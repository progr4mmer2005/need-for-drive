import { useMemo } from 'react';
import { formatPrice } from '../utils/formatPrice';
import { ORDER_TEXT } from '../utils/orderConstants';
import type { ApiOrderData } from './useApiOrderData';

type TCar = ApiOrderData['cars'][number];
type TRate = ApiOrderData['rentalRates'][number];
type TExtra = ApiOrderData['extras'][number];

type TUseOrderPriceParams = {
  selectedCar: TCar | null;
  selectedRate: TRate | null;
  selectedExtras: TExtra[];
  dateFrom: string;
  dateTo: string;
  step: number;
  globalMinPrice: number;
  globalMaxPrice: number;
  minPrice: number;
  maxPrice: number;
  rentalRates: TRate[];
  isDateRangeValid: boolean;
};

function calcRentPrice(rate: TRate, totalMinutes: number, totalDays: number): number {
  const unit = (rate.unit || '').toLowerCase();
  const isDaily = unit.includes('сут') || unit.includes('день') || unit.includes('day');
  return isDaily
    ? totalDays * Number(rate.price || 0)
    : totalMinutes * Number(rate.price || 0);
}

export function useOrderPrice({
  selectedCar,
  selectedRate,
  selectedExtras,
  dateFrom,
  dateTo,
  step,
  globalMinPrice,
  globalMaxPrice,
  minPrice,
  maxPrice,
  rentalRates,
  isDateRangeValid,
}: TUseOrderPriceParams) {
  const totalPrice = useMemo(() => {
    const extrasPrice = selectedExtras.reduce((acc, extra) => acc + extra.price, 0);

    if (!selectedCar || !selectedRate || !isDateRangeValid) {
      return `${ORDER_TEXT.from} ${formatPrice(minPrice + extrasPrice)} ${ORDER_TEXT.to} ${formatPrice(maxPrice + extrasPrice)}`;
    }

    const from = new Date(dateFrom).getTime();
    const to = new Date(dateTo).getTime();
    const totalMinutes = Math.max(1, Math.ceil((to - from) / (1000 * 60)));
    const totalDays = Math.max(1, Math.ceil(totalMinutes / (60 * 24)));
    const rentPrice = calcRentPrice(selectedRate, totalMinutes, totalDays);

    return formatPrice(rentPrice + extrasPrice);
  }, [minPrice, maxPrice, selectedCar, selectedRate, selectedExtras, isDateRangeValid, dateFrom, dateTo]);

  const rateRangePriceText = useMemo(() => {
    if (!selectedCar || !isDateRangeValid || !rentalRates.length) return null;

    const from = new Date(dateFrom).getTime();
    const to = new Date(dateTo).getTime();
    const totalMinutes = Math.max(1, Math.ceil((to - from) / (1000 * 60)));
    const totalDays = Math.max(1, Math.ceil(totalMinutes / (60 * 24)));
    const extrasPrice = selectedExtras.reduce((acc, extra) => acc + extra.price, 0);

    const prices = rentalRates.map((rate) => calcRentPrice(rate, totalMinutes, totalDays) + extrasPrice);
    const minP = Math.min(...prices);
    const maxP = Math.max(...prices);

    if (minP === maxP) return formatPrice(minP);
    return `${ORDER_TEXT.from} ${formatPrice(minP)} ${ORDER_TEXT.to} ${formatPrice(maxP)}`;
  }, [selectedCar, isDateRangeValid, rentalRates, dateFrom, dateTo, selectedExtras]);

  const sidebarPriceText = useMemo(() => {
    if (!selectedCar) {
      return `${ORDER_TEXT.from} ${formatPrice(globalMinPrice)} ${ORDER_TEXT.to} ${formatPrice(globalMaxPrice)}`;
    }
    if (step === 3 && rateRangePriceText) return rateRangePriceText;
    return totalPrice;
  }, [selectedCar, step, globalMinPrice, globalMaxPrice, rateRangePriceText, totalPrice]);

  return { totalPrice, sidebarPriceText };
}
