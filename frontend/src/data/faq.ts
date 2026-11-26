export interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'RSVP' | 'Domains & Tech' | 'Pricing';
}

export const FAQ_DATA: FaqItem[] = [
  {
    category: 'General',
    question: 'How quickly can I set up and publish my wedding website?',
    answer: 'Most couples publish their initial site in under 10 minutes. You can pick any of our curated templates, input your ceremony details, and immediately share your live link with guests—no technical skills required.'
  },
  {
    category: 'Pricing',
    question: 'Is Velvet Invite truly free to start?',
    answer: 'Yes! Our Free tier allows you to build, customize, and publish up to 3 wedding websites with zero upfront cost and no credit card required. You get mobile-responsive templates, instant RSVP collection, and registry links completely free.'
  },
  {
    category: 'RSVP',
    question: 'How does the meal tracker and dietary management work?',
    answer: 'Guests select their attendance and choose their entree (e.g. Filet Mignon, Pan-Seared Seabass, Wild Mushroom Risotto) with one tap on their smartphone. You can set dietary tags (Gluten-Free, Nut Allergy, Vegan) and download a single spreadsheet for your caterer anytime.'
  },
  {
    category: 'Domains & Tech',
    question: 'Can I connect my own custom domain like adaezeandtunde.com?',
    answer: 'Absolutely. With our optional $19/year Pro upgrade, you can connect any domain you already own, or register a new one directly through Velvet Invite. Full SSL/HTTPS encryption via Let’s Encrypt is configured automatically.'
  },
  {
    category: 'General',
    question: 'Can I protect our wedding details with a private password?',
    answer: 'Yes. You can toggle a discreet entrance password on your site. Only invited family and friends who have the passcode can view intimate event itineraries, hotel addresses, or ceremony streaming links.'
  },
  {
    category: 'RSVP',
    question: 'Can guests upload photos from the reception tables?',
    answer: 'Yes! Our Guest Photo Keepsake Album allows guests to scan a table QR card and upload candid photos directly from their phone camera without having to download or register for any third-party app.'
  }
];
