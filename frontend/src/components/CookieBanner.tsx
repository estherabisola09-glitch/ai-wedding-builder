import React, { useEffect, useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import { Link } from "react-router-dom";

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("velvet_cookies_consent");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("velvet_cookies_consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 bg-vi-forest-900/95 dark:bg-vi-forest-950/95 border border-vi-champagne-500/30 rounded-3xl p-5 shadow-vi-elevated text-vi-ivory-100 backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-vi-champagne-500/20 text-vi-champagne-300 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="flex-1 text-xs space-y-1.5">
          <div className="font-semibold text-vi-ivory-100">
            Privacy First &amp; Discreet Experience
          </div>
          <p className="text-vi-ivory-300/80 leading-relaxed">
            We use essential cookies to maintain your session and ensure your wedding guest RSVPs remain private and encrypted.
          </p>
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-full bg-vi-champagne-400 hover:bg-vi-champagne-300 text-vi-forest-950 font-semibold text-xs transition-colors shadow-vi-soft"
            >
              Accept &amp; Continue
            </button>
            <Link
              to="/#privacy"
              className="px-3 py-1.5 text-xs text-vi-ivory-300 hover:text-vi-champagne-300"
            >
              Learn more
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss cookie notice"
          className="text-vi-ivory-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

