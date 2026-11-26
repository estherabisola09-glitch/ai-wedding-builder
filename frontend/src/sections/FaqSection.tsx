import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_DATA } from '../data/faq';
import { SectionHeading } from '../components/SectionHeading';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section 
      id="faq" 
      className="py-24 bg-forest-900 text-ivory-100 relative overflow-hidden border-t border-champagne-500/10 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with reveal & underline */}
        <div className="mb-16">
          <SectionHeading
            badge="COMMONLY ASKED QUESTIONS"
            badgeIcon={<HelpCircle className="w-3.5 h-3.5 text-champagne-400" />}
            title="Frequently asked"
            titleHighlight="questions"
            subtitle="Everything you need to know about setting up your dream wedding website."
            align="center"
            dark={true}
          />
        </div>

        {/* Accordion List with Stagger */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                className="bg-ivory-100 dark:bg-forest-800 text-ink-900 dark:text-ivory-100 rounded-3xl border border-champagne-400/30 overflow-hidden shadow-vi-soft transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="text-base sm:text-lg font-extrabold text-ink-900 dark:text-ivory-100">
                    {item.question}
                  </span>
                  <div className={`p-2 rounded-full bg-forest-900 text-champagne-300 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-champagne-400 text-forest-950' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-ink-600 dark:text-ivory-300 leading-relaxed font-normal border-t border-black/5 dark:border-white/5">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
