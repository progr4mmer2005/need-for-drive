import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { NeedForDriveLogoIcon } from '@/shared/icons';
import { useAuth } from '@/shared/context/AuthContext';
import styles from './LoginPage.module.scss';

export function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  const validateUsername = (val: string) => {
    if (!val.trim()) return 'Поле обязательно';
    return '';
  };

  const validatePassword = (val: string) => {
    if (!val) return 'Поле обязательно';
    return '';
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleUsernameBlur = () => {
    setErrors((prevErrors) => ({ ...prevErrors, username: validateUsername(username.trim()) }));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordBlur = () => {
    setErrors((prevErrors) => ({ ...prevErrors, password: validatePassword(password) }));
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const usernameTrimmed = username.trim();
    const usernameErr = validateUsername(usernameTrimmed);
    const passErr = validatePassword(password);

    if (usernameErr || passErr) {
      setErrors({ username: usernameErr, password: passErr });
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      if (isRegisterMode) {
        await register(usernameTrimmed, password);
      } else {
        await login(usernameTrimmed, password);
      }
      navigate('/admin/orders');
    } catch {
      setErrors({
        form: isRegisterMode
          ? 'Не удалось зарегистрироваться (возможно, пользователь уже существует)'
          : 'Неверный логин или пароль',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.logoWrap}>
        <NeedForDriveLogoIcon className={styles.logoIcon} />
        <span className={styles.logoText}>Need for drive</span>
      </div>

      <div className={styles.card}>
        <h2 className={styles.title}>{isRegisterMode ? 'Регистрация' : 'Вход'}</h2>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="username">Логин</label>
            <input
              id="username"
              type="text"
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
              placeholder="intern"
              value={username}
              maxLength={150}
              onChange={handleUsernameChange}
              onBlur={handleUsernameBlur}
            />
            {errors.username && <span className={styles.errorMsg}>{errors.username}</span>}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="password">Пароль</label>
            <div className={styles.passWrap}>
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                className={`${styles.input} ${styles.passInput} ${errors.password ? styles.inputError : ''}`}
                value={password}
                maxLength={150}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
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
              {loading ? (isRegisterMode ? 'Регистрация...' : 'Вход...') : (isRegisterMode ? 'Зарегистрироваться' : 'Войти')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
