import { useCallback, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { ORDERS_API } from '@/shared/api/ordersApi';
import type { Order } from '@/shared/api/types';
import type { Step } from '../types';
import type { TOrderState } from './useOrderState';

type TCancelOrderParams = {
  backendOrderId: number | null;
  cancelStatusId: number | null;
  setOrderState: Dispatch<SetStateAction<TOrderState>>;
};

async function sendCancelRequest(order: Order, cancelStatusId: number | null) {
  await ORDERS_API.update(order.id, {
    ...(cancelStatusId ? { orderStatusId: { id: cancelStatusId } } : {}),
    cityId: { id: order.cityId.id },
    pointId: { id: order.pointId.id },
    carId: { id: order.carId.id },
    rateId: { id: order.rateId.id },
    color: order.color,
    dateFrom: Number(order.dateFrom),
    dateTo: Number(order.dateTo),
    price: Number(order.price),
    isFullTank: order.isFullTank,
    isNeedChildChair: order.isNeedChildChair,
    isRightWheel: order.isRightWheel,
  });
}

function resetOrderState(setOrderState: Dispatch<SetStateAction<TOrderState>>) {
  setOrderState((prev) => ({
    ...prev,
    isCancelConfirmOpen: false,
    step: 1 as Step,
    orderId: '',
    backendOrderId: null,
  }));
}

export function useCancelOrder({ backendOrderId, cancelStatusId, setOrderState }: TCancelOrderParams) {
  const navigate = useNavigate();

  const handleCancelOrder = useCallback(async () => {
    if (backendOrderId) {
      try {
        const { data: current } = await ORDERS_API.getOne(backendOrderId);
        await sendCancelRequest(current, cancelStatusId);
      } catch (e) {
        console.warn('Cancel order failed', e);
      }
    }

    localStorage.removeItem('ORDER_STORAGE_KEY');
    resetOrderState(setOrderState);
    navigate('/order');
  }, [backendOrderId, cancelStatusId, setOrderState, navigate]);

  return { handleCancelOrder };
}
