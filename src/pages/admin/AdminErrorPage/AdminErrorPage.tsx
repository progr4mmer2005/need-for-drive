import { useNavigate } from 'react-router-dom';
import styles from './AdminErrorPage.module.scss';

const DEFAULT_MESSAGES: Record<number, string> = {
  404: 'Страница не найдена',
  500: 'Внутренняя ошибка сервера',
};

interface AdminErrorPageProps { code?: number; message?: string; }

export function AdminErrorPage({ code = 500, message }: AdminErrorPageProps) {
  const navigate = useNavigate();
  const displayMessage = message ?? DEFAULT_MESSAGES[code] ?? 'Что-то пошло не так';

  return (
    <div className={styles.page}>
      <div className={styles.code}>{code}</div>
      <h2 className={styles.title}>{displayMessage}</h2>
      <p className={styles.subtitle}>Попробуйте перезагрузить страницу</p>
      <button type="button" className={styles.backBtn} onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
}
