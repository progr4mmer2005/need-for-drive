import { USERS_API } from '@/shared/api/usersApi';

export async function deleteUser(id: number): Promise<void> {
  await USERS_API.delete(id);
}
