import React, { useState } from 'react';
import { Hero } from '../sections/Hero';
import { VenueCarousel } from '../sections/VenueCarousel';
import { FeaturesGrid } from '../sections/FeaturesGrid';
import { InteractiveRsvpDemo } from '../sections/InteractiveRsvpDemo';
import { VenueVendorDiscovery } from '../sections/VenueVendorDiscovery';
import { CouplesPortfolio } from '../sections/CouplesPortfolio';
import { SocialProof } from '../sections/SocialProof';
import { Testimonials } from '../sections/Testimonials';
import { FaqSection } from '../sections/FaqSection';
import { ContactSection } from '../sections/ContactSection';
import { FinalCta } from '../sections/FinalCta';
import { VideoModal } from '../components/VideoModal';
import { DesignerShell } from '../components/DesignerShell';

export const Home: React.FC = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  // Wrap the whole page in DesignerShell to scope redesign styles
  return (
    <DesignerShell>
      <div className="min-h-screen">
        {/* 1. Hero with Curved Edge & Live Customizer */}
        <Hero onOpenVideo={() => setVideoOpen(true)} />

        {/* 2. Venue Style Carousel (Rustic Ballroom, Estate Courtyard, Industrial Barn, Garden Reception) */}
        <VenueCarousel />

        {/* 3. Features Grid (Everything you need. Nothing you don't.) */}
        <FeaturesGrid />

        {/* 4. Interactive RSVP & Meal Tracker Simulator */}
        <InteractiveRsvpDemo />

        {/* 5. Destinations & Venues Discovery (Italian Reference) */}
        <VenueVendorDiscovery />

        {/* 6. Real Couples' Portfolio Gallery */}
        <CouplesPortfolio />

        {/* 7. Social Proof Strip (Vogue Weddings, The Knot, Brides) */}
        <SocialProof />

        {/* 8. Testimonials (Elena & Marcus, Priya & Dev, Chloe & Sam) */}
        <Testimonials />

        {/* 9. FAQ Accordion */}
        <FaqSection />

        {/* 10. Bespoke Concierge Contact & Studio Map */}
        <ContactSection />

        {/* 11. Final CTA with Large Ghosted VELVET */}
        <FinalCta />

        {/* Cinematic Video Story Modal */}
        <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
      </div>
    </DesignerShell>
  );
};
