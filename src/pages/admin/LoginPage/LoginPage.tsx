import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { NeedForDriveLogoIcon } from '@/shared/icons';
import { useAuth } from '@/shared/context/AuthContext';
import styles from './LoginPage.module.scss';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (val: string) => {
    if (!val.trim()) return 'Это поле обязательно к заполнению';
    if (!val.includes('@')) return 'Введите корректный email';
    return '';
  };

  const validatePassword = (val: string) => (!val ? 'Это поле обязательно к заполнению' : '');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const emailTrimmed = email.trim();
    const emailErr = validateEmail(emailTrimmed);
    const passErr = validatePassword(password);
    if (emailErr || passErr) return setErrors({ email: emailErr, password: passErr });

    setErrors({});
    setLoading(true);
    try {
      await login(emailTrimmed, password);
      navigate('/admin/orders');
    } catch {
      setErrors({ form: 'Неверный логин или пароль' });
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
        <h2 className={styles.title}>Вход</h2>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="email">Почта</label>
            <input id="email" type="email" className={`${styles.input} ${errors.email ? styles.inputError : ''}`} placeholder="admin@ss.com" value={email} maxLength={150} onChange={(e) => setEmail(e.target.value)} onBlur={() => setErrors((p) => ({ ...p, email: validateEmail(email.trim()) }))} />
            {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="password">Пароль</label>
            <div className={styles.passWrap}>
              <input id="password" type={showPass ? 'text' : 'password'} className={`${styles.input} ${styles.passInput} ${errors.password ? styles.inputError : ''}`} value={password} maxLength={150} onChange={(e) => setPassword(e.target.value)} onBlur={() => setErrors((p) => ({ ...p, password: validatePassword(password) }))} />
            </div>
            {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}
          </div>
          {errors.form && <div className={styles.formError}>{errors.form}</div>}
          <div className={styles.actions}>
            <button type="button" className={styles.requestBtn}>Запросить доступ</button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>{loading ? 'Вход...' : 'Войти'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

