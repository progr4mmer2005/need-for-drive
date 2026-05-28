import { TOKEN_STORAGE } from './apiClient';
import type { AuthResponse } from './types';

function makeFakeToken(prefix: string, username: string): string {
  const payload = btoa(JSON.stringify({ user: username, t: Date.now() }));
  return `mock-${prefix}-${payload}`;
}

export async function login(username: string, password: string): Promise<AuthResponse> {
  if (!username || !password) {
    throw new Error('Пустой логин или пароль');
  }
  await new Promise((resolve) => setTimeout(resolve, 200));
  const resp: AuthResponse = {
    access_token: makeFakeToken('access', username),
    refresh_token: makeFakeToken('refresh', username),
    expires_in: 3600000,
  };
  TOKEN_STORAGE.setAccess(resp.access_token);
  TOKEN_STORAGE.setRefresh(resp.refresh_token);
  localStorage.setItem('nfd_mock_user', username);
  return resp;
}

export async function logout(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  TOKEN_STORAGE.clear();
  localStorage.removeItem('nfd_mock_user');
}
