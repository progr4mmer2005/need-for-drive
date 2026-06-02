import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { City } from '@/shared/api/types';
import { AdminListLayout } from '@/shared/components/AdminListLayout';
import { calcTotalPages } from '@/shared/lib/pagination';
import { getPageCities } from './lib/form/getPageCities';
import { initCities } from './lib/handlers/initCities';

export function CitiesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    initCities({ setCities, setLoading });
  }, []);

  const totalPages = calcTotalPages(cities.length);
  const pageItems = getPageCities(cities, page);

  return (
    <AdminListLayout
      title="Города"
      addLink="/admin/cities/new"
      loading={loading}
      items={pageItems}
      emptyText="Нет городов"
      columns={['ID', 'Название', 'Действия']}
      renderRow={(city, cx) => (
        <tr key={city.id}>
          <td>{city.id}</td>
          <td>{city.name}</td>
          <td>
            <Link to={`/admin/cities/${city.id}`} className={cx.editLink}>
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

export default CitiesPage;
