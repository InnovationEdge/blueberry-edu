import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from './lib/supabase';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';
import { CoursesList } from './pages/courses-list';
import { CourseEditor } from './pages/course-editor';
import { Masterclasses } from './pages/masterclasses';
import { Registrations } from './pages/registrations';
import './index.css';

const queryClient = new QueryClient();

interface AuthCtx { user: { email: string } | null; loading: boolean; signOut: () => void }
const AuthContext = createContext<AuthCtx>({ user: null, loading: true, signOut: () => {} });
export const useAdminAuth = () => useContext(AuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ? { email: data.session.user.email ?? '' } : null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { email: session.user.email ?? '' } : null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signOut: () => supabase.auth.signOut() }}>
      {children}
    </AuthContext.Provider>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAdminAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><CoursesList /></ProtectedRoute>} />
            <Route path="/courses/:id" element={<ProtectedRoute><CourseEditor /></ProtectedRoute>} />
            <Route path="/masterclasses" element={<ProtectedRoute><Masterclasses /></ProtectedRoute>} />
            <Route path="/registrations" element={<ProtectedRoute><Registrations /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
