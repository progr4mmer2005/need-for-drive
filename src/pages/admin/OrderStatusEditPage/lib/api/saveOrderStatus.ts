import { ORDER_STATUS_API } from '@/shared/api/citiesApi';

export async function saveOrderStatus(isNew: boolean, id: number, name: string): Promise<number | undefined> {
  if (isNew) {
    const res = await ORDER_STATUS_API.create({ name });
    return res.data.id;
  }
  await ORDER_STATUS_API.update(id, { name });
  return undefined;
}
