import {
  mockCategories, mockCities, mockOrderStatus, mockPoints, mockRates, mockRateTypes,
} from './mockStore';

export const citiesApi = { getAll: () => mockCities.getAll() };
export const pointsApi = {
  getAll: (params?: Record<string, unknown>) => mockPoints.getAll(params),
};
export const ratesApi = { getAll: () => mockRates.getAll() };
export const rateTypesApi = { getAll: () => mockRateTypes.getAll() };
export const categoriesApi = { getAll: () => mockCategories.getAll() };
export const orderStatusApi = { getAll: () => mockOrderStatus.getAll() };
