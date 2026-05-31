export function validate(username: string): string {
  if (!username.trim()) return 'Обязательное поле';
  if (username.length > 150) return 'Не более 150 символов';
  return '';
}
