import { memo } from 'react';
import { AutocompleteInput } from '@/shared/components/AutocompleteInput';
import { MapSelection } from '@/shared/components/MapSelection';
import { TCity } from '@/widgets/OrderSection/model/types';
import * as styles from './StepLocation.module.scss';

type TStepLocationProps = {
  cityInput: string;
  pickupInput: string;
  cityOptions: string[];
  pickupOptions: string[];
  selectedCity: TCity | null;
  selectedPickupId?: string;
  onCityChange: (value: string) => void;
  onPickupChange: (value: string) => void;
  onPickupSelectFromMap: (pickupId: string) => void;
};

export const StepLocation = memo(function StepLocation({
  cityInput,
  pickupInput,
  cityOptions,
  pickupOptions,
  selectedCity,
  selectedPickupId,
  onCityChange,
  onPickupChange,
  onPickupSelectFromMap,
}: TStepLocationProps) {
  return (
    <div className={styles.panel}>
      <AutocompleteInput
        label="Город"
        placeholder="Начните вводить город..."
        value={cityInput}
        options={cityOptions}
        onChange={onCityChange}
      />

      <AutocompleteInput
        label="Пункт выдачи"
        placeholder="Начните вводить пункт..."
        value={pickupInput}
        options={pickupOptions}
        disabled={!selectedCity}
        onChange={onPickupChange}
      />

      <MapSelection
        points={(selectedCity?.pickupPoints || []).map((point) => ({
          id: point.id,
          x: point.x,
          y: point.y,
          address: point.name,
        }))}
        selectedId={selectedPickupId}
        onPointSelect={(point) => onPickupSelectFromMap(point.id)}
      />
    </div>
  );
});
