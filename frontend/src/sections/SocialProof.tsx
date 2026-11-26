import React from 'react';
import { PRESS_MENTIONS } from '../data/testimonials';

export const SocialProof: React.FC = () => {
  return (
    <section className="py-12 bg-forest-900 border-t border-b border-champagne-500/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow Label (Verbatim from video) */}
        <p className="text-[11px] uppercase tracking-widest text-champagne-400 font-semibold mb-6">
          TRUSTED BY COUPLES FEATURED IN
        </p>

        {/* Publications Row (Verbatim from video) */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-20 text-ivory-300 font-sans tracking-widest text-xs sm:text-sm uppercase font-semibold">
          {PRESS_MENTIONS.map((item, idx) => (
            <span
              key={idx}
              className="hover:text-champagne-300 transition-colors cursor-default tracking-[0.2em]"
            >
              {item}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};
