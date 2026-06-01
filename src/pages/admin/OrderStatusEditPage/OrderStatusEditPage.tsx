import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminEditLayout } from '@/shared/components/AdminEditLayout';
import { AdminField, AdminInput } from '@/shared/components/AdminField';
import { useAdminToast } from '@/shared/lib/useAdminToast';
import { initOrderStatus } from './lib/handlers/initOrderStatus';
import { handleSave } from './lib/handlers/handleSave';
import { handleDelete } from './lib/handlers/handleDelete';

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

  return (
    <AdminEditLayout
      title={isNew ? 'Новый статус заказа' : 'Редактирование статуса'}
      cardTitle="Настройки статуса"
      isNew={isNew}
      loading={loading}
      saving={saving}
      cancelPath="/admin/order-statuses"
      onSave={() => handleSave(name, { isNew, id: Number(id), setError, setSaving, showToast, navigate })}
      onDelete={() => handleDelete({ id: Number(id), setSaving, showToast, navigate })}
      toast={toast}
      onCloseToast={closeToast}
    >
      <AdminField label="Название статуса" error={error}>
        <AdminInput
          value={name}
          maxLength={150}
          placeholder="Новый"
          hasError={!!error}
          onChange={(e) => { setName(e.target.value); setError(''); }}
        />
      </AdminField>
    </AdminEditLayout>
  );
}
