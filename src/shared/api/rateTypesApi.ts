import API_CLIENT from './apiClient';
import type { ApiResponse, RateType } from './types';

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
  update: async (
    id: number,
    dto: { name: string; unit: string }
  ): Promise<ApiResponse<RateType>> => {
    const { data } = await API_CLIENT.put<ApiResponse<RateType>>(`/db/rateType/${id}`, dto);
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await API_CLIENT.delete(`/db/rateType/${id}`);
  },
};
