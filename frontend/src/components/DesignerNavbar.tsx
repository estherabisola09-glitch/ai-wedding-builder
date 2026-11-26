import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Compass,
  LayoutTemplate,
  LogIn,
  Menu,
  Moon,
  Sparkles,
  Sun,
  Tag,
  User as UserIcon,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { PRIMARY_NAV_ITEMS } from '../data/navigation';
import { getWeddingDraft } from '../weddingDraft';

export const DesignerNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const draft = getWeddingDraft();
  const accountLabel = draft?.coupleNames?.split('&')[0]?.trim() || 'Dashboard';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileMenuOpen(false), [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/templates')) return 'templates';
    if (path === '/pricing') return 'pricing';
    if (path === '/login') return 'login';
    if (path === '/signup') return 'signup';
    if (path === '/dashboard') return 'dashboard';
    return '';
  };

  const activeTab = getActiveTab();
  const iconMap = { Compass, LayoutTemplate, Tag };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-[var(--vi-nav-hairline)] box-border ${
        isScrolled
          ? 'bg-white/85 dark:bg-vi-forest-950/85 backdrop-blur-md'
          : 'bg-white/65 dark:bg-vi-forest-950/65 backdrop-blur-sm'
      }`}
      style={{ height: 'var(--vi-nav-h, 64px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full box-border">
        <div
          className="flex items-center justify-between box-border"
          style={{ height: 'var(--vi-nav-row-h, 52px)', marginTop: 'var(--vi-nav-pad-top, 12px)' }}
        >
          <Link
            to="/"
            id="nav-logo-link"
            className="flex items-center flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-vi-champagne-400 rounded-lg"
            style={{ height: '36px' }}
            aria-label="Velvet Invite Home"
          >
            <img
              id="nav-logo"
              src="/logo.png"
              alt="Velvet Invite"
              className="h-[36px] w-auto object-contain block filter contrast-125 saturate-110 dark:contrast-125 dark:brightness-125 dark:drop-shadow-[0_2px_10px_rgba(201,169,106,0.35)]"
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center ml-auto h-[52px]">
            <div id="nav-links-group" className="flex items-center h-[52px]" style={{ gap: 'var(--vi-nav-gap, 4px)' }}>
              {PRIMARY_NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = iconMap[item.iconName] || Sparkles;
                return (
                  <div key={item.id} className="relative flex items-center justify-center h-[52px]">
                    <Link
                      id={`nav-link-${item.id}`}
                      to={item.path}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative z-10 inline-flex items-center justify-center h-[52px] px-3.5 xl:px-4 text-[14px] font-semibold transition-colors duration-200 select-none rounded-t-[12px] box-border ${
                        isActive
                          ? 'text-vi-ink-900 dark:text-vi-ivory-100 font-bold'
                          : 'text-[var(--vi-nav-muted)] hover:text-vi-ink-900 dark:hover:text-vi-ivory-100 hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                          isActive
                            ? 'text-vi-champagne-600 dark:text-vi-champagne-400 scale-105'
                            : 'text-current opacity-70'
                        }`}
                      />
                      <span>{item.label}</span>
                    </Link>
                    {isActive && (
                      <span className="absolute inset-x-0 -bottom-px h-px bg-vi-ink-900 dark:bg-vi-ivory-100" />
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color mode"
              className="w-[36px] h-[36px] rounded-xl inline-flex items-center justify-center text-vi-ink-700 dark:text-vi-ivory-200 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-vi-champagne-300" /> : <Moon className="w-4 h-4 text-vi-ink-800" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-[36px] h-[36px] rounded-xl inline-flex items-center justify-center text-vi-ink-800 dark:text-vi-ivory-200 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white dark:bg-vi-forest-950 border-b border-[var(--vi-nav-hairline)] px-6 py-6 space-y-4 shadow-vi-elevated"
          >
            <div className="flex flex-col space-y-2">
              {PRIMARY_NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = iconMap[item.iconName] || Sparkles;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-bold transition-colors ${
                      isActive
                        ? 'bg-black/5 dark:bg-white/10 text-vi-champagne-600 dark:text-vi-champagne-400'
                        : 'text-vi-ink-800 dark:text-vi-ivory-200 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[var(--vi-nav-hairline)] flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="w-full text-center py-3 rounded-full bg-vi-champagne-400 text-vi-forest-950 font-bold"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-center py-2.5 rounded-full border border-vi-champagne-500/40 text-vi-ink-800 dark:text-vi-champagne-200 font-bold"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full text-center py-2.5 rounded-full border border-vi-champagne-500/40 text-vi-ink-800 dark:text-vi-champagne-200 font-bold hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/templates"
                    className="w-full text-center py-3 rounded-full bg-vi-forest-900 dark:bg-vi-champagne-400 text-white dark:text-vi-forest-950 font-extrabold shadow-vi-soft"
                  >
                    Start building free
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

