import React, { useState } from 'react';
import { CheckCircle2, Utensils, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SectionHeading } from '../components/SectionHeading';

export const InteractiveRsvpDemo: React.FC = () => {
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestName, setGuestName] = useState('Camilla D’Angelo');
  const [meal, setMeal] = useState('halibut');
  const [allergies, setAllergies] = useState<string[]>(['Gluten-Free']);
  const [submitted, setSubmitted] = useState(false);

  // Live Simulated Headcount Counts
  const [stats, setStats] = useState({
    confirmed: 142,
    declined: 14,
    halibut: 68,
    filet: 52,
    risotto: 22,
  });

  const toggleAllergy = (a: string) => {
    setAllergies((prev) =>
      prev.includes(a) ? prev.filter((item) => item !== a) : [...prev, a]
    );
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#C9A96A', '#6E1F2F', '#E7D3A6']
    });

    if (attending === 'yes') {
      setStats((prev) => ({
        ...prev,
        confirmed: prev.confirmed + 1,
        halibut: meal === 'halibut' ? prev.halibut + 1 : prev.halibut,
        filet: meal === 'filet' ? prev.filet + 1 : prev.filet,
        risotto: meal === 'risotto' ? prev.risotto + 1 : prev.risotto,
      }));
    } else {
      setStats((prev) => ({
        ...prev,
        declined: prev.declined + 1,
      }));
    }
  };

  const resetDemo = () => {
    setSubmitted(false);
  };

  return (
    <section className="py-24 bg-forest-950 text-ivory-100 relative overflow-hidden border-t border-champagne-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <SectionHeading
            badge="LIVE INTERACTIVE GUEST FLOW"
            badgeIcon={<Utensils className="w-3.5 h-3.5 text-champagne-400" />}
            title="Try the one-tap"
            titleHighlight="RSVP experience"
            subtitle="See exactly what your guests experience on their phones—and how your headcount updates instantly."
            align="center"
            dark={true}
          />
        </div>

        {/* Demo Grid: Phone Form & Live Headcount Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left: Interactive Guest RSVP Card */}
          <div className="lg:col-span-7 bg-ivory-100 text-ink-900 rounded-5xl p-6 sm:p-8 shadow-vi-elevated border border-champagne-400/40">
            <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-champagne-700">
                  Guest Invitation View
                </span>
                <h3 className="font-sans text-2xl font-bold text-ink-900">
                  Adaeze & Tunde’s Wedding
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-forest-900 text-champagne-300 font-semibold">
                Live Simulator
              </span>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-vi-soft">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-sans text-2xl font-bold text-ink-900">
                  RSVP Recorded Beautifully!
                </h4>
                <p className="text-xs text-ink-600 max-w-sm mx-auto">
                  Thank you, <strong>{guestName}</strong>. Your confirmation ({attending === 'yes' ? 'Attending' : 'Declined'}) and meal preference have been synced with the couple’s headcount tracker.
                </p>
                <button
                  onClick={resetDemo}
                  className="px-6 py-2 rounded-full bg-forest-900 text-ivory-100 text-xs font-semibold hover:bg-forest-950 transition-colors shadow-vi-soft"
                >
                  Simulate Another Guest
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-5 text-left">
                {/* Guest Name */}
                <div>
                  <label className="block text-xs font-semibold text-ink-800 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-black/15 text-xs text-ink-900 focus:outline-none focus:border-champagne-500 shadow-sm"
                  />
                </div>

                {/* Attendance Toggle */}
                <div>
                  <label className="block text-xs font-semibold text-ink-800 mb-1.5">
                    Will you be joining us?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttending('yes')}
                      className={`py-2.5 px-4 rounded-2xl text-xs font-semibold transition-all border ${
                        attending === 'yes'
                          ? 'bg-forest-900 text-ivory-100 border-forest-900 shadow-vi-soft'
                          : 'bg-white text-ink-700 border-black/15 hover:bg-black/5'
                      }`}
                    >
                      ✓ Joyfully Accepts
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending('no')}
                      className={`py-2.5 px-4 rounded-2xl text-xs font-semibold transition-all border ${
                        attending === 'no'
                          ? 'bg-velvet-600 text-white border-velvet-600 shadow-vi-soft'
                          : 'bg-white text-ink-700 border-black/15 hover:bg-black/5'
                      }`}
                    >
                      ✕ Regretfully Declines
                    </button>
                  </div>
                </div>

                {/* Meal Choices (if attending) */}
                {attending === 'yes' && (
                  <div className="space-y-3 pt-1">
                    <label className="block text-xs font-semibold text-ink-800">
                      Select Your Entrée
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: 'halibut', name: 'Pan-Seared Pacific Halibut', desc: 'Lemon herb emulsion & asparagus' },
                        { id: 'filet', name: 'Dry-Aged Filet Mignon', desc: 'Truffle potato purée & red wine jus' },
                        { id: 'risotto', name: 'Wild Morel Mushroom Risotto', desc: 'Organic herbs, vegan parmesan' },
                      ].map((item) => (
                        <label
                          key={item.id}
                          className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                            meal === item.id
                              ? 'bg-champagne-500/10 border-champagne-500'
                              : 'bg-white border-black/10 hover:border-black/20'
                          }`}
                        >
                          <input
                            type="radio"
                            name="meal"
                            checked={meal === item.id}
                            onChange={() => setMeal(item.id)}
                            className="mt-0.5 text-forest-900 focus:ring-champagne-400"
                          />
                          <div className="flex-1 text-xs">
                            <span className="font-semibold text-ink-900">{item.name}</span>
                            <p className="text-[11px] text-ink-500">{item.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Dietary Tags */}
                    <div>
                      <span className="block text-[11px] font-semibold text-ink-700 mb-1.5">
                        Dietary Preferences & Allergies:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {['Gluten-Free', 'Nut Allergy', 'Dairy-Free', 'Halal'].map((a) => (
                          <button
                            type="button"
                            key={a}
                            onClick={() => toggleAllergy(a)}
                            className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                              allergies.includes(a)
                                ? 'bg-champagne-400 text-forest-950 border-champagne-500 font-bold'
                                : 'bg-white text-ink-600 border-black/10 hover:bg-black/5'
                            }`}
                          >
                            {a} {allergies.includes(a) && '✓'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-forest-900 hover:bg-forest-950 text-ivory-100 font-bold text-xs uppercase tracking-wider transition-all shadow-vi-soft"
                >
                  Send RSVP Confirmation →
                </button>
              </form>
            )}
          </div>

          {/* Right: Live Organizer Dashboard Metric Preview */}
          <div className="lg:col-span-5 bg-forest-900 rounded-5xl p-6 sm:p-8 border border-champagne-500/30 text-ivory-100 shadow-vi-elevated space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider text-champagne-400 font-semibold flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>Couple Headcount Tracker</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-medium">● Live Sync</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-3xl bg-forest-800/80 border border-white/5 space-y-1">
                <span className="text-xs text-ivory-300">Attending</span>
                <div className="font-sans text-3xl font-bold text-champagne-300">
                  {stats.confirmed}
                </div>
                <span className="text-[10px] text-emerald-400">+1 just confirmed</span>
              </div>

              <div className="p-4 rounded-3xl bg-forest-800/80 border border-white/5 space-y-1">
                <span className="text-xs text-ivory-300">Declined</span>
                <div className="font-sans text-3xl font-bold text-ivory-400">
                  {stats.declined}
                </div>
                <span className="text-[10px] text-ivory-400">Warm wishes sent</span>
              </div>
            </div>

            {/* Caterer Breakdown */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-ivory-200 block">
                Caterer Meal Breakdown:
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-ivory-300">Pacific Halibut:</span>
                  <span className="font-bold text-champagne-300">{stats.halibut} plates</span>
                </div>
                <div className="w-full bg-forest-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-champagne-400 h-full rounded-full" style={{ width: `${(stats.halibut / stats.confirmed) * 100}%` }} />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-ivory-300">Filet Mignon:</span>
                  <span className="font-bold text-champagne-300">{stats.filet} plates</span>
                </div>
                <div className="w-full bg-forest-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-velvet-500 h-full rounded-full" style={{ width: `${(stats.filet / stats.confirmed) * 100}%` }} />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-ivory-300">Mushroom Risotto:</span>
                  <span className="font-bold text-champagne-300">{stats.risotto} plates</span>
                </div>
                <div className="w-full bg-forest-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${(stats.risotto / stats.confirmed) * 100}%` }} />
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-forest-800/60 border border-champagne-500/20 text-[11px] text-ivory-300 flex items-center justify-between">
              <span>Export ready for catering</span>
              <span className="text-champagne-400 font-semibold cursor-pointer hover:underline">Download CSV</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
