import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
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
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

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
          setIsAuthLoading(false);
        }
        return;
      }

      try {
        await apiRefreshToken();
        if (mounted) setIsAuthenticated(true);
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

  const login = useCallback(async (username: string, password: string) => {
    await apiLogin(username, password);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    setIsAuthenticated(false);
  }, []);

  const register = useCallback(async (username: string, password: string) => {
    await apiRegister(username, password);
    setIsAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isAuthLoading,
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
