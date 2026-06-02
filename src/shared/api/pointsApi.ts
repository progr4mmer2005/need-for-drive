import API_CLIENT from './apiClient';
import type { ApiResponse, Point } from './types';

export const POINTS_API = {
  getAll: async (params?: Record<string, unknown>): Promise<ApiResponse<Point[]>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Point[]>>('/db/point', { params });
    return data;
  },
  getOne: async (id: number): Promise<ApiResponse<Point>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Point>>(`/db/point/${id}`);
    return data;
  },
  create: async (dto: {
    name: string;
    address: string;
    cityId: { id: number };
  }): Promise<ApiResponse<Point>> => {
    const { data } = await API_CLIENT.post<ApiResponse<Point>>('/db/point/', dto);
    return data;
  },
  update: async (
    id: number,
    dto: { name: string; address: string; cityId: { id: number } }
  ): Promise<ApiResponse<Point>> => {
    const { data } = await API_CLIENT.put<ApiResponse<Point>>(`/db/point/${id}`, dto);
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await API_CLIENT.delete(`/db/point/${id}`);
  },
};
