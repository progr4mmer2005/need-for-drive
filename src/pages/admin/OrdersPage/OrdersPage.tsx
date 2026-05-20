import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersApi } from '@/shared/api/ordersApi';
import { carsApi } from '@/shared/api/carsApi';
import { citiesApi, orderStatusApi } from '@/shared/api/citiesApi';
import type { Order, Car, City, OrderStatus } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { Loader } from '@/shared/components/Loader';
import styles from './OrdersPage.module.scss';

const PAGE_SIZE = 10;

const carImages = {
  elantra: new URL('../../../assets/images/cars/elantra.png', import.meta.url).toString(),
  i30n: new URL('../../../assets/images/cars/i30n.png', import.meta.url).toString(),
  creta: new URL('../../../assets/images/cars/creta.png', import.meta.url).toString(),
  sonata: new URL('../../../assets/images/cars/sonata.png', import.meta.url).toString(),
  solaris: new URL('../../../assets/images/cars/solaris.png', import.meta.url).toString(),
  tucson: new URL('../../../assets/images/cars/tucson.png', import.meta.url).toString(),
};

function getCarImage(name: string | null | undefined) {
  const normalizedName = (name || '').toLowerCase();
  if (normalizedName.includes('elantra')) return carImages.elantra;
  if (normalizedName.includes('creta')) return carImages.creta;
  if (normalizedName.includes('sonata')) return carImages.sonata;
  if (normalizedName.includes('solaris')) return carImages.solaris;
  if (normalizedName.includes('tucson')) return carImages.tucson;
  return carImages.i30n;
}

