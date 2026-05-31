export interface IFormState {
  name: string;
  categoryId: string;
  description: string;
  priceMin: string;
  priceMax: string;
  number: string;
  tank: string;
  colorInput: string;
  colors: string[];
  thumbnailPath: string;
  thumbnailName: string;
  thumbnailMime: string;
}

export type TToast = { message: string; type: 'success' | 'error' };
