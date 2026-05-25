import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CARS_API } from '@/shared/api/carsApi';
import { CATEGORIES_API } from '@/shared/api/citiesApi';
import type { Car, Category } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { Loader } from '@/shared/components/Loader';
import { pickCarImage } from '@/shared/lib/carImage';
import styles from './CarEditPage.module.scss';

interface Toast { message: string; type: 'success' | 'error'; }
interface FormState {
  name: string; categoryId: string; description: string; priceMin: string; priceMax: string;
  number: string; tank: string; colorInput: string; colors: string[]; thumbnailPath: string; thumbnailName: string;
}

const INITIAL: FormState = {
  name: '', categoryId: '', description: '', priceMin: '', priceMax: '', number: '', tank: '',
  colorInput: '', colors: [], thumbnailPath: '', thumbnailName: '',
};

function calcProgress(form: FormState): number {
  const fields = [form.name, form.categoryId, form.colors.length > 0 ? 'ok' : '', form.priceMin, form.priceMax];
  return Math.round((fields.filter(Boolean).length / fields.length) * 100);
}

export function CarEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => { CATEGORIES_API.getAll().then((categoriesResponse) => setCategories(categoriesResponse.data)).catch(console.error); }, []);

  useEffect(() => {
    if (!isNew && id) {
      setLoading(true);
      CARS_API.getOne(Number(id)).then((carResponse) => {
        const car: Car = carResponse.data;
        setForm({
          name: car.name || '',
          categoryId: String(car.categoryId?.id || ''),
          description: car.description || '',
          priceMin: String(car.priceMin || ''),
          priceMax: String(car.priceMax || ''),
          number: car.number || '',
          tank: car.tank || '',
          colorInput: '',
          colors: car.colors || [],
          thumbnailPath: car.thumbnail?.path || '',
          thumbnailName: car.thumbnail?.originalname || '',
        });
        if (car.thumbnail?.path) setPreviewUrl(car.thumbnail.path);
      }).catch(console.error).finally(() => setLoading(false));
    }
  }, [id, isNew]);

  const showToast = (message: string, type: Toast['type']) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(file.type)) {
      showToast('Допустимые форматы: JPEG, PNG, GIF и BMP', 'error');
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setForm((prevForm) => ({ ...prevForm, thumbnailPath: url, thumbnailName: file.name }));
  };

  const addColor = () => {
    const color = form.colorInput.trim();
    if (!color || form.colors.includes(color)) return;
    if (color.length > 150) return setErrors((prevErrors) => ({ ...prevErrors, colorInput: 'Не более 150 символов' }));
    setForm((prevForm) => ({ ...prevForm, colors: [...prevForm.colors, color], colorInput: '' }));
    setErrors((prevErrors) => ({ ...prevErrors, colorInput: '' }));
  };

  const validate = () => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) errs.name = 'Обязательное поле';
    else if (form.name.length > 150) errs.name = 'Не более 150 символов';
    if (!form.categoryId) errs.categoryId = 'Выберите тип автомобиля';
    if (!form.colors.length) errs.colorInput = 'Добавьте хотя бы один цвет';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const dto = {
        name: form.name.trim(), priceMin: Number(form.priceMin) || 0, priceMax: Number(form.priceMax) || 0,
        colors: form.colors, description: form.description, number: form.number, tank: form.tank,
        thumbnail: form.thumbnailPath ? { path: form.thumbnailPath, originalname: form.thumbnailName, mimetype: 'image/jpeg' } : null,
        categoryId: { id: Number(form.categoryId) },
      };
      if (isNew) {
        await CARS_API.create(dto);
        showToast('Успех! Машина добавлена', 'success');
        setTimeout(() => navigate('/admin/cars'), 1200);
      } else {
        await CARS_API.update(Number(id), dto);
        showToast('Успех! Машина сохранена', 'success');
      }
    } catch {
      showToast('Ошибка при сохранении', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Удалить автомобиль?')) return;
    setSaving(true);
    try {
      await CARS_API.delete(Number(id));
      showToast('Успех! Машина удалена', 'success');
      setTimeout(() => navigate('/admin/cars'), 1200);
    } catch {
      showToast('Ошибка при удалении', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  const progress = calcProgress(form);

  return (
    <div>
      {toast && <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}><span>{toast.message}</span><button type="button" className={styles.toastClose} onClick={() => setToast(null)}>×</button></div>}
      <AdminPageTitle>Карточка автомобиля</AdminPageTitle>
      <div className={styles.layout}>
        <div className={styles.previewCard}>
          <div className={styles.previewSection}>
            <div className={styles.previewImg}>
              {(previewUrl || form.name) && (
                <img src={previewUrl || pickCarImage(form.name)} alt={form.name || ''} />
              )}
            </div>
            <div className={styles.previewName}>{form.name || 'Модель автомобиля'}</div>
            <div className={styles.previewCategory}>{categories.find((category) => String(category.id) === form.categoryId)?.name || 'Тип не выбран'}</div>
            <div className={styles.fileRow}><span className={styles.fileName}>{form.thumbnailName || 'Выберите файл...'}</span><button type="button" className={styles.browseBtn} onClick={() => fileRef.current?.click()}>Обзор</button><input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.gif,.bmp" className={styles.hiddenFile} onChange={handleFileChange} /></div>
          </div>
          <div className={styles.previewSection}><div className={styles.progressLabel}><span>Заполнено</span><span>{progress}%</span></div><div className={styles.progressBar}><div className={styles.progressFill} style={{ width: `${progress}%` }} /></div></div>
          <div className={styles.previewSection}><div className={styles.descriptionLabel}>Описание</div><textarea className={styles.textarea} value={form.description} placeholder="Описание автомобиля..." rows={4} maxLength={500} onChange={(event) => setForm((prevForm) => ({ ...prevForm, description: event.target.value }))} /></div>
        </div>

        <div className={styles.settings}>
          <h2 className={styles.settingsTitle}>Настройки автомобиля</h2>
          <div className={styles.row}>
            <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Модель автомобиля</label><input className={`${styles.input} ${errors.name ? styles.inputError : ''}`} value={form.name} maxLength={150} onChange={(event) => setForm((prevForm) => ({ ...prevForm, name: event.target.value }))} placeholder="Hyndai, i30 N" />{errors.name && <span className={styles.errMsg}>{errors.name}</span>}</div>
            <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Тип автомобиля</label><select className={`${styles.select} ${!form.categoryId ? styles.selectPlaceholder : ''} ${errors.categoryId ? styles.inputError : ''}`} value={form.categoryId} onChange={(event) => setForm((prevForm) => ({ ...prevForm, categoryId: event.target.value }))}><option value="">Выберите тип</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>{errors.categoryId && <span className={styles.errMsg}>{errors.categoryId}</span>}</div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Доступные цвета</label>
            <div className={styles.colorRow}><input className={`${styles.input} ${errors.colorInput ? styles.inputError : ''}`} value={form.colorInput} maxLength={150} placeholder="Синий" onChange={(event) => setForm((prevForm) => ({ ...prevForm, colorInput: event.target.value }))} onKeyDown={(event) => event.key === 'Enter' && addColor()} /><button type="button" className={styles.addColorBtn} onClick={addColor} disabled={!form.colorInput.trim()}>+</button></div>
            {errors.colorInput && <span className={styles.errMsg}>{errors.colorInput}</span>}
            <div className={styles.colorList}>{form.colors.map((colorName) => <label key={colorName} className={styles.colorItem}><input type="checkbox" defaultChecked readOnly /><span>{colorName}</span></label>)}</div>
          </div>

          <div className={styles.bottomActions}>
            <div className={styles.leftActions}>
              <button type="button" className={styles.saveBtn} onClick={handleSave} disabled={saving}>Сохранить</button>
              <button type="button" className={styles.cancelBtn} onClick={() => navigate(-1)}>Отменить</button>
            </div>
            {!isNew && <button type="button" className={styles.deleteBtn} onClick={handleDelete} disabled={saving}>Удалить</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

