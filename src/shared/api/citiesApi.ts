import {
  MOCK_CATEGORIES, MOCK_CITIES, MOCK_ORDER_STATUS, MOCK_POINTS, MOCK_RATES, MOCK_RATE_TYPES,
} from './mockStore';

export const CITIES_API = { getAll: () => MOCK_CITIES.getAll() };
export const POINTS_API = {
  getAll: (params?: Record<string, unknown>) => MOCK_POINTS.getAll(params),
};
export const RATES_API = { getAll: () => MOCK_RATES.getAll() };
export const RATE_TYPES_API = { getAll: () => MOCK_RATE_TYPES.getAll() };
export const CATEGORIES_API = { getAll: () => MOCK_CATEGORIES.getAll() };
export const ORDER_STATUS_API = { getAll: () => MOCK_ORDER_STATUS.getAll() };

