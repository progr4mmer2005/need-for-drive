import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { RateType } from '@/shared/api/types';
import { AdminListLayout } from '@/shared/components/AdminListLayout';
import { calcTotalPages } from '@/shared/lib/pagination';
import { getPageRateTypes } from './lib/form/getPageRateTypes';
import { initRateTypes } from './lib/handlers/initRateTypes';

export function RateTypesPage() {
  const [rateTypes, setRateTypes] = useState<RateType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    initRateTypes({ setRateTypes, setLoading });
  }, []);

  const totalPages = calcTotalPages(rateTypes.length);
  const pageItems = getPageRateTypes(rateTypes, page);

  return (
    <AdminListLayout
      title="Типы тарифов"
      addLink="/admin/rate-types/new"
      loading={loading}
      items={pageItems}
      emptyText="Нет типов тарифов"
      columns={['ID', 'Название', 'Единица', 'Действия']}
      renderRow={(rateType, cx) => (
        <tr key={rateType.id}>
          <td>{rateType.id}</td>
          <td>{rateType.name}</td>
          <td>{rateType.unit}</td>
          <td>
            <Link to={`/admin/rate-types/${rateType.id}`} className={cx.editLink}>
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

export default RateTypesPage;