function formatDate(ts: number) {
  if (!ts) return '—';
  return new Date(ts).toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

function formatPrice(p: number) {
  return p ? `${p.toLocaleString('ru-RU')} ₽` : '—';
}

export function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<Car[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [statuses, setStatuses] = useState<OrderStatus[]>([]);
  const [draftFilters, setDraftFilters] = useState({ period: '', car: '', city: '', status: '' });
  const [appliedFilters, setAppliedFilters] = useState({ period: '', car: '', city: '', status: '' });

  useEffect(() => {
    Promise.all([carsApi.getAll({ limit: 100 }), citiesApi.getAll(), orderStatusApi.getAll()])
      .then(([carsData, citiesData, statusData]) => {
        setCars(carsData.data);
        setCities(citiesData.data);
        setStatuses(statusData.data);
      })
      .catch(console.error);
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await ordersApi.getAll({ limit: PAGE_SIZE, page });
      setOrders(data.data);
      setTotal(data.count ?? 0);
    } catch (e: unknown) {
      if ((e as { response?: { status?: number } })?.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  }, [page, navigate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filtered = orders.filter((o) => {
    if (appliedFilters.car && o.carId?.id !== Number(appliedFilters.car)) return false;
    if (appliedFilters.city && o.cityId?.id !== Number(appliedFilters.city)) return false;
    if (appliedFilters.status && o.orderStatusId?.id !== Number(appliedFilters.status)) return false;
    return true;
  });

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const paginationPages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1);

  return (
    <div>
      <AdminPageTitle>Заказы</AdminPageTitle>
      <div className={styles.tableWrap}>
        <div className={styles.filters}>
          <select className={`${styles.filterSelect} ${!draftFilters.period ? styles.filterPlaceholder : ''}`} value={draftFilters.period} onChange={(e) => setDraftFilters((p) => ({ ...p, period: e.target.value }))}>
            <option value="">Время</option>
            <option value="week">За неделю</option>
            <option value="month">За месяц</option>
            <option value="all">За всё время</option>
          </select>
          <select className={`${styles.filterSelect} ${!draftFilters.car ? styles.filterPlaceholder : ''}`} value={draftFilters.car} onChange={(e) => setDraftFilters((p) => ({ ...p, car: e.target.value }))}>
            <option value="">Автомобиль</option>
            {cars.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select className={`${styles.filterSelect} ${!draftFilters.city ? styles.filterPlaceholder : ''}`} value={draftFilters.city} onChange={(e) => setDraftFilters((p) => ({ ...p, city: e.target.value }))}>
            <option value="">Город</option>
            {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select className={`${styles.filterSelect} ${!draftFilters.status ? styles.filterPlaceholder : ''}`} value={draftFilters.status} onChange={(e) => setDraftFilters((p) => ({ ...p, status: e.target.value }))}>
            <option value="">В процессе</option>
            {statuses.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <button className={styles.applyBtn} type="button" onClick={() => setAppliedFilters(draftFilters)}>Применить</button>
        </div>

        <div className={styles.scrollArea}>
          {loading ? <Loader /> : filtered.length === 0 ? <p className={styles.empty}>Нет заказов</p> : filtered.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.carImg}><img src={getCarImage(order.carId?.name)} alt="" /></div>
              <div className={styles.orderInfo}>
                <div className={styles.orderTitle}>
                  <span>{order.carId?.name?.toUpperCase()}</span>
                  <span className={styles.orderMuted}> в </span>
                  <span>{order.cityId?.name}</span>
                  <span className={styles.orderMuted}>, </span>
                  <span className={styles.orderAddress}>{order.pointId?.address}</span>
                </div>
                <div className={styles.orderDates}>{formatDate(order.dateFrom)} – {formatDate(order.dateTo)}</div>
                <div className={styles.orderColor}>Цвет: <span>{order.color || '—'}</span></div>
              </div>
              <div className={styles.orderExtras}>
                <span className={`${styles.checkbox} ${order.isFullTank ? styles.checkboxChecked : ''}`}>
                  <span className={styles.checkboxBox}>{order.isFullTank ? '✓' : ''}</span>
                  Полный бак
                </span>
                <span className={`${styles.checkbox} ${order.isNeedChildChair ? styles.checkboxChecked : ''}`}>
                  <span className={styles.checkboxBox}>{order.isNeedChildChair ? '✓' : ''}</span>
                  Детское кресло
                </span>
                <span className={`${styles.checkbox} ${order.isRightWheel ? styles.checkboxChecked : ''}`}>
                  <span className={styles.checkboxBox}>{order.isRightWheel ? '✓' : ''}</span>
                  Правый руль
                </span>
              </div>
              <div className={styles.orderPrice}>{formatPrice(order.price)}</div>
              <div className={styles.orderActions}>
                <button className={`${styles.actionBtn} ${styles.successBtn}`} type="button" onClick={() => ordersApi.update(order.id, { orderStatusId: { id: 4 } }).then(fetchOrders)}>✓ Готово</button>
                <button className={`${styles.actionBtn} ${styles.dangerBtn}`} type="button" onClick={() => ordersApi.update(order.id, { orderStatusId: { id: 3 } }).then(fetchOrders)}>✕ Отмена</button>
                <button className={`${styles.actionBtn} ${styles.editBtn}`} type="button" onClick={() => navigate(`/admin/orders/${order.id}`)}>⋮ Изменить</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          <button type="button" className={styles.pageBtn} onClick={() => setPage(1)}>«</button>
          {totalPages > 1 ? (
            paginationPages.map((p) => <button key={p} type="button" className={`${styles.pageBtn} ${p === page ? styles.pageBtnActive : ''}`} onClick={() => setPage(p)}>{p}</button>)
          ) : (
            <>
              <button type="button" className={styles.pageBtn}>1</button>
              <span className={styles.pageDots}>...</span>
              <button type="button" className={styles.pageBtn}>4</button>
              <button type="button" className={styles.pageBtnActive}>5</button>
              <button type="button" className={styles.pageBtn}>6</button>
              <span className={styles.pageDots}>...</span>
              <button type="button" className={styles.pageBtn}>31</button>
            </>
          )}
          <button type="button" className={styles.pageBtn} onClick={() => setPage(totalPages || 1)}>»</button>
        </div>
      </div>
    </div>
  );
}
