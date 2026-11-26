import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { PRIMARY_NAV_ITEMS } from "../data/navigation";
import { getWeddingDraft } from "../weddingDraft";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const draft = getWeddingDraft();
  const accountLabel = draft?.coupleNames?.split("&")[0]?.trim() || "Dashboard";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path.startsWith("/templates")) return "templates";
    if (path === "/pricing") return "pricing";
    if (path === "/login") return "login";
    if (path === "/signup") return "signup";
    if (path === "/dashboard") return "dashboard";
    return "";
  };

  const activeTab = getActiveTab();

  const iconMap = {
    Compass,
    LayoutTemplate,
    Tag,
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-[var(--vi-nav-hairline)] box-border ${
        isScrolled
          ? "bg-white/85 dark:bg-vi-forest-950/85 backdrop-blur-md"
          : "bg-white/65 dark:bg-vi-forest-950/65 backdrop-blur-sm"
      }`}
      style={{ height: "var(--vi-nav-h, 64px)" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full box-border">
        <div
          className="flex items-center justify-between box-border"
          style={{
            height: "var(--vi-nav-row-h, 52px)",
            marginTop: "var(--vi-nav-pad-top, 12px)",
          }}
        >
          <Link
            to="/"
            id="nav-logo-link"
            className="flex items-center flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-vi-champagne-400 rounded-lg"
            style={{ height: "36px" }}
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
            <div
              id="nav-links-group"
              className="flex items-center h-[52px]"
              style={{ gap: "var(--vi-nav-gap, 4px)" }}
            >
              {PRIMARY_NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = iconMap[item.iconName] || Sparkles;

                return (
                  <div key={item.id} className="relative flex items-center justify-center h-[52px]">
                    <Link
                      id={`nav-link-${item.id}`}
                      to={item.path}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative z-10 inline-flex items-center justify-center h-[52px] px-3.5 xl:px-4 text-[14px] font-semibold transition-colors duration-200 select-none rounded-t-[12px] box-border ${
                        isActive
                          ? "text-vi-ink-900 dark:text-vi-ivory-100 font-bold"
                          : "text-[var(--vi-nav-muted)] hover:text-vi-ink-900 dark:hover:text-vi-ivory-100 hover:bg-black/[0.04] dark:hover:bg-white/[0.05]"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                          isActive
                            ? "text-vi-champagne-600 dark:text-vi-champagne-400 scale-105"
                            : "text-current opacity-70"
                        }`}
                      />
                      <span>{item.label}</span>
                    </Link>

                    {isActive && (
                      <motion.div
                        id="nav-active-tab-shape"
                        layoutId="v2-active-tab"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-0"
                        style={{ height: "52px" }}
                      >
                        <div
                          className="w-full h-[52px] bg-[var(--vi-page-bg)] border-t border-l border-r border-[var(--vi-nav-hairline)] box-border"
                          style={{
                            borderTopLeftRadius: "var(--vi-nav-radius, 12px)",
                            borderTopRightRadius: "var(--vi-nav-radius, 12px)",
                            borderBottom: "none",
                          }}
                        />

                        <svg
                          id="nav-flare-left"
                          className="absolute bottom-0 -left-[12px] w-[12px] h-[12px] overflow-visible pointer-events-none"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M 0 12 C 6.627 12, 12 6.627, 12 0 L 12 12 L 0 12 Z"
                            className="fill-[var(--vi-page-bg)]"
                          />
                          <path
                            d="M 0 12 C 6.627 12, 12 6.627, 12 0"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-[var(--vi-nav-hairline)]"
                          />
                        </svg>

                        <svg
                          id="nav-flare-right"
                          className="absolute bottom-0 -right-[12px] w-[12px] h-[12px] overflow-visible pointer-events-none"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M 0 0 C 0 5.373, 5.373 12, 12 12 L 0 12 Z"
                            className="fill-[var(--vi-page-bg)]"
                          />
                          <path
                            d="M 0 0 C 0 5.373, 5.373 12, 12 12"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-[var(--vi-nav-hairline)]"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="w-[12px] h-full flex-shrink-0" />

            <button
              id="nav-theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color mode"
              className="w-[36px] h-[36px] rounded-full inline-flex items-center justify-center text-vi-ink-600 hover:text-vi-ink-900 dark:text-vi-ivory-300 dark:hover:text-vi-ivory-100 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors focus:outline-none focus:ring-2 focus:ring-vi-champagne-400 flex-shrink-0"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center justify-center"
                  >
                    <Sun className="w-4 h-4 text-vi-champagne-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center justify-center"
                  >
                    <Moon className="w-4 h-4 text-vi-ink-800" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <div className="w-[12px] h-full flex-shrink-0" />
            <div id="nav-divider" className="w-[1px] h-[20px] bg-[var(--vi-nav-hairline)] flex-shrink-0" />
            <div className="w-[12px] h-full flex-shrink-0" />

            {isAuthenticated ? (
              <div id="nav-auth-group" className="inline-flex items-center gap-2">
                <Link
                  id="nav-dashboard-link"
                  to="/dashboard"
                  className={`inline-flex items-center gap-1.5 h-[36px] px-3 rounded-full text-[14px] font-semibold transition-all border ${
                    activeTab === "dashboard"
                      ? "bg-black/5 dark:bg-white/10 text-vi-ink-900 dark:text-vi-ivory-100 border-vi-champagne-500/40"
                      : "border-transparent text-vi-ink-700 hover:text-vi-ink-900 dark:text-vi-ivory-300 dark:hover:text-vi-ivory-100 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                  }`}
                >
                  <UserIcon className="w-3.5 h-3.5 text-vi-champagne-600 dark:text-vi-champagne-400" />
                  <span className="max-w-[90px] truncate">{accountLabel}</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="h-[36px] px-2 text-xs font-semibold text-vi-ink-500 dark:text-vi-ivory-400 hover:text-vi-ink-900 dark:hover:text-white rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div id="nav-auth-group" className="inline-flex items-center">
                <Link
                  id="nav-login-link"
                  to="/login"
                  className={`inline-flex items-center gap-1 h-[36px] px-3 rounded-xl text-[14px] font-semibold transition-colors ${
                    activeTab === "login"
                      ? "text-vi-champagne-600 dark:text-vi-champagne-400 bg-black/[0.04] dark:bg-white/[0.06]"
                      : "text-vi-ink-700 hover:text-vi-ink-900 dark:text-vi-ivory-300 dark:hover:text-vi-ivory-100 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5 opacity-70" />
                  <span>Log in</span>
                  <span className="text-vi-champagne-600 dark:text-vi-champagne-400 font-extrabold">&gt;</span>
                </Link>

                <div className="w-[12px] h-full flex-shrink-0" />

                <Link
                  id="nav-cta-btn"
                  to="/templates"
                  className="inline-flex items-center justify-center h-[40px] px-5 rounded-full text-[14px] font-bold bg-vi-forest-900 text-white hover:bg-vi-forest-950 dark:bg-vi-champagne-400 dark:text-vi-forest-950 dark:hover:bg-vi-champagne-300 hover:shadow-vi-soft hover:scale-[1.02] active:scale-[0.98] transition-all flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-vi-champagne-400"
                >
                  Start building free
                </Link>
              </div>
            )}
          </nav>

          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color mode"
              className="w-[36px] h-[36px] rounded-xl inline-flex items-center justify-center text-vi-ink-700 dark:text-vi-ivory-200 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-vi-champagne-300" />
              ) : (
                <Moon className="w-4 h-4 text-vi-ink-800" />
              )}
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
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white dark:bg-vi-forest-950 border-b border-[var(--vi-nav-hairline)] px-6 py-6 space-y-4 shadow-vi-elevated overflow-hidden"
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
                        ? "bg-black/5 dark:bg-white/10 text-vi-champagne-600 dark:text-vi-champagne-400"
                        : "text-vi-ink-800 dark:text-vi-ivory-200 hover:bg-black/5 dark:hover:bg-white/5"
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

