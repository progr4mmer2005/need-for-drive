import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { AdminToast } from '@/shared/components/AdminToast';
import { AdminField, AdminInput } from '@/shared/components/AdminField';
import { Loader } from '@/shared/components/Loader';
import type { TToast } from './types';
import { initUser } from './lib/handlers/initUser';
import { handleSave } from './lib/handlers/handleSave';
import { handleDelete } from './lib/handlers/handleDelete';
import styles from './UserEditPage.module.scss';

export function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<TToast | null>(null);

  const showToast = (message: string, type: TToast['type']) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    void initUser(id, { setUsername, setLoading });
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div>
      {toast && <AdminToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <AdminPageTitle>Редактирование пользователя</AdminPageTitle>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Настройки пользователя</h2>

        <AdminField label="Имя пользователя" error={error}>
          <AdminInput
            value={username}
            maxLength={150}
            placeholder="username"
            hasError={!!error}
            onChange={(e) => { setUsername(e.target.value); setError(''); }}
          />
        </AdminField>

        <div className={styles.bottomActions}>
          <div className={styles.leftActions}>
            <button
              type="button"
              className={styles.saveBtn}
              disabled={saving}
              onClick={() => handleSave(username, { id: Number(id), setError, setSaving, showToast })}
            >
              Сохранить
            </button>
            <button type="button" className={styles.cancelBtn} onClick={() => navigate('/admin/users')}>
              Отменить
            </button>
          </div>
          <button
            type="button"
            className={styles.deleteBtn}
            disabled={saving}
            onClick={() => handleDelete({ id: Number(id), setSaving, showToast, navigate })}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
