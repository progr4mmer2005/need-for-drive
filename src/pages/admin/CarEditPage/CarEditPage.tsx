import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Category } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { AdminToast, useAdminToast } from '@/shared/components/AdminToast';
import { AdminField, AdminInput, AdminSelect, AdminRow } from '@/shared/components/AdminField';
import { Loader } from '@/shared/components/Loader';
import type { IFormState } from './types';
import { INITIAL } from './constants';
import { calcProgress } from './lib/form/calcProgress';
import { initCategories } from './lib/handlers/initCategories';
import { initCar } from './lib/handlers/initCar';
import { handleFileChange } from './lib/handlers/handleFileChange';
import { handleAddColor } from './lib/handlers/handleAddColor';
import { handleSave } from './lib/handlers/handleSave';
import { handleDelete } from './lib/handlers/handleDelete';
import styles from './CarEditPage.module.scss';

export function CarEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<IFormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof IFormState, string>>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const { toast, showToast, closeToast } = useAdminToast();
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewBroken, setPreviewBroken] = useState(false);

  useEffect(() => {
    initCategories(isNew, { setCategories, setForm });
  }, [isNew]);

  useEffect(() => {
    initCar(id, isNew, {
      setForm,
      setPreviewUrl,
      setPreviewBroken,
      setLoading,
    });
  }, [id, isNew]);

  if (loading) return <Loader />;

  const progress = calcProgress(form);

  return (
    <div>
      <AdminToast toast={toast} onClose={closeToast} />
      <AdminPageTitle>Карточка автомобиля</AdminPageTitle>

      <div className={styles.layout}>
        <div className={styles.previewCard}>
          <div className={styles.previewSection}>
            <div className={styles.previewImg}>
              {previewUrl && !previewBroken && (
                <img src={previewUrl} alt="" onError={() => setPreviewBroken(true)} />
              )}
            </div>
            <div className={styles.previewName}>{form.name || 'Модель автомобиля'}</div>
            <div className={styles.previewCategory}>
              {categories.find((c) => String(c.id) === form.categoryId)?.name || 'Тип не выбран'}
            </div>
            <div className={styles.fileRow}>
              <span className={styles.fileName}>{form.thumbnailName || 'Выберите файл...'}</span>
              <button
                type="button"
                className={styles.browseBtn}
                onClick={() => fileRef.current?.click()}
              >
                Обзор
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".jpg,.jpeg,.png,.gif,.bmp"
                className={styles.hiddenFile}
                onChange={(e) =>
                  handleFileChange(e, {
                    setPreviewUrl,
                    setPreviewBroken,
                    setForm,
                    showToast,
                  })
                }
              />
            </div>
          </div>

          <div className={styles.previewSection}>
            <div className={styles.progressLabel}>
              <span>Заполнено</span>
              <span>{progress}%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className={styles.previewSection}>
            <div className={styles.descriptionLabel}>Описание</div>
            <textarea
              className={styles.textarea}
              value={form.description}
              placeholder="Описание автомобиля..."
              rows={4}
              maxLength={500}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>
        </div>

        <div className={styles.settings}>
          <h2 className={styles.settingsTitle}>Настройки автомобиля</h2>

          <AdminRow>
            <AdminField label="Модель автомобиля" error={errors.name}>
              <AdminInput
                value={form.name}
                maxLength={150}
                placeholder="Hyndai, i30 N"
                hasError={!!errors.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              />
            </AdminField>

            <AdminField label="Тип автомобиля" error={errors.categoryId}>
              <AdminSelect
                value={form.categoryId}
                hasError={!!errors.categoryId}
                onChange={(e) => setForm((prev) => ({ ...prev, categoryId: e.target.value }))}
              >
                <option value="">Выберите тип</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </AdminSelect>
            </AdminField>
          </AdminRow>

          <AdminRow>
            <AdminField label="Минимальная цена (₽)" error={errors.priceMin}>
              <AdminInput
                type="number"
                min="0"
                value={form.priceMin}
                placeholder="0"
                hasError={!!errors.priceMin}
                onChange={(e) => setForm((prev) => ({ ...prev, priceMin: e.target.value }))}
              />
            </AdminField>

            <AdminField label="Максимальная цена (₽)" error={errors.priceMax}>
              <AdminInput
                type="number"
                min="0"
                value={form.priceMax}
                placeholder="0"
                hasError={!!errors.priceMax}
                onChange={(e) => setForm((prev) => ({ ...prev, priceMax: e.target.value }))}
              />
            </AdminField>
          </AdminRow>

          <AdminRow>
            <AdminField label="Доступные цвета" error={errors.colorInput}>
              <div className={styles.colorRow}>
                <AdminInput
                  hasError={!!errors.colorInput}
                  className={styles.colorRowInput}
                  value={form.colorInput}
                  maxLength={150}
                  placeholder="Синий"
                  onChange={(e) => setForm((prev) => ({ ...prev, colorInput: e.target.value }))}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && handleAddColor(form, { setForm, setErrors })
                  }
                />
                <button
                  type="button"
                  className={styles.addColorBtn}
                  onClick={() => handleAddColor(form, { setForm, setErrors })}
                  disabled={!form.colorInput.trim()}
                >
                  +
                </button>
              </div>
              <div className={styles.colorList}>
                {form.colors.map((color) => (
                  <label key={color} className={styles.colorItem}>
                    <input type="checkbox" defaultChecked readOnly />
                    <span>{color}</span>
                  </label>
                ))}
              </div>
            </AdminField>
          </AdminRow>

          <div className={styles.bottomActions}>
            <div className={styles.leftActions}>
              <button
                type="button"
                className={styles.saveBtn}
                disabled={saving}
                onClick={() =>
                  handleSave(form, {
                    isNew,
                    id: Number(id),
                    setErrors,
                    setSaving,
                    showToast,
                    navigate,
                  })
                }
              >
                Сохранить
              </button>
              <button type="button" className={styles.cancelBtn} onClick={() => navigate(-1)}>
                Отменить
              </button>
            </div>
            {!isNew && (
              <button
                type="button"
                className={styles.deleteBtn}
                disabled={saving}
                onClick={() =>
                  handleDelete({
                    id: Number(id),
                    setSaving,
                    showToast,
                    navigate,
                  })
                }
              >
                Удалить
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
