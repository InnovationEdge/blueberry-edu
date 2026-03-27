import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  showOnboarding: boolean;
  showLogin: boolean;
  language: string;
  setLanguage: (lang: string) => void;
  login: () => void;
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

  const login = () => { setShowLogin(false); setShowOnboarding(true); };
  const logout = () => { setIsAuthenticated(false); setShowOnboarding(false); setShowLogin(false); };
  const completeOnboarding = () => { setShowOnboarding(false); setIsAuthenticated(true); };
  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  return (
    <AuthContext.Provider value={{
      isAuthenticated, showOnboarding, showLogin, language, setLanguage,
      login, logout, completeOnboarding, openLogin, closeLogin
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
