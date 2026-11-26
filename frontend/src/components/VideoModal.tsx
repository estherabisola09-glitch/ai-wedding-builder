import React from 'react';
import { X, Play, Sparkles } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-forest-900 border border-champagne-500/30 rounded-3xl overflow-hidden shadow-vi-elevated">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-forest-950/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-champagne-400" />
            <span className="font-sans text-lg font-bold text-ivory-100">
              The Velvet Invite Experience • Elena & Marcus Story
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-forest-800 text-ivory-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80"
            alt="Wedding film preview"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-black/40" />

          {/* Center Play Button Graphic */}
          <div className="relative z-10 flex flex-col items-center text-center p-6 text-white">
            <div className="w-20 h-20 rounded-full bg-champagne-400/90 text-forest-950 flex items-center justify-center shadow-vi-gold-glow mb-4 hover:scale-110 transition-transform cursor-pointer">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
            <h4 className="font-sans text-2xl font-bold text-ivory-100 mb-1">
              "A Little More Love in Every Detail"
            </h4>
            <p className="text-xs text-champagne-300 max-w-md">
              Watch how modern couples effortlessly bring their stationery vision to life in under 10 minutes.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-forest-950 flex items-center justify-between text-xs text-ivory-300">
          <span>Shot on location in Cotswolds, UK & Lake Como, Italy</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-forest-800 hover:bg-forest-700 text-ivory-100 font-medium"
          >
            Close Video
          </button>
        </div>
      </div>
    </div>
  );
};
