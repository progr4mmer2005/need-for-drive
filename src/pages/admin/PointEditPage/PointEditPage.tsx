import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { City } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { AdminToast } from '@/shared/components/AdminToast';
import { AdminField, AdminInput, AdminSelect, AdminRow } from '@/shared/components/AdminField';
import { Loader } from '@/shared/components/Loader';
import { NominatimAutocomplete } from '@/shared/components/NominatimAutocomplete';
import type { IFormState, IToast } from './types';
import { INITIAL } from './constants';
import { initCities } from './lib/handlers/initCities';
import { initPoint } from './lib/handlers/initPoint';
import { handleSave } from './lib/handlers/handleSave';
import { handleDelete } from './lib/handlers/handleDelete';
import styles from './PointEditPage.module.scss';

export function PointEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [form, setForm] = useState<IFormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof IFormState, string>>>({});
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<IToast | null>(null);
  const prevCityIdRef = useRef<string>('');
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(!isNew);

  const showToast = (message: string, type: IToast['type']) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    void initCities({ isNew, setCities, setForm }).catch(console.error);
  }, [isNew]);

  useEffect(() => {
    void initPoint(id, isNew, { setForm, setIsAddressConfirmed, setLoading, prevCityIdRef });
  }, [id, isNew]);

  if (loading) return <Loader />;

  const selectedCityName = cities.find((c) => String(c.id) === form.cityId)?.name ?? '';

  return (
    <div>
      {toast && <AdminToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <AdminPageTitle>{isNew ? 'Новый пункт выдачи' : 'Редактирование пункта выдачи'}</AdminPageTitle>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Настройки пункта выдачи</h2>

        <AdminRow>
          <AdminField label="Название" error={errors.name}>
            <AdminInput
              value={form.name}
              maxLength={150}
              placeholder="Аэропорт Домодедово"
              hasError={!!errors.name}
              onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setErrors((p) => ({ ...p, name: '' })); }}
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
                setForm((p) => ({ ...p, cityId: newCityId, ...(cityChanged ? { address: '' } : {}) }));
                setErrors((p) => ({ ...p, cityId: '', ...(cityChanged ? { address: '' } : {}) }));
              }}
            >
              <option value="">Выберите город</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>{city.name}</option>
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
            onChange={(val) => { setForm((p) => ({ ...p, address: val })); setErrors((p) => ({ ...p, address: '' })); setIsAddressConfirmed(false); }}
            onConfirm={() => setIsAddressConfirmed(true)}
          />
        </AdminField>

        <div className={styles.bottomActions}>
          <div className={styles.leftActions}>
            <button
              type="button"
              className={styles.saveBtn}
              disabled={saving}
              onClick={() => handleSave(form, { isNew, id: Number(id), isAddressConfirmed, setErrors, setSaving, showToast, navigate })}
            >
              Сохранить
            </button>
            <button type="button" className={styles.cancelBtn} onClick={() => navigate('/admin/points')}>Отменить</button>
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
