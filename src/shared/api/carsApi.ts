import API_CLIENT from './apiClient';
import type { ApiResponse, Car, QueryParams } from './types';

export interface CarDto {
  name: string;
  priceMin: number;
  priceMax: number;
  colors: string[];
  thumbnail: { path: string; originalname: string; mimetype: string; size?: number } | null;
  description?: string;
  number?: string;
  tank?: string;
  categoryId: { id: number };
}

export const CARS_API = {
  getAll: async (params?: QueryParams): Promise<ApiResponse<Car[]>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Car[]>>('/db/car', { params });
    return data;
  },
  getOne: async (id: number): Promise<ApiResponse<Car>> => {
    const { data } = await API_CLIENT.get<ApiResponse<Car>>(`/db/car/${id}`);
    return data;
  },
  create: async (dto: CarDto): Promise<ApiResponse<Car>> => {
    const { data } = await API_CLIENT.post<ApiResponse<Car>>('/db/car/', dto);
    return data;
  },
  update: async (id: number, dto: Partial<CarDto>): Promise<ApiResponse<Car>> => {
    const { data } = await API_CLIENT.put<ApiResponse<Car>>(`/db/car/${id}`, dto);
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await API_CLIENT.delete(`/db/car/${id}`);
  },
};
