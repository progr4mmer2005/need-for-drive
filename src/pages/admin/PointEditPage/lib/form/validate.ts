import type { IFormState } from '../../types';

export function validate(form: IFormState, isAddressConfirmed: boolean): Partial<Record<keyof IFormState, string>> {
  const errs: Partial<Record<keyof IFormState, string>> = {};
  if (!form.name.trim()) errs.name = 'Обязательное поле';
  if (!form.cityId) errs.cityId = 'Выберите город';
  if (!form.address.trim()) {
    errs.address = 'Обязательное поле';
  } else if (!isAddressConfirmed) {
    errs.address = 'Выберите адрес из выпадающего списка';
  }
  return errs;
}
