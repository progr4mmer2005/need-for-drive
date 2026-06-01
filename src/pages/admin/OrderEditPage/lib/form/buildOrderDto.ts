import type { Order } from '@/shared/api/types';
import type { IFormState } from '../../types';

export function buildOrderDto(form: IFormState, order: Order | null) {
  return {
    orderStatusId: form.statusId ? { id: Number(form.statusId) } : undefined,
    cityId: { id: Number(form.cityId) },
    pointId: { id: Number(form.pointId) },
    carId: { id: Number(form.carId) },
    rateId: { id: Number(form.rateId) },
    color: form.color,
    dateFrom: form.dateFrom ? new Date(form.dateFrom).getTime() : order?.dateFrom ?? 0,
    dateTo: form.dateTo ? new Date(form.dateTo).getTime() : order?.dateTo ?? 0,
    price: Number(form.price) || 0,
    isFullTank: form.isFullTank,
    isNeedChildChair: form.isNeedChildChair,
    isRightWheel: form.isRightWheel,
  };
}
