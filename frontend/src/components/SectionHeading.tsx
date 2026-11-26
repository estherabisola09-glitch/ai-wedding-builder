import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeIcon,
  title,
  titleHighlight,
  subtitle,
  align = 'left',
  dark = false,
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`space-y-3.5 ${isCenter ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}`}>
      {/* Eyebrow Badge (Fades up) */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border shadow-vi-soft ${
            dark
              ? 'bg-forest-800/80 border-champagne-500/30 text-champagne-300'
              : 'bg-ivory-150 dark:bg-forest-800 border-champagne-500/30 text-champagne-700 dark:text-champagne-300'
          }`}
        >
          {badgeIcon}
          <span>{badge}</span>
        </motion.div>
      )}

      {/* Main Title + Animated Underline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative inline-block"
      >
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
            dark
              ? 'text-ivory-100'
              : 'text-ink-900 dark:text-ivory-100'
          }`}
        >
          {title}{' '}
          {titleHighlight && (
            <span className="text-champagne-600 dark:text-champagne-400">
              {titleHighlight}
            </span>
          )}
        </h2>

        {/* Animated Gold Underline that draws in */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className={`h-1 bg-gradient-to-r from-champagne-500 via-champagne-400 to-transparent mt-2 rounded-full origin-left ${
            isCenter ? 'mx-auto w-32 origin-center' : 'w-24'
          }`}
        />
      </motion.div>

      {/* Subtitle (Fades up) */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
          className={`text-sm sm:text-base leading-relaxed font-normal ${
            dark
              ? 'text-ivory-300'
              : 'text-ink-600 dark:text-ivory-300'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
