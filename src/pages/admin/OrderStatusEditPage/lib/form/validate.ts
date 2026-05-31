export function validate(name: string): string {
  if (!name.trim()) return 'Обязательное поле';
  if (name.length > 150) return 'Не более 150 символов';
  return '';
}
