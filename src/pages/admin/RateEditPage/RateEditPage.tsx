import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { RateType } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { AdminToast, useAdminToast } from '@/shared/components/AdminToast';
import { AdminField, AdminInput, AdminSelect, AdminRow } from '@/shared/components/AdminField';
import { Loader } from '@/shared/components/Loader';
import type { IFormState } from './types';
import { INITIAL } from './constants';
import { initRateTypes } from './lib/handlers/initRateTypes';
import { initRate } from './lib/handlers/initRate';
import { handleSave } from './lib/handlers/handleSave';
import { handleDelete } from './lib/handlers/handleDelete';
import styles from './RateEditPage.module.scss';

export function RateEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [form, setForm] = useState<IFormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof IFormState, string>>>({});
  const [rateTypes, setRateTypes] = useState<RateType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast, showToast, closeToast } = useAdminToast();

  useEffect(() => {
    void initRateTypes({ isNew, setRateTypes, setForm }).catch(console.error);
  }, [isNew]);

  useEffect(() => {
    void initRate(id, isNew, { setForm, setLoading });
  }, [id, isNew]);

  if (loading) return <Loader />;

  return (
    <div>
      <AdminToast toast={toast} onClose={closeToast} />

      <AdminPageTitle>{isNew ? 'Новый тариф' : 'Редактирование тарифа'}</AdminPageTitle>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Настройки тарифа</h2>

        <AdminRow>
          <AdminField label="Тип тарифа" error={errors.rateTypeId}>
            <AdminSelect
              value={form.rateTypeId}
              hasError={!!errors.rateTypeId}
              onChange={(e) => { setForm((p) => ({ ...p, rateTypeId: e.target.value })); setErrors((p) => ({ ...p, rateTypeId: '' })); }}
            >
              <option value="">Выберите тип</option>
              {rateTypes.map((rt) => (
                <option key={rt.id} value={rt.id}>{rt.name} ({rt.unit})</option>
              ))}
            </AdminSelect>
          </AdminField>

          <AdminField label="Цена (₽)" error={errors.price}>
            <AdminInput
              type="number"
              min="0"
              value={form.price}
              placeholder="1990"
              hasError={!!errors.price}
              onChange={(e) => { setForm((p) => ({ ...p, price: e.target.value })); setErrors((p) => ({ ...p, price: '' })); }}
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
            <button type="button" className={styles.cancelBtn} onClick={() => navigate('/admin/rates')}>Отменить</button>
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
