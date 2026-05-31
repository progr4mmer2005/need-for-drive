import type { IFormState } from '../../types';

export type TCategoryDto = {
  name: string;
  description?: string;
};

export function buildCategoryDto(form: IFormState): TCategoryDto {
  return {
    name: form.name.trim(),
    description: form.description.trim() || undefined,
  };
}
