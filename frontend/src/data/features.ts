export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag?: string;
  details?: string;
}

export const CORE_FEATURES: FeatureItem[] = [
  {
    id: 'rsvp-tracker',
    title: 'Instant RSVP & Meal Tracker',
    description: 'Guests confirm attendance and dietary preferences with one tap on their phone. Export your final headcount and seating list anytime.',
    icon: 'CalendarCheck',
    tag: 'One-Tap Guest Flow',
    details: 'Live headcount calculation, allergy tagging (Gluten-Free, Vegan, Halal), plus-one management, and instant CSV/Excel export for your caterer.'
  },
  {
    id: 'custom-domains',
    title: 'Custom Domain & Private Links',
    description: 'Use your own domain like adaezeandtunde.com or our elegant Velvet short-link for save-the-dates and invitations.',
    icon: 'Globe',
    tag: 'Instant SSL',
    details: 'One-click automated DNS setup, free automatic SSL certificates by Let\'s Encrypt, and memorable QR code generation for stationery.'
  },
  {
    id: 'privacy-protection',
    title: 'Password & Privacy Protection',
    description: 'Keep your wedding details completely confidential with an optional custom passcode so only invited loved ones have access.',
    icon: 'ShieldCheck',
    tag: 'Total Peace of Mind',
    details: 'Search engine no-index toggle, VIP event gating (e.g. rehearsal dinner visible only to wedding party), and encrypted guest submissions.'
  },
  {
    id: 'registry-funds',
    title: 'Gift Registry & Honeymoon Funds',
    description: 'Link your existing registries from any store or let guests contribute directly to your dream honeymoon or house fund.',
    icon: 'Gift',
    tag: '0% Platform Fee',
    details: 'Direct integrations with Zola, Crate & Barrel, Target, Amazon, plus direct Stripe / Venmo payment links with no platform skimming.'
  },
  {
    id: 'editorial-typography',
    title: 'Editorial Typography & Palettes',
    description: 'Curated by design artisans with warm paper cards, smooth easing, and bold Plus Jakarta Sans typography—no clunky, dated layouts.',
    icon: 'Sparkles',
    tag: 'Artisan Crafted',
    details: 'Plus Jakarta Sans in Bold and Extra Bold, high-contrast modern typography scales, foil-stamped champagne hairlines, and authentic stationery paper textures.'
  },
  {
    id: 'photo-keepsake',
    title: 'Guest Photo Keepsake Album',
    description: 'Let guests snap and upload candid photos directly from reception tables into your shared digital wedding album.',
    icon: 'Camera',
    tag: 'Live Reception Feed',
    details: 'Table QR code cards included. Guests upload directly from their mobile camera without downloading any native app.'
  }
];

export const PRO_UPGRADE_FEATURES: FeatureItem[] = [
  {
    id: 'pro-custom-domains',
    title: 'Custom Domains',
    description: 'Publish sites directly to custom domain names with full SSL/HTTPS security via Let\'s Encrypt.',
    icon: 'Globe2'
  },
  {
    id: 'pro-increased-limits',
    title: 'Increased Site Limits',
    description: 'Ability to create and publish more than three sites on a single account for all your related events.',
    icon: 'Layers'
  },
  {
    id: 'pro-forms-leads',
    title: 'Forms & Lead Generation',
    description: 'Collect signups, detailed guest contact info, meal selections, song requests, and custom questions.',
    icon: 'FileText'
  },
  {
    id: 'pro-widgets-embeds',
    title: 'Widgets & Third-Party Embeds',
    description: 'Embed custom HTML/CSS/JS code and widgets from services like Stripe, PayPal, Spotify, Gumroad, and Typeform.',
    icon: 'Code2'
  },
  {
    id: 'pro-site-analytics',
    title: 'Site Analytics',
    description: 'Track visitor performance and RSVP conversions using privacy-conscious integrations with Google Analytics, Plausible, and Matomo.',
    icon: 'BarChart3'
  }
];
