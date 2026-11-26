import React from 'react';
import { Check, Star, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { VENUE_CAROUSEL_ITEMS } from '../data/venues';

// Second row items: Curated wedding stories & live style snapshots
const WEDDING_STORY_TILES = [
  {
    id: 'story-1',
    couple: 'Adaeze & Tunde',
    venue: 'The Glasshouse, Kew',
    style: 'Garden Romance',
    quote: 'The floral accents and instant RSVP made our Kew celebration seamless.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=700&q=80',
    tag: 'MOST POPULAR',
    tagColor: 'bg-emerald-600 text-white',
    attendees: '180 Guests'
  },
  {
    id: 'story-2',
    couple: 'Victoria & Arthur',
    venue: 'Blenheim Palace, Oxfordshire',
    style: 'Modern Heirloom',
    quote: 'Our guests adored the custom domain and private password link.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
    tag: 'EDITORIAL CLASSIC',
    tagColor: 'bg-forest-900 text-champagne-300',
    attendees: '240 Guests'
  },
  {
    id: 'story-3',
    couple: 'Sophia & Mateo',
    venue: 'Borgo Santo Pietro, Tuscany',
    style: 'Sunset Celebration',
    quote: 'Capturing candid guest photos via table QR codes was pure magic.',
    image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=700&q=80',
    tag: 'GOLDEN HOUR',
    tagColor: 'bg-amber-600 text-white',
    attendees: '120 Guests'
  },
  {
    id: 'story-4',
    couple: 'Chloe & Samuel',
    venue: 'Post Ranch Inn, Big Sur',
    style: 'Classic Noir',
    quote: 'The black-tie aesthetic was crisp, modern, and completely responsive.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80',
    tag: 'BLACK TIE',
    tagColor: 'bg-velvet-600 text-white',
    attendees: '90 Guests'
  },
  {
    id: 'story-5',
    couple: 'Elena & Marcus',
    venue: 'Cotswolds Manor & Lawn, UK',
    style: 'Coastal Meadow',
    quote: 'Publishing took under 10 minutes. Three sites free is unbeatable value.',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=700&q=80',
    tag: 'SEASIDE BREEZE',
    tagColor: 'bg-blue-600 text-white',
    attendees: '150 Guests'
  }
];

// Duplicate arrays for mathematically seamless infinite loops
const ROW_1_ITEMS = [...VENUE_CAROUSEL_ITEMS, ...VENUE_CAROUSEL_ITEMS];
const ROW_2_ITEMS = [...WEDDING_STORY_TILES, ...WEDDING_STORY_TILES];

export const VenueCarousel: React.FC = () => {
  return (
    <section 
      id="venues" 
      className="py-24 bg-white dark:bg-forest-950 text-ink-900 dark:text-ivory-100 relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Header with On-Scroll Reveal & Underline */}
        <div className="space-y-3 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory-150 dark:bg-forest-800 border border-champagne-500/30 text-champagne-700 dark:text-champagne-300 text-xs font-bold tracking-wider uppercase shadow-vi-soft"
          >
            <Check className="w-3.5 h-3.5 text-champagne-500" />
            <span>CORE VALUE PROPOSITIONS</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative inline-block"
          >
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink-900 dark:text-ivory-100">
              The modern way to build wedding websites
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-1 bg-gradient-to-r from-champagne-500 via-champagne-400 to-transparent mt-2 rounded-full origin-left w-28"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base text-ink-600 dark:text-ivory-300 font-normal leading-relaxed pt-1"
          >
            Simple to customize, responsive on every viewport, and free to build and publish up to three sites.
          </motion.p>
        </div>
      </div>

      {/* Infinite Flow Marquee Wrapper with Soft Edge Fade Masks */}
      <div className="relative w-full overflow-hidden space-y-6">
        
        {/* Soft Fade Masks on Left & Right Edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-r from-white via-white/80 dark:from-forest-950 dark:via-forest-950/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-l from-white via-white/80 dark:from-forest-950 dark:via-forest-950/80 to-transparent z-20" />

        {/* Track 1: Venue Cards Moving Left to Right (Continuous Infinite Flow) */}
        <div className="overflow-hidden w-full">
          <div className="animate-marquee-ltr pause-hover flex gap-6 px-3">
            {ROW_1_ITEMS.map((item, idx) => (
              <div
                key={`venue-row1-${item.id}-${idx}`}
                className="w-[280px] sm:w-[320px] flex-shrink-0 bg-ivory-100 dark:bg-forest-900 text-ink-900 dark:text-ivory-100 rounded-4xl overflow-hidden shadow-vi-soft dark:shadow-vi-elevated border border-champagne-400/30 flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-300"
              >
                {/* Venue Photo & Category Badge */}
                <div className="relative aspect-[4/3] overflow-hidden bg-forest-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${
                      item.category === 'Outdoor' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-amber-500 text-forest-950'
                    }`}>
                      {item.category}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-champagne-300 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current text-champagne-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                {/* Venue Copy (Verbatim from video) */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase font-extrabold tracking-widest text-champagne-700 dark:text-champagne-400">
                      {item.tag}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-ink-900 dark:text-ivory-100 group-hover:text-champagne-600 dark:group-hover:text-champagne-300 transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-xs text-ink-600 dark:text-ivory-300 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs font-bold text-champagne-600 dark:text-champagne-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Curated Location
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">Explore →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Wedding Story Tiles Moving Right to Left (Continuous Infinite Flow) */}
        <div className="overflow-hidden w-full">
          <div className="animate-marquee-rtl pause-hover flex gap-6 px-3">
            {ROW_2_ITEMS.map((story, idx) => (
              <div
                key={`story-row2-${story.id}-${idx}`}
                className="w-[280px] sm:w-[320px] flex-shrink-0 bg-white dark:bg-forest-900/90 text-ink-900 dark:text-ivory-100 rounded-4xl overflow-hidden shadow-vi-soft dark:shadow-vi-elevated border border-champagne-500/25 p-5 flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-300 space-y-4"
              >
                {/* Header with Avatar Photo & Tag */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={story.image}
                      alt={story.couple}
                      loading="lazy"
                      className="w-11 h-11 rounded-full object-cover border-2 border-champagne-400/40 shadow-sm"
                    />
                    <div>
                      <div className="text-sm font-extrabold text-ink-900 dark:text-ivory-100">
                        {story.couple}
                      </div>
                      <div className="text-[11px] text-ink-500 dark:text-ivory-400 truncate max-w-[140px]">
                        {story.venue}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${story.tagColor}`}>
                    {story.tag}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs text-ink-700 dark:text-ivory-300 leading-relaxed italic bg-ivory-100 dark:bg-forest-950 p-3 rounded-2xl border border-black/5 dark:border-white/5">
                  "{story.quote}"
                </p>

                {/* Footer Info */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-black/5 dark:border-white/10">
                  <span className="font-extrabold text-champagne-700 dark:text-champagne-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-champagne-500" />
                    {story.style}
                  </span>
                  <span className="text-[11px] text-ink-500 dark:text-ivory-400 font-medium">
                    {story.attendees}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
