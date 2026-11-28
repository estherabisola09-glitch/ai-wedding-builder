import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Search,
  X,
  ArrowRight,
  Sparkles,
  Eye,
  Check,
  ChevronRight,
  ArrowLeft,
  Heart,
} from "lucide-react";
import { Brand } from "./WeddingFlow";
import "../styles/templates.css";

export type WeddingCategory =
  | "Classic & elegant"
  | "Romantic & floral"
  | "Modern & minimal"
  | "Traditional & cultural";

interface WeddingTemplateItem {
  id: string;
  name: string;
  couple: string;
  designer: string;
  price: string;
  category: WeddingCategory;
  subCategory: string;
  venue: string;
  popularity: number;
  dateAdded: string;
  visualKey: string;
  description: string;
}

const WEDDING_CATEGORIES_DATA: {
  category: WeddingCategory;
  tagline: string;
  subItems: string[];
}[] = [
  {
    category: "Classic & elegant",
    tagline: "Black tie, timeless typography, formal ballrooms & gilded monograms",
    subItems: [
      "Timeless Black Tie",
      "European Manor",
      "Formal Ballroom",
      "Monogram & Wax Seal",
      "Gilded Calligraphy",
    ],
  },
  {
    category: "Romantic & floral",
    tagline: "Garden celebrations, wildflower meadows, candlelit glow & soft pastels",
    subItems: [
      "Garden Romance",
      "Wildflower Meadow",
      "Tuscan Sunset",
      "Candlelit Courtyard",
      "Botanical Blossom",
    ],
  },
  {
    category: "Modern & minimal",
    tagline: "Editorial typography, architectural lines, sleek dark mode & neutral aesthetics",
    subItems: [
      "Editorial Noir",
      "Contemporary Loft",
      "Clean Typography",
      "Coastal Breeze",
      "Architectural Lines",
    ],
  },
  {
    category: "Traditional & cultural",
    tagline: "Multi-day ceremonies, South Asian, African royalty, East Asian & cathedral vows",
    subItems: [
      "South Asian / Mehndi",
      "African Royalty / Alafia",
      "East Asian Heritage",
      "Cathedral Ceremony",
      "Multi-Day Festivities",
    ],
  },
];

