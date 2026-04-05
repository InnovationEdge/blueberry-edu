import { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '../context/auth-context';
import { Logo } from './logo';

const NAV_ITEMS = [
  { label: 'კურსები', href: '/courses' },
  { label: 'მასტერკლასები', href: '#' },
  { label: 'სერტიფიკატები', href: '#' },
  { label: 'კარიერა', href: '#' },
  { label: 'ჩვენს შესახებ', href: '#' },
];

const LANGUAGES = ['ქართული', 'English', 'Русский'];

interface LandingHeaderProps {
  activePath?: string;
}

export function LandingHeader({ activePath }: LandingHeaderProps) {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { language, setLanguage } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="flex items-center px-5 md:px-12 lg:px-16 h-[72px]">
        {/* Logo */}
        <a href="/">
          <Logo variant="academy" className="h-[120px] md:h-[130px] w-auto -my-8" />
        </a>

        <div className="flex-1" />

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-7 mr-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                activePath === item.href ? 'text-[#004aad]' : 'text-gray-700 hover:text-[#004aad]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Language */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center gap-1.5 px-3 py-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-all text-sm"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{language}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showLanguageDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLanguageDropdown(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang); setShowLanguageDropdown(false); }}
                        className={`block w-full px-4 py-2.5 text-sm text-left transition-colors ${
                          language === lang ? 'bg-[#004aad]/10 text-[#004aad] font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
