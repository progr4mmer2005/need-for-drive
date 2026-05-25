import { MOCK_CARS } from './mockStore';
import type { ApiResponse, Car, QueryParams } from './types';

export interface CarDto {
  name: string;
  priceMin: number;
  priceMax: number;
  colors: string[];
  thumbnail: { path: string; originalname: string; mimetype: string } | null;
  description?: string;
  number?: string;
  tank?: string;
  categoryId: { id: number };
}

export const CARS_API = {
  getAll: (params?: QueryParams): Promise<ApiResponse<Car[]>> =>
    MOCK_CARS.getAll(params as { limit?: number; page?: number }),
  getOne: (id: number) => MOCK_CARS.getOne(id),
  create: (dto: CarDto) => MOCK_CARS.create(dto as Partial<Car> & { categoryId: { id: number } }),
  update: (id: number, dto: Partial<CarDto>) =>
    MOCK_CARS.update(id, dto as Partial<Car> & { categoryId?: { id: number } }),
  delete: (id: number) => MOCK_CARS.delete(id),
};

