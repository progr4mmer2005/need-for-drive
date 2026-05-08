import orderData from '@/shared/model/orderData.json';

export type Step = 1 | 2 | 3 | 4 | 5;

export type TCity = (typeof orderData.cities)[number];
export type TPickupPoint = TCity['pickupPoints'][number];
export type TCar = (typeof orderData.cars)[number];
export type TRentalRate = (typeof orderData.rentalRates)[number];
export type TExtra = (typeof orderData.extras)[number];

export type TSelectedCity = { name: string } | null;
export type TSelectedPickup = { name: string; id: string } | null;
export type TSelectedCar = {
  id: string;
  brand: string;
  name: string;
  image?: string;
  priceMin: number;
} | null;
export type TSelectedRate = { id: string; price: number } | null;

export type TCompletedOrder = {
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
  5: ' ',
};

export const ORDER_STORAGE_KEY = 'need-for-drive-order';
