import type { ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./components/AuthLayout";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";
import "./styles/flow.css";
import Dashboard from "./pages/Dashboard";
import { Home } from "./pages/Home";
import Templates from "./pages/Templates";
import {
  Builder,
  DomainSetup,
  GeneratedDraft,
  GuestSite,
  Intake,
  Published,
} from "./pages/WeddingFlow";

const FLOW_OR_SITE_PREFIXES = [
  "/intake",
  "/generating",
  "/builder",
  "/domain",
  "/published",
  "/sites/",
];

function ShellLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { theme } = useTheme();

  const isFlowOrGuestSite = FLOW_OR_SITE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isFlowOrGuestSite) {
    return <>{children}</>;
  }

  const isHome = pathname === "/";

  return (
    <div
      data-theme={theme}
      className={`vi-app-shell ${theme === "dark" ? "dark" : ""} flex flex-col min-h-screen bg-white dark:bg-vi-forest-950 text-vi-ink-900 dark:text-vi-ivory-100 transition-colors duration-300`}
    >
      <Navbar />
      <div className={isHome ? "flex-1" : "flex-1 pt-[var(--vi-nav-h,64px)]"}>
        {children}
      </div>
      <Footer />
      <CookieBanner />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ShellLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/signup" element={<AuthLayout />} />
              <Route path="/login" element={<AuthLayout />} />
              <Route path="/sites/:slug" element={<GuestSite />} />
              <Route path="/intake" element={<Intake />} />
              <Route path="/generating" element={<GeneratedDraft />} />
              <Route path="/builder" element={<Builder />} />
              <Route
                path="/domain"
                element={
                  <ProtectedRoute>
                    <DomainSetup />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/published"
                element={
                  <ProtectedRoute>
                    <Published />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ShellLayout>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;