import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { City } from '@/shared/api/types';
import { AdminEditLayout } from '@/shared/components/AdminEditLayout';
import { AdminField, AdminInput, AdminSelect, AdminRow } from '@/shared/components/AdminField';
import { NominatimAutocomplete } from '@/shared/components/NominatimAutocomplete';
import { useAdminToast } from '@/shared/lib/useAdminToast';
import type { IFormState } from './types';
import { INITIAL } from './constants';
import { initCities } from './lib/handlers/initCities';
import { initPoint } from './lib/handlers/initPoint';
import { handleSave } from './lib/handlers/handleSave';
import { handleDelete } from './lib/handlers/handleDelete';

export function PointEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [form, setForm] = useState<IFormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof IFormState, string>>>({});
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(!isNew);
  const { toast, showToast, closeToast } = useAdminToast();
  const prevCityIdRef = useRef<string>('');

  useEffect(() => {
    initCities({ isNew, setCities, setForm }).catch(console.error);
  }, [isNew]);

  useEffect(() => {
    initPoint(id, isNew, {
      setForm,
      setIsAddressConfirmed,
      setLoading,
      prevCityIdRef,
    });
  }, [id, isNew]);

  const selectedCityName = cities.find((c) => String(c.id) === form.cityId)?.name ?? '';

  return (
    <AdminEditLayout
      title={isNew ? 'Новый пункт выдачи' : 'Редактирование пункта выдачи'}
      cardTitle="Настройки пункта выдачи"
      isNew={isNew}
      loading={loading}
      saving={saving}
      cancelPath="/admin/points"
      onSave={() =>
        handleSave(form, {
          isNew,
          id: Number(id),
          isAddressConfirmed,
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
        <AdminField label="Название" error={errors.name}>
          <AdminInput
            value={form.name}
            maxLength={150}
            placeholder="Аэропорт Домодедово"
            hasError={!!errors.name}
            onChange={(e) => {
              setForm((p) => ({ ...p, name: e.target.value }));
              setErrors((p) => ({ ...p, name: '' }));
            }}
          />
        </AdminField>

        <AdminField label="Город" error={errors.cityId}>
          <AdminSelect
            value={form.cityId}
            hasError={!!errors.cityId}
            onChange={(e) => {
              const newCityId = e.target.value;
              const cityChanged = newCityId !== prevCityIdRef.current;
              prevCityIdRef.current = newCityId;
              if (cityChanged) setIsAddressConfirmed(false);
              setForm((p) => ({
                ...p,
                cityId: newCityId,
                ...(cityChanged ? { address: '' } : {}),
              }));
              setErrors((p) => ({ ...p, cityId: '', ...(cityChanged ? { address: '' } : {}) }));
            }}
          >
            <option value="">Выберите город</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </AdminSelect>
        </AdminField>
      </AdminRow>

      <AdminField label="Адрес">
        <NominatimAutocomplete
          mode="address"
          requireHouseNumber
          cityName={selectedCityName}
          value={form.address}
          placeholder="ул. Пушкина, д. 1"
          error={errors.address}
          disabled={!form.cityId}
          onChange={(val) => {
            setForm((p) => ({ ...p, address: val }));
            setErrors((p) => ({ ...p, address: '' }));
            setIsAddressConfirmed(false);
          }}
          onConfirm={() => setIsAddressConfirmed(true)}
        />
      </AdminField>
    </AdminEditLayout>
  );
}

export default PointEditPage;
