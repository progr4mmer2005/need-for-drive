import { memo } from 'react';
import { TCar } from '@/widgets/OrderSection/model/types';
import { CheckboxOption } from '@/widgets/OrderSection/ui/CheckboxOption';
import { DateInputRow } from '@/widgets/OrderSection/ui/DateInputRow';
import { RadioOption } from '@/widgets/OrderSection/ui/RadioOption';
import { SectionTitle } from '@/widgets/OrderSection/ui/SectionTitle';
import * as styles from './StepExtras.module.scss';

type TRate = {
  id: string;
  label: string;
};

type TExtra = {
  id: string;
  label: string;
  price: number;
};

type TStepExtrasProps = {
  selectedCar: TCar;
  selectedColor: string;
  dateFrom: string;
  dateTo: string;
  selectedRateId: string;
  selectedExtraIds: string[];
  rentalRates: TRate[];
  extras: TExtra[];
  onColorChange: (color: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onRateChange: (rateId: string) => void;
  onExtraToggle: (extraId: string) => void;
};

export const StepExtras = memo(function StepExtras({
  selectedCar,
  selectedColor,
  dateFrom,
  dateTo,
  selectedRateId,
  selectedExtraIds,
  rentalRates,
  extras,
  onColorChange,
  onDateFromChange,
  onDateToChange,
  onRateChange,
  onExtraToggle,
}: TStepExtrasProps) {
  return (
    <div className={styles.panel}>
      <SectionTitle text="Цвет" />
      <div className={styles.row}>
        {selectedCar.colors.map((color) => (
          <RadioOption
            key={color}
            checked={selectedColor === color}
            name="color"
            label={color}
            onChange={() => onColorChange(color)}
          />
        ))}
      </div>

      <SectionTitle text="Дата аренды" />
      <DateInputRow
        prefix="С"
        value={dateFrom}
        showClear
        onChange={onDateFromChange}
        onClear={() => onDateFromChange('')}
      />
      <DateInputRow
        prefix="По"
        value={dateTo}
        showClear
        onChange={onDateToChange}
        onClear={() => onDateToChange('')}
      />

      <SectionTitle text="Тариф" />
      <div className={styles.column}>
        {rentalRates.map((rate) => (
          <RadioOption
            key={rate.id}
            checked={selectedRateId === rate.id}
            name="rate"
            label={rate.label}
            onChange={() => onRateChange(rate.id)}
          />
        ))}
      </div>

      <SectionTitle text="Доп услуги" />
      <div className={styles.column}>
        {extras.map((extra) => (
          <CheckboxOption
            key={extra.id}
            checked={selectedExtraIds.includes(extra.id)}
            label={extra.label}
            onChange={() => onExtraToggle(extra.id)}
          />
        ))}
      </div>
    </div>
  );
});
