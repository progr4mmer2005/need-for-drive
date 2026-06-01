import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Category } from '@/shared/api/types';
import { AdminListLayout } from '@/shared/components/AdminListLayout';
import { calcTotalPages } from '@/shared/lib/pagination';
import { getPageCategories } from './lib/form/getPageCategories';
import { initCategories } from './lib/handlers/initCategories';

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    initCategories({ setCategories, setLoading });
  }, []);

  const totalPages = calcTotalPages(categories.length);
  const pageItems = getPageCategories(categories, page);

  return (
    <AdminListLayout
      title="Категории автомобилей"
      addLink="/admin/categories/new"
      loading={loading}
      items={pageItems}
      emptyText="Нет категорий"
      columns={['ID', 'Название', 'Действия']}
      renderRow={(category, cx) => (
        <tr key={category.id}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>
            <Link to={`/admin/categories/${category.id}`} className={cx.editLink}>
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
