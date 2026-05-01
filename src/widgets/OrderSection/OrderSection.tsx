
import { BaseSection } from '../BaseSection';
import * as styles from './OrderSection.module.scss';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import {Link} from 'react-router-dom';
import { HorizontalContentContainer } from '../../shared/components/HorizontalContentContainer';
import { AutocompleteInput } from '../../shared/components/AutocompleteInput';
import { MapSelection } from '../../shared/components/MapSelection';
import { OrderDetails } from '../../shared/components/OrderDetails';

type OrderSectionProps = {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
};

export function OrderSection({ isMenuOpen, onMenuToggle }: OrderSectionProps) {
  const orderData = [
  { label: 'Пункт выдачи', value: 'Ульяновск, Нариманова 42' },
  { label: 'Модель', value: 'Hyundai, i30 N' },
  { label: 'Цвет', value: 'Голубой' },
  { label: 'Запас топлива', value: '100%' },
];
  return (
    <BaseSection isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle}>
      <div className={styles['order-content']}>

        <div className={styles.breadcrumbsContainer}>
          <HorizontalContentContainer>
          <Breadcrumbs items={[
            {label: "Местоположение"},
            {label: "Модель"},
            {label: "Дополнительно"},
            {label: "Итого"}
          ]}/>
          </HorizontalContentContainer>
        </div>

        <div className={styles.orderSplit}>

            <div className={styles.orderTopMarginContainer}>
              <HorizontalContentContainer>
                <AutocompleteInput label='Город' value='' placeholder='Ульяновск' options={['Ульяновск']} onChange={() => {}}>
                </AutocompleteInput>

                <AutocompleteInput label='Пункт выдачи' value='' placeholder='Ульяновск' options={['Ульяновск']} onChange={() => {}}>
                </AutocompleteInput>


                <div className={styles.orderMapSelectionContainer}>
                  <MapSelection points={[]}>

                  </MapSelection>
                </div>
              </HorizontalContentContainer>
            </div>

            

            <div className={styles.orderResultsContainer}> 
              <div className={styles.orderTopMarginContainer}>
                <div className={styles.orderResutlsTitle}>Ваш заказ</div>
                <OrderDetails items={orderData} priceMin={8000} priceMax={12000} />

            </div>
          </div>
        </div>

      </div>
    </BaseSection>
  );
}