import type { Car } from '@/shared/api/types';
import type { IFormState } from '../../types';

export function mapCarToForm(car: Car): IFormState {
  return {
    name: car.name || '',
    categoryId: String(car.categoryId?.id || ''),
    description: car.description || '',
    priceMin: String(car.priceMin || ''),
    priceMax: String(car.priceMax || ''),
    number: car.number || '',
    tank: car.tank || '',
    colorInput: '',
    colors: car.colors || [],
    thumbnailPath: car.thumbnail?.path || '',
    thumbnailName: car.thumbnail?.originalname || '',
    thumbnailMime: car.thumbnail?.mimetype || '',
  };
}
