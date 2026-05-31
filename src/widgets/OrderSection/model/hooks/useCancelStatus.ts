import { useState, useEffect } from 'react';
import { ORDER_STATUS_API } from '@/shared/api/citiesApi';
import type { OrderStatus } from '@/shared/api/types';

function findCancelStatus(statuses: OrderStatus[]): number | null {
  const found = statuses.find((s) => {
    const name = s.name.toLowerCase();
    return name.includes('отмен') || name.includes('cancel');
  });
  return found?.id ?? null;
}

async function loadCancelStatusId(): Promise<number | null> {
  const { data } = await ORDER_STATUS_API.getAll();
  return findCancelStatus(data);
}

export function useCancelStatus(): number | null {
  const [cancelStatusId, setCancelStatusId] = useState<number | null>(null);

  useEffect(() => {
    loadCancelStatusId()
      .then(setCancelStatusId)
      .catch(() => {});
  }, []);

  return cancelStatusId;
}
