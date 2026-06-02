import { RATES_API } from '@/shared/api/ratesApi';

type TRateDto = { price: number; rateTypeId: { id: number } };

export async function saveRate(
  isNew: boolean,
  id: number,
  dto: TRateDto
): Promise<number | undefined> {
  if (isNew) {
    const res = await RATES_API.create(dto);
    return res.data.id;
  }
  await RATES_API.update(id, dto);
  return undefined;
}
