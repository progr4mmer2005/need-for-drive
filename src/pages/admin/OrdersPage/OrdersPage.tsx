import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Order, Car, City, OrderStatus } from '@/shared/api/types';
import { AdminPageTitle } from '@/shared/components/AdminPageTitle';
import { AdminPagination } from '@/shared/components/AdminPagination';
import { AdminToast } from '@/shared/components/AdminToast';
import { Loader } from '@/shared/components/Loader';
import { OrderCard } from './ui/OrderCard';
import { OrderFilters } from './ui/OrderFilters';
import type { TFilters, TToast } from './types';
import { DEFAULT_FILTERS } from './constants';
import { calcTotalPages } from './lib/form/calcTotalPages';
import { initFilterOptions } from './lib/handlers/initFilterOptions';
import { fetchOrders } from './lib/handlers/fetchOrders';
import { handleFilterChange } from './lib/handlers/handleFilterChange';
import { handleApplyFilters } from './lib/handlers/handleApplyFilters';
import { handleComplete } from './lib/handlers/handleComplete';
import { handleDelete } from './lib/handlers/handleDelete';
import styles from './OrdersPage.module.scss';

export function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<TToast | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [statuses, setStatuses] = useState<OrderStatus[]>([]);
  const [draftFilters, setDraftFilters] = useState<TFilters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<TFilters>(DEFAULT_FILTERS);

  const showToast = (message: string, type: TToast['type']) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    void initFilterOptions({ setCars, setCities, setStatuses }).catch(console.error);
  }, []);

  const refetch = useCallback(() => {
    void fetchOrders(page, appliedFilters, { setOrders, setTotal, setLoading, navigate });
  }, [page, appliedFilters, navigate]);

  useEffect(() => { refetch(); }, [refetch]);

  const totalPages = calcTotalPages(total);

  return (
    <div>
      {toast && <AdminToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AdminPageTitle>Заказы</AdminPageTitle>

      <div className={styles.tableWrap}>
        <OrderFilters
          filters={draftFilters}
          cars={cars}
          cities={cities}
          statuses={statuses}
          onFilterChange={(key, value) => handleFilterChange(key, value, setDraftFilters)}
          onApply={() => handleApplyFilters(draftFilters, { setPage, setAppliedFilters })}
        />

        <div className={styles.scrollArea}>
          {loading ? (
            <Loader />
          ) : orders.length === 0 ? (
            <p className={styles.empty}>Нет заказов</p>
          ) : orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onComplete={() => handleComplete(order, refetch, showToast)}
              onDelete={() => handleDelete(order, refetch, showToast)}
              onEdit={() => navigate(`/admin/orders/${order.id}`)}
            />
          ))}
        </div>

        <AdminPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
