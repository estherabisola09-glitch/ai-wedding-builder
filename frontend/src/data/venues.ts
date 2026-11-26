export interface VenueItem {
  id: string;
  name: string;
  tag: string;
  category: 'Indoor' | 'Outdoor' | 'Hybrid';
  location: string;
  description: string;
  rating: number;
  reviewsCount: number;
  image: string;
  priceEstimate?: string;
  capacity?: string;
}

export const VENUE_CAROUSEL_ITEMS: VenueItem[] = [
  {
    id: 'rustic-ballroom',
    name: 'Rustic Ballroom',
    tag: 'BALLROOM • RUSTIC',
    category: 'Indoor',
    location: 'Cotswolds, United Kingdom',
    description: 'Exposed brick walls, warm amber lighting & a grand mezzanine staircase for drama.',
    rating: 4.9,
    reviewsCount: 48,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    capacity: '180 guests'
  },
  {
    id: 'estate-courtyard',
    name: 'Estate Courtyard',
    tag: 'OUTDOOR • ESTATE',
    category: 'Outdoor',
    location: 'Tuscany, Italy',
    description: 'Lavender-draped chairs, barrel florals & an elegant mansion backdrop under blue skies.',
    rating: 5.0,
    reviewsCount: 62,
    image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
    capacity: '220 guests'
  },
  {
    id: 'industrial-barn',
    name: 'Industrial Barn',
    tag: 'BARN • BOHO',
    category: 'Indoor',
    location: 'Hudson Valley, New York',
    description: 'Soaring ceilings, rattan pendant lights & wildflower centrepieces for bohemian romance.',
    rating: 4.85,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    capacity: '200 guests'
  },
  {
    id: 'garden-reception',
    name: 'Garden Reception',
    tag: 'OUTDOOR • GARDEN',
    category: 'Outdoor',
    location: 'Kew Royal Gardens, London',
    description: 'Fairy-light canopies, lush florals & white chiavari chairs under open skies.',
    rating: 4.95,
    reviewsCount: 74,
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    capacity: '250 guests'
  }
];

export interface DestinationLocation {
  id: string;
  name: string;
  region: string;
  venuesCount: number;
  image: string;
}

export const DESTINATION_LOCATIONS: DestinationLocation[] = [
  {
    id: 'florence',
    name: 'Florence & Chianti',
    region: 'Tuscany, Italy',
    venuesCount: 24,
    image: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'lake-como',
    name: 'Lake Como & Bellagio',
    region: 'Lombardy, Italy',
    venuesCount: 18,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cotswolds',
    name: 'The Cotswolds',
    region: 'Gloucestershire, UK',
    venuesCount: 22,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'amalfi',
    name: 'Amalfi & Ravello',
    region: 'Campania, Italy',
    venuesCount: 16,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'provence',
    name: 'Provence & Luberon',
    region: 'South of France',
    venuesCount: 19,
    image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'big-sur',
    name: 'Big Sur & Carmel',
    region: 'California Coast, USA',
    venuesCount: 14,
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80'
  }
];
