import type { Dispatch, SetStateAction } from 'react';
import { validate } from '../form/validate';
import { saveUser } from '../api/saveUser';

type TDeps = {
  id: number;
  setError: Dispatch<SetStateAction<string>>;
  setSaving: Dispatch<SetStateAction<boolean>>;
  showToast: (message: string, type: 'success' | 'error') => void;
};

export async function handleSave(username: string, deps: TDeps): Promise<void> {
  const error = validate(username);
  if (error) {
    deps.setError(error);
    return;
  }
  deps.setSaving(true);
  try {
    await saveUser(deps.id, username.trim());
    deps.showToast('Пользователь сохранён', 'success');
  } catch (err: unknown) {
    const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
    deps.showToast(msg || 'Ошибка при сохранении', 'error');
  } finally {
    deps.setSaving(false);
  }
}
