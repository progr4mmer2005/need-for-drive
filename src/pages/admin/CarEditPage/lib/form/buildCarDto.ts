import type { IFormState } from '../../types';

export type TCarDto = {
  name: string;
  priceMin: number;
  priceMax: number;
  colors: string[];
  description: string;
  number: string;
  tank: string;
  thumbnail?: { path: string; originalname: string; mimetype: string; size: number };
  categoryId: { id: number };
};

export function buildCarDto(form: IFormState): TCarDto {
  const thumbnail = form.thumbnailPath
    ? { path: form.thumbnailPath, originalname: form.thumbnailName || 'upload.png', mimetype: form.thumbnailMime || 'image/png', size: 0 }
    : null;
  return {
    name: form.name.trim(),
    priceMin: Number(form.priceMin) || 0,
    priceMax: Number(form.priceMax) || 0,
    colors: form.colors,
    description: form.description,
    number: form.number,
    tank: form.tank,
    ...(thumbnail ? { thumbnail } : {}),
    categoryId: { id: Number(form.categoryId) },
  };
}
