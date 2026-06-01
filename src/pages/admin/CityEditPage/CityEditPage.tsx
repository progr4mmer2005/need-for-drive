import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminEditLayout } from '@/shared/components/AdminEditLayout';
import { AdminField } from '@/shared/components/AdminField';
import { NominatimAutocomplete } from '@/shared/components/NominatimAutocomplete';
import { useAdminToast } from '@/shared/lib/useAdminToast';
import { initCity } from './lib/handlers/initCity';
import { handleSave } from './lib/handlers/handleSave';
import { handleDelete } from './lib/handlers/handleDelete';

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
    initCity(id, isNew, { setName, setIsCityConfirmed, setLoading });
  }, [id, isNew]);

  return (
    <AdminEditLayout
      title={isNew ? 'Новый город' : 'Редактирование города'}
      cardTitle="Настройки города"
      isNew={isNew}
      loading={loading}
      saving={saving}
      cancelPath="/admin/cities"
      onSave={() =>
        handleSave(name, {
          isNew,
          id: Number(id),
          isCityConfirmed,
          setError,
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
      <AdminField label="Название города">
        <NominatimAutocomplete
          mode="city"
          value={name}
          placeholder="Москва"
          error={error}
          onChange={(val) => {
            setName(val);
            setError('');
            setIsCityConfirmed(false);
          }}
          onConfirm={() => setIsCityConfirmed(true)}
        />
      </AdminField>
    </AdminEditLayout>
  );
}
