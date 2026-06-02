import API_CLIENT from './apiClient';
import type { ApiResponse, Category } from './types';

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
  update: async (
    id: number,
    dto: { name: string; description?: string }
  ): Promise<ApiResponse<Category>> => {
    const { data } = await API_CLIENT.put<ApiResponse<Category>>(`/db/category/${id}`, dto);
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await API_CLIENT.delete(`/db/category/${id}`);
  },
};
