import { mockCars } from './mockStore';
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

export const carsApi = {
  getAll: (params?: QueryParams): Promise<ApiResponse<Car[]>> =>
    mockCars.getAll(params as { limit?: number; page?: number }),
  getOne: (id: number) => mockCars.getOne(id),
  create: (dto: CarDto) => mockCars.create(dto as Partial<Car> & { categoryId: { id: number } }),
  update: (id: number, dto: Partial<CarDto>) =>
    mockCars.update(id, dto as Partial<Car> & { categoryId?: { id: number } }),
  delete: (id: number) => mockCars.delete(id),
};
