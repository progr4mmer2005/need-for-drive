export interface IToast {
  message: string;
  type: 'success' | 'error';
}

export interface IFormState {
  name: string;
  description: string;
}
