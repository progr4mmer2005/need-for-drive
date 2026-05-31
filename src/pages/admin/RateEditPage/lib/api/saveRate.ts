import { RATES_API } from '@/shared/api/citiesApi';

type TRateDto = { price: number; rateTypeId: { id: number } };

export async function saveRate(isNew: boolean, id: number, dto: TRateDto): Promise<void> {
  if (isNew) {
    await RATES_API.create(dto);
  } else {
    await RATES_API.update(id, dto);
  }
}
