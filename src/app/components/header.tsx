import { Search, Bell, ChevronDown, BookOpen, LogOut, User, X } from 'lucide-react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/auth-context';
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
  const { logout, language } = useAuth();
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

  const navItems = [
    { name: t.headerHome, path: '/' },
    { name: t.headerProgress, path: '/my-progress' },
    { name: t.headerLibrary, path: '/library' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black shadow-xl shadow-black/50' : ''
      }`}
    >
      {/* Top gradient overlay — fades from black */}
      {!isScrolled && (
        <div className="absolute inset-x-0 top-0 h-[250%] bg-gradient-to-b from-black from-40% via-black/50 via-70% to-transparent pointer-events-none" />
      )}
      <div className="relative flex items-center justify-between px-4 md:px-12 py-4 md:py-5">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="group">
            <span className="text-white text-2xl md:text-3xl font-black tracking-tight hover:text-white/80 transition-colors">BRIGHTMIND</span>
          </Link>
          {!showSearch && (
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm lg:text-base transition-all relative group ${
                    location.pathname === item.path
                      ? 'text-white font-semibold'
                      : 'text-gray-300 hover:text-white font-medium'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search */}
          {showSearch ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-5 h-5 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.headerSearch}
                  className="w-64 md:w-80 pl-10 pr-10 py-2 bg-black/80 border border-white/15 text-white placeholder-white/30 rounded focus:outline-none focus:border-white transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}
          
          {!showSearch && (
            <>
              <button className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded relative">
                <Bell className="w-5 h-5 md:w-6 md:h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="relative" ref={dropdownRef}>
                <div 
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white text-sm md:text-base font-bold shadow-lg group-hover:shadow-red-500/50 transition-all group-hover:scale-105">
                    U
                  </div>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                </div>
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute right-0 mt-3 w-56 bg-black/95 backdrop-blur-xl border border-white/[0.06] rounded shadow-2xl overflow-hidden"
                  >
                    <div className="p-4 border-b border-white/[0.06]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-bold">
                          U
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">User</p>
                          <p className="text-gray-400 text-xs">user@example.com</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left text-white hover:bg-white/[0.04] transition-colors flex items-center gap-3"
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