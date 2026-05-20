import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import staticOrderData from '@/shared/model/orderData.json';
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

const ru = String.fromCharCode;
const TEXT = {
  notSelected: ru(1053, 1077, 32, 1074, 1099, 1073, 1088, 1072, 1085, 1072),
  from: ru(1086, 1090),
  to: ru(1076, 1086),
  pickupPoint: ru(1055, 1091, 1085, 1082, 1090, 32, 1074, 1099, 1076, 1072, 1095, 1080),
  model: ru(1052, 1086, 1076, 1077, 1083, 1100),
  color: ru(1062, 1074, 1077, 1090),
  duration: ru(1044, 1083, 1080, 1090, 1077, 1083, 1100, 1085, 1086, 1089, 1090, 1100, 32, 1072, 1088, 1077, 1085, 1076, 1099),
  rate: ru(1058, 1072, 1088, 1080, 1092),
  fullTank: ru(1055, 1086, 1083, 1085, 1099, 1081, 32, 1073, 1072, 1082),
  dayRate: ru(1053, 1072, 32, 1089, 1091, 1090, 1082, 1080),
  minuteRate: ru(1055, 1086, 1084, 1080, 1085, 1091, 1090, 1085, 1086),
  yes: ru(1044, 1072),
  no: ru(1053, 1077, 1090),
  orderNumber: ru(1047, 1072, 1082, 1072, 1079, 32, 1085, 1086, 1084, 1077, 1088),
};

const formatAvailableAt = (value: string) => {
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
  return `${day}.${month}.${year} 12:00`;
};

