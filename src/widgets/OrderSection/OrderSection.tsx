import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { BaseSection } from '@/widgets/BaseSection';
import { Loader } from '@/shared/components/Loader';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import { HorizontalContentContainer } from '@/shared/components/HorizontalContentContainer';
import { ORDER_DEFAULTS } from './model/utils/orderDefaults';

import { useApiOrderData } from './model/hooks/useApiOrderData';
import { useOrderState } from './model/hooks/useOrderState';
import { useCancelStatus } from './model/hooks/useCancelStatus';
import { useOrderSelections } from './model/hooks/useOrderSelections';
import { useOrderHandlers } from './model/hooks/useOrderHandlers';
import { useOrderRouting } from './model/hooks/useOrderRouting';
import { useOrderPrice } from './model/hooks/useOrderPrice';
import { useOrderSubmit } from './model/hooks/useOrderSubmit';
import { useCancelOrder } from './model/hooks/useCancelOrder';
import { ORDER_TEXT } from './model/utils/orderConstants';

import { ConfirmModal, OrderSidebar } from './ui';
import { OrderStepRenderer } from './ui/OrderStepRenderer';
import * as styles from './OrderSection.module.scss';

import {
  STEP_LABELS,
  type TOrderFlowStep,
  type TSelectedCity,
  type TSelectedPickup,
  type TSelectedCar,
  type TSelectedRate,
} from './model/types';

type TOrderSectionProps = {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
};

export function OrderSection({ isMenuOpen, onMenuToggle }: TOrderSectionProps) {
  const { stepSlug } = useParams<{ stepSlug?: string }>();
  const userHasInteracted = useRef(false);

  const { orderState, setOrderState, resetAfterLocationChange, resetAfterModelChange } =
    useOrderState();
  const cancelStatusId = useCancelStatus();
  const { data: orderData, loading: apiLoading, error: apiError } = useApiOrderData();

  const {
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
    canGoToStep2,
    canGoToStep3,
    canGoToStep4,
    globalMinPrice,
    globalMaxPrice,
  } = useOrderSelections(orderState, orderData, setOrderState);

  useEffect(() => {
    if (!nearestLocation || userHasInteracted.current) return;
    setOrderState((prev) => ({
      ...prev,
      cityInput: nearestLocation.cityName,
      pickupInput: nearestLocation.pickupName,
      selectedPickupId: nearestLocation.pickupId,
    }));
  }, [nearestLocation, setOrderState]);

  const handlers = useOrderHandlers({
    setOrderState,
    resetAfterLocationChange,
    resetAfterModelChange,
    selectedCity,
    userHasInteracted,
  });

  const { isStepEnabled, handleStepTransition } = useOrderRouting({
    step: orderState.step,
    stepSlug,
    setOrderState,
    canGoToStep2,
    canGoToStep3,
    canGoToStep4,
  });

  const { sidebarPriceText, totalPrice } = useOrderPrice({
    selectedCar,
    selectedRate,
    selectedExtras,
    dateFrom: orderState.dateFrom,
    dateTo: orderState.dateTo,
    step: orderState.step,
    globalMinPrice,
    globalMaxPrice,
    minPrice: selectedCar?.priceMin || ORDER_DEFAULTS.MIN_PRICE,
    maxPrice: selectedCar?.priceMax || ORDER_DEFAULTS.MAX_PRICE,
    rentalRates: orderData?.rentalRates || [],
    isDateRangeValid,
  });

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
    setOrderState
  );

  const { handleCancelOrder } = useCancelOrder({
    backendOrderId: orderState.backendOrderId,
    cancelStatusId,
    setOrderState,
  });

  const orderItems = [
    {
      label: ORDER_TEXT.pickupPoint,
      value: selectedPickup ? `${selectedCity?.name}, ${selectedPickup.name}` : null,
    },
    {
      label: ORDER_TEXT.model,
      value: selectedCar ? `${selectedCar.brand}, ${selectedCar.name}` : null,
    },
    { label: ORDER_TEXT.color, value: orderState.step >= 3 ? orderState.selectedColor : null },
    { label: ORDER_TEXT.duration, value: orderState.step >= 3 ? durationLabel : null },
    { label: ORDER_TEXT.rate, value: orderState.step >= 3 ? selectedRate?.label ?? null : null },
    {
      label: ORDER_TEXT.fullTank,
      value:
        orderState.step >= 3
          ? orderState.selectedExtraIds.includes('fullTank')
            ? ORDER_TEXT.yes
            : ORDER_TEXT.no
          : null,
    },
  ];

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
              <div className={styles.orderNumber}>
                {ORDER_TEXT.orderNumber} {orderState.orderId}
              </div>
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
              onCityChange={handlers.handleCityChange}
              onPickupChange={handlers.handlePickupChange}
              onPickupSelectFromMap={handlers.handlePickupSelectFromMap}
              onCategoryChange={handlers.handleCategoryChange}
              onCarSelect={handlers.handleCarSelect}
              onColorChange={handlers.handleColorChange}
              onDateFromChange={handlers.handleDateFromChange}
              onDateToChange={handlers.handleDateToChange}
              onRateChange={handlers.handleRateChange}
              onExtraToggle={handlers.handleExtraToggle}
            />
          </section>

          <OrderSidebar
            step={orderState.step}
            items={orderItems}
            priceText={sidebarPriceText}
            canGoToStep2={canGoToStep2}
            canGoToStep3={canGoToStep3}
            canGoToStep4={canGoToStep4}
            onStepChange={(s) => handleStepTransition(s as TOrderFlowStep)}
            onOpenConfirm={() => setOrderState((prev) => ({ ...prev, isConfirmOpen: true }))}
            onOpenCancelConfirm={() =>
              setOrderState((prev) => ({ ...prev, isCancelConfirmOpen: true }))
            }
          />
        </div>
      </div>

      <ConfirmModal
        isOpen={orderState.isConfirmOpen}
        onConfirm={handleSubmitOrder}
        onCancel={() => setOrderState((prev) => ({ ...prev, isConfirmOpen: false }))}
      />

      <ConfirmModal
        isOpen={orderState.isCancelConfirmOpen}
        title="Отменить заказ?"
        confirmText="Да, отменить"
        backText="Вернуться"
        confirmTone="red"
        onConfirm={handleCancelOrder}
        onCancel={() => setOrderState((prev) => ({ ...prev, isCancelConfirmOpen: false }))}
      />
    </BaseSection>
  );
}
