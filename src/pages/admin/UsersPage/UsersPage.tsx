import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { User } from '@/shared/api/types';
import { AdminListLayout } from '@/shared/components/AdminListLayout';
import { calcTotalPages } from '@/shared/lib/pagination';
import { initUsers } from './lib/handlers/initUsers';

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    initUsers(page, { setUsers, setTotal, setLoading });
  }, [page]);

  const totalPages = calcTotalPages(total);

  return (
    <AdminListLayout
      title="Пользователи"
      loading={loading}
      items={users}
      emptyText="Нет пользователей"
      columns={['ID', 'Имя пользователя', 'Действия']}
      renderRow={(user, cx) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>
            <Link to={`/admin/users/${user.id}`} className={cx.editLink}>
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
