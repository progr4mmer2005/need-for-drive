import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminEditLayout } from '@/shared/components/AdminEditLayout';
import { AdminField, AdminInput } from '@/shared/components/AdminField';
import { useAdminToast } from '@/shared/lib/useAdminToast';
import { initUser } from './lib/handlers/initUser';
import { handleSave } from './lib/handlers/handleSave';
import { handleDelete } from './lib/handlers/handleDelete';

export function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast, showToast, closeToast } = useAdminToast();

  useEffect(() => {
    initUser(id, { setUsername, setLoading });
  }, [id]);

  return (
    <AdminEditLayout
      title="Редактирование пользователя"
      cardTitle="Настройки пользователя"
      isNew={false}
      loading={loading}
      saving={saving}
      cancelPath="/admin/users"
      onSave={() =>
        handleSave(username, {
          id: Number(id),
          setError,
          setSaving,
          showToast,
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
      <AdminField label="Имя пользователя" error={error}>
        <AdminInput
          value={username}
          maxLength={150}
          placeholder="username"
          hasError={!!error}
          onChange={(e) => {
            setUsername(e.target.value);
            setError('');
          }}
        />
      </AdminField>
    </AdminEditLayout>
  );
}
