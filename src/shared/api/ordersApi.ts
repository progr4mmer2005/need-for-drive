import { mockOrders } from './mockStore';
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

export const ordersApi = {
  getAll: (params?: QueryParams): Promise<ApiResponse<Order[]>> =>
    mockOrders.getAll(params as { limit?: number; page?: number }),
  getOne: (id: number) => mockOrders.getOne(id),
  create: (dto: OrderDto) => mockOrders.create(dto),
  update: (id: number, dto: Partial<OrderDto>) => mockOrders.update(id, dto),
  delete: (id: number) => mockOrders.delete(id),
};