const WEDDING_TEMPLATES: WeddingTemplateItem[] = [
  // ── 1. Classic & elegant ───────────────────────────────────────────
  {
    id: "manor-heirloom",
    name: "The Manor Heirloom",
    couple: "Charlotte & Edward",
    designer: "Velvet Studio",
    price: "Free",
    category: "Classic & elegant",
    subCategory: "European Manor",
    venue: "Highclere Castle, Hampshire",
    popularity: 99,
    dateAdded: "2026-10-21",
    visualKey: "classic-manor",
    description: "An aristocratic heirloom invitation and celebration website featuring debossed crests, serif headings, and timeless black-tie formal details.",
  },
  {
    id: "oxford-estate",
    name: "Oxford Estate",
    couple: "Victoria & Arthur",
    designer: "Regent Calligraphy",
    price: "$49",
    category: "Classic & elegant",
    subCategory: "Timeless Black Tie",
    venue: "Blenheim Palace, Oxfordshire",
    popularity: 94,
    dateAdded: "2026-10-18",
    visualKey: "classic-estate",
    description: "Hand-crafted gold foil border accents, engraved monograms, and crisp white cardstock styling for high-society formal vows.",
  },
  {
    id: "grand-ballroom",
    name: "Grand Ballroom",
    couple: "Elena & Julian",
    designer: "Heirloom Press",
    price: "Free",
    category: "Classic & elegant",
    subCategory: "Formal Ballroom",
    venue: "The Plaza, New York",
    popularity: 92,
    dateAdded: "2026-10-14",
    visualKey: "classic-ballroom",
    description: "Deep evening forest contrast paired with champagne accents and framed couple portraits, celebrating midnight dancing and champagne toasts.",
  },
  {
    id: "the-kensington",
    name: "The Kensington",
    couple: "Grace & William",
    designer: "White Tie Editions",
    price: "Free",
    category: "Classic & elegant",
    subCategory: "Monogram & Wax Seal",
    venue: "Kensington Palace Orangery, London",
    popularity: 88,
    dateAdded: "2026-10-09",
    visualKey: "classic-kensington",
    description: "Double-ruled border frames, traditional etiquette wording, and dignified serif typography for an utterly classic celebration.",
  },

  // ── 2. Romantic & floral ───────────────────────────────────────────
  {
    id: "villa-tuscany",
    name: "Villa Tuscany",
    couple: "Sophia & Mateo",
    designer: "Fleur Atelier",
    price: "Free",
    category: "Romantic & floral",
    subCategory: "Tuscan Sunset",
    venue: "Villa Cetinale, Tuscany",
    popularity: 98,
    dateAdded: "2026-10-20",
    visualKey: "romantic-tuscany",
    description: "Sun-drenched golden hour terracotta, cypress silhouettes, and romantic handwritten script capturing the magic of an Italian countryside wedding.",
  },
  {
    id: "provence-meadow",
    name: "Provence Meadow",
    couple: "Isabella & Lucas",
    designer: "Petal & Parchment",
    price: "Free",
    category: "Romantic & floral",
    subCategory: "Wildflower Meadow",
    venue: "Château de Tourreau, Provence",
    popularity: 95,
    dateAdded: "2026-10-17",
    visualKey: "romantic-meadow",
    description: "Airy olive greens, pressed wildflower accents, and soft botanical illustrations inspired by French lavender fields.",
  },
  {
    id: "secret-vineyard",
    name: "Secret Vineyard",
    couple: "Camila & Diego",
    designer: "Botanica Weddings",
    price: "Free",
    category: "Romantic & floral",
    subCategory: "Garden Romance",
    venue: "Meadowood, Napa Valley",
    popularity: 91,
    dateAdded: "2026-10-12",
    visualKey: "romantic-vineyard",
    description: "Rich candlelit evening warmth, sprawling vineyard photography, and delicate floral wreaths framing your love story.",
  },
  {
    id: "sunset-bloom",
    name: "Sunset Bloom",
    couple: "Sienna & Liam",
    designer: "Golden Hour Press",
    price: "$29",
    category: "Romantic & floral",
    subCategory: "Candlelit Courtyard",
    venue: "San Ysidro Ranch, Montecito",
    popularity: 87,
    dateAdded: "2026-10-08",
    visualKey: "romantic-sunset",
    description: "Warm blush and peach hues, soft glowing bokeh, and effortless coastal garden romanticism.",
  },

  // ── 3. Modern & minimal ───────────────────────────────────────────
  {
    id: "big-sur-noir",
    name: "Big Sur Noir",
    couple: "Chloe & Samuel",
    designer: "Monolith Design",
    price: "Free",
    category: "Modern & minimal",
    subCategory: "Editorial Noir",
    venue: "Post Ranch Inn, Big Sur",
    popularity: 97,
    dateAdded: "2026-10-19",
    visualKey: "modern-noir",
    description: "A dark editorial masterpiece featuring high-fashion photography, graphite tones, and striking minimalist proportions.",
  },
  {
    id: "coastal-loft",
    name: "Tribeca Loft",
    couple: "Maya & Julian",
    designer: "Arch Studio",
    price: "Free",
    category: "Modern & minimal",
    subCategory: "Contemporary Loft",
    venue: "The Foundry, Long Island City",
    popularity: 93,
    dateAdded: "2026-10-16",
    visualKey: "modern-loft",
    description: "Industrial chic meets quiet luxury with oversized modern typography, exposed textures, and an effortless RSVP experience.",
  },
  {
    id: "metropolitan-arch",
    name: "Metropolitan Arch",
    couple: "Zoe & Alexander",
    designer: "Studio K",
    price: "Free",
    category: "Modern & minimal",
    subCategory: "Architectural Lines",
    venue: "Solomon R. Guggenheim Museum, NYC",
    popularity: 90,
    dateAdded: "2026-10-11",
    visualKey: "modern-arch",
    description: "Clean modernist layout with strong architectural geometry, generous negative space, and refined sans-serif letterforms.",
  },
  {
    id: "desert-solitude",
    name: "Desert Solitude",
    couple: "Nadia & Samir",
    designer: "Solstice Studio",
    price: "Free",
    category: "Modern & minimal",
    subCategory: "Clean Typography",
    venue: "Amangiri, Canyon Point",
    popularity: 86,
    dateAdded: "2026-10-07",
    visualKey: "modern-desert",
    description: "Earthy ochre and sandstone hues, ultra-clean line dividers, and modern editorial photography celebrating open horizons.",
  },

  // ── 4. Traditional & cultural ─────────────────────────────────────
  {
    id: "lake-como-sangeet",
    name: "Lake Como Sangeet",
    couple: "Priya & Dev",
    designer: "Aura Invitations",
    price: "$49",
    category: "Traditional & cultural",
    subCategory: "South Asian / Mehndi",
    venue: "Villa Balbiano, Lake Como",
    popularity: 96,
    dateAdded: "2026-10-21",
    visualKey: "cultural-desi",
    description: "Rich jewel-toned ruby and gold arch motifs, multi-event schedules for Haldi, Mehndi, Sangeet, and the Baraat procession.",
  },
  {
    id: "regal-alafia",
    name: "Regal Alafia",
    couple: "Amara & Kemi",
    designer: "Ade & Co.",
    price: "$79",
    category: "Traditional & cultural",
    subCategory: "African Royalty / Alafia",
    venue: "The Dorchester, London",
    popularity: 94,
    dateAdded: "2026-10-15",
    visualKey: "cultural-alafia",
    description: "Lustrous gold and bronze royal patterns celebrating African traditional engagement, formal attire guidelines, and cultural heritage.",
  },
  {
    id: "kyoto-blossom",
    name: "Kyoto Heritage",
    couple: "Hana & Kenji",
    designer: "Mizuki Studio",
    price: "$39",
    category: "Traditional & cultural",
    subCategory: "East Asian Heritage",
    venue: "Heian Jingu Shrine, Kyoto",
    popularity: 89,
    dateAdded: "2026-10-10",
    visualKey: "cultural-kyoto",
    description: "Minimalist family crests (Kamon), traditional tea ceremony itineraries, and subtle gold mist textures honoring generational heritage.",
  },
  {
    id: "zahra-celebration",
    name: "Zahra Celebration",
    couple: "Aaliyah & Tariq",
    designer: "Noor Design",
    price: "Free",
    category: "Traditional & cultural",
    subCategory: "Cathedral Ceremony",
    venue: "La Mamounia, Marrakech",
    popularity: 85,
    dateAdded: "2026-10-06",
    visualKey: "cultural-zahra",
    description: "Intricate Moroccan geometric arches, deep emerald and gilded sand tones, with seamless multi-day celebration guides for guests.",
  },

  // ── New Community Wedding Templates ──────────────────────────────
  {
    id: "wedded",
    name: "Wedded",
    couple: "Sophie & Matteo",
    designer: "Irem Geldry",
    price: "Free",
    category: "Romantic & floral",
    subCategory: "Garden Romance",
    venue: "Villa d'Este, Lake Como",
    popularity: 99,
    dateAdded: "2026-10-22",
    visualKey: "wedded",
    description: "A triple-panel interactive wedding invitation featuring mobile-first schedules, RSVP guest tracking, and curated photo albums.",
  },
  {
    id: "new-chapter",
    name: "New Chapter",
    couple: "Ellis & Jules",
    designer: "Design from Nick",
    price: "$39",
    category: "Modern & minimal",
    subCategory: "Clean Typography",
    venue: "The Bowery Hotel, NYC",
    popularity: 96,
    dateAdded: "2026-10-21",
    visualKey: "newchapter",
    description: "Ultra-clean editorial web experience showcasing dynamic countdowns, bold couple typography, and streamlined RSVP capture.",
  },
  {
    id: "weddingly",
    name: "Weddingly",
    couple: "Olivia & Daniel",
    designer: "Talha Nawaz",
    price: "Free",
    category: "Romantic & floral",
    subCategory: "Tuscan Sunset",
    venue: "Villa Balbianello, Lenno",
    popularity: 97,
    dateAdded: "2026-10-22",
    visualKey: "weddingly",
    description: "Lakeside romantic celebration template framed in delicate geometric white outlines with scenic photography highlights.",
  },
  {
    id: "sanctun",
    name: "Sanctun",
    couple: "Emma & James",
    designer: "VLADIMIR KOTENEV",
    price: "$49",
    category: "Classic & elegant",
    subCategory: "Timeless Black Tie",
    venue: "Ritz Paris, Place Vendôme",
    popularity: 95,
    dateAdded: "2026-10-20",
    visualKey: "sanctun",
    description: "High-contrast monochrome editorial wedding template celebrating champagne toasts, black-tie sophistication, and midnight romance.",
  },
  {
    id: "wedding-day-site",
    name: "Wedding Day Site",
    couple: "Claire & Thomas",
    designer: "RabenRifaie",
    price: "$25",
    category: "Modern & minimal",
    subCategory: "Editorial Noir",
    venue: "SoHo Grand, Manhattan",
    popularity: 91,
    dateAdded: "2026-10-18",
    visualKey: "weddingdaysite",
    description: "Warm mocha & chocolate tones, contemporary grid photo albums, and delicate monogram stamps for modern city lovers.",
  },
  {
    id: "maison-vera",
    name: "Maison Véra",
    couple: "Céline & Henri",
    designer: "Studio pepette",
    price: "$99",
    category: "Classic & elegant",
    subCategory: "European Manor",
    venue: "Château de Villette, France",
    popularity: 94,
    dateAdded: "2026-10-19",
    visualKey: "maisonvera",
    description: "Sunlit limestone courtyards, artisanal wedding confections, and bespoke floral typography for an ultra-luxe French celebration.",
  },
  {
    id: "elowen-chetan",
    name: "Elowen Chetan",
    couple: "Elowen & Chetan",
    designer: "Catalystco",
    price: "Free",
    category: "Traditional & cultural",
    subCategory: "Multi-Day Festivities",
    venue: "Umaid Bhawan Palace, Jodhpur",
    popularity: 93,
    dateAdded: "2026-10-17",
    visualKey: "elowenchetan",
    description: "Warm butterscotch vintage postcard aesthetic with ornate arched frames celebrating multi-day cultural wedding customs.",
  },
  {
    id: "amorette",
    name: "Amorette",
    couple: "Charlotte & Oliver",
    designer: "Nikita Shabunko",
    price: "Free",
    category: "Classic & elegant",
    subCategory: "Monogram & Wax Seal",
    venue: "Kew Gardens Orangery, London",
    popularity: 92,
    dateAdded: "2026-10-16",
    visualKey: "amorette",
    description: "Pencil sketch artistry, delicate botanical flourishes, and timeless etiquette calligraphy designed for garden glasshouses.",
  },
  {
    id: "arbor",
    name: "Arbor",
    couple: "Hannah & Caleb",
    designer: "Adam Kansky",
    price: "$59",
    category: "Romantic & floral",
    subCategory: "Wildflower Meadow",
    venue: "The Greenbrier Estate, Vermont",
    popularity: 90,
    dateAdded: "2026-10-15",
    visualKey: "arbor",
    description: "Rustic warm barn ceiling illuminated with chandeliers and fairy lights, paired with an effortless mobile-optimized RSVP flow.",
  },
  {
    id: "everty",
    name: "Everty",
    couple: "Elena & Mateo",
    designer: "David Muñoz Guzmán",
    price: "Free",
    category: "Romantic & floral",
    subCategory: "Candlelit Courtyard",
    venue: "Borgo Santo Pietro, Tuscany",
    popularity: 94,
    dateAdded: "2026-10-21",
    visualKey: "everty",
    description: "Dramatic twilight vineyard portraits, golden glowing serif titles, and candlelight romance under the Tuscan stars.",
  },
  {
    id: "mira-nirvana",
    name: "Mira Nirvana",
    couple: "Folake & Adebayo",
    designer: "Dagba Studio",
    price: "$80",
    category: "Traditional & cultural",
    subCategory: "African Royalty / Alafia",
    venue: "Eko Atlantic Grand Ballroom, Lagos",
    popularity: 95,
    dateAdded: "2026-10-22",
    visualKey: "miranirvana",
    description: "Fluent in every tradition: opulent emerald green and gold lace regalia celebrating royal cultural wedding heritage.",
  },
  {
    id: "wedfully",
    name: "Wedfully",
    couple: "Sofia & Mateo",
    designer: "Shoaib Ahmed",
    price: "Free",
    category: "Romantic & floral",
    subCategory: "Botanical Blossom",
    venue: "Grand Hotel Tremezzo, Italy",
    popularity: 93,
    dateAdded: "2026-10-18",
    visualKey: "wedfully",
    description: "Frosted glass tablet UI floating over the breathtaking Lake Como mountains and lake waters with floral ribbon details.",
  },
  {
    id: "detail-day",
    name: "The Detail Day",
    couple: "Megan & David",
    designer: "Blush Planning Co.",
    price: "Free",
    category: "Classic & elegant",
    subCategory: "Formal Ballroom",
    venue: "The Biltmore Estate, Asheville",
    popularity: 89,
    dateAdded: "2026-10-14",
    visualKey: "detailday",
    description: "Every single detail thoughtfully curated: hotel room blocks, rehearsal dinner itineraries, and wedding registry links.",
  },
  {
    id: "nala-party",
    name: "Nala & Us",
    couple: "Chloe & Liam",
    designer: "Whimsy Weddings",
    price: "$19",
    category: "Modern & minimal",
    subCategory: "Contemporary Loft",
    venue: "Greenpoint Loft, Brooklyn",
    popularity: 88,
    dateAdded: "2026-10-13",
    visualKey: "nalaparty",
    description: "A delightfully fun and playful wedding website celebrating your four-legged companion with custom stickers and color badges.",
  },
  {
    id: "kekasih-kusuma",
    name: "Kekasih & Kusuma",
    couple: "Kekasih & Kusuma",
    designer: "Nusantara Studio",
    price: "$45",
    category: "Traditional & cultural",
    subCategory: "East Asian Heritage",
    venue: "Plataran Borobudur, Java",
    popularity: 91,
    dateAdded: "2026-10-16",
    visualKey: "kekasihkusuma",
    description: "Deep regal maroon velvet & gold ornamental circular arches with calendar countdowns and customary ceremony schedules.",
  },
  {
    id: "forever-quietly",
    name: "Forever Quietly",
    couple: "Emily & James",
    designer: "Plum & Silk Studio",
    price: "Free",
    category: "Modern & minimal",
    subCategory: "Architectural Lines",
    venue: "The Foundry, Seattle",
    popularity: 92,
    dateAdded: "2026-10-17",
    visualKey: "emilyjames",
    description: "Deep plum and rich berry tones with a constellation of intimate Polaroid memories: 'We have said forever quietly...'",
  },
];

