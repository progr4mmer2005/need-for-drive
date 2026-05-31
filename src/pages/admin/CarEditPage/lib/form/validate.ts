import type { IFormState } from '../../types';

export function validate(form: IFormState): Partial<Record<keyof IFormState, string>> {
  const errs: Partial<Record<keyof IFormState, string>> = {};
  if (!form.name.trim()) errs.name = 'Обязательное поле';
  else if (form.name.length > 150) errs.name = 'Не более 150 символов';
  if (!form.categoryId) errs.categoryId = 'Выберите тип автомобиля';
  if (!form.colors.length) errs.colorInput = 'Добавьте хотя бы один цвет';
  return errs;
}
