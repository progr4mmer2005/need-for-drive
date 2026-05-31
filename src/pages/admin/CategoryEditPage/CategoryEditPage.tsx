import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { AdminToast } from '@/shared/components/AdminToast';
import { AdminField, AdminInput } from '@/shared/components/AdminField';
import { Loader } from '@/shared/components/Loader';
import type { IFormState, IToast } from './types';
import { INITIAL } from './constants';
import { initCategory } from './lib/handlers/initCategory';
import { handleSave } from './lib/handlers/handleSave';
import { handleDelete } from './lib/handlers/handleDelete';
import styles from './CategoryEditPage.module.scss';

export function CategoryEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [form, setForm] = useState<IFormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof IFormState, string>>>({});
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<IToast | null>(null);

  const showToast = (message: string, type: IToast['type']) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    void initCategory(id, isNew, { setForm, setLoading });
  }, [id, isNew]);

  if (loading) return <Loader />;

  return (
    <div>
      {toast && <AdminToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <AdminPageTitle>{isNew ? 'Новая категория' : 'Редактирование категории'}</AdminPageTitle>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Настройки категории</h2>

        <AdminField label="Название категории" error={errors.name}>
          <AdminInput
            value={form.name}
            maxLength={150}
            placeholder="Эконом, Комфорт, Внедорожник..."
            hasError={!!errors.name}
            onChange={(event) => {
              setForm((prev) => ({ ...prev, name: event.target.value }));
              setErrors((prev) => ({ ...prev, name: '' }));
            }}
          />
        </AdminField>

        <AdminField label="Описание">
          <textarea
            className={styles.textarea}
            value={form.description}
            maxLength={500}
            placeholder="Описание категории..."
            rows={4}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          />
        </AdminField>

        <div className={styles.bottomActions}>
          <div className={styles.leftActions}>
            <button
              type="button"
              className={styles.saveBtn}
              disabled={saving}
              onClick={() => handleSave(form, { isNew, id: Number(id), setErrors, setSaving, showToast, navigate })}
            >
              Сохранить
            </button>
            <button type="button" className={styles.cancelBtn} onClick={() => navigate('/admin/categories')}>
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
