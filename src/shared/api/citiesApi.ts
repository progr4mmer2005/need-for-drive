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
  getOne: async (id: number): Promise<ApiResponse<City>> => {
    const { data } = await API_CLIENT.get<ApiResponse<City>>(`/db/city/${id}`);
    return data;
  },
  create: async (dto: { name: string }): Promise<ApiResponse<City>> => {
    const { data } = await API_CLIENT.post<ApiResponse<City>>('/db/city/', dto);
    return data;
  },
  update: async (id: number, dto: { name: string }): Promise<ApiResponse<City>> => {
    const { data } = await API_CLIENT.put<ApiResponse<City>>(`/db/city/${id}`, dto);
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await API_CLIENT.delete(`/db/city/${id}`);
  },
};

export const POINTS_API = {
  getAll: async (params?: Record<string, unknown>): Promise<ApiResponse<Point[]>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Point[]>>('/db/point', { params });
    return data;
  },
  getOne: async (id: number): Promise<ApiResponse<Point>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Point>>(`/db/point/${id}`);
    return data;
  },
  create: async (dto: { name: string; address: string; cityId: { id: number } }): Promise<ApiResponse<Point>> => {
    const { data } = await API_CLIENT.post<ApiResponse<Point>>('/db/point/', dto);
    return data;
  },
  update: async (id: number, dto: { name: string; address: string; cityId: { id: number } }): Promise<ApiResponse<Point>> => {
    const { data } = await API_CLIENT.put<ApiResponse<Point>>(`/db/point/${id}`, dto);
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await API_CLIENT.delete(`/db/point/${id}`);
  },
};

export const RATES_API = {
  getAll: async (): Promise<ApiResponse<Rate[]>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Rate[]>>('/db/rate');
    return data;
  },
  getOne: async (id: number): Promise<ApiResponse<Rate>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Rate>>(`/db/rate/${id}`);
    return data;
  },
  create: async (dto: { price: number; rateTypeId: { id: number } }): Promise<ApiResponse<Rate>> => {
    const { data } = await API_CLIENT.post<ApiResponse<Rate>>('/db/rate/', dto);
    return data;
  },
  update: async (id: number, dto: { price: number; rateTypeId: { id: number } }): Promise<ApiResponse<Rate>> => {
    const { data } = await API_CLIENT.put<ApiResponse<Rate>>(`/db/rate/${id}`, dto);
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await API_CLIENT.delete(`/db/rate/${id}`);
  },
};

export const RATE_TYPES_API = {
  getAll: async (): Promise<ApiResponse<RateType[]>> => {
    const { data } = await API_CLIENT.get<ApiResponse<RateType[]>>('/db/rateType');
    return data;
  },
  getOne: async (id: number): Promise<ApiResponse<RateType>> => {
    const { data } = await API_CLIENT.get<ApiResponse<RateType>>(`/db/rateType/${id}`);
    return data;
  },
  create: async (dto: { name: string; unit: string }): Promise<ApiResponse<RateType>> => {
    const { data } = await API_CLIENT.post<ApiResponse<RateType>>('/db/rateType/', dto);
    return data;
  },
  update: async (id: number, dto: { name: string; unit: string }): Promise<ApiResponse<RateType>> => {
    const { data } = await API_CLIENT.put<ApiResponse<RateType>>(`/db/rateType/${id}`, dto);
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await API_CLIENT.delete(`/db/rateType/${id}`);
  },
};

export const CATEGORIES_API = {
  getAll: async (): Promise<ApiResponse<Category[]>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Category[]>>('/db/category');
    return data;
  },
  getOne: async (id: number): Promise<ApiResponse<Category>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Category>>(`/db/category/${id}`);
    return data;
  },
  create: async (dto: { name: string; description?: string }): Promise<ApiResponse<Category>> => {
    const { data } = await API_CLIENT.post<ApiResponse<Category>>('/db/category/', dto);
    return data;
  },
  update: async (id: number, dto: { name: string; description?: string }): Promise<ApiResponse<Category>> => {
    const { data } = await API_CLIENT.put<ApiResponse<Category>>(`/db/category/${id}`, dto);
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await API_CLIENT.delete(`/db/category/${id}`);
  },
};

export const ORDER_STATUS_API = {
  getAll: async (): Promise<ApiResponse<OrderStatus[]>> => {
    const { data } = await API_CLIENT.get<ApiResponse<OrderStatus[]>>('/db/orderStatus');
    return data;
  },
  getOne: async (id: number): Promise<ApiResponse<OrderStatus>> => {
    const { data } = await API_CLIENT.get<ApiResponse<OrderStatus>>(`/db/orderStatus/${id}`);
    return data;
  },
  create: async (dto: { name: string }): Promise<ApiResponse<OrderStatus>> => {
    const { data } = await API_CLIENT.post<ApiResponse<OrderStatus>>('/db/orderStatus/', dto);
    return data;
  },
  update: async (id: number, dto: { name: string }): Promise<ApiResponse<OrderStatus>> => {
    const { data } = await API_CLIENT.put<ApiResponse<OrderStatus>>(`/db/orderStatus/${id}`, dto);
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await API_CLIENT.delete(`/db/orderStatus/${id}`);
  },
};
