import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export const API_BASE_URL = 'http://localhost:3000/api';

const ACCESS_TOKEN_KEY = 'nfd_access_token';
const REFRESH_TOKEN_KEY = 'nfd_refresh_token';

export const TOKEN_STORAGE = {
  getAccess: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setAccess: (t: string) => localStorage.setItem(ACCESS_TOKEN_KEY, t),
  setRefresh: (t: string) => localStorage.setItem(REFRESH_TOKEN_KEY, t),
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

const API_CLIENT: AxiosInstance = axios.create({ baseURL: API_BASE_URL });

API_CLIENT.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = TOKEN_STORAGE.getAccess();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (t: string) => void; reject: (e: unknown) => void }> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token!);
  });
  failedQueue = [];
}

API_CLIENT.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return API_CLIENT(original);
        });
      }
      original._retry = true;
      isRefreshing = true;
      const refreshToken = TOKEN_STORAGE.getRefresh();
      if (!refreshToken) {
        TOKEN_STORAGE.clear();
        window.location.hash = '#/admin/login';
        return Promise.reject(error);
      }
      try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });
        const newToken = data.access_token;
        TOKEN_STORAGE.setAccess(newToken);
        if (data.refresh_token) TOKEN_STORAGE.setRefresh(data.refresh_token);
        processQueue(null, newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return API_CLIENT(original);
      } catch (e) {
        processQueue(e, null);
        TOKEN_STORAGE.clear();
        window.location.hash = '#/admin/login';
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default API_CLIENT;

