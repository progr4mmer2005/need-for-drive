import { USERS_API } from '@/shared/api/usersApi';

export async function loadUser(id: number): Promise<string> {
  const res = await USERS_API.getOne(id);
  return res.data.username || '';
}
