export function validateUsername(value: string): string {
  if (!value.trim()) return 'Поле обязательно';
  return '';
}
