import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    venueLocation: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section 
      id="contact" 
      className="py-24 bg-forest-950 text-ivory-100 relative overflow-hidden border-t border-champagne-500/15 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with reveal & underline */}
        <div className="mb-16">
          <SectionHeading
            badge="BESPOKE CONCIERGE & SUPPORT"
            badgeIcon={<Mail className="w-3.5 h-3.5 text-champagne-400" />}
            title="Connect with our"
            titleHighlight="atelier"
            subtitle="Planning a complex multi-day destination wedding? Our concierge team is here to assist with custom styling, domain migrations, and caterer exports."
            align="center"
            dark={true}
          />
        </div>

        {/* 2-Column: Form on Left, Stylized Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-7 bg-ivory-100 text-ink-900 rounded-5xl p-8 sm:p-10 shadow-vi-elevated border border-champagne-400/40"
          >
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-vi-soft">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-extrabold text-ink-900">
                  Message Sent to Our Atelier
                </h3>
                <p className="text-xs text-ink-600 max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our bridal concierge team will get back to your email within 4 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-full bg-forest-900 text-ivory-100 text-xs font-bold"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-ink-700 font-extrabold block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Camilla D'Angelo"
                      className="w-full px-4 py-2.5 rounded-2xl bg-white border border-champagne-400/30 text-xs text-ink-900 placeholder-ink-400 focus:outline-none focus:border-champagne-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-ink-700 font-extrabold block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="camilla@example.com"
                      className="w-full px-4 py-2.5 rounded-2xl bg-white border border-champagne-400/30 text-xs text-ink-900 placeholder-ink-400 focus:outline-none focus:border-champagne-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-ink-700 font-extrabold block">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-2xl bg-white border border-champagne-400/30 text-xs text-ink-900 placeholder-ink-400 focus:outline-none focus:border-champagne-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-ink-700 font-extrabold block">
                      Estimated Wedding Date
                    </label>
                    <input
                      type="text"
                      value={formData.weddingDate}
                      onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                      placeholder="e.g. September 2026"
                      className="w-full px-4 py-2.5 rounded-2xl bg-white border border-champagne-400/30 text-xs text-ink-900 placeholder-ink-400 focus:outline-none focus:border-champagne-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-ink-700 font-extrabold block">
                    Venue or Celebration Location
                  </label>
                  <input
                    type="text"
                    value={formData.venueLocation}
                    onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
                    placeholder="e.g. Lake Como, Italy or Cotswolds, UK"
                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-champagne-400/30 text-xs text-ink-900 placeholder-ink-400 focus:outline-none focus:border-champagne-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-ink-700 font-extrabold block">
                    How can our concierge assist you?
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your multi-day events, custom domain requirements, or custom RSVP questions..."
                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-champagne-400/30 text-xs text-ink-900 placeholder-ink-400 focus:outline-none focus:border-champagne-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-forest-900 text-ivory-100 font-extrabold text-sm hover:bg-forest-950 flex items-center justify-center gap-2 shadow-vi-elevated hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Submit Inquiry to Concierge</span>
                  <Send className="w-4 h-4 text-champagne-400" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: Atelier Studio Info & Map Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-5 bg-forest-900 rounded-5xl p-8 border border-champagne-500/30 shadow-vi-elevated flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase font-extrabold tracking-widest text-champagne-400 block">
                Atelier Headquarters
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-ivory-100">
                London & Florence Concierge Desks
              </h3>
              <p className="text-xs text-ivory-300 leading-relaxed font-normal">
                Serving couples across the UK, Continental Europe, North America, and destination islands worldwide.
              </p>

              <div className="space-y-2 pt-2 text-xs text-ivory-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-champagne-400" />
                  <span>Marylebone Lane, London & Via de' Bardi, Florence</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-champagne-400" />
                  <span>concierge@velvetinvite.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-champagne-400" />
                  <span>VIP Bridal Line: +44 20 7946 0982</span>
                </div>
              </div>
            </div>

            {/* Stylized Map View */}
            <div className="rounded-3xl overflow-hidden border border-champagne-500/20 aspect-[16/9] relative">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                alt="Map Graphic Location"
                loading="lazy"
                className="w-full h-full object-cover filter contrast-125"
              />
              <div className="absolute inset-0 bg-forest-900/60 backdrop-blur-[2px] flex items-center justify-center">
                <div className="px-4 py-2 rounded-full bg-forest-950/90 border border-champagne-400/50 text-champagne-300 text-xs font-bold flex items-center gap-2 shadow-vi-soft">
                  <MapPin className="w-3.5 h-3.5 text-champagne-400" />
                  <span>Global Cloud Infrastructure & Edge SSL</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
