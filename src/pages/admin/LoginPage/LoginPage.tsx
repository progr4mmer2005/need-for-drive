import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { NeedForDriveLogoIcon } from '@/shared/icons';
import { useAuth } from '@/shared/context/AuthContext';
import type { TErrors } from './types';
import { validateUsername } from './lib/form/validateUsername';
import { validatePassword } from './lib/form/validatePassword';
import { handleSubmit } from './lib/handlers/handleSubmit';
import styles from './LoginPage.module.scss';

export function LoginPage() {
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/admin/orders" replace />;

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<TErrors>({});
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.logoWrap}>
        <NeedForDriveLogoIcon className={styles.logoIcon} />
        <span className={styles.logoText}>Need for drive</span>
      </div>

      <div className={styles.card}>
        <h2 className={styles.title}>{isRegisterMode ? 'Регистрация' : 'Вход'}</h2>
        <form
          className={styles.form}
          noValidate
          onSubmit={(e) =>
            handleSubmit(e, {
              username,
              password,
              isRegisterMode,
              setErrors,
              setLoading,
              login,
              register,
              navigate,
            })
          }
        >
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="username">
              Логин
            </label>
            <input
              id="username"
              type="text"
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
              placeholder="intern"
              value={username}
              maxLength={150}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() =>
                setErrors((prev) => ({ ...prev, username: validateUsername(username.trim()) }))
              }
            />
            {errors.username && <span className={styles.errorMsg}>{errors.username}</span>}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="password">
              Пароль
            </label>
            <div className={styles.passWrap}>
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                className={`${styles.input} ${styles.passInput} ${errors.password ? styles.inputError : ''}`}
                value={password}
                maxLength={150}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() =>
                  setErrors((prev) => ({ ...prev, password: validatePassword(password) }))
                }
              />
            </div>
            {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}
          </div>

          {errors.form && <div className={styles.formError}>{errors.form}</div>}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.requestBtn}
              onClick={() => {
                setErrors({});
                setIsRegisterMode((prev) => !prev);
              }}
            >
              {isRegisterMode ? 'У меня уже есть аккаунт' : 'Запросить доступ'}
            </button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading
                ? isRegisterMode
                  ? 'Регистрация...'
                  : 'Вход...'
                : isRegisterMode
                  ? 'Зарегистрироваться'
                  : 'Войти'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
