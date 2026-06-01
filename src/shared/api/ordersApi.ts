import API_CLIENT from './apiClient';
import type { ApiResponse, Order, QueryParams } from './types';

export interface OrderDto {
  orderStatusId?: { id: number };
  cityId: { id: number };
  pointId: { id: number };
  carId: { id: number };
  rateId: { id: number };
  color: string;
  dateFrom: number;
  dateTo: number;
  price: number;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
}

export const ORDERS_API = {
  getAll: async (params?: QueryParams): Promise<ApiResponse<Order[]>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Order[]>>('/db/order', { params });
    return data;
  },
  getOne: async (id: number): Promise<ApiResponse<Order>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Order>>(`/db/order/${id}`);
    return data;
  },
  create: async (dto: OrderDto): Promise<ApiResponse<Order>> => {
    const { data } = await API_CLIENT.post<ApiResponse<Order>>('/db/order/', dto);
    return data;
  },
  update: async (id: number, dto: Partial<OrderDto>): Promise<ApiResponse<Order>> => {
    const { data } = await API_CLIENT.put<ApiResponse<Order>>(`/db/order/${id}`, dto);
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await API_CLIENT.delete(`/db/order/${id}`);
  },
};
