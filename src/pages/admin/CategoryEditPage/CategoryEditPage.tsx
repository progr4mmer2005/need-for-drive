import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminEditLayout } from '@/shared/components/AdminEditLayout';
import { AdminField, AdminInput } from '@/shared/components/AdminField';
import { useAdminToast } from '@/shared/lib/useAdminToast';
import type { IFormState } from './types';
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
  const { toast, showToast, closeToast } = useAdminToast();

  useEffect(() => {
    initCategory(id, isNew, { setForm, setLoading });
  }, [id, isNew]);

  return (
    <AdminEditLayout
      title={isNew ? 'Новая категория' : 'Редактирование категории'}
      cardTitle="Настройки категории"
      isNew={isNew}
      loading={loading}
      saving={saving}
      cancelPath="/admin/categories"
      onSave={() =>
        handleSave(form, {
          isNew,
          id: Number(id),
          setErrors,
          setSaving,
          showToast,
          navigate,
        })
      }
      onDelete={() =>
        handleDelete({
          id: Number(id),
          setSaving,
          showToast,
          navigate,
        })
      }
      toast={toast}
      onCloseToast={closeToast}
    >
      <AdminField label="Название категории" error={errors.name}>
        <AdminInput
          value={form.name}
          maxLength={150}
          placeholder="Эконом, Комфорт, Внедорожник..."
          hasError={!!errors.name}
          onChange={(e) => {
            setForm((p) => ({ ...p, name: e.target.value }));
            setErrors((p) => ({ ...p, name: '' }));
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
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
        />
      </AdminField>
    </AdminEditLayout>
  );
}
