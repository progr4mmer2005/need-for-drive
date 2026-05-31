import type { Dispatch, SetStateAction } from 'react';
import type { User } from '@/shared/api/types';
import { loadUsers } from '../api/loadUsers';

type TDeps = {
  setUsers: Dispatch<SetStateAction<User[]>>;
  setTotal: Dispatch<SetStateAction<number>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function initUsers(page: number, deps: TDeps): Promise<void> {
  deps.setLoading(true);
  try {
    const { data, count } = await loadUsers(page);
    deps.setUsers(data);
    deps.setTotal(count);
  } catch (error) {
    console.error(error);
  } finally {
    deps.setLoading(false);
  }
}
