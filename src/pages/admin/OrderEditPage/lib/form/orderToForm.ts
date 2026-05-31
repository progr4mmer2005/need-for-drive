import type { Order } from '@/shared/api/types';
import type { IFormState } from '../../types';
import { tsToInput } from './tsToInput';

export function orderToForm(order: Order): IFormState {
  return {
    statusId: String(order.orderStatusId?.id ?? ''),
    cityId: String(order.cityId?.id ?? ''),
    pointId: String(order.pointId?.id ?? ''),
    carId: String(order.carId?.id ?? ''),
    rateId: String(order.rateId?.id ?? ''),
    color: order.color ?? '',
    dateFrom: tsToInput(order.dateFrom),
    dateTo: tsToInput(order.dateTo),
    price: String(order.price ?? ''),
    isFullTank: Boolean(order.isFullTank),
    isNeedChildChair: Boolean(order.isNeedChildChair),
    isRightWheel: Boolean(order.isRightWheel),
  };
}
