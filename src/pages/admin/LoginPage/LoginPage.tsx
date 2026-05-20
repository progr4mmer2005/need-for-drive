import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <svg className={styles.logoIcon} viewBox="0 0 45 45" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M0 22.25C0 9.96178 9.96198 0 22.2504 0C34.538 0 44.5 9.96178 44.5 22.25C44.5 25.0644 43.9774 27.7567 43.0241 30.2353C41.3767 27.6868 38.5104 26 35.25 26C30.1414 26 26 30.1414 26 35.25C26 38.5104 27.6868 41.3768 30.2354 43.0241C27.7569 43.9775 25.0647 44.5 22.2504 44.5C9.96198 44.5 0 34.5382 0 22.25ZM30.2354 43.0241C31.6801 43.9579 33.4018 44.5 35.25 44.5C40.3586 44.5 44.5 40.3586 44.5 35.25C44.5 33.4017 43.9579 31.6801 43.0241 30.2353C40.7682 36.1002 36.1001 40.7682 30.2354 43.0241Z" fill="#0EC261" /></svg>
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
