import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { OrderStatus } from '@/shared/api/types';
import { AdminListLayout } from '@/shared/components/AdminListLayout';
import { calcTotalPages } from '@/shared/lib/pagination';
import { getPageStatuses } from './lib/form/getPageStatuses';
import { initOrderStatuses } from './lib/handlers/initOrderStatuses';

export function OrderStatusesPage() {
  const [statuses, setStatuses] = useState<OrderStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    initOrderStatuses({ setStatuses, setLoading });
  }, []);

  const totalPages = calcTotalPages(statuses.length);
  const pageItems = getPageStatuses(statuses, page);

  return (
    <AdminListLayout
      title="Статусы заказов"
      addLink="/admin/order-statuses/new"
      loading={loading}
      items={pageItems}
      emptyText="Нет статусов"
      columns={['ID', 'Название', 'Действия']}
      renderRow={(status, cx) => (
        <tr key={status.id}>
          <td>{status.id}</td>
          <td>{status.name}</td>
          <td>
            <Link to={`/admin/order-statuses/${status.id}`} className={cx.editLink}>
              Изменить
            </Link>
          </td>
        </tr>
      )}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
}

export default OrderStatusesPage;
