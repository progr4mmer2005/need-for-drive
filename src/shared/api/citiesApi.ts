import API_CLIENT from './apiClient';
import type { ApiResponse, City } from './types';

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
