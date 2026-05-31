export function validate(name: string, isCityConfirmed: boolean): string {
  if (!name.trim()) return 'Обязательное поле';
  if (name.length > 150) return 'Не более 150 символов';
  if (!isCityConfirmed) return 'Выберите город из выпадающего списка';
  return '';
}