export function OrderSection({ isMenuOpen, onMenuToggle }: TOrderSectionProps) {
  const navigate = useNavigate();
  const { stepSlug } = useParams<{ stepSlug?: string }>();

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

  const replaceOrderRouteStep = useCallback((step: TOrderFlowStep) => {
    const nextPath = `/order/${STEP_ROUTE_SEGMENTS[step]}`;
    navigate(nextPath, { replace: true });
  }, [navigate]);

  const { data: apiData, loading: apiLoading } = useApiOrderData();
  const orderData = (apiData ?? (staticOrderData as unknown)) as {
    cities: Array<{ id: string; name: string; mapCenter: { x: number; y: number };
      pickupPoints: Array<{ id: string; name: string; x: number; y: number }> }>;
    cars: Array<{ id: string; brand: string; name: string; category: string;
      image: string; priceMin: number; priceMax: number; plate?: string; fuel?: string;
      backendId?: number; colors?: string[] }>;
    rentalRates: Array<{ id: string; label: string; price: number }>;
    extras: Array<{ id: string; label: string; price: number }>;
  };
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
    if (orderState.selectedCategory === ORDER_DEFAULTS.CATEGORY) {
      return orderData.cars;
    }

    return orderData.cars.filter((car) => car.category === orderState.selectedCategory);
  }, [orderData.cars, orderState.selectedCategory]);

  const selectedCar = orderData.cars.find((car) => car.id === orderState.selectedCarId) || null;
  const selectedRate = orderData.rentalRates.find((rate) => rate.id === orderState.selectedRateId) || null;
  const selectedExtras = orderData.extras.filter((extra) => orderState.selectedExtraIds.includes(extra.id));
  const availableAt = formatAvailableAt(orderState.dateFrom || orderState.dateTo);

  const isLocationStepComplete = Boolean(selectedCity && selectedPickup);
  const isModelStepComplete = Boolean(isLocationStepComplete && selectedCar);
  const isExtrasStepComplete = Boolean(isModelStepComplete && selectedRate && orderState.selectedColor);

  const canGoToStep2 = isLocationStepComplete;
  const canGoToStep3 = isModelStepComplete;
  const canGoToStep4 = isExtrasStepComplete;

  const minPrice = selectedCar?.priceMin || ORDER_DEFAULTS.MIN_PRICE;
  const maxPrice = selectedCar?.priceMax || ORDER_DEFAULTS.MAX_PRICE;

  const totalPrice = useMemo(() => {
    if (!selectedCar) {
      return `${TEXT.from} ${formatPrice(minPrice)} ${TEXT.to} ${formatPrice(maxPrice)}`;
    }

    const extrasPrice = selectedExtras.reduce((acc, extra) => acc + extra.price, 0);
    const basePrice = selectedCar.priceMin;
    const ratePrice = selectedRate?.id === 'daily' ? selectedRate.price : 0;
    return formatPrice(basePrice + extrasPrice + ratePrice);
  }, [maxPrice, minPrice, selectedCar, selectedExtras, selectedRate]);

  const orderItems = [
    {
      label: TEXT.pickupPoint,
      value: selectedPickup
        ? `${(selectedCity as TCity | null)?.name}, ${selectedPickup.name}`
        : null,
    },
    { label: TEXT.model, value: selectedCar ? `${selectedCar.brand}, ${selectedCar.name}` : null },
    { label: TEXT.color, value: orderState.step >= 3 ? orderState.selectedColor : null },
    { label: TEXT.duration, value: orderState.step >= 3 ? '1d 2h' : null },
    {
      label: TEXT.rate,
      value:
        orderState.step >= 3 ? (selectedRate?.id === 'daily' ? TEXT.dayRate : TEXT.minuteRate) : null,
    },
    {
      label: TEXT.fullTank,
      value:
        orderState.step >= 3
          ? orderState.selectedExtraIds.includes('fullTank')
            ? TEXT.yes
            : TEXT.no
          : null,
    },
  ];
  const maxAvailableStep = useMemo<TOrderFlowStep>(() => {
    if (canGoToStep4) {
      return 4;
    }
    if (canGoToStep3) {
      return 3;
    }
    if (canGoToStep2) {
      return 2;
    }
    return 1;
  }, [canGoToStep2, canGoToStep3, canGoToStep4]);

  const isStepEnabled = useCallback((stepIndex: TOrderFlowStep) => (
    stepIndex <= maxAvailableStep
  ), [maxAvailableStep]);

  const handleStepTransition = useCallback((nextStep: TOrderFlowStep) => {
    if (!isStepEnabled(nextStep)) {
      return;
    }
    replaceOrderRouteStep(nextStep);
  }, [isStepEnabled, replaceOrderRouteStep]);

  useEffect(() => {
    if (orderState.step === 5) {
      return;
    }

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
    dateFrom: '',
    dateTo: '',
    selectedRateId: ORDER_DEFAULTS.RATE_ID,
    selectedExtraIds: [...ORDER_DEFAULTS.EXTRAS],
    step: 1 as Step,
  }), []);

  const resetAfterModelChange = useCallback((prev: TOrderState) => ({
    ...prev,
    selectedColor: ORDER_DEFAULTS.COLOR,
    dateFrom: '',
    dateTo: '',
    selectedRateId: ORDER_DEFAULTS.RATE_ID,
    selectedExtraIds: [...ORDER_DEFAULTS.EXTRAS],
    step: 2 as Step,
  }), []);

  const handleCityChange = useCallback(
    (value: string) => {
      setOrderState((prev) => resetAfterLocationChange({
        ...prev,
        cityInput: value,
        pickupInput: '',
        selectedPickupId: null,
      }));
    },
    [resetAfterLocationChange],
  );

  const handlePickupChange = useCallback(
    (value: string) => {
      setOrderState((prev) => resetAfterLocationChange({
        ...prev,
        pickupInput: value,
        selectedPickupId: null,
      }));
    },
    [resetAfterLocationChange],
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
          ...resetAfterLocationChange(prev),
          selectedPickupId: point.id,
          pickupInput: point.name,
        };
      });
    },
    [resetAfterLocationChange, selectedCity],
  );

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
      if (prev.selectedCategory === category) {
        return prev;
      }

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
    },
    setOrderState,
  );

  if (apiLoading && !apiData) {
    return (
      <BaseSection isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle}>
        <Loader fullHeight />
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
              selectedCar ? totalPrice : `${TEXT.from} ${formatPrice(minPrice)} ${TEXT.to} ${formatPrice(maxPrice)}`
            }
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
