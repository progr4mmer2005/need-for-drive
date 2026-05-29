import API_CLIENT from './apiClient';
import type {
  ApiResponse,
  Category,
  City,
  OrderStatus,
  Point,
  Rate,
  RateType,
} from './types';

export const CITIES_API = {
  getAll: async (): Promise<ApiResponse<City[]>> => {
    const { data } = await API_CLIENT.get<ApiResponse<City[]>>('/db/city');
    return data;
  },
};

export const POINTS_API = {
  getAll: async (params?: Record<string, unknown>): Promise<ApiResponse<Point[]>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Point[]>>('/db/point', { params });
    return data;
  },
};

export const RATES_API = {
  getAll: async (): Promise<ApiResponse<Rate[]>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Rate[]>>('/db/rate');
    return data;
  },
};

export const RATE_TYPES_API = {
  getAll: async (): Promise<ApiResponse<RateType[]>> => {
    const { data } = await API_CLIENT.get<ApiResponse<RateType[]>>('/db/rateType');
    return data;
  },
};

export const CATEGORIES_API = {
  getAll: async (): Promise<ApiResponse<Category[]>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Category[]>>('/db/category');
    return data;
  },
  create: async (dto: { name: string; description?: string }): Promise<ApiResponse<Category>> => {
    const { data } = await API_CLIENT.post<ApiResponse<Category>>('/db/category/', dto);
    return data;
  },
};

export const ORDER_STATUS_API = {
  getAll: async (): Promise<ApiResponse<OrderStatus[]>> => {
    const { data } = await API_CLIENT.get<ApiResponse<OrderStatus[]>>('/db/orderStatus');
    return data;
  },
};