export default function Templates() {
  const navigate = useNavigate();

  // Active Category Pill (null = All)
  const [selectedMainCategory, setSelectedMainCategory] = useState<WeddingCategory | "All">("All");

  // Sub-category item selected
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);

  // Sorting
  const [activeTab, setActiveTab] = useState<"Trending" | "Best" | "Recent">("Trending");

  // Filters
  const [priceFilter, setPriceFilter] = useState<"All" | "Free" | "Pro">("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Dropdowns UI
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  // Modal Preview
  const [previewTemplate, setPreviewTemplate] = useState<WeddingTemplateItem | null>(null);

  // Filtered Templates
  const filteredTemplates = useMemo(() => {
    let result = [...WEDDING_TEMPLATES];

    // Main Category filter
    if (selectedMainCategory !== "All") {
      result = result.filter((t) => t.category === selectedMainCategory);
    }

    // Sub-item filter
    if (selectedSubItem) {
      result = result.filter(
        (t) =>
          t.subCategory.toLowerCase() === selectedSubItem.toLowerCase() ||
          t.category.toLowerCase() === selectedSubItem.toLowerCase()
      );
    }

    // Price filter
    if (priceFilter === "Free") {
      result = result.filter((t) => t.price.toLowerCase() === "free");
    } else if (priceFilter === "Pro") {
      result = result.filter((t) => t.price.toLowerCase() !== "free");
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.couple.toLowerCase().includes(q) ||
          t.designer.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.subCategory.toLowerCase().includes(q) ||
          t.venue.toLowerCase().includes(q)
      );
    }

    // Sort
    if (activeTab === "Trending" || activeTab === "Best") {
      result.sort((a, b) => b.popularity - a.popularity);
    } else if (activeTab === "Recent") {
      result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    }

    return result;
  }, [selectedMainCategory, selectedSubItem, priceFilter, searchQuery, activeTab]);

  const handleUseTemplate = (template: WeddingTemplateItem) => {
    navigate(`/intake?template=${encodeURIComponent(template.id)}&templateName=${encodeURIComponent(template.name)}`);
  };

  const renderVisual = (visualKey: string) => {
    switch (visualKey) {
      case "classic-manor":
        return (
          <div className="template-visual wvisual-classic-manor">
            <div className="classic-manor-header">The Wedding Celebration</div>
            <div className="classic-manor-body">
              <div className="classic-manor-names">Charlotte &amp; Edward</div>
              <div className="classic-manor-details">Saturday, June 19, 2027 • Highclere Castle</div>
            </div>
            <div className="classic-manor-seal">C&amp;E</div>
          </div>
        );

      case "romantic-tuscany":
        return (
          <div className="template-visual wvisual-romantic-tuscany">
            <div className="romantic-photo-strip">
              <img src="/images/wedding-venue-1.jpg" alt="Villa Cetinale" loading="lazy" />
            </div>
            <div>
              <div className="romantic-names">Sophia &amp; Mateo</div>
              <div className="romantic-date">September 12, 2026 • Tuscany, Italy</div>
            </div>
          </div>
        );

      case "modern-noir":
        return (
          <div className="template-visual wvisual-modern-noir">
            <div className="modern-noir-text">
              <span className="modern-noir-tag">Black Tie Noir</span>
              <div className="modern-noir-names">Chloe &amp;<br />Samuel</div>
              <span className="modern-noir-venue">Post Ranch Inn • Big Sur</span>
            </div>
            <div className="modern-noir-img">
              <img src="/images/wedding-venue-2.jpg" alt="Big Sur" loading="lazy" />
            </div>
          </div>
        );

      case "cultural-desi":
        return (
          <div className="template-visual wvisual-cultural-desi">
            <div className="cultural-gold-arch">
              <span className="cultural-arch-eyebrow">✦ Vivaha Utsav ✦</span>
              <div className="cultural-arch-title">Priya &amp; Dev</div>
              <span className="cultural-arch-tagline">Lake Como, Italy • Sangeet &amp; Ceremony</span>
            </div>
          </div>
        );

      case "classic-estate":
        return (
          <div className="template-visual wvisual-classic-estate">
            <div className="classic-estate-border">
              <span className="classic-estate-monogram">V &amp; A</span>
              <div className="classic-estate-names">Victoria &amp; Arthur</div>
              <span className="classic-estate-loc">Blenheim Palace • Oxfordshire</span>
            </div>
          </div>
        );

      case "romantic-meadow":
        return (
          <div className="template-visual wvisual-romantic-meadow">
            <img src="/images/wedding-venue-3.jpg" alt="Provence" className="romantic-meadow-bg" loading="lazy" />
            <div className="romantic-meadow-card">
              <div className="romantic-meadow-names">Isabella &amp; Lucas</div>
              <div className="romantic-meadow-date">Château de Tourreau • Provence</div>
            </div>
          </div>
        );

      case "modern-loft":
        return (
          <div className="template-visual wvisual-modern-loft">
            <div className="modern-loft-top">
              <span>Modern Editorial</span>
              <span>10.24.2026</span>
            </div>
            <div className="modern-loft-headline">
              <strong>Maya</strong> &amp; <strong>Julian</strong>
            </div>
            <div className="modern-loft-bottom">The Foundry • Long Island City</div>
          </div>
        );

      case "cultural-alafia":
        return (
          <div className="template-visual wvisual-cultural-alafia">
            <span className="alafia-badge">Alafia Celebration</span>
            <div className="alafia-couple">Amara &amp; Kemi</div>
            <span className="alafia-subtitle">Traditional Engagement &amp; Reception • London</span>
          </div>
        );

      case "classic-ballroom":
        return (
          <div className="template-visual wvisual-classic-ballroom">
            <div className="classic-ballroom-photo">
              <img src="/images/wedding-venue-4.jpg" alt="Ballroom" loading="lazy" />
            </div>
            <div>
              <div className="classic-ballroom-names">Elena &amp; Julian</div>
              <div className="classic-ballroom-sub">The Plaza • New York City</div>
            </div>
          </div>
        );

      case "romantic-vineyard":
        return (
          <div className="template-visual wvisual-romantic-vineyard">
            <img src="/images/wedding-venue-5.jpg" alt="Vineyard" className="romantic-vineyard-bg" loading="lazy" />
            <div className="romantic-vineyard-content">
              <div className="romantic-vineyard-names">Camila &amp; Diego</div>
              <div className="romantic-vineyard-date">Meadowood • Napa Valley</div>
            </div>
          </div>
        );

      case "modern-arch":
        return (
          <div className="template-visual wvisual-modern-arch">
            <div className="modern-arch-header">Architectural Form</div>
            <div className="modern-arch-body">
              <div className="modern-arch-names">Zoe &amp;<br />Alexander</div>
            </div>
            <div className="modern-arch-footer">Solomon R. Guggenheim • NYC</div>
          </div>
        );

      case "cultural-kyoto":
        return (
          <div className="template-visual wvisual-cultural-kyoto">
            <span className="kyoto-crest">紋</span>
            <div className="kyoto-names">Hana &amp; Kenji</div>
            <span className="kyoto-sub">Heian Jingu Shrine • Kyoto</span>
          </div>
        );

      case "classic-kensington":
        return (
          <div className="template-visual wvisual-classic-kensington">
            <div className="kensington-border">
              <span className="kensington-sub">Together With Their Families</span>
              <div className="kensington-title">Grace &amp; William</div>
              <span className="kensington-sub">Kensington Palace Orangery</span>
            </div>
          </div>
        );

      case "romantic-sunset":
        return (
          <div className="template-visual wvisual-romantic-sunset">
            <span className="sunset-tag">Golden Hour Vows</span>
            <div className="sunset-names">Sienna &amp; Liam</div>
            <span className="sunset-date">San Ysidro Ranch • Montecito</span>
          </div>
        );

      case "modern-desert":
        return (
          <div className="template-visual wvisual-modern-desert">
            <span className="desert-chic-badge">Desert Minimalism</span>
            <div className="desert-chic-names">Nadia &amp; Samir</div>
            <span className="desert-chic-loc">Amangiri • Canyon Point</span>
          </div>
        );

      case "cultural-zahra":
        return (
          <div className="template-visual wvisual-cultural-zahra">
            <div className="zahra-motif">✦ ✦ ✦</div>
            <div className="zahra-names">Aaliyah &amp; Tariq</div>
            <span className="zahra-sub">La Mamounia • Marrakech</span>
          </div>
        );

      case "wedded":
        return (
          <div className="template-visual wvisual-wedded">
            <div className="wedded-panel">
              <img src="/images/wedding-venue-1.jpg" alt="Venue" className="wedded-panel-img" loading="lazy" />
              <div className="wedded-panel-title">Gathering</div>
              <div className="wedded-panel-sub">Friday 6 PM</div>
            </div>
            <div className="wedded-panel" style={{ flex: 1.2 }}>
              <div className="wedded-panel-title" style={{ fontSize: "9px" }}>Sophie &amp; Matteo</div>
              <img src="/images/wedding-venue-2.jpg" alt="Couple" className="wedded-panel-img" style={{ height: "48px" }} loading="lazy" />
              <div className="wedded-panel-sub">09.18.2026</div>
            </div>
            <div className="wedded-panel">
              <img src="/images/wedding-venue-3.jpg" alt="Details" className="wedded-panel-img" loading="lazy" />
              <div className="wedded-panel-title">Registry</div>
              <div className="wedded-panel-sub">Our Wishlist</div>
            </div>
          </div>
        );

      case "newchapter":
        return (
          <div className="template-visual wvisual-newchapter">
            <div className="newchapter-laptop">
              <div className="newchapter-screen">
                <div>
                  <div className="newchapter-left-text">Ellis &amp;<br />Jules</div>
                  <div className="newchapter-date">02.08.2027</div>
                </div>
                <img src="/images/wedding-venue-4.jpg" alt="Ellis & Jules" className="newchapter-photo" loading="lazy" />
              </div>
              <div className="newchapter-base" />
            </div>
          </div>
        );

      case "weddingly":
        return (
          <div className="template-visual wvisual-weddingly">
            <img src="/images/wedding-venue-5.jpg" alt="Seaside vows" className="weddingly-bg" loading="lazy" />
            <div className="weddingly-frame">
              <span className="weddingly-eyebrow">The wedding of</span>
              <div className="weddingly-names">Olivia &amp; Daniel</div>
              <span className="weddingly-date">Saturday, 5 Aug 2026</span>
            </div>
          </div>
        );

      case "sanctun":
        return (
          <div className="template-visual wvisual-sanctun">
            <img src="/images/wedding-venue-1.jpg" alt="Emma & James" className="sanctun-bg" loading="lazy" />
            <div className="sanctun-names">Emma &amp; James</div>
          </div>
        );

      case "weddingdaysite":
        return (
          <div className="template-visual wvisual-weddingdaysite">
            <div className="wds-header">Wedding Feature</div>
            <div className="wds-grid">
              <img src="/images/wedding-venue-2.jpg" alt="Editorial 1" className="wds-img-1" loading="lazy" />
              <img src="/images/wedding-venue-3.jpg" alt="Editorial 2" className="wds-img-2" loading="lazy" />
            </div>
          </div>
        );

      case "maisonvera":
        return (
          <div className="template-visual wvisual-maisonvera">
            <div className="maisonvera-text">
              <h4>Bespoke wedding cakes, composed like art.</h4>
              <p>Studio pepette • Paris &amp; Côte d'Azur</p>
            </div>
            <div className="maisonvera-img-box">
              <img src="/images/wedding-venue-4.jpg" alt="Cake centerpiece" loading="lazy" />
            </div>
          </div>
        );

      case "elowenchetan":
        return (
          <div className="template-visual wvisual-elowenchetan">
            <div className="elowen-arch-frame">
              <img src="/images/wedding-venue-5.jpg" alt="Elowen & Chetan" loading="lazy" />
            </div>
            <div>
              <div className="elowen-title">ELOWEN &amp; CHETAN</div>
              <div className="elowen-date">Saturday, 12 Sep 2026 • Jodhpur</div>
            </div>
          </div>
        );

      case "amorette":
        return (
          <div className="template-visual wvisual-amorette">
            <div className="amorette-card">
              <div className="amorette-info">
                <span className="amorette-eyebrow">The Wedding Celebration of</span>
                <div className="amorette-names">Charlotte &amp; Oliver</div>
                <span className="amorette-eyebrow">Kew Gardens</span>
              </div>
              <div className="amorette-sketch-box">
                <img src="/images/wedding-venue-1.jpg" alt="Charlotte & Oliver" loading="lazy" />
              </div>
            </div>
          </div>
        );

      case "arbor":
        return (
          <div className="template-visual wvisual-arbor">
            <img src="/images/wedding-venue-2.jpg" alt="Rustic barn reception" className="arbor-bg" loading="lazy" />
            <div className="arbor-content">
              <div className="arbor-headline">One wedding a day.</div>
              <div className="arbor-sub">Hannah &amp; Caleb • Vermont</div>
            </div>
          </div>
        );

      case "everty":
        return (
          <div className="template-visual wvisual-everty">
            <img src="/images/wedding-venue-3.jpg" alt="Tuscany night" className="everty-bg" loading="lazy" />
            <div className="everty-content">
              <div className="everty-names">Elena &amp; Mateo</div>
              <div className="everty-loc">Tuscany, Italy</div>
            </div>
          </div>
        );

      case "miranirvana":
        return (
          <div className="template-visual wvisual-miranirvana">
            <img src="/images/wedding-venue-4.jpg" alt="African Royal Wedding" className="miranirvana-bg" loading="lazy" />
            <div className="miranirvana-title">Fluent in Every Tradition</div>
            <div className="miranirvana-tag">Folake &amp; Adebayo • Lagos</div>
          </div>
        );

      case "wedfully":
        return (
          <div className="template-visual wvisual-wedfully">
            <img src="/images/wedding-venue-5.jpg" alt="Lake Como terrace" className="wedfully-bg" loading="lazy" />
            <div className="wedfully-card">
              <div className="wedfully-names">Sofia &amp; Mateo</div>
              <div className="wedfully-sub">Grand Hotel Tremezzo</div>
            </div>
          </div>
        );

      case "detailday":
        return (
          <div className="template-visual wvisual-detailday">
            <div className="detailday-title">We will plan every detail of your day!</div>
            <div className="detailday-photos">
              <img src="/images/wedding-venue-1.jpg" alt="Plan 1" className="detailday-photo-item" loading="lazy" />
              <img src="/images/wedding-venue-2.jpg" alt="Plan 2" className="detailday-photo-item" loading="lazy" />
            </div>
          </div>
        );

      case "nalaparty":
        return (
          <div className="template-visual wvisual-nalaparty">
            <div className="nalaparty-banner">HELP US DESIGN A PARTY OUTFIT FOR NALA</div>
            <div className="nalaparty-pet-box">
              <img src="/images/wedding-venue-3.jpg" alt="Pet companion" loading="lazy" />
            </div>
            <div className="nalaparty-sub">Chloe &amp; Liam • Brooklyn Loft</div>
          </div>
        );

      case "kekasihkusuma":
        return (
          <div className="template-visual wvisual-kekasihkusuma">
            <div className="kekasih-circle-frame">
              <img src="/images/wedding-venue-4.jpg" alt="Kekasih & Kusuma" loading="lazy" />
            </div>
            <div className="kekasih-info">
              <div className="kekasih-names">Kekasih &amp;<br />Kusuma</div>
              <div className="kekasih-sub">Plataran Borobudur</div>
            </div>
          </div>
        );

      case "emilyjames":
        return (
          <div className="template-visual wvisual-emilyjames">
            <div className="emilyjames-quote">We have said forever quietly, now we would like to say it out loud.</div>
            <div className="emilyjames-dots">
              <img src="/images/wedding-venue-1.jpg" alt="Memory 1" className="emilyjames-dot" loading="lazy" />
              <img src="/images/wedding-venue-2.jpg" alt="Memory 2" className="emilyjames-dot" loading="lazy" />
              <img src="/images/wedding-venue-5.jpg" alt="Memory 3" className="emilyjames-dot" loading="lazy" />
            </div>
            <div className="emilyjames-names">Emily &amp; James</div>
          </div>
        );

      default:
        return (
          <div className="template-visual wvisual-classic-manor">
            <div className="classic-manor-names">Velvet Invite</div>
          </div>
        );
    }
  };

  return (
    <div className="templates-page">
      {/* Background ambient lighting and vertical lines matching website index.css */}
      <div className="templates-floor-light" aria-hidden="true" />
      <div className="templates-guides" aria-hidden="true">
        <i style={{ left: "18%" }} className="templates-guide-line" />
        <i style={{ left: "50%" }} className="templates-guide-line" />
        <i style={{ left: "82%" }} className="templates-guide-line" />
      </div>

      {/* Top sticky navigation bar */}
      <header className="templates-header-bar">
        <div className="templates-header-content">
          <div className="templates-brand-group">
            <Brand light />
            <Link to="/" className="templates-back-link">
              <ArrowLeft size={13} /> Back to home
            </Link>
          </div>

          <nav className="templates-nav-actions">
            <Link to="/login" className="templates-nav-link">
              Log in
            </Link>
            <Link to="/builder" className="templates-cta-pill">
              Start building free <ChevronRight size={14} />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero section */}
      <section className="templates-hero">
        <span className="templates-eyebrow">
          <Sparkles size={13} /> CURATED WEDDING DESIGNS
        </span>
        <h1 className="templates-title">Wedding Templates</h1>
        <p className="templates-subtitle">
          Browse polished wedding website templates crafted for your celebration. Filter by our four distinct wedding aesthetics to find your perfect starting point.
        </p>
      </section>

      {/* 4 Wedding Category Hero Selector Cards */}
      <section className="wedding-category-pills-row" aria-label="Wedding categories">
        {WEDDING_CATEGORIES_DATA.map((cat) => {
          const isActive = selectedMainCategory === cat.category;
          return (
            <button
              key={cat.category}
              type="button"
              className={`wedding-category-card-btn ${isActive ? "is-active" : ""}`}
              onClick={() => {
                if (isActive) {
                  setSelectedMainCategory("All");
                  setSelectedSubItem(null);
                } else {
                  setSelectedMainCategory(cat.category);
                  setSelectedSubItem(null);
                }
              }}
            >
              <span className="cat-title">{cat.category}</span>
              <span className="cat-desc">{cat.tagline}</span>
            </button>
          );
        })}
      </section>

      {/* Wedding Taxonomy Columns (Specific sub-styles for the 4 wedding categories) */}
      <section className="templates-categories-container" aria-label="Wedding style details">
        <div className="wedding-taxonomy-grid">
          {WEDDING_CATEGORIES_DATA.map((cat) => (
            <div key={cat.category} className="taxonomy-column">
              <div className="taxonomy-column-header">
                <Heart size={13} color="var(--accent, #a7aa8e)" />
                <span className="taxonomy-column-title">{cat.category}</span>
              </div>
              {cat.subItems.map((item) => {
                const isSelected = selectedSubItem?.toLowerCase() === item.toLowerCase();
                return (
                  <button
                    key={item}
                    type="button"
                    className={`taxonomy-item-btn ${isSelected ? "is-selected" : ""}`}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedSubItem(null);
                      } else {
                        setSelectedSubItem(item);
                        setSelectedMainCategory(cat.category);
                      }
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Filter and controls bar */}
      <section className="templates-controls-bar">
        <div className="templates-controls-left">
          {/* Trending, Best, Recent Tabs */}
          <div className="segmented-tabs" role="tablist">
            {(["Trending", "Best", "Recent"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                className={`segmented-tab-btn ${activeTab === tab ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Active category / sub-style pill */}
          {(selectedMainCategory !== "All" || selectedSubItem) && (
            <div className="active-filter-badge">
              <span>{selectedSubItem || selectedMainCategory}</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedMainCategory("All");
                  setSelectedSubItem(null);
                }}
                aria-label="Clear filter"
              >
                <X size={13} />
              </button>
            </div>
          )}
        </div>

        <div className="templates-controls-right">
          {/* Search box */}
          <div className="search-input-wrapper">
            <Search size={14} color="var(--accent, #a7aa8e)" />
            <input
              type="text"
              placeholder="Search wedding templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{ background: "none", border: "none", color: "rgba(255, 255, 255, 0.7)", cursor: "pointer", padding: 0 }}
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Price dropdown */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              className="filter-dropdown-btn"
              onClick={() => setIsPriceOpen(!isPriceOpen)}
            >
              <span>{priceFilter === "All" ? "Price" : priceFilter}</span>
              <ChevronDown size={14} />
            </button>
            {isPriceOpen && (
              <div className="filter-dropdown-menu">
                {(["All", "Free", "Pro"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`filter-menu-item ${priceFilter === opt ? "is-selected" : ""}`}
                    onClick={() => {
                      setPriceFilter(opt);
                      setIsPriceOpen(false);
                    }}
                  >
                    <span>{opt === "All" ? "All Prices" : opt}</span>
                    {priceFilter === opt && <Check size={13} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Templates 4-column Grid */}
      <section className="templates-grid-section">
        <div className="templates-grid">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="template-card"
                onClick={() => setPreviewTemplate(template)}
              >
                {/* Thumbnail Preview */}
                <div className="template-thumbnail-frame">
                  {renderVisual(template.visualKey)}
                  {/* Hover Quick Overlay */}
                  <div className="template-hover-overlay">
                    <button
                      type="button"
                      className="template-overlay-btn primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUseTemplate(template);
                      }}
                    >
                      <Sparkles size={13} /> Start with this
                    </button>
                    <button
                      type="button"
                      className="template-overlay-btn secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewTemplate(template);
                      }}
                    >
                      <Eye size={13} /> Preview
                    </button>
                  </div>
                </div>

                {/* Card Meta Row */}
                <div className="template-card-meta">
                  <div className="template-meta-left">
                    <h3 className="template-name">{template.name}</h3>
                    <p className="template-author">
                      {template.category} • {template.couple}
                    </p>
                  </div>
                  <span
                    className={`template-price-badge ${
                      template.price.toLowerCase() === "free" ? "free" : ""
                    }`}
                  >
                    {template.price}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="templates-empty-state">
              <h3>No wedding templates found</h3>
              <p>Try resetting your filters to explore our full wedding collection.</p>
              <button
                type="button"
                className="templates-cta-pill"
                onClick={() => {
                  setSelectedMainCategory("All");
                  setSelectedSubItem(null);
                  setPriceFilter("All");
                  setSearchQuery("");
                }}
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Template Detail Preview Modal */}
      {previewTemplate && (
        <div
          className="template-modal-backdrop"
          onClick={() => setPreviewTemplate(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="template-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="template-modal-header">
              <div className="modal-header-left">
                <h2 className="modal-title">{previewTemplate.name}</h2>
                <span
                  className={`template-price-badge ${
                    previewTemplate.price.toLowerCase() === "free" ? "free" : ""
                  }`}
                >
                  {previewTemplate.price}
                </span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setPreviewTemplate(null)}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="template-modal-body">
              <div className="modal-preview-stage">
                {renderVisual(previewTemplate.visualKey)}
              </div>

              <div className="modal-meta-row">
                <div className="modal-info-left">
                  <span className="modal-author-tag">
                    Category: <strong>{previewTemplate.category}</strong> ({previewTemplate.subCategory}) • Venue: {previewTemplate.venue}
                  </span>
                  <p className="modal-desc">{previewTemplate.description}</p>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="modal-action-secondary"
                    onClick={() => setPreviewTemplate(null)}
                  >
                    Keep browsing
                  </button>
                  <button
                    type="button"
                    className="modal-action-primary"
                    onClick={() => handleUseTemplate(previewTemplate)}
                  >
                    Start with this template <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
