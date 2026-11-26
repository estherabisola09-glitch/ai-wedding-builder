import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Lock, ArrowRight, Play,
  ChevronRight, Edit3
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';

interface HeroProps {
  onOpenVideo?: () => void;
}

// Reusable Count-Up Component for Viewport Stats
const CountUpStat: React.FC<{ end: number; suffix?: string; duration?: number }> = ({ 
  end, 
  suffix = '', 
  duration = 1.6 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const Hero: React.FC<HeroProps> = ({ onOpenVideo }) => {
  // Interactive Live Customizer Playground State
  const [coupleNames, setCoupleNames] = useState('Adaeze & Tunde');
  const [weddingDate, setWeddingDate] = useState('Saturday, July 18, 2026');
  const [venueName] = useState('The Glasshouse, Kew');

  // 3D Mouse Tilt State for Phone Mockup
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 20);
    setRotateY(x / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section className="relative bg-white dark:bg-forest-950 text-ink-900 dark:text-ivory-100 pt-28 sm:pt-36 pb-32 md:pb-40 overflow-hidden transition-colors duration-300">
      
      {/* Background Ambient Glow & Floating Gold Particles / Petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-forest-700/20 blur-[140px]" />

        {/* Drifting Gold Particles */}
        <motion.div
          animate={{
            y: [0, -35, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-[15%] w-3 h-3 rounded-full bg-champagne-400/50 blur-[1px]"
        />
        <motion.div
          animate={{
            y: [0, -50, 0],
            x: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, -60, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 right-[20%] w-4 h-4 rounded-full bg-champagne-300/40 blur-[1px]"
        />
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 25, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          className="absolute bottom-1/3 left-[28%] w-2.5 h-2.5 rounded-full bg-champagne-500/40 blur-[1px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Staggered Headline & Copy in Plus Jakarta Sans Bold */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Eyebrow Badge with spring pop-in */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-forest-800 border border-champagne-500/30 text-champagne-700 dark:text-champagne-300 text-xs font-bold tracking-wider uppercase shadow-vi-soft"
            >
              <Sparkles className="w-3.5 h-3.5 text-champagne-500 animate-pulse" />
              <span>MADE FOR YOUR KIND OF LOVE</span>
            </motion.div>

            {/* Display Headline with Staggered Line-by-Line Reveal */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-ink-900 dark:text-ivory-100 leading-[1.08]">
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="block"
              >
                Your day.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                className="block"
              >
                Your story.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34, ease: [0.25, 0.1, 0.25, 1] }}
                className="block text-champagne-600 dark:text-champagne-300"
              >
                Beautifully told.
              </motion.span>
            </h1>

            {/* Subheadline (Fading and Rising) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.44, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-base sm:text-lg text-ink-600 dark:text-ivory-200/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              A self-serve wedding website builder designed with timeless elegance. Start with customizable pre-built templates or begin from a clean canvas.
            </motion.p>

            {/* Interactive Live Playground Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.54, ease: [0.25, 0.1, 0.25, 1] }}
              className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-forest-800/80 border border-champagne-500/30 backdrop-blur-md max-w-xl mx-auto lg:mx-0 text-left space-y-3 shadow-vi-soft"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-champagne-700 dark:text-champagne-400 font-extrabold flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Test Your Names Live In Mockup</span>
                </span>
                <span className="text-[11px] text-ink-500 dark:text-ivory-300 font-medium">
                  Updates phone preview instantly
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={coupleNames}
                  onChange={(e) => setCoupleNames(e.target.value)}
                  placeholder="e.g. Adaeze & Tunde"
                  className="w-full px-3.5 py-2 rounded-2xl bg-ivory-50 dark:bg-forest-900 border border-black/10 dark:border-white/10 text-xs text-ink-900 dark:text-ivory-100 placeholder-ink-400 focus:outline-none focus:border-champagne-500 transition-colors"
                />
                <input
                  type="text"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  placeholder="e.g. Saturday, July 18, 2026"
                  className="w-full px-3.5 py-2 rounded-2xl bg-ivory-50 dark:bg-forest-900 border border-black/10 dark:border-white/10 text-xs text-ink-900 dark:text-ivory-100 placeholder-ink-400 focus:outline-none focus:border-champagne-500 transition-colors"
                />
              </div>
            </motion.div>

            {/* Call to Actions with Spring Pop-In */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.64, type: 'spring', stiffness: 180, damping: 20 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2"
            >
              <Link
                to="/templates"
                className="relative overflow-hidden w-full sm:w-auto px-7 py-3.5 rounded-full bg-forest-900 text-white hover:bg-forest-950 dark:bg-champagne-400 dark:text-forest-950 dark:hover:bg-champagne-300 font-extrabold text-sm transition-all shadow-vi-elevated hover:shadow-vi-gold-glow hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                {/* Button Shimmer */}
                <div className="animate-shimmer" />
                <span className="relative z-10">Start building your wedding site</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>

              <Link
                to="/login"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-black/15 dark:border-champagne-500/30 hover:border-champagne-500 text-ink-800 dark:text-ivory-200 font-bold text-sm transition-all hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center gap-1.5"
              >
                <span>Log in</span>
                <ChevronRight className="w-4 h-4 text-champagne-600 dark:text-champagne-400" />
              </Link>

              {onOpenVideo && (
                <button
                  onClick={onOpenVideo}
                  className="p-3.5 rounded-full bg-white dark:bg-forest-800 text-champagne-700 dark:text-champagne-300 border border-champagne-500/30 hover:scale-105 transition-all shadow-vi-soft flex items-center gap-2 text-xs font-bold"
                  title="Watch story video"
                >
                  <Play className="w-4 h-4 fill-current text-champagne-500" />
                  <span className="hidden sm:inline">Watch Film</span>
                </button>
              )}
            </motion.div>

            {/* Microcopy Guarantee */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.74 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-xs text-ink-500 dark:text-ivory-300 font-medium pt-1"
            >
              <Lock className="w-3.5 h-3.5 text-champagne-600 dark:text-champagne-400" />
              <span>Free to start • Up to 3 sites free • No credit card required</span>
            </motion.div>

            {/* Stats Metrics Strip with Viewport Count-Up Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.84 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-black/10 dark:border-white/10 max-w-lg mx-auto lg:mx-0"
            >
              <div className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-champagne-700 dark:text-champagne-300">
                  <CountUpStat end={10000} suffix="+" duration={1.8} />
                </div>
                <div className="text-xs text-ink-500 dark:text-ivory-300 font-medium">
                  Stories told
                </div>
              </div>

              <div className="space-y-0.5 border-l border-black/10 dark:border-white/10 pl-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-champagne-700 dark:text-champagne-300">
                  <CountUpStat end={100} suffix="%" duration={1.4} />
                </div>
                <div className="text-xs text-ink-500 dark:text-ivory-300 font-medium">
                  Responsive
                </div>
              </div>

              <div className="space-y-0.5 border-l border-black/10 dark:border-white/10 pl-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-champagne-700 dark:text-champagne-300">
                  <CountUpStat end={3} suffix=" Sites" duration={1.2} />
                </div>
                <div className="text-xs text-ink-500 dark:text-ivory-300 font-medium">
                  Free tier
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Floating & Tilting 3D Phone Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Circular Rotating Seal "MADE WITH LOVE" */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-6 right-4 sm:right-10 z-20 w-16 h-16 rounded-full bg-white dark:bg-forest-800 border border-champagne-400/50 flex items-center justify-center text-center shadow-vi-elevated"
            >
              <div className="text-[9px] uppercase font-extrabold tracking-widest text-champagne-700 dark:text-champagne-300 leading-tight">
                MADE<br />WITH<br />LOVE
              </div>
            </motion.div>

            {/* Gentle Bobbing Phone Wrapper with 3D Mouse Tilt */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full flex justify-center"
            >
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="relative w-[290px] sm:w-[320px] aspect-[9/18.5] bg-white text-ink-900 rounded-[44px] p-4 shadow-vi-elevated border-[6px] border-forest-900 dark:border-forest-800 shadow-2xl flex flex-col justify-between overflow-hidden"
              >
                {/* Phone Speaker Notch */}
                <div className="w-24 h-4 bg-forest-950 rounded-full mx-auto mb-3" />

                {/* Invitation Inside Phone */}
                <div className="flex-1 flex flex-col justify-between text-center px-3 py-2 space-y-4">
                  
                  {/* Botanical Header Artwork */}
                  <div className="w-full h-32 rounded-3xl overflow-hidden relative shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80"
                      alt="Botanical Wedding Header"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  </div>

                  {/* Eyebrow & Couple Names in Bold Plus Jakarta Sans */}
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-widest text-ink-500 font-extrabold">
                      TOGETHER WITH THEIR FAMILIES
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 leading-tight">
                      {coupleNames || 'Your Names'}
                    </h2>

                    <div className="text-sm font-bold text-velvet-600">
                      The day we say I do
                    </div>
                  </div>

                  {/* Date & Venue */}
                  <div className="py-2 px-3 rounded-2xl bg-ivory-150 border border-champagne-400/20 text-xs space-y-1">
                    <div className="font-extrabold text-ink-900">
                      {weddingDate || 'Saturday, July 18, 2026'}
                    </div>
                    <div className="text-[11px] text-ink-600 font-medium">
                      {venueName}
                    </div>
                  </div>

                  <p className="text-[11px] text-ink-600 italic">
                    joyfully invite you to celebrate our union
                  </p>

                  {/* RSVP Pill Button Inside Phone */}
                  <div className="pt-1">
                    <div className="w-full py-2.5 rounded-full bg-forest-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
                      <span>Will You Attend?</span>
                      <ArrowRight className="w-3.5 h-3.5 text-champagne-400" />
                    </div>
                  </div>

                </div>

                {/* Phone Home Bar */}
                <div className="w-32 h-1 bg-ink-400/30 rounded-full mx-auto mt-2" />
              </div>
            </motion.div>

            {/* Label Under Phone */}
            <div className="text-center mt-4">
              <span className="text-xs uppercase tracking-widest text-champagne-700 dark:text-champagne-400 font-bold">
                — YOUR STORY, IN ONE PLACE
              </span>
            </div>

          </div>

        </div>

        {/* Animated Scroll-Down Mouse Indicator (Hati UI Reference) */}
        <div className="flex flex-col items-center justify-center pt-16 sm:pt-20">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1.5 text-ink-500 dark:text-ivory-300 hover:text-champagne-600 transition-colors cursor-pointer"
            onClick={() => {
              const el = document.getElementById('venues');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="w-5 h-8 rounded-full border-2 border-champagne-500/50 flex justify-center pt-1">
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-2 rounded-full bg-champagne-500"
              />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-ink-400 dark:text-ivory-400">
              Scroll Down
            </span>
          </motion.div>
        </div>

      </div>

      {/* CURVED HERO BOTTOM EDGE */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-20 text-white dark:text-forest-950 preserve-3d"
        >
          <path
            d="M0 80C360 20 1080 20 1440 80V80H0Z"
            fill="currentColor"
          />
        </svg>
      </div>

    </section>
  );
};
