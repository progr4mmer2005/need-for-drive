import { USERS_API } from '@/shared/api/usersApi';

export async function saveUser(id: number, username: string): Promise<void> {
  await USERS_API.update(id, { username });
}
