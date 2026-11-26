import React from 'react';
import { Compass, ArrowRight, Star, MapPin } from 'lucide-react';
import { DESTINATION_LOCATIONS } from '../data/venues';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';

export const VenueVendorDiscovery: React.FC = () => {
  return (
    <section className="py-24 bg-forest-900 text-ivory-100 relative overflow-hidden border-t border-champagne-500/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with on-scroll reveal */}
        <div className="mb-16">
          <SectionHeading
            badge="DESTINATIONS & CURATED VENUES"
            badgeIcon={<Compass className="w-3.5 h-3.5 text-champagne-400" />}
            title="Discover your perfect"
            titleHighlight="celebration setting"
            subtitle="From historic Tuscan villas to ocean cliffside retreats, seamlessly pair your website design with iconic destinations."
            align="center"
            dark={true}
          />
        </div>

        {/* Locations Grid with Stagger & Image Zoom */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {DESTINATION_LOCATIONS.map((loc, idx) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-forest-950 border border-champagne-500/20 shadow-vi-elevated cursor-pointer hover:-translate-y-1.5 transition-all"
            >
              <img
                src={loc.image}
                alt={loc.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                <span className="text-[10px] text-champagne-300 uppercase tracking-wider block font-bold">
                  {loc.region}
                </span>
                <h4 className="text-sm font-extrabold truncate">
                  {loc.name}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Destination Venue Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-ivory-100 dark:bg-forest-800 text-ink-900 dark:text-ivory-100 rounded-5xl overflow-hidden shadow-vi-elevated border border-champagne-400/40 grid grid-cols-1 lg:grid-cols-12 items-center"
        >
          <div className="lg:col-span-6 aspect-[16/11] lg:aspect-auto lg:h-full relative overflow-hidden bg-forest-950 group">
            <img
              src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80"
              alt="Villa Balbianello, Lake Como"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4">
              <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-forest-950/80 text-champagne-300 backdrop-blur-sm shadow-vi-soft">
                Featured Historic Venue
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-champagne-600 dark:text-champagne-400 text-xs">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-ink-600 dark:text-ivory-300 ml-1 font-medium">5.0 (Lake Como Heritage)</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-ink-900 dark:text-ivory-100">
                Villa Balbianello
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-champagne-700 dark:text-champagne-300 font-extrabold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Lenno, Lake Como • Northern Italy</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-ink-600 dark:text-ivory-300 leading-relaxed font-normal">
              Perched on a forested peninsula jutting into Lake Como, Villa Balbianello features tiered garden terraces, centuries-old holm oaks, and loggia arches overlooking alpine waters. Fully supported by Velvet Invite’s destination travel concierge templates.
            </p>

            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-ink-500 dark:text-ivory-400 block font-medium">Matching Template:</span>
                <span className="font-extrabold text-ink-900 dark:text-ivory-100 text-sm">Wedded • Lake Como Edition</span>
              </div>

              <Link
                to="/templates"
                className="px-6 py-2.5 rounded-full bg-forest-900 hover:bg-forest-950 dark:bg-champagne-400 dark:text-forest-950 text-ivory-100 font-extrabold text-xs flex items-center gap-2 shadow-vi-soft hover:scale-105 transition-all"
              >
                <span>View Matching Designs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
