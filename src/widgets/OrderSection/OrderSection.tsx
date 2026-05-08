import { useCallback, useMemo, useState } from 'react';

import orderData from '@/shared/model/orderData.json';
import { BaseSection } from '@/widgets/BaseSection';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import { HorizontalContentContainer } from '@/shared/components/HorizontalContentContainer';
import { ORDER_DEFAULTS } from '@/config/orderDefaults';
import * as styles from './OrderSection.module.scss';
import { ConfirmModal, OrderSidebar } from './ui';
import { OrderStepRenderer } from './ui/OrderStepRenderer';
import {
  STEP_LABELS,
  Step,
  type TCity,
  type TSelectedCity,
  type TSelectedPickup,
  type TSelectedCar,
  type TSelectedRate,
} from './model/types';
import { formatPrice } from './model/formatPrice';
import { useOrderSubmit } from './model/useOrderSubmit';

type TOrderSectionProps = {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
};

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

const formatAvailableAt = (value: string) => {
  if (!value) {
    return 'Не выбрана';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year} 12:00`;
};

export function OrderSection({ isMenuOpen, onMenuToggle }: TOrderSectionProps) {
  const [orderState, setOrderState] = useState<TOrderState>({
    step: 1 as Step,
    cityInput: ORDER_DEFAULTS.CITY,
    pickupInput: '',
    selectedPickupId: null,
    selectedCategory: ORDER_DEFAULTS.CATEGORY,
    selectedCarId: null,
    selectedColor: ORDER_DEFAULTS.COLOR,
    dateFrom: '',
    dateTo: '',
    selectedRateId: ORDER_DEFAULTS.RATE_ID,
    selectedExtraIds: [...ORDER_DEFAULTS.EXTRAS],
    isConfirmOpen: false,
    orderId: '',
  });

  const { cities } = orderData;
  const cityOptions = cities.map((city) => city.name);

  const selectedCity = useMemo(
    () => cities.find(
      (city) => city.name.toLowerCase() === orderState.cityInput.trim().toLowerCase(),
    ) || null,
    [cities, orderState.cityInput],
  );

  const pickupOptions = selectedCity
    ? (selectedCity as TCity).pickupPoints.map((point) => point.name)
    : [];

  const selectedPickup = useMemo(() => {
    if (!selectedCity) {
      return null;
    }

    if (orderState.selectedPickupId) {
      return (
        (selectedCity as TCity).pickupPoints.find(
          (point) => point.id === orderState.selectedPickupId,
        ) || null
      );
    }

    return (
      (selectedCity as TCity).pickupPoints.find(
        (point) => point.name.toLowerCase() === orderState.pickupInput.trim().toLowerCase(),
      ) || null
    );
  }, [orderState.pickupInput, selectedCity, orderState.selectedPickupId]);

  const filteredCars = useMemo(() => {
    if (orderState.selectedCategory === 'Все модели') {
      return orderData.cars;
    }

    return orderData.cars.filter((car) => car.category === orderState.selectedCategory);
  }, [orderState.selectedCategory]);

  const selectedCar = orderData.cars.find((car) => car.id === orderState.selectedCarId) || null;
  const selectedRate = orderData.rentalRates.find((rate) => rate.id === orderState.selectedRateId) || null;
  const selectedExtras = orderData.extras.filter((extra) => orderState.selectedExtraIds.includes(extra.id));
  const availableAt = formatAvailableAt(orderState.dateFrom || orderState.dateTo);

  const canGoToStep2 = Boolean(selectedCity && selectedPickup);
  const canGoToStep3 = Boolean(selectedCar);
  const canGoToStep4 = Boolean(selectedCar && selectedRate);

  const minPrice = selectedCar?.priceMin || ORDER_DEFAULTS.MIN_PRICE;
  const maxPrice = selectedCar?.priceMax || ORDER_DEFAULTS.MAX_PRICE;

  const totalPrice = useMemo(() => {
    if (!selectedCar) {
      return `от ${formatPrice(minPrice)} до ${formatPrice(maxPrice)}`;
    }

    const extrasPrice = selectedExtras.reduce((acc, extra) => acc + extra.price, 0);
    const basePrice = selectedCar.priceMin;
    const ratePrice = selectedRate?.id === 'daily' ? selectedRate.price : 0;
    return formatPrice(basePrice + extrasPrice + ratePrice);
  }, [maxPrice, minPrice, selectedCar, selectedExtras, selectedRate]);

  const orderItems = [
    {
      label: 'Пункт выдачи',
      value: selectedPickup
        ? `${(selectedCity as TCity | null)?.name}, ${selectedPickup.name}`
        : null,
    },
    { label: 'Модель', value: selectedCar ? `${selectedCar.brand}, ${selectedCar.name}` : null },
    { label: 'Цвет', value: orderState.step >= 3 ? orderState.selectedColor : null },
    { label: 'Длительность аренды', value: orderState.step >= 3 ? '1д 2ч' : null },
    {
      label: 'Тариф',
      value:
        orderState.step >= 3 ? (selectedRate?.id === 'daily' ? 'На сутки' : 'Поминутно') : null,
    },
    {
      label: 'Полный бак',
      value:
        orderState.step >= 3
          ? orderState.selectedExtraIds.includes('fullTank')
            ? 'Да'
            : 'Нет'
          : null,
    },
  ];

  const isStepEnabled = (stepIndex: Step) => {
    if (stepIndex === 1) {
      return true;
    }
    if (stepIndex === 2) {
      return canGoToStep2;
    }
    if (stepIndex === 3) {
      return canGoToStep3;
    }
    return canGoToStep4;
  };

  const handleStepTransition = (nextStep: Step) => {
    if (isStepEnabled(nextStep)) {
      setOrderState((prev) => ({ ...prev, step: nextStep }));
    }
  };

  const resetAfterLocation = useCallback(() => {
    setOrderState((prev) => ({
      ...prev,
      selectedCarId: null,
      selectedCategory: ORDER_DEFAULTS.CATEGORY,
      selectedColor: ORDER_DEFAULTS.COLOR,
      selectedRateId: ORDER_DEFAULTS.RATE_ID,
      selectedExtraIds: [...ORDER_DEFAULTS.EXTRAS],
      step: 1 as Step,
    }));
  }, []);

  const handleCityChange = useCallback(
    (value: string) => {
      setOrderState((prev) => ({
        ...prev,
        cityInput: value,
        pickupInput: '',
        selectedPickupId: null,
      }));
      resetAfterLocation();
    },
    [resetAfterLocation],
  );

  const handlePickupChange = useCallback(
    (value: string) => {
      setOrderState((prev) => ({
        ...prev,
        pickupInput: value,
        selectedPickupId: null,
      }));
      resetAfterLocation();
    },
    [resetAfterLocation],
  );

  const handlePickupSelectFromMap = useCallback(
    (pickupId: string) => {
      setOrderState((prev) => {
        if (!selectedCity) {
          return prev;
        }

        const point = (selectedCity as TCity).pickupPoints.find((pickup) => pickup.id === pickupId);
        if (!point) {
          return prev;
        }

        return {
          ...prev,
          selectedPickupId: point.id,
          pickupInput: point.name,
          step: 1 as Step,
        };
      });
    },
    [selectedCity],
  );

  const handleCarSelect = useCallback((carId: string) => {
    setOrderState((prev) => ({
      ...prev,
      selectedCarId: carId,
      selectedColor: ORDER_DEFAULTS.COLOR,
      selectedRateId: ORDER_DEFAULTS.RATE_ID,
      selectedExtraIds: [...ORDER_DEFAULTS.EXTRAS],
      dateTo: '',
      step: 2 as Step,
    }));
  }, []);

  const handleExtraToggle = useCallback((extraId: string) => {
    setOrderState((prev) => ({
      ...prev,
      selectedExtraIds: prev.selectedExtraIds.includes(extraId)
        ? prev.selectedExtraIds.filter((item) => item !== extraId)
        : [...prev.selectedExtraIds, extraId],
    }));
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setOrderState((prev) => ({ ...prev, selectedCategory: category }));
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setOrderState((prev) => ({ ...prev, selectedColor: color }));
  }, []);

  const handleDateFromChange = useCallback((value: string) => {
    setOrderState((prev) => ({ ...prev, dateFrom: value }));
  }, []);

  const handleDateToChange = useCallback((value: string) => {
    setOrderState((prev) => ({ ...prev, dateTo: value }));
  }, []);

  const handleRateChange = useCallback((rateId: string) => {
    setOrderState((prev) => ({ ...prev, selectedRateId: rateId }));
  }, []);

  const { handleSubmitOrder } = useOrderSubmit(
    orderState,
    {
      selectedCity: selectedCity as TSelectedCity,
      selectedPickup: selectedPickup as TSelectedPickup,
      selectedCar: selectedCar as TSelectedCar,
      selectedRate: selectedRate as TSelectedRate,
      selectedColor: orderState.selectedColor,
      selectedExtraIds: orderState.selectedExtraIds,
      availableAt,
      totalPrice,
    },
    setOrderState,
  );

  return (
    <BaseSection isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle}>
      <div className={styles.orderContent}>
        <div className={styles.breadcrumbsContainer}>
          <HorizontalContentContainer>
            {orderState.step !== 5 && (
              <Breadcrumbs
                items={([1, 2, 3, 4] as Step[]).map((stepKey) => ({
                  key: stepKey,
                  label: STEP_LABELS[stepKey],
                  active: stepKey === orderState.step,
                  enabled: isStepEnabled(stepKey),
                }))}
                onStepClick={(nextStep) => handleStepTransition(nextStep as Step)}
              />
            )}

            {orderState.step === 5 && (
              <div className={styles.orderNumber}>Заказ номер {orderState.orderId}</div>
            )}
          </HorizontalContentContainer>
        </div>

        <div className={styles.split}>
          <section className={styles.leftPane}>
            <OrderStepRenderer
              step={orderState.step}
              cityInput={orderState.cityInput}
              pickupInput={orderState.pickupInput}
              cityOptions={cityOptions}
              pickupOptions={pickupOptions}
              selectedCity={selectedCity}
              selectedPickup={selectedPickup}
              selectedCarId={orderState.selectedCarId}
              selectedCategory={orderState.selectedCategory}
              selectedColor={orderState.selectedColor}
              dateFrom={orderState.dateFrom}
              dateTo={orderState.dateTo}
              selectedRateId={orderState.selectedRateId}
              selectedExtraIds={orderState.selectedExtraIds}
              filteredCars={filteredCars}
              selectedCar={selectedCar}
              availableAt={availableAt}
              onCityChange={handleCityChange}
              onPickupChange={handlePickupChange}
              onPickupSelectFromMap={handlePickupSelectFromMap}
              onCategoryChange={handleCategoryChange}
              onCarSelect={handleCarSelect}
              onColorChange={handleColorChange}
              onDateFromChange={handleDateFromChange}
              onDateToChange={handleDateToChange}
              onRateChange={handleRateChange}
              onExtraToggle={handleExtraToggle}
            />
          </section>

          <OrderSidebar
            step={orderState.step}
            items={orderItems}
            priceText={
              selectedCar ? totalPrice : `от ${formatPrice(minPrice)} до ${formatPrice(maxPrice)}`
            }
            canGoToStep2={canGoToStep2}
            canGoToStep3={canGoToStep3}
            onStepChange={handleStepTransition}
            onOpenConfirm={() => setOrderState((prev) => ({ ...prev, isConfirmOpen: true }))}
          />
        </div>
      </div>

      <ConfirmModal
        isOpen={orderState.isConfirmOpen}
        onConfirm={handleSubmitOrder}
        onCancel={() => setOrderState((prev) => ({ ...prev, isConfirmOpen: false }))}
      />
    </BaseSection>
  );
}
