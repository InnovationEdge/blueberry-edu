import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { authMe, authLogin, authLogout, authRegister, setAuthToken } from '../../lib/api';
import type { AuthUser } from '../../lib/api';

type UserType = 'student' | 'instructor';

interface AuthContextType {
  isAuthenticated: boolean;
  showOnboarding: boolean;
  showLogin: boolean;
  language: string;
  userType: UserType;
  user: AuthUser | null;
  isLoading: boolean;
  setLanguage: (lang: string) => void;
  setUserType: (type: UserType) => void;
  login: () => void;
  loginWithCredentials: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
  openLogin: () => void;
  closeLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [language, setLanguage] = useState('ქართული');
  const [userType, setUserType] = useState<UserType>('student');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check saved session on mount
  useEffect(() => {
    const token = localStorage.getItem('bm_token');
    if (token) {
      setAuthToken(token);
      authMe()
        .then((res) => {
          if (res.data?.user) {
            setUser(res.data.user);
            setIsAuthenticated(true);
            setUserType(res.data.user.role === 'INSTRUCTOR' ? 'instructor' : 'student');
          }
        })
        .catch(() => {
          setAuthToken(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const loginWithCredentials = useCallback(async (email: string, password: string) => {
    const res = await authLogin({ email, password });
    if (res.data) {
      setAuthToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setShowLogin(false);
      setUserType(res.data.user.role === 'INSTRUCTOR' ? 'instructor' : 'student');
      if (!res.data.user.onboardingCompleted) {
        setShowOnboarding(true);
      }
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    const res = await authRegister({ email, password, name });
    if (res.data) {
      setAuthToken(res.data.token);
      setUser(res.data.user);
      setShowLogin(false);
      setShowOnboarding(true);
    }
  }, []);

  // Mock login (for OAuth buttons that aren't wired yet)
  const login = useCallback(() => {
    setShowLogin(false);
    setShowOnboarding(true);
  }, []);

  const logout = useCallback(() => {
    authLogout().catch(() => {});
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setShowOnboarding(false);
    setShowLogin(false);
    setUserType('student');
  }, []);

  const completeOnboarding = useCallback(() => {
    setShowOnboarding(false);
    setIsAuthenticated(true);
  }, []);

  const openLogin = useCallback(() => setShowLogin(true), []);
  const closeLogin = useCallback(() => setShowLogin(false), []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated, showOnboarding, showLogin, language, userType, user, isLoading,
      setLanguage, setUserType, login, loginWithCredentials, register, logout, completeOnboarding, openLogin, closeLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
