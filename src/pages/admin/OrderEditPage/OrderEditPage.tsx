import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Order, Car, City, Point, Rate, OrderStatus } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { AdminToast, useAdminToast } from '@/shared/components/AdminToast';
import { AdminField, AdminInput, AdminSelect, AdminRow } from '@/shared/components/AdminField';
import { Loader } from '@/shared/components/Loader';
import { formatDate, formatPrice } from '@/shared/lib/adminFormatters';
import type { IFormState } from './types';
import { initOptions } from './lib/handlers/initOptions';
import { initOrder } from './lib/handlers/initOrder';
import { handleSave } from './lib/handlers/handleSave';
import { handleDelete } from './lib/handlers/handleDelete';
import { loadPoints } from './lib/api/loadPoints';
import styles from './OrderEditPage.module.scss';

export function OrderEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [form, setForm] = useState<IFormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast, showToast, closeToast } = useAdminToast();
  const [statuses, setStatuses] = useState<OrderStatus[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [rates, setRates] = useState<Rate[]>([]);

  useEffect(() => {
    initOptions({
      setStatuses,
      setCities,
      setCars,
      setRates,
    }).catch(console.error);
  }, []);

  useEffect(() => {
    initOrder(id, { setOrder, setForm, setLoading });
  }, [id]);

  const fetchPoints = useCallback(async (cityId: string) => {
    const data = await loadPoints(cityId);
    setPoints(data);
  }, []);

  useEffect(() => {
    if (form?.cityId) fetchPoints(form.cityId);
  }, [form?.cityId, fetchPoints]);

  const setField = <K extends keyof IFormState>(key: K, value: IFormState[K]) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  if (loading || !form) return <Loader />;

  const selectedCar = cars.find((c) => String(c.id) === form.carId) ?? order?.carId ?? null;
  const selectedStatus =
    statuses.find((s) => String(s.id) === form.statusId) ?? order?.orderStatusId ?? null;
  const carColors = selectedCar && 'colors' in selectedCar ? (selectedCar as Car).colors : [];

  return (
    <div>
      <AdminToast toast={toast} onClose={closeToast} />

      <AdminPageTitle>Заказ #{id}</AdminPageTitle>

      <div className={styles.layout}>
        <div className={styles.previewCard}>
          <div className={styles.previewTop}>
            <div className={styles.previewImg}>
              {selectedCar && 'thumbnail' in selectedCar && (selectedCar as Car).thumbnail?.path ? (
                <img src={(selectedCar as Car).thumbnail!.path} alt="" />
              ) : (
                <div className={styles.previewImgPlaceholder} />
              )}
            </div>
            <div className={styles.previewCarName}>{selectedCar?.name ?? '—'}</div>
            {selectedStatus && <span className={styles.statusText}>{selectedStatus.name}</span>}
          </div>

          <div className={styles.previewDivider} />

          <div className={styles.previewDetails}>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Стоимость</span>
              <span className={styles.previewValue}>{formatPrice(form.price)}</span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Начало</span>
              <span className={styles.previewValue}>
                {form.dateFrom ? formatDate(new Date(form.dateFrom).getTime()) : '—'}
              </span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Конец</span>
              <span className={styles.previewValue}>
                {form.dateTo ? formatDate(new Date(form.dateTo).getTime()) : '—'}
              </span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Цвет</span>
              <span className={styles.previewValue}>{form.color || '—'}</span>
            </div>
          </div>

          <div className={styles.previewDivider} />

          <div className={styles.previewOptions}>
            <span
              className={`${styles.previewOption} ${form.isFullTank ? styles.previewOptionOn : ''}`}
            >
              Полный бак
            </span>
            <span
              className={`${styles.previewOption} ${form.isNeedChildChair ? styles.previewOptionOn : ''}`}
            >
              Детское кресло
            </span>
            <span
              className={`${styles.previewOption} ${form.isRightWheel ? styles.previewOptionOn : ''}`}
            >
              Правый руль
            </span>
          </div>
        </div>

        <div className={styles.settings}>
          <h2 className={styles.settingsTitle}>Настройки заказа</h2>

          <AdminRow>
            <AdminField label="Статус">
              <AdminSelect
                value={form.statusId}
                onChange={(e) => setField('statusId', e.target.value)}
              >
                <option value="">Не выбран</option>
                {statuses.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </AdminSelect>
            </AdminField>
            <AdminField label="Автомобиль">
              <AdminSelect
                value={form.carId}
                onChange={(e) => {
                  setField('carId', e.target.value);
                  setField('color', '');
                }}
              >
                <option value="">Не выбран</option>
                {cars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </AdminSelect>
            </AdminField>
          </AdminRow>

          <AdminRow>
            <AdminField label="Город">
              <AdminSelect
                value={form.cityId}
                onChange={(e) => {
                  setField('cityId', e.target.value);
                  setField('pointId', '');
                }}
              >
                <option value="">Не выбран</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </AdminSelect>
            </AdminField>
            <AdminField label="Пункт выдачи">
              <AdminSelect
                value={form.pointId}
                disabled={!form.cityId}
                onChange={(e) => setField('pointId', e.target.value)}
              >
                <option value="">Не выбран</option>
                {points.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </AdminSelect>
            </AdminField>
          </AdminRow>

          <AdminRow>
            <AdminField label="Тариф">
              <AdminSelect value={form.rateId} onChange={(e) => setField('rateId', e.target.value)}>
                <option value="">Не выбран</option>
                {rates.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.rateTypeId?.name} — {r.price} ₽/{r.rateTypeId?.unit}
                  </option>
                ))}
              </AdminSelect>
            </AdminField>
            <AdminField label="Цвет">
              <AdminSelect
                value={form.color}
                disabled={carColors.length === 0}
                onChange={(e) => setField('color', e.target.value)}
              >
                <option value="">Не выбран</option>
                {carColors.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </AdminSelect>
            </AdminField>
          </AdminRow>

          <AdminRow>
            <AdminField label="Начало аренды">
              <AdminInput
                type="datetime-local"
                value={form.dateFrom}
                onChange={(e) => setField('dateFrom', e.target.value)}
              />
            </AdminField>
            <AdminField label="Конец аренды">
              <AdminInput
                type="datetime-local"
                value={form.dateTo}
                onChange={(e) => setField('dateTo', e.target.value)}
              />
            </AdminField>
          </AdminRow>

          <AdminRow>
            <AdminField label="Стоимость, ₽">
              <AdminInput
                type="number"
                value={form.price}
                min={0}
                onChange={(e) => setField('price', e.target.value)}
              />
            </AdminField>
          </AdminRow>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={form.isFullTank}
                onChange={(e) => setField('isFullTank', e.target.checked)}
              />
              <span>Полный бак</span>
            </label>
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={form.isNeedChildChair}
                onChange={(e) => setField('isNeedChildChair', e.target.checked)}
              />
              <span>Детское кресло</span>
            </label>
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={form.isRightWheel}
                onChange={(e) => setField('isRightWheel', e.target.checked)}
              />
              <span>Правый руль</span>
            </label>
          </div>

          <div className={styles.bottomActions}>
            <div className={styles.leftActions}>
              <button
                type="button"
                className={styles.saveBtn}
                disabled={saving}
                onClick={() =>
                  handleSave(form, {
                    id,
                    order,
                    setSaving,
                    showToast,
                  })
                }
              >
                Сохранить
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => navigate('/admin/orders')}
              >
                Отменить
              </button>
            </div>
            <button
              type="button"
              className={styles.deleteBtn}
              disabled={saving}
              onClick={() =>
                handleDelete({
                  id,
                  setSaving,
                  showToast,
                  navigate,
                })
              }
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderEditPage;
