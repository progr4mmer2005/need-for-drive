import { TOKEN_STORAGE } from './apiClient';
import type { AuthResponse } from './types';

// Mock auth — принимает любую пару логин/пароль (валидация только на стороне формы)
function makeFakeToken(prefix: string, username: string): string {
  const payload = btoa(JSON.stringify({ user: username, t: Date.now() }));
  return `mock-${prefix}-${payload}`;
}

export async function login(username: string, password: string): Promise<AuthResponse> {
  if (!username || !password) {
    throw new Error('Пустой логин или пароль');
  }
  await new Promise((r) => setTimeout(r, 200));
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
  await new Promise((r) => setTimeout(r, 100));
  TOKEN_STORAGE.clear();
  localStorage.removeItem('nfd_mock_user');
}
