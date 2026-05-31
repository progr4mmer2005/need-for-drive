import type { IFormState } from '../../types';

export function validate(form: IFormState): Partial<Record<keyof IFormState, string>> {
  const errs: Partial<Record<keyof IFormState, string>> = {};
  if (!form.name.trim()) errs.name = 'Обязательное поле';
  if (!form.unit.trim()) errs.unit = 'Обязательное поле';
  return errs;
}
