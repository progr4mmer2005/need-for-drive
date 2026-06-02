import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { RateType } from '@/shared/api/types';
import { AdminEditLayout } from '@/shared/components/AdminEditLayout';
import { AdminField, AdminInput, AdminSelect, AdminRow } from '@/shared/components/AdminField';
import { useAdminToast } from '@/shared/lib/useAdminToast';
import type { IFormState } from './types';
import { INITIAL } from './constants';
import { initRateTypes } from './lib/handlers/initRateTypes';
import { initRate } from './lib/handlers/initRate';
import { handleSave } from './lib/handlers/handleSave';
import { handleDelete } from './lib/handlers/handleDelete';

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
    initRateTypes({ isNew, setRateTypes, setForm }).catch(console.error);
  }, [isNew]);

  useEffect(() => {
    initRate(id, isNew, { setForm, setLoading });
  }, [id, isNew]);

  return (
    <AdminEditLayout
      title={isNew ? 'Новый тариф' : 'Редактирование тарифа'}
      cardTitle="Настройки тарифа"
      isNew={isNew}
      loading={loading}
      saving={saving}
      cancelPath="/admin/rates"
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
      <AdminRow>
        <AdminField label="Тип тарифа" error={errors.rateTypeId}>
          <AdminSelect
            value={form.rateTypeId}
            hasError={!!errors.rateTypeId}
            onChange={(e) => {
              setForm((p) => ({ ...p, rateTypeId: e.target.value }));
              setErrors((p) => ({ ...p, rateTypeId: '' }));
            }}
          >
            <option value="">Выберите тип</option>
            {rateTypes.map((rt) => (
              <option key={rt.id} value={rt.id}>
                {rt.name} ({rt.unit})
              </option>
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
            onChange={(e) => {
              setForm((p) => ({ ...p, price: e.target.value }));
              setErrors((p) => ({ ...p, price: '' }));
            }}
          />
        </AdminField>
      </AdminRow>
    </AdminEditLayout>
  );
}

export default RateEditPage;
