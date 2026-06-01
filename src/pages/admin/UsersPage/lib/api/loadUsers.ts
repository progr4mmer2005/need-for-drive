import { USERS_API } from '@/shared/api/usersApi';
import type { User } from '@/shared/api/types';
import { PAGE_SIZE } from '@/shared/lib/pagination';

export async function loadUsers(page: number): Promise<{ data: User[]; count: number }> {
  const res = await USERS_API.getAll({ limit: PAGE_SIZE, page: page - 1 });
  return { data: res.data, count: res.count ?? 0 };
}
