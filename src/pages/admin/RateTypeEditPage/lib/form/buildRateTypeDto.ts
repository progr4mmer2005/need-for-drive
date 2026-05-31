import type { IFormState } from '../../types';

export function buildRateTypeDto(form: IFormState) {
  return { name: form.name.trim(), unit: form.unit.trim() };
}
