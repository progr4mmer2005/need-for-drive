import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Point } from '@/shared/api/types';
import { AdminListLayout } from '@/shared/components/AdminListLayout';
import { calcTotalPages } from '@/shared/lib/pagination';
import { initPoints } from './lib/handlers/initPoints';

export function PointsPage() {
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    void initPoints(page, { setPoints, setTotal, setLoading });
  }, [page]);

  const totalPages = calcTotalPages(total);

  return (
    <AdminListLayout
      title="Пункты выдачи"
      addLink="/admin/points/new"
      loading={loading}
      items={points}
      emptyText="Нет пунктов выдачи"
      columns={['ID', 'Название', 'Адрес', 'Город', 'Действия']}
      renderRow={(point, cx) => (
        <tr key={point.id}>
          <td>{point.id}</td>
          <td>{point.name}</td>
          <td>{point.address}</td>
          <td>{point.cityId?.name || '—'}</td>
          <td><Link to={`/admin/points/${point.id}`} className={cx.editLink}>Изменить</Link></td>
        </tr>
      )}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
}
