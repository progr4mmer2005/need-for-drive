import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { AdminToast, useAdminToast } from '@/shared/components/AdminToast';
import { AdminField } from '@/shared/components/AdminField';
import { Loader } from '@/shared/components/Loader';
import { NominatimAutocomplete } from '@/shared/components/NominatimAutocomplete';
import { initCity } from './lib/handlers/initCity';
import { handleSave } from './lib/handlers/handleSave';
import { handleDelete } from './lib/handlers/handleDelete';
import styles from './CityEditPage.module.scss';

export function CityEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [isCityConfirmed, setIsCityConfirmed] = useState(!isNew);
  const { toast, showToast, closeToast } = useAdminToast();

  useEffect(() => {
    void initCity(id, isNew, { setName, setIsCityConfirmed, setLoading });
  }, [id, isNew]);

  if (loading) return <Loader />;

  return (
    <div>
      <AdminToast toast={toast} onClose={closeToast} />

      <AdminPageTitle>{isNew ? 'Новый город' : 'Редактирование города'}</AdminPageTitle>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Настройки города</h2>

        <AdminField label="Название города">
          <NominatimAutocomplete
            mode="city"
            value={name}
            placeholder="Москва"
            error={error}
            onChange={(val) => { setName(val); setError(''); setIsCityConfirmed(false); }}
            onConfirm={() => setIsCityConfirmed(true)}
          />
        </AdminField>

        <div className={styles.bottomActions}>
          <div className={styles.leftActions}>
            <button
              type="button"
              className={styles.saveBtn}
              disabled={saving}
              onClick={() => handleSave(name, { isNew, id: Number(id), isCityConfirmed, setError, setSaving, showToast, navigate })}
            >
              Сохранить
            </button>
            <button type="button" className={styles.cancelBtn} onClick={() => navigate('/admin/cities')}>
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
