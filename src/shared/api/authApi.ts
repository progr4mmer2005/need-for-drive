import axios from 'axios';
import API_CLIENT, { API_BASE_URL, TOKEN_STORAGE } from './apiClient';
import type { AuthResponse } from './types';

export async function login(username: string, password: string): Promise<AuthResponse> {
  const { data } = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, {
    username,
    password,
  });

  TOKEN_STORAGE.setAccess(data.access_token);
  TOKEN_STORAGE.setRefresh(data.refresh_token);
  return data;
}

export async function register(username: string, password: string): Promise<AuthResponse> {
  const { data } = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/registration`, {
    username,
    password,
  });

  TOKEN_STORAGE.setAccess(data.access_token);
  TOKEN_STORAGE.setRefresh(data.refresh_token);
  return data;
}

export async function refreshToken(): Promise<AuthResponse> {
  const refresh = TOKEN_STORAGE.getRefresh();
  if (!refresh) throw new Error('Refresh token is missing');

  const { data } = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/refresh`, {
    refresh_token: refresh,
  });

  TOKEN_STORAGE.setAccess(data.access_token);
  TOKEN_STORAGE.setRefresh(data.refresh_token);
  return data;
}

export async function logout(): Promise<void> {
  try {
    await API_CLIENT.post('/auth/logout');
  } catch {
  }

  TOKEN_STORAGE.clear();
}
