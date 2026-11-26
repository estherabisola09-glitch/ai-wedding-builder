import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Lock, Shield } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-vi-ivory-150 dark:bg-vi-forest-950 text-vi-ink-700 dark:text-vi-ivory-300 border-t border-vi-champagne-500/20 pt-16 pb-24 lg:pb-12 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-black/10 dark:border-white/10">
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <img
                src="/logo.png"
                alt="Velvet Invite"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter dark:brightness-110 dark:drop-shadow-[0_2px_10px_rgba(201,169,106,0.35)]"
              />
            </Link>

            <p className="text-vi-champagne-700 dark:text-vi-champagne-300 font-bold text-base">
              A little more love in every detail.
            </p>

            <p className="text-xs text-vi-ink-600 dark:text-vi-ivory-400 max-w-md leading-relaxed">
              Quiet luxury wedding websites crafted with editorial typography, one-tap RSVP guest tracking, and timeless digital stationery design.
            </p>

            <div className="flex items-center gap-4 text-xs text-vi-ink-500 dark:text-vi-ivory-400 pt-2">
              <span className="flex items-center gap-1.5 text-vi-champagne-600 dark:text-vi-champagne-400 font-semibold">
                <Lock className="w-3.5 h-3.5" /> SSL 256-Bit Encrypted
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-vi-champagne-600 dark:text-vi-champagne-400 font-semibold">
                <Shield className="w-3.5 h-3.5" /> GDPR &amp; Privacy Compliant
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-vi-champagne-700 dark:text-vi-champagne-400 font-bold">
              Explore Product
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link
                  to="/templates"
                  className="text-vi-ink-600 hover:text-vi-champagne-600 dark:text-vi-ivory-300 dark:hover:text-vi-champagne-300 transition-colors"
                >
                  Wedding Templates
                </Link>
              </li>
              <li>
                <a
                  href="/#venues"
                  className="text-vi-ink-600 hover:text-vi-champagne-600 dark:text-vi-ivory-300 dark:hover:text-vi-champagne-300 transition-colors"
                >
                  Venues &amp; Locations
                </a>
              </li>
              <li>
                <a
                  href="/#features"
                  className="text-vi-ink-600 hover:text-vi-champagne-600 dark:text-vi-ivory-300 dark:hover:text-vi-champagne-300 transition-colors"
                >
                  Capabilities &amp; Features
                </a>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-vi-ink-600 hover:text-vi-champagne-600 dark:text-vi-ivory-300 dark:hover:text-vi-champagne-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Pro Tier</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-vi-champagne-500/20 text-vi-champagne-700 dark:text-vi-champagne-300 font-bold">
                    $19/yr
                  </span>
                </Link>
              </li>
              <li>
                <a
                  href="/#testimonials"
                  className="text-vi-ink-600 hover:text-vi-champagne-600 dark:text-vi-ivory-300 dark:hover:text-vi-champagne-300 transition-colors"
                >
                  Couple Reviews
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-vi-champagne-700 dark:text-vi-champagne-400 font-bold">
              Account &amp; Legal
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link
                  to="/login"
                  className="text-vi-ink-600 hover:text-vi-champagne-600 dark:text-vi-ivory-300 dark:hover:text-vi-champagne-300 transition-colors"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-vi-ink-600 hover:text-vi-champagne-600 dark:text-vi-ivory-300 dark:hover:text-vi-champagne-300 transition-colors"
                >
                  Create account
                </Link>
              </li>
              <li>
                <a
                  href="/#faq"
                  className="text-vi-ink-600 hover:text-vi-champagne-600 dark:text-vi-ivory-300 dark:hover:text-vi-champagne-300 transition-colors"
                >
                  Help &amp; FAQs
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-vi-ink-600 hover:text-vi-champagne-600 dark:text-vi-ivory-300 dark:hover:text-vi-champagne-300 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-vi-ink-600 hover:text-vi-champagne-600 dark:text-vi-ivory-300 dark:hover:text-vi-champagne-300 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-vi-ink-500 dark:text-vi-ivory-400">
          <div>© 2026 Velvet Invite. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>Designed with quiet luxury for modern couples.</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-vi-champagne-600 dark:text-vi-champagne-400 font-bold hover:underline transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

