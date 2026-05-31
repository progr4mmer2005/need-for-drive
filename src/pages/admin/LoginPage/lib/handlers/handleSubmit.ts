import type { FormEvent, Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import type { TErrors } from '../../types';
import { validateUsername } from '../form/validateUsername';
import { validatePassword } from '../form/validatePassword';

type TDeps = {
  username: string;
  password: string;
  isRegisterMode: boolean;
  setErrors: Dispatch<SetStateAction<TErrors>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  navigate: NavigateFunction;
};

export async function handleSubmit(event: FormEvent, deps: TDeps): Promise<void> {
  event.preventDefault();
  const usernameTrimmed = deps.username.trim();
  const usernameErr = validateUsername(usernameTrimmed);
  const passErr = validatePassword(deps.password);

  if (usernameErr || passErr) {
    deps.setErrors({ username: usernameErr, password: passErr });
    return;
  }

  deps.setErrors({});
  deps.setLoading(true);
  try {
    if (deps.isRegisterMode) {
      await deps.register(usernameTrimmed, deps.password);
    } else {
      await deps.login(usernameTrimmed, deps.password);
    }
    deps.navigate('/admin/orders');
  } catch {
    deps.setErrors({
      form: deps.isRegisterMode
        ? 'Не удалось зарегистрироваться (возможно, пользователь уже существует)'
        : 'Неверный логин или пароль',
    });
  } finally {
    deps.setLoading(false);
  }
}
