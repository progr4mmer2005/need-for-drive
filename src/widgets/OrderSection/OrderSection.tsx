import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BaseSection } from '@/widgets/BaseSection';
import { Loader } from '@/shared/components/Loader';
import { useApiOrderData } from './model/useApiOrderData';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import { HorizontalContentContainer } from '@/shared/components/HorizontalContentContainer';
import { ORDER_DEFAULTS } from '@/config/orderDefaults';
import * as styles from './OrderSection.module.scss';
import { ConfirmModal, OrderSidebar } from './ui';
import { OrderStepRenderer } from './ui/OrderStepRenderer';
import {
  ROUTE_SEGMENT_TO_STEP,
  STEP_ROUTE_SEGMENTS,
  STEP_LABELS,
  Step,
  type TOrderFlowStep,
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

const TEXT = {
  notSelected: 'Не выбрана',
  from: 'от',
  to: 'до',
  pickupPoint: 'Пункт выдачи',
  model: 'Модель',
  color: 'Цвет',
  duration: 'Длительность аренды',
  rate: 'Тариф',
  fullTank: 'Полный бак',
  dayRate: 'На сутки',
  minuteRate: 'Поминутно',
  yes: 'Да',
  no: 'Нет',
  orderNumber: 'Заказ номер',
};

function toLocalDateTimeValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function getDefaultDateRange() {
  const from = new Date();
  from.setSeconds(0, 0);
  const to = new Date(from);
  to.setDate(to.getDate() + 1);
  return {
    from: toLocalDateTimeValue(from),
    to: toLocalDateTimeValue(to),
  };
}

function formatAvailableAt(value: string) {
  if (!value) {
    return TEXT.notSelected;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function formatDuration(dateFrom: string, dateTo: string) {
  if (!dateFrom || !dateTo) {
    return TEXT.notSelected;
  }

  const from = new Date(dateFrom).getTime();
  const to = new Date(dateTo).getTime();
  if (!Number.isFinite(from) || !Number.isFinite(to) || to <= from) {
    return TEXT.notSelected;
  }

  const totalMinutes = Math.floor((to - from) / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  return `${days}д ${hours}ч ${minutes}м`;
}

export function OrderSection({ isMenuOpen, onMenuToggle }: TOrderSectionProps) {
  const navigate = useNavigate();
  const { stepSlug } = useParams<{ stepSlug?: string }>();
  const defaultRange = getDefaultDateRange();

  const [orderState, setOrderState] = useState<TOrderState>({
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
    orderId: '',
  });

  const replaceOrderRouteStep = useCallback((step: TOrderFlowStep) => {
    const nextPath = `/order/${STEP_ROUTE_SEGMENTS[step]}`;
    navigate(nextPath, { replace: true });
  }, [navigate]);

  const { data: orderData, loading: apiLoading, error: apiError } = useApiOrderData();

  const categories = useMemo(
    () => [ORDER_DEFAULTS.CATEGORY, ...new Set((orderData?.cars || []).map((car) => car.category))],
    [orderData?.cars],
  );

  const cities = orderData?.cities || [];
  const cityOptions = cities.map((city) => city.name);

  const selectedCity = useMemo(
    () => cities.find(
      (city) => city.name.toLowerCase() === orderState.cityInput.trim().toLowerCase(),
    ) || null,
    [cities, orderState.cityInput],
  );

  const pickupOptions = selectedCity ? selectedCity.pickupPoints.map((point) => point.name) : [];

  const selectedPickup = useMemo(() => {
    if (!selectedCity) return null;
    if (orderState.selectedPickupId) {
      return selectedCity.pickupPoints.find((point) => point.id === orderState.selectedPickupId) || null;
    }
    return selectedCity.pickupPoints.find(
      (point) => point.name.toLowerCase() === orderState.pickupInput.trim().toLowerCase(),
    ) || null;
  }, [orderState.pickupInput, selectedCity, orderState.selectedPickupId]);

  const filteredCars = useMemo(() => {
    if (orderState.selectedCategory === ORDER_DEFAULTS.CATEGORY) {
      return orderData?.cars || [];
    }
    return (orderData?.cars || []).filter((car) => car.category === orderState.selectedCategory);
  }, [orderData?.cars, orderState.selectedCategory]);

  const selectedCar = (orderData?.cars || []).find((car) => car.id === orderState.selectedCarId) || null;
  const selectedRate = (orderData?.rentalRates || []).find((rate) => rate.id === orderState.selectedRateId) || null;
  const selectedExtras = (orderData?.extras || []).filter((extra) => orderState.selectedExtraIds.includes(extra.id));
  const availableAt = formatAvailableAt(orderState.dateFrom || orderState.dateTo);
  const durationLabel = formatDuration(orderState.dateFrom, orderState.dateTo);

  useEffect(() => {
    if (!orderData?.rentalRates.length) return;
    const hasCurrentRate = orderData.rentalRates.some((rate) => rate.id === orderState.selectedRateId);
    if (!hasCurrentRate) {
      setOrderState((prev) => ({ ...prev, selectedRateId: orderData.rentalRates[0].id }));
    }
  }, [orderData?.rentalRates, orderState.selectedRateId]);

  useEffect(() => {
    if (!selectedCar?.colors?.length) return;
    if (selectedCar.colors.includes(orderState.selectedColor)) return;
    setOrderState((prev) => ({ ...prev, selectedColor: selectedCar.colors[0] }));
  }, [selectedCar, orderState.selectedColor]);

  const isLocationStepComplete = Boolean(selectedCity && selectedPickup);
  const isModelStepComplete = Boolean(isLocationStepComplete && selectedCar);
  const isDateRangeValid = useMemo(() => {
    const from = new Date(orderState.dateFrom).getTime();
    const to = new Date(orderState.dateTo).getTime();
    return Number.isFinite(from) && Number.isFinite(to) && to > from;
  }, [orderState.dateFrom, orderState.dateTo]);
  const isExtrasStepComplete = Boolean(
    isModelStepComplete
    && selectedRate
    && orderState.selectedColor
    && isDateRangeValid,
  );

  const canGoToStep2 = isLocationStepComplete;
  const canGoToStep3 = isModelStepComplete;
  const canGoToStep4 = isExtrasStepComplete;

  const minPrice = selectedCar?.priceMin || ORDER_DEFAULTS.MIN_PRICE;
  const maxPrice = selectedCar?.priceMax || ORDER_DEFAULTS.MAX_PRICE;

  const totalPrice = useMemo(() => {
    if (!selectedCar || !selectedRate || !isDateRangeValid) {
      return `${TEXT.from} ${formatPrice(minPrice)} ${TEXT.to} ${formatPrice(maxPrice)}`;
    }

    const extrasPrice = selectedExtras.reduce((acc, extra) => acc + extra.price, 0);
    const from = new Date(orderState.dateFrom).getTime();
    const to = new Date(orderState.dateTo).getTime();
    const totalMinutes = Math.max(1, Math.ceil((to - from) / (1000 * 60)));
    const totalDays = Math.max(1, Math.ceil(totalMinutes / (60 * 24)));

    const rentPrice = selectedRate.id === 'daily'
      ? totalDays * Number(selectedRate.price || 0)
      : totalMinutes * Number(selectedRate.price || 0);

    return formatPrice(rentPrice + extrasPrice);
  }, [
    minPrice,
    maxPrice,
    selectedCar,
    selectedRate,
    selectedExtras,
    isDateRangeValid,
    orderState.dateFrom,
    orderState.dateTo,
  ]);

  const orderItems = [
    {
      label: TEXT.pickupPoint,
      value: selectedPickup ? `${selectedCity?.name}, ${selectedPickup.name}` : null,
    },
    { label: TEXT.model, value: selectedCar ? `${selectedCar.brand}, ${selectedCar.name}` : null },
    { label: TEXT.color, value: orderState.step >= 3 ? orderState.selectedColor : null },
    { label: TEXT.duration, value: orderState.step >= 3 ? durationLabel : null },
    {
      label: TEXT.rate,
      value: orderState.step >= 3 ? (selectedRate?.id === 'daily' ? TEXT.dayRate : TEXT.minuteRate) : null,
    },
    {
      label: TEXT.fullTank,
      value: orderState.step >= 3 ? (orderState.selectedExtraIds.includes('fullTank') ? TEXT.yes : TEXT.no) : null,
    },
  ];

  const maxAvailableStep = useMemo<TOrderFlowStep>(() => {
    if (canGoToStep4) return 4;
    if (canGoToStep3) return 3;
    if (canGoToStep2) return 2;
    return 1;
  }, [canGoToStep2, canGoToStep3, canGoToStep4]);

  const isStepEnabled = useCallback((stepIndex: TOrderFlowStep) => stepIndex <= maxAvailableStep, [maxAvailableStep]);

  const handleStepTransition = useCallback((nextStep: TOrderFlowStep) => {
    if (!isStepEnabled(nextStep)) return;
    replaceOrderRouteStep(nextStep);
  }, [isStepEnabled, replaceOrderRouteStep]);

  useEffect(() => {
    if (orderState.step === 5) return;
    if (stepSlug && !ROUTE_SEGMENT_TO_STEP[stepSlug]) {
      replaceOrderRouteStep(maxAvailableStep);
      return;
    }

    const rawStep = stepSlug ? ROUTE_SEGMENT_TO_STEP[stepSlug] : 1;
    const guardedStep = rawStep <= maxAvailableStep ? rawStep : maxAvailableStep;

    if (orderState.step !== guardedStep) {
      setOrderState((prev) => ({ ...prev, step: guardedStep }));
    }

    const expectedSegment = STEP_ROUTE_SEGMENTS[guardedStep];
    if (stepSlug !== expectedSegment) {
      replaceOrderRouteStep(guardedStep);
    }
  }, [maxAvailableStep, orderState.step, replaceOrderRouteStep, stepSlug]);

  const resetAfterLocationChange = useCallback((prev: TOrderState) => ({
    ...prev,
    selectedCategory: ORDER_DEFAULTS.CATEGORY,
    selectedCarId: null,
    selectedColor: ORDER_DEFAULTS.COLOR,
    dateFrom: defaultRange.from,
    dateTo: defaultRange.to,
    selectedRateId: ORDER_DEFAULTS.RATE_ID,
    selectedExtraIds: [...ORDER_DEFAULTS.EXTRAS],
    step: 1 as Step,
  }), [defaultRange.from, defaultRange.to]);

  const resetAfterModelChange = useCallback((prev: TOrderState) => ({
    ...prev,
    selectedColor: ORDER_DEFAULTS.COLOR,
    dateFrom: defaultRange.from,
    dateTo: defaultRange.to,
    selectedRateId: ORDER_DEFAULTS.RATE_ID,
    selectedExtraIds: [...ORDER_DEFAULTS.EXTRAS],
    step: 2 as Step,
  }), [defaultRange.from, defaultRange.to]);

  const handleCityChange = useCallback((value: string) => {
    setOrderState((prev) => resetAfterLocationChange({
      ...prev,
      cityInput: value,
      pickupInput: '',
      selectedPickupId: null,
    }));
  }, [resetAfterLocationChange]);

  const handlePickupChange = useCallback((value: string) => {
    setOrderState((prev) => resetAfterLocationChange({
      ...prev,
      pickupInput: value,
      selectedPickupId: null,
    }));
  }, [resetAfterLocationChange]);

  const handlePickupSelectFromMap = useCallback((pickupId: string) => {
    setOrderState((prev) => {
      if (!selectedCity) return prev;
      const point = selectedCity.pickupPoints.find((pickup) => pickup.id === pickupId);
      if (!point) return prev;
      return {
        ...resetAfterLocationChange(prev),
        selectedPickupId: point.id,
        pickupInput: point.name,
      };
    });
  }, [resetAfterLocationChange, selectedCity]);

  const handleCarSelect = useCallback((carId: string) => {
    setOrderState((prev) => resetAfterModelChange({
      ...prev,
      selectedCarId: carId,
    }));
  }, [resetAfterModelChange]);

  const handleExtraToggle = useCallback((extraId: string) => {
    setOrderState((prev) => ({
      ...prev,
      selectedExtraIds: prev.selectedExtraIds.includes(extraId)
        ? prev.selectedExtraIds.filter((item) => item !== extraId)
        : [...prev.selectedExtraIds, extraId],
    }));
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setOrderState((prev) => {
      if (prev.selectedCategory === category) return prev;
      return resetAfterModelChange({
        ...prev,
        selectedCategory: category,
        selectedCarId: null,
      });
    });
  }, [resetAfterModelChange]);

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
      durationLabel,
    },
    setOrderState,
  );

  if (apiLoading && !orderData) {
    return (
      <BaseSection isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle}>
        <Loader fullHeight />
      </BaseSection>
    );
  }

  if (!orderData) {
    return (
      <BaseSection isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle}>
        <div className={styles.orderContent}>
          <HorizontalContentContainer>
            <div>{apiError || 'Бэкенд недоступен. Проверь запуск API.'}</div>
          </HorizontalContentContainer>
        </div>
      </BaseSection>
    );
  }

  return (
    <BaseSection isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle}>
      <div className={styles.orderContent}>
        <div className={styles.breadcrumbsContainer}>
          <HorizontalContentContainer>
            {orderState.step !== 5 && (
              <Breadcrumbs
                items={([1, 2, 3, 4] as TOrderFlowStep[]).map((stepKey) => ({
                  key: stepKey,
                  label: STEP_LABELS[stepKey],
                  active: stepKey === orderState.step,
                  enabled: isStepEnabled(stepKey),
                }))}
                onStepClick={(nextStep) => handleStepTransition(nextStep as TOrderFlowStep)}
              />
            )}
            {orderState.step === 5 && (
              <div className={styles.orderNumber}>{TEXT.orderNumber} {orderState.orderId}</div>
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
              categories={categories}
              selectedCarId={orderState.selectedCarId}
              selectedCategory={orderState.selectedCategory}
              selectedColor={orderState.selectedColor}
              dateFrom={orderState.dateFrom}
              dateTo={orderState.dateTo}
              selectedRateId={orderState.selectedRateId}
              selectedExtraIds={orderState.selectedExtraIds}
              rentalRates={orderData.rentalRates}
              extras={orderData.extras}
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
            priceText={selectedCar ? totalPrice : `${TEXT.from} ${formatPrice(minPrice)} ${TEXT.to} ${formatPrice(maxPrice)}`}
            canGoToStep2={canGoToStep2}
            canGoToStep3={canGoToStep3}
            onStepChange={(step) => handleStepTransition(step as TOrderFlowStep)}
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
