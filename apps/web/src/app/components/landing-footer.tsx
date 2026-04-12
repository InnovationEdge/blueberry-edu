import { Logo } from './logo';
import { useAuth } from '../context/auth-context';
import { useTheme } from 'next-themes';

const FOOTER_NAV = {
  პლატფორმა: [
    { label: 'კურსები', href: '/courses' },
    { label: 'მასტერკლასები', href: '#' },
    { label: 'სერტიფიკატები', href: '#' },
    { label: 'ფასები', href: '#' },
  ],
  კომპანია: [
    { label: 'ჩვენს შესახებ', href: '#' },
    { label: 'კარიერა', href: '#' },
    { label: 'ბლოგი', href: '#' },
    { label: 'კონტაქტი', href: '#' },
  ],
  რესურსები: [
    { label: 'FAQ', href: '#' },
    { label: 'პირობები', href: '#' },
    { label: 'კონფიდენციალურობა', href: '#' },
  ],
};

export function LandingFooter() {
  const { openLogin } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <footer className="border-t border-border-subtle pt-14 pb-8">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Top — logo + nav columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Logo + tagline */}
          <div className="col-span-2">
            <Logo variant="academy" className="h-10 w-auto mb-4" />
            <p className="text-sm text-foreground-faint leading-relaxed max-w-xs">
              ონლაინ სასწავლო პლატფორმა საუკეთესო ინსტრუქტორებისგან. ისწავლე ახალი პროფესია და შეცვალე კარიერა.
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_NAV).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-foreground-faint hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border-subtle pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs text-foreground-faint">&copy; 2026 Blueberry Academy. ყველა უფლება დაცულია.</span>
            <div className="flex items-center gap-5 text-xs text-foreground-faint">
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="hover:text-foreground transition-colors">
                {theme === 'dark' ? 'ღია თემა' : 'მუქი თემა'}
              </button>
              <button onClick={() => openLogin()} className="hover:text-foreground transition-colors">შესვლა</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
