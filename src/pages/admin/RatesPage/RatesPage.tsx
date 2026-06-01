import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Rate } from '@/shared/api/types';
import { AdminListLayout } from '@/shared/components/AdminListLayout';
import { calcTotalPages } from '@/shared/lib/pagination';
import { getPageRates } from './lib/form/getPageRates';
import { initRates } from './lib/handlers/initRates';

export function RatesPage() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    void initRates({ setRates, setLoading });
  }, []);

  const totalPages = calcTotalPages(rates.length);
  const pageItems = getPageRates(rates, page);

  return (
    <AdminListLayout
      title="Тарифы"
      addLink="/admin/rates/new"
      loading={loading}
      items={pageItems}
      emptyText="Нет тарифов"
      columns={['ID', 'Тип', 'Цена', 'Действия']}
      renderRow={(rate, cx) => (
        <tr key={rate.id}>
          <td>{rate.id}</td>
          <td>{rate.rateTypeId?.name || '—'} ({rate.rateTypeId?.unit || '—'})</td>
          <td>{rate.price.toLocaleString('ru-RU')} ₽</td>
          <td><Link to={`/admin/rates/${rate.id}`} className={cx.editLink}>Изменить</Link></td>
        </tr>
      )}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
}
