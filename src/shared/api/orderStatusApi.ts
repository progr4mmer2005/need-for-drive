import API_CLIENT from './apiClient';
import type { ApiResponse, OrderStatus } from './types';

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
