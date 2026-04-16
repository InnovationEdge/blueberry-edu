import { useState, useEffect } from 'react';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '../context/auth-context';
import { Logo } from './logo';
import { getPageT } from '../i18n/pages';

const LANGUAGES = ['ქართული', 'English', 'Русский'];

interface LandingHeaderProps {
  activePath?: string;
}

export function LandingHeader({ activePath }: LandingHeaderProps) {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage } = useAuth();
  const t = getPageT(language);

  const NAV_ITEMS = [
    { label: t.navHome, href: '/' },
    { label: t.navCourses, href: '/courses' },
    { label: t.navMasterclasses, href: '/masterclass' },
    { label: t.navCertificates, href: '/certificates' },
    { label: t.navCareer, href: '/career' },
    { label: t.navAbout, href: '/about' },
  ];

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-black/[0.04]">
        <div className="flex items-center px-5 md:px-12 lg:px-16 h-[72px]">
          {/* Logo */}
          <a href="/" onClick={() => setMobileOpen(false)}>
            <Logo variant="academy" className="h-[120px] md:h-[130px] w-auto -my-8" />
          </a>

          <div className="flex-1" />

          {/* Desktop Nav */}
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
          <div className="flex items-center gap-1">
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

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#004aad] transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-50 shadow-2xl lg:hidden overflow-y-auto pt-20 border-l border-black/[0.04]"
            >
              <div className="flex flex-col py-4">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-6 py-4 text-base font-medium border-b border-gray-100 transition-colors ${
                      activePath === item.href
                        ? 'text-[#004aad] bg-[#004aad]/5'
                        : 'text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
