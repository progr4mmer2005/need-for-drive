import type { Dispatch, SetStateAction } from 'react';
import type { IFormState } from '../../types';
import { addColor } from '../form/addColor';

type TDeps = {
  setForm: Dispatch<SetStateAction<IFormState>>;
  setErrors: Dispatch<SetStateAction<Partial<Record<keyof IFormState, string>>>>;
};

export function handleAddColor(form: IFormState, deps: TDeps): void {
  const result = addColor(form.colorInput, form.colors);
  if (!result) return;
  if (!result.ok) {
    deps.setErrors((prev) => ({ ...prev, colorInput: result.error }));
    return;
  }
  deps.setForm((prev) => ({ ...prev, colors: result.colors, colorInput: '' }));
  deps.setErrors((prev) => ({ ...prev, colorInput: '' }));
}
