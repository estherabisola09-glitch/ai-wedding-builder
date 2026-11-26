import React, { useRef } from 'react';
import { Sparkles, ArrowRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

export const FinalCta: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax scroll effect for ghosted "VELVET" background lettering
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const velvetX = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const velvetOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.02, 0.06, 0.02]);

  return (
    <section 
      ref={sectionRef}
      className="py-28 sm:py-36 bg-forest-900 text-ivory-100 relative overflow-hidden text-center transition-colors duration-300"
    >
      {/* Giant Ghosted "VELVET" Letters with Parallax Motion (Verbatim from video) */}
      <motion.div 
        aria-hidden="true" 
        style={{ x: velvetX, opacity: velvetOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="font-extrabold text-[22vw] text-white tracking-[0.25em] leading-none uppercase select-none">
          VELVET
        </span>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Eyebrow Badge (Verbatim from video) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-800 border border-champagne-500/30 text-champagne-300 text-xs font-bold tracking-wider uppercase shadow-vi-soft"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
          <span>YOUR CELEBRATION STARTS HERE</span>
        </motion.div>

        {/* Headline with Staggered Reveal */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-ivory-100 tracking-tight leading-[1.1]"
        >
          Your wedding deserves more than a generic template.
        </motion.h2>

        {/* Subheadline (Verbatim from video) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-base sm:text-xl text-ivory-200/90 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Create an invitation and wedding website that feels as intentional, warm, and beautiful as your love story.
        </motion.p>

        {/* Call To Action Button with Shimmer Sweep & Spring Pop-in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/templates"
            className="relative overflow-hidden w-full sm:w-auto px-9 py-4 rounded-full bg-ivory-100 hover:bg-white text-forest-900 font-extrabold text-base transition-all shadow-vi-elevated hover:shadow-vi-gold-glow hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
          >
            {/* Sweeping Shimmer Effect */}
            <div className="animate-shimmer" />
            <span className="relative z-10">Start building your wedding site</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
          </Link>
        </motion.div>

        {/* Microcopy Guarantee (Verbatim from video) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-xs text-ivory-300 font-medium pt-2"
        >
          <Lock className="w-3.5 h-3.5 text-champagne-400/80" />
          <span>Free to design • Up to 3 sites free • No credit card required</span>
        </motion.div>

      </div>
    </section>
  );
};
