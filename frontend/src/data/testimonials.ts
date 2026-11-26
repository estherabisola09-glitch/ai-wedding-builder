export interface TestimonialItem {
  id: string;
  names: string;
  location: string;
  quote: string;
  rating: number;
  date: string;
  avatar: string;
  weddingStyle: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'elena-marcus',
    names: 'Elena & Marcus',
    location: 'Cotswolds, United Kingdom',
    quote: 'Our guests couldn\'t stop talking about how stunning the website was. Setting it up took under 10 minutes, and managing meal choices was completely stress-free.',
    rating: 5,
    date: 'June 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    weddingStyle: 'Coastal Meadow & Cotswolds Lawn'
  },
  {
    id: 'priya-dev',
    names: 'Priya & Dev',
    location: 'Lake Como, Italy',
    quote: 'Most wedding builders feel like corporate templates from 2012. Velvet Invite feels like high-end print stationery come to life. Truly worth every second.',
    rating: 5,
    date: 'July 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    weddingStyle: 'Villa Erba Multi-Day Sangeet'
  },
  {
    id: 'chloe-sam',
    names: 'Chloe & Sam',
    location: 'Big Sur, California',
    quote: 'The mobile experience is flawless. Our grandparents found it effortless to RSVP, and our friends loved sending registry gifts straight from their phones.',
    rating: 5,
    date: 'October 2026',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    weddingStyle: 'Post Ranch Inn Black Tie Noir'
  }
];

export const PRESS_MENTIONS = [
  'VOGUE WEDDINGS',
  'OVER THE MOON',
  'THE KNOT',
  'STYLE ME PRETTY',
  'BRIDES'
];
