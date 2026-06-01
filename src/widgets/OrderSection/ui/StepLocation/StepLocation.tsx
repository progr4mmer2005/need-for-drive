import { memo } from 'react';
import { AutocompleteInput } from '@/shared/components/AutocompleteInput';
import { LeafletMap } from '@/shared/components/LeafletMap';
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

export const StepLocation = memo(
  ({
    cityInput,
    pickupInput,
    cityOptions,
    pickupOptions,
    selectedCity,
    selectedPickupId,
    onCityChange,
    onPickupChange,
    onPickupSelectFromMap,
  }: TStepLocationProps) => (
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

      <LeafletMap
        cityName={selectedCity?.name ?? ''}
        points={(selectedCity?.pickupPoints || []).map((point) => ({
          id: point.id,
          name: point.name,
          address: point.address,
        }))}
        selectedId={selectedPickupId}
        onPointSelect={onPickupSelectFromMap}
      />
    </div>
  )
);

StepLocation.displayName = 'StepLocation';
