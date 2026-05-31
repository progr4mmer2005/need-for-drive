import type { Dispatch, SetStateAction } from 'react';
import { loadUser } from '../api/loadUser';

type TDeps = {
  setUsername: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function initUser(id: string | undefined, deps: TDeps): Promise<void> {
  if (!id) return;
  deps.setLoading(true);
  try {
    const username = await loadUser(Number(id));
    deps.setUsername(username);
  } catch (error) {
    console.error(error);
  } finally {
    deps.setLoading(false);
  }
}
