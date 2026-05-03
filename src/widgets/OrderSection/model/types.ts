import orderData from '../../../shared/model/orderData.json';

export type Step = 1 | 2 | 3 | 4 | 5;

export type City = (typeof orderData.cities)[number];
export type PickupPoint = City['pickupPoints'][number];
export type Car = (typeof orderData.cars)[number];
export type RentalRate = (typeof orderData.rentalRates)[number];
export type Extra = (typeof orderData.extras)[number];

export type CompletedOrder = {
  orderId: string;
  city: string;
  pickupPoint: string;
  carName: string;
  carImage?: string;
  color: string;
  duration: string;
  rate: string;
  fullTank: string;
  totalPrice: string;
  availableAt: string;
};

export const STEP_LABELS: Record<Step, string> = {
  1: 'Местоположение',
  2: 'Модель',
  3: 'Дополнительно',
  4: 'Итого',
  5: ' '
};

export const ORDER_STORAGE_KEY = 'need-for-drive-order';
