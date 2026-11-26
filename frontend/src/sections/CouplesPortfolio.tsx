import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';

export const CouplesPortfolio: React.FC = () => {
  const couples = [
    {
      names: 'Joy & Jonathan',
      date: '14th May 2026',
      venue: 'Siena Hills • Tuscany',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      style: 'Tuscan Sunset Romance'
    },
    {
      names: 'Emma & Michael',
      date: '28th June 2026',
      venue: 'The Cotswolds • UK',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      style: 'Garden Meadow Heirloom'
    },
    {
      names: 'Camille & Pierre',
      date: '19th September 2026',
      venue: 'Château de Tourreau • Provence',
      image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
      style: 'French Haute Calligraphy'
    },
    {
      names: 'Leo & Aurora',
      date: '24th October 2026',
      venue: 'Post Ranch Inn • Big Sur',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      style: 'Black Tie Editorial Noir'
    }
  ];

  return (
    <section className="py-24 bg-forest-900 text-ivory-100 relative overflow-hidden border-t border-champagne-500/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with reveal & underline */}
        <div className="mb-16">
          <SectionHeading
            badge="REAL CELEBRATIONS"
            badgeIcon={<Heart className="w-3.5 h-3.5 text-champagne-400 fill-current" />}
            title="Our couples'"
            titleHighlight="stories"
            subtitle="Discover real wedding websites published with Velvet Invite, treasured by couples and guests worldwide."
            align="center"
            dark={true}
          />
        </div>

        {/* 2x2 Portfolio Grid with Stagger & Image Zoom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {couples.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link
                to="/templates"
                className="group relative rounded-5xl overflow-hidden aspect-[16/10] bg-forest-950 border border-champagne-500/30 shadow-vi-elevated block hover:-translate-y-1.5 transition-transform duration-300"
              >
                <img
                  src={c.image}
                  alt={c.names}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-widest text-champagne-300 font-extrabold block">
                      The wedding of
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-champagne-200 transition-colors">
                      {c.names}
                    </h3>
                    <div className="text-xs text-ivory-200/80 flex items-center gap-2 font-medium">
                      <span>{c.date}</span>
                      <span>•</span>
                      <span>{c.venue}</span>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-ivory-100/90 text-forest-950 flex items-center justify-center group-hover:bg-champagne-400 group-hover:scale-110 transition-all shadow-vi-soft">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
