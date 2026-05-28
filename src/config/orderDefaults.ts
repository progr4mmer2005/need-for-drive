export const ORDER_DEFAULTS = {
  CITY: '',
  COLOR: 'Голубой',
  RATE_ID: 'daily',
  EXTRAS: ['fullTank'] as readonly string[],
  CATEGORY: 'Все модели',
  MIN_PRICE: 8000,
  MAX_PRICE: 12000,
} as const;
