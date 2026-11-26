import React, { useState } from 'react';
import { 
  CalendarCheck, Globe, ShieldCheck, Gift, 
  Sparkles, Camera 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { CORE_FEATURES } from '../data/features';
import { SectionHeading } from '../components/SectionHeading';

// Feature Card with Cursor-following border glow & icon micro-animation
const FeatureCard: React.FC<{ item: typeof CORE_FEATURES[0]; index: number }> = ({ item, index }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const iconMap: Record<string, React.ElementType> = {
    CalendarCheck,
    Globe,
    ShieldCheck,
    Gift,
    Sparkles,
    Camera,
  };

  const Icon = iconMap[item.icon] || Sparkles;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white dark:bg-forest-800 text-ink-900 dark:text-ivory-100 rounded-5xl p-8 shadow-vi-soft dark:shadow-vi-elevated border border-champagne-400/30 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300 overflow-hidden"
    >
      {/* Radial Cursor Glow that follows the mouse inside the card */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 169, 106, 0.15), transparent 70%)`,
          }}
        />
      )}

      <div className="space-y-4 relative z-10">
        {/* Icon with micro-animation on hover */}
        <motion.div 
          whileHover={{ scale: 1.15, rotate: 6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="w-12 h-12 rounded-2xl bg-forest-900 text-champagne-300 dark:bg-forest-950 flex items-center justify-center shadow-vi-soft group-hover:bg-champagne-400 group-hover:text-forest-950 transition-colors duration-300"
        >
          <Icon className="w-6 h-6 transition-transform duration-300" />
        </motion.div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-ink-900 dark:text-ivory-100 group-hover:text-champagne-600 dark:group-hover:text-champagne-300 transition-colors">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-ink-600 dark:text-ivory-300 leading-relaxed font-normal">
          {item.description}
        </p>

        {/* Details snippet */}
        <p className="text-[11px] text-ink-500/80 dark:text-ivory-400/80 italic pt-1">
          {item.details}
        </p>
      </div>

      {/* Extra Details Tag */}
      <div className="pt-6 mt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs relative z-10">
        <span className="text-[10px] uppercase font-extrabold tracking-widest text-champagne-700 dark:text-champagne-400">
          {item.tag}
        </span>
        <span className="text-ink-500 dark:text-ivory-400 text-[11px] font-bold">
          Included free
        </span>
      </div>
    </motion.div>
  );
};

export const FeaturesGrid: React.FC = () => {
  return (
    <section 
      id="features" 
      className="py-24 bg-ivory-100 dark:bg-forest-900 text-ink-900 dark:text-ivory-100 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-champagne-400/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with on-scroll reveal & underline */}
        <div className="mb-16">
          <SectionHeading
            badge="THOUGHTFULLY CRAFTED"
            badgeIcon={<Sparkles className="w-3.5 h-3.5 text-champagne-500" />}
            title="Everything you need."
            titleHighlight="Nothing you don't."
            subtitle="Essential tools for an intimate ceremony or a grand weekend festival—curated without clutter."
            align="center"
          />
        </div>

        {/* 6 Feature Cards Grid with Stagger & Cursor Glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CORE_FEATURES.map((item, index) => (
            <FeatureCard key={item.id} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};
