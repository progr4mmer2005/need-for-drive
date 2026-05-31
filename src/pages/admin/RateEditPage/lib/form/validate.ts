import type { IFormState } from '../../types';

export function validate(form: IFormState): Partial<Record<keyof IFormState, string>> {
  const errs: Partial<Record<keyof IFormState, string>> = {};
  if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0) errs.price = 'Укажите корректную цену';
  if (!form.rateTypeId) errs.rateTypeId = 'Выберите тип тарифа';
  return errs;
}
