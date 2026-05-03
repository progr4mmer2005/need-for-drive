import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import orderData from '../../shared/model/orderData.json';
import { BaseSection } from '../BaseSection';
import * as styles from './OrderSection.module.scss';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import { HorizontalContentContainer } from '../../shared/components/HorizontalContentContainer';
import { ConfirmModal, OrderSidebar, StepExtras, StepLocation, StepModels, StepSummary } from './ui';
import { CompletedOrder, ORDER_STORAGE_KEY, STEP_LABELS, Step } from './model/types';
import { formatPrice } from './model/formatPrice';
import { StepOrderConfirmed } from './ui/StepOrderConfirmed';

type OrderSectionProps = {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
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

export function OrderSection({ isMenuOpen, onMenuToggle }: OrderSectionProps) {
  const [orderId, setOrderId] = useState<string>('');

  const [step, setStep] = useState<Step>(1);

  const [cityInput, setCityInput] = useState('Ульяновск');
  const [pickupInput, setPickupInput] = useState('');
  const [selectedPickupId, setSelectedPickupId] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState('Все модели');
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);

  const [selectedColor, setSelectedColor] = useState('Голубой');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedRateId, setSelectedRateId] = useState('daily');
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>(['fullTank']);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const cities = orderData.cities;
  const cityOptions = cities.map((city) => city.name);

  const selectedCity = useMemo(
    () => cities.find((city) => city.name.toLowerCase() === cityInput.trim().toLowerCase()) || null,
    [cities, cityInput],
  );

  const pickupOptions = selectedCity ? selectedCity.pickupPoints.map((point) => point.name) : [];

  const selectedPickup = useMemo(() => {
    if (!selectedCity) {
      return null;
    }

    if (selectedPickupId) {
      return selectedCity.pickupPoints.find((point) => point.id === selectedPickupId) || null;
    }

    return (
      selectedCity.pickupPoints.find(
        (point) => point.name.toLowerCase() === pickupInput.trim().toLowerCase(),
      ) || null
    );
  }, [pickupInput, selectedCity, selectedPickupId]);

  const filteredCars = useMemo(() => {
    if (selectedCategory === 'Все модели') {
      return orderData.cars;
    }

    return orderData.cars.filter((car) => car.category === selectedCategory);
  }, [selectedCategory]);

  const selectedCar = orderData.cars.find((car) => car.id === selectedCarId) || null;
  const selectedRate = orderData.rentalRates.find((rate) => rate.id === selectedRateId) || null;
  const selectedExtras = orderData.extras.filter((extra) => selectedExtraIds.includes(extra.id));
  const availableAt = formatAvailableAt(dateFrom || dateTo);

  const canGoToStep2 = Boolean(selectedCity && selectedPickup);
  const canGoToStep3 = Boolean(selectedCar);
  const canGoToStep4 = Boolean(selectedCar && selectedRate);

  const minPrice = selectedCar?.priceMin || 8000;
  const maxPrice = selectedCar?.priceMax || 12000;

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
    { label: 'Пункт выдачи', value: selectedPickup ? `${selectedCity?.name}, ${selectedPickup.name}` : null },
    { label: 'Модель', value: selectedCar ? `${selectedCar.brand}, ${selectedCar.name}` : null },
    { label: 'Цвет', value: step >= 3 ? selectedColor : null },
    { label: 'Длительность аренды', value: step >= 3 ? '1д 2ч' : null },
    { label: 'Тариф', value: step >= 3 ? (selectedRate?.id === 'daily' ? 'На сутки' : 'Поминутно') : null },
    {
      label: 'Полный бак',
      value: step >= 3 ? (selectedExtraIds.includes('fullTank') ? 'Да' : 'Нет') : null,
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
      setStep(nextStep);
    }
  };

  const resetAfterLocation = () => {
    setSelectedCarId(null);
    setSelectedCategory('Все модели');
    setSelectedColor('Голубой');
    setSelectedRateId('daily');
    setSelectedExtraIds(['fullTank']);
    setStep(1);
  };

  const handleCityChange = (value: string) => {
    setCityInput(value);
    setPickupInput('');
    setSelectedPickupId(null);
    resetAfterLocation();
  };

  const handlePickupChange = (value: string) => {
    setPickupInput(value);
    setSelectedPickupId(null);
    resetAfterLocation();
  };

  const handlePickupSelectFromMap = (pickupId: string) => {
    if (!selectedCity) {
      return;
    }

    const point = selectedCity.pickupPoints.find((pickup) => pickup.id === pickupId);
    if (!point) {
      return;
    }

    setSelectedPickupId(point.id);
    setPickupInput(point.name);
    setStep(1);
  };

  const handleCarSelect = (carId: string) => {
    setSelectedCarId(carId);
    setSelectedColor('Голубой');
    setSelectedRateId('daily');
    setSelectedExtraIds(['fullTank']);
    setDateTo('');
    setStep(2);
  };

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtraIds((current) =>
      current.includes(extraId)
        ? current.filter((item) => item !== extraId)
        : [...current, extraId],
    );
  };

  const handleSubmitOrder = () => {
    if (!selectedCity || !selectedPickup || !selectedCar) {
      return;
    }

    const orderId = `RUS${Math.floor(100000000 + Math.random() * 900000000)}`;
    setOrderId(orderId);
    const completedOrder: CompletedOrder = {
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
    setIsConfirmOpen(false);
    setStep(5);
  };

  return (
    <BaseSection isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle}>
      <div className={styles.orderContent}>
        <div className={styles.breadcrumbsContainer}>
          <HorizontalContentContainer>
            {step !== 5 && <Breadcrumbs
              items={([1, 2, 3, 4] as Step[]).map((stepKey) => ({
                key: stepKey,
                label: STEP_LABELS[stepKey],
                active: stepKey === step,
                enabled: isStepEnabled(stepKey),
              }))}
              onStepClick={(nextStep) => handleStepTransition(nextStep as Step)}
            />}

            {step === 5 && <div className={styles.orderNumber}>Заказ номер {orderId}</div>}
          </HorizontalContentContainer>
        </div>

        <div className={styles.split}>
          <section className={styles.leftPane}>
            <HorizontalContentContainer>
              {step === 1 && (
                <div className={styles.stepPanel}>
                  <StepLocation
                    cityInput={cityInput}
                    pickupInput={pickupInput}
                    cityOptions={cityOptions}
                    pickupOptions={pickupOptions}
                    selectedCity={selectedCity}
                    selectedPickupId={selectedPickup?.id}
                    onCityChange={handleCityChange}
                    onPickupChange={handlePickupChange}
                    onPickupSelectFromMap={handlePickupSelectFromMap}
                  />
                </div>
              )}

              {step === 2 && (
                <StepModels
                  selectedCategory={selectedCategory}
                  selectedCarId={selectedCarId}
                  cars={filteredCars}
                  onCategoryChange={setSelectedCategory}
                  onCarSelect={handleCarSelect}
                />
              )}

              {step === 3 && selectedCar && (
                <StepExtras
                  selectedCar={selectedCar}
                  selectedColor={selectedColor}
                  dateFrom={dateFrom}
                  dateTo={dateTo}
                  selectedRateId={selectedRateId}
                  selectedExtraIds={selectedExtraIds}
                  onColorChange={setSelectedColor}
                  onDateFromChange={setDateFrom}
                  onDateToChange={setDateTo}
                  onRateChange={setSelectedRateId}
                  onExtraToggle={handleExtraToggle}
                />
              )}

              {step === 4 && selectedCar && <StepSummary car={selectedCar} dateFrom={availableAt} />}

              {step === 5 && selectedCar && <StepOrderConfirmed car={selectedCar} dateFrom={availableAt}/>}
            </HorizontalContentContainer>
          </section>

          <OrderSidebar
            step={step}
            items={orderItems}
            priceText={selectedCar ? totalPrice : `от ${formatPrice(minPrice)} до ${formatPrice(maxPrice)}`}
            canGoToStep2={canGoToStep2}
            canGoToStep3={canGoToStep3}
            onStepChange={handleStepTransition}
            onOpenConfirm={() => setIsConfirmOpen(true)}
          />
        </div>
      </div>

      <ConfirmModal isOpen={isConfirmOpen} onConfirm={handleSubmitOrder} onCancel={() => setIsConfirmOpen(false)} />
    </BaseSection>
  );
}
