import { ORDER_STATUS_API } from '@/shared/api/citiesApi';

export async function saveOrderStatus(isNew: boolean, id: number, name: string): Promise<void> {
  if (isNew) {
    await ORDER_STATUS_API.create({ name });
  } else {
    await ORDER_STATUS_API.update(id, { name });
  }
}
