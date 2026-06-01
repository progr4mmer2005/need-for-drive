import type { IFormState } from '../../types';

export function calcProgress(form: IFormState): number {
  const fields = [
    form.name,
    form.categoryId,
    form.colors.length > 0 ? 'ok' : '',
    form.priceMin,
    form.priceMax,
  ];
  return Math.round((fields.filter(Boolean).length / fields.length) * 100);
}
