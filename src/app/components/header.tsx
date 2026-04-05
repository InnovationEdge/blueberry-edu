import { Search, Bell, ChevronDown, LogOut, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import { Logo } from './logo';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/auth-context';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'motion/react';
import { getAppT } from '../i18n/app';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { logout, language, user } = useAuth();
  const { theme, setTheme } = useTheme();
  const t = getAppT(language);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const isInstructor = user?.role === 'INSTRUCTOR';

  const navItems = [
    { name: t.headerHome, path: '/' },
    { name: t.headerProgress, path: '/my-progress' },
    { name: t.headerLibrary, path: '/library' },
    ...(isInstructor ? [{ name: 'ინსტრუქტორი', path: '/instructor' }] : []),
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border-subtle shadow-sm'
          : ''
      }`}
    >
      {/* Soft gradient overlay when not scrolled */}
      {!isScrolled && (
        <div className="absolute inset-x-0 top-0 h-[200%] bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none" />
      )}

      <div className="relative flex items-center justify-between px-4 md:px-12 py-4 md:py-5">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="group hover:opacity-80 transition-opacity">
            <Logo variant="academy" className="h-20 md:h-24 w-auto" />
          </Link>
          {!showSearch && (
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm lg:text-base transition-all relative group ${
                    location.pathname === item.path
                      ? 'text-foreground font-semibold'
                      : 'text-foreground-secondary hover:text-foreground font-medium'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-brand rounded-full" />
                  )}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Search */}
          {showSearch ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-foreground-subtle" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.headerSearch}
                  className="w-64 md:w-80 pl-10 pr-10 py-2.5 bg-surface border border-border rounded-full text-foreground text-sm placeholder-foreground-faint focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 text-foreground-subtle hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
                className="p-2 rounded-full hover:bg-surface-hover transition-colors text-foreground-secondary hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2.5 rounded-full hover:bg-surface-hover transition-colors text-foreground-secondary hover:text-foreground"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {!showSearch && (
            <>
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-full hover:bg-surface-hover transition-colors text-foreground-secondary hover:text-foreground"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Notification bell */}
              <button className="p-2.5 rounded-full hover:bg-surface-hover transition-colors text-foreground-secondary hover:text-foreground relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full" />
              </button>

              {/* Avatar & dropdown */}
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-brand-hover flex items-center justify-center text-white text-sm font-semibold shadow-sm group-hover:shadow-md transition-all group-hover:scale-105">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-foreground-secondary transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                </div>

                {/* Dropdown Menu */}
                <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute right-0 mt-3 w-60 bg-card border border-border-subtle rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="p-4 border-b border-border-subtle">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-hover flex items-center justify-center text-white font-semibold">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="min-w-0">
                          <p className="text-foreground font-semibold text-sm truncate">{user?.name || 'მომხმარებელი'}</p>
                          <p className="text-foreground-subtle text-xs truncate">{user?.email || ''}</p>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="w-full px-4 py-3 text-left text-foreground-secondary hover:text-foreground hover:bg-surface-hover transition-colors flex items-center gap-3 rounded-lg mx-1 my-0.5 block"
                      style={{ width: 'calc(100% - 0.5rem)' }}
                    >
                      <span className="text-sm">პროფილი</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left text-foreground-secondary hover:text-foreground hover:bg-surface-hover transition-colors flex items-center gap-3 rounded-lg mx-1 my-0.5"
                      style={{ width: 'calc(100% - 0.5rem)' }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">{t.headerSignOut}</span>
                    </button>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
