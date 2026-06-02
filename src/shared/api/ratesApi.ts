import API_CLIENT from './apiClient';
import type { ApiResponse, Rate } from './types';

export const RATES_API = {
  getAll: async (): Promise<ApiResponse<Rate[]>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Rate[]>>('/db/rate');
    return data;
  },
  getOne: async (id: number): Promise<ApiResponse<Rate>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Rate>>(`/db/rate/${id}`);
    return data;
  },
  create: async (dto: {
    price: number;
    rateTypeId: { id: number };
  }): Promise<ApiResponse<Rate>> => {
    const { data } = await API_CLIENT.post<ApiResponse<Rate>>('/db/rate/', dto);
    return data;
  },
  update: async (
    id: number,
    dto: { price: number; rateTypeId: { id: number } }
  ): Promise<ApiResponse<Rate>> => {
    const { data } = await API_CLIENT.put<ApiResponse<Rate>>(`/db/rate/${id}`, dto);
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await API_CLIENT.delete(`/db/rate/${id}`);
  },
};
