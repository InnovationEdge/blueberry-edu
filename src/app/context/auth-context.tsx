import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  language: string;
  setLanguage: (lang: string) => void;
  openLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('bm-lang') ?? 'ქართული');

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('bm-lang', lang);
  };

  const openLogin = () => {
    // Placeholder — მომავალში Supabase Auth
  };

  return (
    <AuthContext.Provider value={{ language, setLanguage: handleSetLanguage, openLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
