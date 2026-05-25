import { MOCK_ORDERS } from './mockStore';
import type { ApiResponse, Order, QueryParams } from './types';

export interface OrderDto {
  orderStatusId?: { id: number };
  cityId: { id: number };
  pointId: { id: number };
  carId: { id: number };
  rateId: { id: number };
  color: string;
  dateFrom: number;
  dateTo: number;
  price: number;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
}

export const ORDERS_API = {
  getAll: (params?: QueryParams): Promise<ApiResponse<Order[]>> =>
    MOCK_ORDERS.getAll(params as { limit?: number; page?: number }),
  getOne: (id: number) => MOCK_ORDERS.getOne(id),
  create: (dto: OrderDto) => MOCK_ORDERS.create(dto),
  update: (id: number, dto: Partial<OrderDto>) => MOCK_ORDERS.update(id, dto),
  delete: (id: number) => MOCK_ORDERS.delete(id),
};

