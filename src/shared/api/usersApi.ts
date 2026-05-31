import API_CLIENT from './apiClient';
import type { ApiResponse, User } from './types';

export const USERS_API = {
  getAll: async (params?: Record<string, unknown>): Promise<ApiResponse<User[]>> => {
    const { data } = await API_CLIENT.get<ApiResponse<User[]>>('/db/user', { params });
    return data;
  },
  getOne: async (id: number): Promise<ApiResponse<User>> => {
    const { data } = await API_CLIENT.get<ApiResponse<User>>(`/db/user/${id}`);
    return data;
  },
  update: async (id: number, dto: { username: string }): Promise<ApiResponse<User>> => {
    const { data } = await API_CLIENT.put<ApiResponse<User>>(`/db/user/${id}`, dto);
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await API_CLIENT.delete(`/db/user/${id}`);
  },
};
