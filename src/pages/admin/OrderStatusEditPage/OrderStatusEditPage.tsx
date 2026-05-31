import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { AdminToast, useAdminToast } from '@/shared/components/AdminToast';
import { AdminField, AdminInput } from '@/shared/components/AdminField';
import { Loader } from '@/shared/components/Loader';
import { initOrderStatus } from './lib/handlers/initOrderStatus';
import { handleSave } from './lib/handlers/handleSave';
import { handleDelete } from './lib/handlers/handleDelete';
import styles from './OrderStatusEditPage.module.scss';

export function OrderStatusEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const { toast, showToast, closeToast } = useAdminToast();

  useEffect(() => {
    void initOrderStatus(id, isNew, { setName, setLoading });
  }, [id, isNew]);

  if (loading) return <Loader />;

  return (
    <div>
      <AdminToast toast={toast} onClose={closeToast} />

      <AdminPageTitle>{isNew ? 'Новый статус заказа' : 'Редактирование статуса'}</AdminPageTitle>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Настройки статуса</h2>

        <AdminField label="Название статуса" error={error}>
          <AdminInput
            value={name}
            maxLength={150}
            placeholder="Новый"
            hasError={!!error}
            onChange={(e) => { setName(e.target.value); setError(''); }}
          />
        </AdminField>

        <div className={styles.bottomActions}>
          <div className={styles.leftActions}>
            <button
              type="button"
              className={styles.saveBtn}
              disabled={saving}
              onClick={() => handleSave(name, { isNew, id: Number(id), setError, setSaving, showToast, navigate })}
            >
              Сохранить
            </button>
            <button type="button" className={styles.cancelBtn} onClick={() => navigate('/admin/order-statuses')}>
              Отменить
            </button>
          </div>
          {!isNew && (
            <button
              type="button"
              className={styles.deleteBtn}
              disabled={saving}
              onClick={() => handleDelete({ id: Number(id), setSaving, showToast, navigate })}
            >
              Удалить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
