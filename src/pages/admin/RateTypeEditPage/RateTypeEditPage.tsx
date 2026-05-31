import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { AdminToast, useAdminToast } from '@/shared/components/AdminToast';
import { AdminField, AdminInput, AdminRow } from '@/shared/components/AdminField';
import { Loader } from '@/shared/components/Loader';
import type { IFormState } from './types';
import { INITIAL } from './constants';
import { initRateType } from './lib/handlers/initRateType';
import { handleSave } from './lib/handlers/handleSave';
import { handleDelete } from './lib/handlers/handleDelete';
import styles from './RateTypeEditPage.module.scss';

export function RateTypeEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [form, setForm] = useState<IFormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof IFormState, string>>>({});
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const { toast, showToast, closeToast } = useAdminToast();

  useEffect(() => {
    void initRateType(id, isNew, { setForm, setLoading });
  }, [id, isNew]);

  if (loading) return <Loader />;

  return (
    <div>
      <AdminToast toast={toast} onClose={closeToast} />

      <AdminPageTitle>{isNew ? 'Новый тип тарифа' : 'Редактирование типа тарифа'}</AdminPageTitle>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Настройки типа тарифа</h2>

        <AdminRow>
          <AdminField label="Название" error={errors.name}>
            <AdminInput
              value={form.name}
              maxLength={150}
              placeholder="День, Час..."
              hasError={!!errors.name}
              onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setErrors((p) => ({ ...p, name: '' })); }}
            />
          </AdminField>

          <AdminField label="Единица измерения" error={errors.unit}>
            <AdminInput
              value={form.unit}
              maxLength={50}
              placeholder="день, час..."
              hasError={!!errors.unit}
              onChange={(e) => { setForm((p) => ({ ...p, unit: e.target.value })); setErrors((p) => ({ ...p, unit: '' })); }}
            />
          </AdminField>
        </AdminRow>

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
            <button type="button" className={styles.cancelBtn} onClick={() => navigate('/admin/rate-types')}>Отменить</button>
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
