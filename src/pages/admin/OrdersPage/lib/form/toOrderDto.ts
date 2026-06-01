import type { Order } from '@/shared/api/types';
import type { OrderDto } from '@/shared/api/ordersApi';

export function toOrderDto(order: Order, statusId?: number): OrderDto {
  return {
    orderStatusId: statusId
      ? { id: statusId }
      : order.orderStatusId
        ? { id: order.orderStatusId.id }
        : undefined,
    cityId: { id: order.cityId.id },
    pointId: { id: order.pointId.id },
    carId: { id: order.carId.id },
    rateId: { id: order.rateId.id },
    color: order.color,
    dateFrom: Number(order.dateFrom) || 0,
    dateTo: Number(order.dateTo) || 0,
    price: Number(order.price) || 0,
    isFullTank: order.isFullTank,
    isNeedChildChair: order.isNeedChildChair,
    isRightWheel: order.isRightWheel,
  };
}
