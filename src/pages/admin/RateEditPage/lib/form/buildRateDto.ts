import type { IFormState } from '../../types';

export function buildRateDto(form: IFormState) {
  return { price: Number(form.price), rateTypeId: { id: Number(form.rateTypeId) } };
}
