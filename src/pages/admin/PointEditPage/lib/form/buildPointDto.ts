import type { IFormState } from '../../types';

export function buildPointDto(form: IFormState) {
  return {
    name: form.name.trim(),
    address: form.address.trim(),
    cityId: { id: Number(form.cityId) },
  };
}
