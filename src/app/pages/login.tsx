import { useState } from 'react';
import { X } from 'lucide-react';
import { getAppT } from '../i18n/app';
import { useAuth } from '../context/auth-context';

interface LoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export function Login({ onLogin, onBack }: LoginProps) {
  const { language, loginWithCredentials } = useAuth();
  const t = getAppT(language);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setError('');
    setLoading(true);
    try {
      await loginWithCredentials(email, password);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'შესვლა ვერ მოხერხდა');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-black text-white overflow-hidden relative">
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[55%]">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=1600&fit=crop&crop=faces&q=80"
          alt="Students learning"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/50" />
      </div>

      <header className="relative z-10 px-4 md:px-12 py-5">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Blueberry</h1>
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors" aria-label="Back">
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </header>

      <div className="relative z-10 h-[calc(100vh-72px)] flex items-center lg:w-[45%] px-8 md:px-16 lg:px-20">
        <div className="w-full max-w-[400px] space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">{t.loginWelcomeBack}</h1>
            <p className="text-sm text-white/40">{t.loginSubtitle}</p>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ელ-ფოსტა"
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#1a4fd8]"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="პაროლი"
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#1a4fd8]"
              />
            </div>
            {error && <p className="text-[#1a4fd8] text-xs">{error}</p>}
            <button type="submit" disabled={loading || !email || !password}
              className="w-full py-3 bg-[#1a4fd8] text-white rounded-full text-sm font-bold hover:bg-[#1540b0] transition-all active:scale-95 disabled:opacity-50">
              {loading ? 'შესვლა...' : 'შესვლა'}
            </button>
          </form>

          <div className="relative flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/20 text-xs">ან</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="space-y-3">
            <button onClick={onLogin}
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 border border-white/15 hover:bg-white/5 rounded font-semibold transition-colors text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {t.loginContinueGoogle}
            </button>

            <button onClick={onLogin}
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 border border-white/15 hover:bg-white/5 rounded font-semibold transition-colors text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              {t.loginContinueApple}
            </button>
          </div>

          <p className="text-[11px] text-white/20 leading-relaxed">
            {t.loginTermsPrefix}{' '}
            <a href="#" className="text-white/30 hover:text-white underline">{t.loginTermsOfService}</a>
            {' '}{t.loginTermsAnd}{' '}
            <a href="#" className="text-white/30 hover:text-white underline">{t.loginPrivacyPolicy}</a>
          </p>

          <p className="text-sm text-white/30">
            {t.loginNewToBM}{' '}
            <button onClick={onBack} className="text-white font-semibold hover:underline">{t.loginGetStarted}</button>
          </p>

          {/* Test credentials hint */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-3">
            <p className="text-white/10 text-[9px] select-all">tiko@brightmind.ge / Test1234!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
