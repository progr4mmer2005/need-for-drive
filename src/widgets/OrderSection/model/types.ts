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
  category?: string;
  image?: string;
  priceMin: number;
  plate?: string;
  fuel?: string;
  backendId?: number;
  colors?: string[];
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

export type TOrderFlowStep = Exclude<Step, 5>;

export const STEP_LABELS: Record<Step, string> = {
  1: 'Местоположение',
  2: 'Модель',
  3: 'Дополнительно',
  4: 'Итого',
  5: ' ',
};

export const ORDER_STORAGE_KEY = 'need-for-drive-order';

export const STEP_ROUTE_SEGMENTS: Record<TOrderFlowStep, string> = {
  1: 'location',
  2: 'model',
  3: 'additional',
  4: 'total',
};

export const ROUTE_SEGMENT_TO_STEP: Record<string, TOrderFlowStep> = {
  location: 1,
  model: 2,
  additional: 3,
  total: 4,
};


