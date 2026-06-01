import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import {
  login as apiLogin,
  logout as apiLogout,
  refreshToken as apiRefreshToken,
  register as apiRegister,
} from '@/shared/api/authApi';
import { TOKEN_STORAGE } from '@/shared/api/apiClient';

interface AuthContextValue {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  username: string;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    let mounted = true;

    const bootstrapAuth = async () => {
      const access = TOKEN_STORAGE.getAccess();
      const refresh = TOKEN_STORAGE.getRefresh();

      if (!access && !refresh) {
        if (mounted) {
          setIsAuthenticated(false);
          setIsAuthLoading(false);
        }
        return;
      }

      if (access) {
        if (mounted) {
          setIsAuthenticated(true);
          setUsername(TOKEN_STORAGE.getUsername());
          setIsAuthLoading(false);
        }
        return;
      }

      try {
        await apiRefreshToken();
        if (mounted) {
          setIsAuthenticated(true);
          setUsername(TOKEN_STORAGE.getUsername());
        }
      } catch {
        TOKEN_STORAGE.clear();
        if (mounted) setIsAuthenticated(false);
      } finally {
        if (mounted) setIsAuthLoading(false);
      }
    };

    bootstrapAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(async (usernameArg: string, password: string) => {
    await apiLogin(usernameArg, password);
    setIsAuthenticated(true);
    setUsername(TOKEN_STORAGE.getUsername());
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    setIsAuthenticated(false);
    setUsername('');
  }, []);

  const register = useCallback(async (usernameArg: string, password: string) => {
    await apiRegister(usernameArg, password);
    setIsAuthenticated(true);
    setUsername(TOKEN_STORAGE.getUsername());
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthLoading,
        username,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
