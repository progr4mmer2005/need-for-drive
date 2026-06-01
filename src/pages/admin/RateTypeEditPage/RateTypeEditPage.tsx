import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminEditLayout } from '@/shared/components/AdminEditLayout';
import { AdminField, AdminInput, AdminRow } from '@/shared/components/AdminField';
import { useAdminToast } from '@/shared/lib/useAdminToast';
import type { IFormState } from './types';
import { INITIAL } from './constants';
import { initRateType } from './lib/handlers/initRateType';
import { handleSave } from './lib/handlers/handleSave';
import { handleDelete } from './lib/handlers/handleDelete';

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

  return (
    <AdminEditLayout
      title={isNew ? 'Новый тип тарифа' : 'Редактирование типа тарифа'}
      cardTitle="Настройки типа тарифа"
      isNew={isNew}
      loading={loading}
      saving={saving}
      cancelPath="/admin/rate-types"
      onSave={() => handleSave(form, { isNew, id: Number(id), setErrors, setSaving, showToast, navigate })}
      onDelete={() => handleDelete({ id: Number(id), setSaving, showToast, navigate })}
      toast={toast}
      onCloseToast={closeToast}
    >
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
    </AdminEditLayout>
  );
}
