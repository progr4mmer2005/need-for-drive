import { useEffect, useState, useCallback, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ORDERS_API, type OrderDto } from '@/shared/api/ordersApi';
import { CARS_API } from '@/shared/api/carsApi';
import { CITIES_API, ORDER_STATUS_API } from '@/shared/api/citiesApi';
import type { Order, Car, City, OrderStatus } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { Loader } from '@/shared/components/Loader';
import styles from './OrdersPage.module.scss';

const PAGE_SIZE = 10;
const DRAFT_FILTERS_DEFAULT = { period: '', car: '', city: '', status: '' };
const APPLIED_FILTERS_DEFAULT = { period: '', car: '', city: '', status: '' };

function formatDate(ts: number) {
  if (!ts) return '—';
  return new Date(ts).toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

function formatPrice(price: number) {
  return price ? `${price.toLocaleString('ru-RU')} ₽` : '—';
}

function buildPaginationPages(current: number, total: number): Array<number | '...'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

function toOrderDto(order: Order, statusId?: number): OrderDto {
  return {
    orderStatusId: statusId ? { id: statusId } : order.orderStatusId ? { id: order.orderStatusId.id } : undefined,
    cityId: { id: order.cityId.id },
    pointId: { id: order.pointId.id },
    carId: { id: order.carId.id },
    rateId: { id: order.rateId.id },
    color: order.color,
    dateFrom: order.dateFrom,
    dateTo: order.dateTo,
    price: order.price,
    isFullTank: order.isFullTank,
    isNeedChildChair: order.isNeedChildChair,
    isRightWheel: order.isRightWheel,
  };
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
  const [draftFilters, setDraftFilters] = useState(DRAFT_FILTERS_DEFAULT);
  const [appliedFilters, setAppliedFilters] = useState(APPLIED_FILTERS_DEFAULT);

  useEffect(() => {
    Promise.all([CARS_API.getAll({ limit: 1000 }), CITIES_API.getAll(), ORDER_STATUS_API.getAll()])
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
      const params: Record<string, number> = {
        limit: PAGE_SIZE,
        page: page - 1,
      };

      if (appliedFilters.car) params.carId = Number(appliedFilters.car);
      if (appliedFilters.city) params.cityId = Number(appliedFilters.city);
      if (appliedFilters.status) params.orderStatusId = Number(appliedFilters.status);

      const data = await ORDERS_API.getAll(params);
      setOrders(data.data);
      setTotal(data.count ?? 0);
    } catch (error: unknown) {
      if ((error as { response?: { status?: number } })?.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  }, [page, appliedFilters, navigate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const paginationPages = buildPaginationPages(page, totalPages);

  const handlePeriodChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDraftFilters((prevFilters) => ({ ...prevFilters, period: event.target.value }));
  };

  const handleCarChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDraftFilters((prevFilters) => ({ ...prevFilters, car: event.target.value }));
  };

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDraftFilters((prevFilters) => ({ ...prevFilters, city: event.target.value }));
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDraftFilters((prevFilters) => ({ ...prevFilters, status: event.target.value }));
  };

  return (
    <div>
      <AdminPageTitle>Заказы</AdminPageTitle>
      <div className={styles.tableWrap}>
        <div className={styles.filters}>
          <select className={`${styles.filterSelect} ${!draftFilters.period ? styles.filterPlaceholder : ''}`} value={draftFilters.period} onChange={handlePeriodChange}>
            <option value="">Время</option>
            <option value="week">За неделю</option>
            <option value="month">За месяц</option>
            <option value="all">За всё время</option>
          </select>
          <select className={`${styles.filterSelect} ${!draftFilters.car ? styles.filterPlaceholder : ''}`} value={draftFilters.car} onChange={handleCarChange}>
            <option value="">Автомобиль</option>
            {cars.map((car) => <option key={car.id} value={car.id}>{car.name}</option>)}
          </select>
          <select className={`${styles.filterSelect} ${!draftFilters.city ? styles.filterPlaceholder : ''}`} value={draftFilters.city} onChange={handleCityChange}>
            <option value="">Город</option>
            {cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}
          </select>
          <select className={`${styles.filterSelect} ${!draftFilters.status ? styles.filterPlaceholder : ''}`} value={draftFilters.status} onChange={handleStatusChange}>
            <option value="">В процессе</option>
            {statuses.map((status) => <option key={status.id} value={status.id}>{status.name}</option>)}
          </select>
          <button
            className={styles.applyBtn}
            type="button"
            onClick={() => {
              setPage(1);
              setAppliedFilters(draftFilters);
            }}
          >
            Применить
          </button>
        </div>

        <div className={styles.scrollArea}>
          {loading ? <Loader /> : orders.length === 0 ? <p className={styles.empty}>Нет заказов</p> : orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.carImg}>
                {order.carId?.thumbnail?.path ? <img src={order.carId.thumbnail.path} alt="" /> : null}
              </div>
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
                <button className={`${styles.actionBtn} ${styles.successBtn}`} type="button" onClick={() => ORDERS_API.update(order.id, toOrderDto(order, 4)).then(fetchOrders)}>✓ Готово</button>
                <button className={`${styles.actionBtn} ${styles.dangerBtn}`} type="button" onClick={() => ORDERS_API.update(order.id, toOrderDto(order, 3)).then(fetchOrders)}>✕ Отмена</button>
                <button className={`${styles.actionBtn} ${styles.editBtn}`} type="button" onClick={() => navigate(`/admin/orders/${order.id}`)}>⋮ Изменить</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          <button type="button" className={styles.pageBtn} disabled={page === 1} onClick={() => setPage(1)}>«</button>
          {paginationPages.map((pageItem, pageIndex) => {
            if (pageItem === '...') {
              return <span key={`dots-${pageIndex}`} className={styles.pageDots}>...</span>;
            }

            const isActive = pageItem === page;
            return (
              <button
                key={pageItem}
                type="button"
                className={isActive ? styles.pageBtnActive : styles.pageBtn}
                onClick={() => setPage(pageItem)}
              >
                {pageItem}
              </button>
            );
          })}
          <button type="button" className={styles.pageBtn} disabled={page === totalPages} onClick={() => setPage(totalPages)}>»</button>
        </div>
      </div>
    </div>
  );
}
