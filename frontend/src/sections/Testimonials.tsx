import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { SectionHeading } from '../components/SectionHeading';

// Animated Star Rating Component with staggered fill pop-in
const AnimatedStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: [0, 1.3, 1], opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.08, type: 'spring' }}
        >
          <Star className="w-4 h-4 fill-current text-champagne-400" />
        </motion.div>
      ))}
    </div>
  );
};

export const Testimonials: React.FC = () => {

  return (
    <section 
      id="testimonials" 
      className="py-24 bg-forest-900 text-ivory-100 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-champagne-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-forest-800/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with On-Scroll Reveal */}
        <div className="mb-16">
          <SectionHeading
            badge="KIND WORDS FROM COUPLES"
            badgeIcon={<Sparkles className="w-3.5 h-3.5 text-champagne-400" />}
            title="Loved by couples"
            titleHighlight="and their guests"
            subtitle="Over 10,000 love stories brought to life with poise, warmth, and effortless digital stationery."
            align="center"
            dark={true}
          />
        </div>

        {/* Desktop 3-Card Grid with Stagger & Animated Stars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-ivory-100 dark:bg-forest-800 text-ink-900 dark:text-ivory-100 rounded-5xl p-8 sm:p-10 shadow-vi-elevated border border-champagne-400/40 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              <div className="space-y-6">
                {/* 5 Stars Rating with Staggered Fill Pop-in */}
                <AnimatedStars rating={t.rating} />

                {/* Quote (Verbatim from video) */}
                <p className="text-xs sm:text-sm text-ink-700 dark:text-ivory-200 leading-relaxed font-normal italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author & Location Footer (Verbatim from video) */}
              <div className="pt-6 mt-6 border-t border-black/10 dark:border-white/10 flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.names}
                  loading="lazy"
                  className="w-11 h-11 rounded-full object-cover border-2 border-champagne-400/50 shadow-sm"
                />
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-base text-ink-900 dark:text-ivory-100">
                    {t.names}
                  </h4>
                  <div className="text-[11px] text-ink-500 dark:text-ivory-400">
                    {t.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
