import {
  TCar, TCity, Step, TSelectedPickup,
} from '@/widgets/OrderSection/model/types';
import { OrderContainer } from '@/widgets/OrderSection/ui/OrderContainer';
import { StepLocation } from '@/widgets/OrderSection/ui/StepLocation';
import { StepModels } from '@/widgets/OrderSection/ui/StepModels';
import { StepExtras } from '@/widgets/OrderSection/ui/StepExtras';
import { StepSummary } from '@/widgets/OrderSection/ui/StepSummary';
import { StepOrderConfirmed } from '@/widgets/OrderSection/ui/StepOrderConfirmed';
import * as styles from '../../OrderSection.module.scss';

type TOrderStepRendererProps = {
  step: Step;
  cityInput: string;
  pickupInput: string;
  cityOptions: string[];
  pickupOptions: string[];
  selectedCity: TCity | null;
  selectedPickup: TSelectedPickup;
  categories: string[];
  selectedCarId: string | null;
  selectedCategory: string;
  selectedColor: string;
  dateFrom: string;
  dateTo: string;
  selectedRateId: string;
  selectedExtraIds: string[];
  rentalRates: Array<{ id: string; label: string; price: number }>;
  extras: Array<{ id: string; label: string; price: number }>;
  filteredCars: TCar[];
  selectedCar: TCar | null;
  availableAt: string;
  onCityChange: (value: string) => void;
  onPickupChange: (value: string) => void;
  onPickupSelectFromMap: (pickupId: string) => void;
  onCategoryChange: (category: string) => void;
  onCarSelect: (carId: string) => void;
  onColorChange: (color: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onRateChange: (rateId: string) => void;
  onExtraToggle: (extraId: string) => void;
};

export function OrderStepRenderer({
  step,
  cityInput,
  pickupInput,
  cityOptions,
  pickupOptions,
  selectedCity,
  selectedPickup,
  categories,
  selectedCarId,
  selectedCategory,
  selectedColor,
  dateFrom,
  dateTo,
  selectedRateId,
  selectedExtraIds,
  rentalRates,
  extras,
  filteredCars,
  selectedCar,
  availableAt,
  onCityChange,
  onPickupChange,
  onPickupSelectFromMap,
  onCategoryChange,
  onCarSelect,
  onColorChange,
  onDateFromChange,
  onDateToChange,
  onRateChange,
  onExtraToggle,
}: TOrderStepRendererProps) {
  return (
    <OrderContainer>
      {step === 1 && (
        <div className={styles.stepPanel}>
          <StepLocation
            cityInput={cityInput}
            pickupInput={pickupInput}
            cityOptions={cityOptions}
            pickupOptions={pickupOptions}
            selectedCity={selectedCity}
            selectedPickupId={selectedPickup?.id}
            onCityChange={onCityChange}
            onPickupChange={onPickupChange}
            onPickupSelectFromMap={onPickupSelectFromMap}
          />
        </div>
      )}

      {step === 2 && (
        <StepModels
          categories={categories}
          selectedCategory={selectedCategory}
          selectedCarId={selectedCarId}
          cars={filteredCars}
          onCategoryChange={onCategoryChange}
          onCarSelect={onCarSelect}
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
          rentalRates={rentalRates}
          extras={extras}
          onColorChange={onColorChange}
          onDateFromChange={onDateFromChange}
          onDateToChange={onDateToChange}
          onRateChange={onRateChange}
          onExtraToggle={onExtraToggle}
        />
      )}

      {step === 4 && selectedCar && <StepSummary car={selectedCar} dateFrom={availableAt} />}

      {step === 5 && selectedCar && <StepOrderConfirmed car={selectedCar} dateFrom={availableAt} />}
    </OrderContainer>
  );
}
