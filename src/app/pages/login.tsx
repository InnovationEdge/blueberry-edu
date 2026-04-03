import { useState } from 'react';
import { X } from 'lucide-react';
import { Logo } from '../components/logo';
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
    <div className="h-screen bg-background text-foreground flex items-center justify-center px-6">
      {/* Close button */}
      <button
        onClick={onBack}
        className="fixed top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hover transition-colors"
        aria-label="Back"
      >
        <X className="w-5 h-5 text-foreground-secondary" />
      </button>

      {/* Centered card */}
      <div className="w-full max-w-[440px] bg-card rounded-2xl border border-border-subtle shadow-lg p-8 md:p-10 space-y-7">
        {/* Logo & heading */}
        <div className="text-center space-y-3">
          <Logo className="h-8 w-auto mx-auto" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t.loginWelcomeBack}</h1>
            <p className="text-sm text-foreground-subtle mt-1">{t.loginSubtitle}</p>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ელ-ფოსტა"
              className="w-full px-4 py-3.5 bg-background border border-border rounded-lg text-foreground text-sm placeholder-foreground-faint focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="პაროლი"
              className="w-full px-4 py-3.5 bg-background border border-border rounded-lg text-foreground text-sm placeholder-foreground-faint focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all"
            />
          </div>
          {error && <p className="text-brand text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full py-3.5 bg-brand text-white rounded-full text-sm font-semibold hover:bg-brand-hover shadow-sm hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'შესვლა...' : 'შესვლა'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-foreground-faint text-xs">ან</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Social buttons */}
        <div className="space-y-3">
          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 border border-border rounded-lg hover:bg-surface-hover font-semibold transition-colors text-sm text-foreground"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {t.loginContinueGoogle}
          </button>

          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 border border-border rounded-lg hover:bg-surface-hover font-semibold transition-colors text-sm text-foreground"
          >
            <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            {t.loginContinueApple}
          </button>
        </div>

        {/* Terms */}
        <p className="text-[11px] text-foreground-faint leading-relaxed text-center">
          {t.loginTermsPrefix}{' '}
          <a href="#" className="text-foreground-subtle hover:text-foreground underline">{t.loginTermsOfService}</a>
          {' '}{t.loginTermsAnd}{' '}
          <a href="#" className="text-foreground-subtle hover:text-foreground underline">{t.loginPrivacyPolicy}</a>
        </p>

        {/* Sign up link */}
        <p className="text-sm text-foreground-subtle text-center">
          {t.loginNewToBM}{' '}
          <button onClick={onBack} className="text-brand font-semibold hover:underline">{t.loginGetStarted}</button>
        </p>

        {/* Test credentials hint */}
        <div className="bg-surface-blue rounded-lg p-3.5 text-center">
          <p className="text-foreground-ghost text-[10px] select-all tracking-wide">tiko@brightmind.ge / Test1234!</p>
        </div>
      </div>
    </div>
  );
}
