import { useNavigate } from 'react-router-dom';
import styles from './AdminErrorPage.module.scss';

interface AdminErrorPageProps { code?: number; message?: string; }

export function AdminErrorPage({ code = 500, message = 'Страница не найдена' }: AdminErrorPageProps) {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className={styles.code}>{code}</div>
      <h2 className={styles.title}>Что то пошло не так</h2>
      <p className={styles.subtitle}>Попробуйте перезагрузить страницу</p>
      <button type="button" className={styles.backBtn} onClick={() => navigate(-1)}>Назад</button>
      <span style={{display:'none'}}>{message}</span>
    </div>
  );
}
