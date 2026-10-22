import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Camera,
  Check,
  ChevronRight,
  Copy,
  Globe,
  Heart,
  Leaf,
  LockKeyhole,
  Menu,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import RingHero from "../components/RingHero";
import {
  emptyWeddingDraft,
  getIntakeStep,
  getWeddingDraft,
  saveIntakeStep,
  saveWeddingDraft,
  type WeddingDraft,
} from "../weddingDraft";

const styles = ["Garden romance", "Modern heirloom", "Sunset celebration"];

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand${light ? " brand-light" : ""}`} to="/" aria-label="Velvet Invite home">
      <span className="brand-mark"><Leaf size={18} aria-hidden="true" /></span>
      <span>velvet invite</span>
    </Link>
  );
}

function dateLabel(date: string): string {
  if (!date) return "The day we say I do";
  return new Date(`${date}T12:00:00`).toLocaleDateString("en", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function coupleTitle(names: string): string {
  return names.trim() || "Your names";
}

function siteHref(slug: string): string {
  return `${window.location.origin}/sites/${slug}`;
}

export function WeddingCard({ draft, showKnob = true }: { draft: WeddingDraft; showKnob?: boolean }) {
  const styleKey = draft.style.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="wedding-card paper-card" data-style={styleKey}>
      <figure className="wedding-card-art" aria-hidden="true">
        <span className="art-sun" />
        <span className="art-stem art-stem-one" />
        <span className="art-stem art-stem-two" />
        <span className="art-leaf art-leaf-one" />
        <span className="art-leaf art-leaf-two" />
        <span className="art-leaf art-leaf-three" />
      </figure>
      <div className="wedding-card-copy">
        <span className="eyebrow">TOGETHER WITH THEIR FAMILIES</span>
        <h2>{coupleTitle(draft.coupleNames)}</h2>
        <span className="wedding-card-rule" />
        <p>{dateLabel(draft.weddingDate)}</p>
        {(draft.venue || draft.city) && (
          <p className="wedding-card-place">{[draft.venue, draft.city].filter(Boolean).join(" / ")}</p>
        )}
        <span className="wedding-card-invite">joyfully invite you to celebrate</span>
      </div>
      {showKnob && (
        <Link to="/signup" className="round-knob" aria-label="Start your wedding invitation">
          <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
}

const DEMO_TEMPLATES = [
  {
    id: "garden-romance",
    name: "Garden Romance",
    style: "Garden romance",
    badge: "Most Popular",
    vibe: "Soft greens, natural sunlight, organic botanical florals",
    couple: "Adaeze & Tunde",
    date: "Saturday, 18 July 2026",
    venue: "The Glasshouse, Kew",
    palette: ["#4a4d44", "#768268", "#f2f3ef"],
  },
  {
    id: "modern-heirloom",
    name: "Modern Heirloom",
    style: "Modern heirloom",
    badge: "Editorial Classic",
    vibe: "Timeless serifs, warm limestone paper, clean architectural lines",
    couple: "Elena & Marcus",
    date: "Friday, 14 August 2026",
    venue: "Daylesford Estate, Cotswolds",
    palette: ["#23261f", "#7c8177", "#fbfcf8"],
  },
  {
    id: "sunset-celebration",
    name: "Sunset Celebration",
    style: "Sunset celebration",
    badge: "Golden Hour",
    vibe: "Warm golden terracotta, candlelit romance, rich evening glow",
    couple: "Priya & Dev",
    date: "Sunday, 20 September 2026",
    venue: "Villa Balbiano, Lake Como",
    palette: ["#8c5835", "#d6c4ab", "#f9f5ed"],
  },
  {
    id: "classic-noir",
    name: "Classic Noir",
    style: "Modern heirloom",
    badge: "Black Tie",
    vibe: "Dramatic graphite, white-tie formality, high fashion editorial",
    couple: "Chloe & Sam",
    date: "Saturday, 10 October 2026",
    venue: "Post Ranch Inn, Big Sur",
    palette: ["#181a16", "#a7aa8e", "#ffffff"],
  },
  {
    id: "coastal-meadow",
    name: "Coastal Meadow",
    style: "Garden romance",
    badge: "Seaside Breeze",
    vibe: "Breezy slate blue, wildflower accents, effortless oceanside celebration",
    couple: "Maya & Julian",
    date: "Saturday, 29 May 2027",
    venue: "Rosewood Miramar, Montecito",
    palette: ["#4b5860", "#94a3ab", "#f3f5f6"],
  },
];

export function Landing() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);

  const activeTemplate = DEMO_TEMPLATES[activeDemoIndex];

  useEffect(() => {
    const readyTimer = setTimeout(() => setIsReady(true), 60);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || window.innerWidth < 900) return () => clearTimeout(readyTimer);

    let targetX = 0;
    let targetY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let rafId: number;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const tick = () => {
      smoothX += (targetX - smoothX) * 0.055;
      smoothY += (targetY - smoothY) * 0.055;
      if (heroRef.current) {
        heroRef.current.style.setProperty("--px", smoothX.toFixed(4));
        heroRef.current.style.setProperty("--py", smoothY.toFixed(4));
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      clearTimeout(readyTimer);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main
      ref={heroRef}
      className={`landing-page sylva-hero-bg ${isReady ? "is-ready" : ""}`}
      id="hero"
    >
      {/* Floor ambient light pool */}
      <div className="sylva-floor-light hero-light-floor" aria-hidden="true" />

      {/* Faint vertical guide lines */}
      <div className="guides fade-in" aria-hidden="true">
        <i style={{ left: "20%" }} className="guide-line" />
        <i style={{ left: "50%" }} className="guide-line" />
        <i style={{ left: "80%" }} className="guide-line" />
      </div>

      {/* Ghost wordmark */}
      <div className="ghost-wordmark fade-in" aria-hidden="true">
        VELVET INVITE
      </div>

      {/* Header Navigation */}
      <header className="site-header">
        <Brand light />

        {/* Desktop Glass Dock */}
        <nav className="glass-dock desktop-dock" data-spec aria-label="Main navigation">
          <a className="glass-dock-item" href="#demos">
            Demos
          </a>
          <a className="glass-dock-item" href="#features">
            Features
          </a>
          <a className="glass-dock-item" href="#how-it-works">
            How it works
          </a>
          <a className="glass-dock-item" href="#pricing">
            Pro Tier
          </a>
          <Link className="glass-dock-item header-login" to="/login">
            Log in <ChevronRight size={14} />
          </Link>
          <Link className="glass-dock-item is-active" to="/templates">
            Start building
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-glass-menu" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <nav>
            <a href="#demos" onClick={() => setMobileMenuOpen(false)}>
              Live Demos
            </a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>
              Features & Benefits
            </a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>
              How it works
            </a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>
              Pro Tier ($19/yr)
            </a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)}>
              Reviews
            </a>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              Log in
            </Link>
            <Link
              to="/templates"
              className="button button-primary pill-btn mobile-cta-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start building free <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      )}

      {/* ── 1. Hero Section (Above the fold) ─────────────────────────── */}
      <section className="landing-hero">
        <div className="landing-copy par" style={{ "--pd": 16, "--pr": 1.2 } as React.CSSProperties}>
          <span className="eyebrow landing-eyebrow mask-reveal" style={{ "--d": "150ms" } as React.CSSProperties}>
            <Sparkles size={14} /> MADE FOR YOUR KIND OF LOVE
          </span>
          <h1 className="mask-reveal" style={{ "--d": "260ms" } as React.CSSProperties}>
            Your day.<br />Your story.<br /><em>Beautifully told.</em>
          </h1>
          <p className="landing-description mask-reveal" style={{ "--d": "400ms" } as React.CSSProperties}>
            A self-serve wedding website builder designed with timeless elegance. Start with customizable pre-built templates or begin from a clean canvas.
          </p>

          {/* Prominent Dual CTAs */}
          <div className="hero-dual-cta mask-reveal" style={{ "--d": "520ms" } as React.CSSProperties}>
            <Link className="button button-primary pill-btn hero-main-cta" to="/templates">
              Start building your wedding site <ArrowRight size={17} />
            </Link>
            <Link className="button button-glass-pill hero-login-cta" to="/login">
              Log in <ChevronRight size={15} />
            </Link>
          </div>

          <div className="landing-note mask-reveal" style={{ "--d": "620ms" } as React.CSSProperties}>
            <LockKeyhole size={13} /> Free to start • Up to 3 sites free • No credit card required
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-metrics mask-reveal" style={{ "--d": "700ms" } as React.CSSProperties}>
            <div className="metric-item">
              <strong>10,000+</strong>
              <span>Stories told</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <strong>100%</strong>
              <span>Responsive</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <strong>3 Sites</strong>
              <span>Free tier</span>
            </div>
          </div>
        </div>

        <div className="landing-art" aria-label="A preview of a wedding invitation">
          <div className="landing-art-glow" />
          <RingHero size="hero" className="landing-ring-hero" />
          <div className="landing-stamp mask-circle" style={{ "--d": "700ms" } as React.CSSProperties}>
            MADE<br />WITH<br />LOVE
          </div>
          <div className="par" style={{ "--pd": 22, "--pr": 2.2 } as React.CSSProperties}>
            <WeddingCard draft={emptyWeddingDraft} showKnob />
          </div>
          <div className="landing-art-caption"><span /> YOUR STORY, IN ONE PLACE</div>
        </div>
      </section>

      {/* ── 2. Interactive Demo Showcase Carousel ────────────────────── */}
      <section className="landing-section demo-showcase-section" id="demos">
        <div className="section-header">
          <span className="eyebrow"><Sparkles size={13} /> INTERACTIVE DEMO SHOWCASE</span>
          <h2>Explore live demo styles</h2>
          <p className="section-subtitle">
            Demonstrating design flexibility across diverse themes. Switch between styles and start customizing with zero upfront friction.
          </p>
        </div>

        <div className="demo-carousel-container">
          {/* Carousel Selector Tabs */}
          <div className="demo-tabs-bar" role="tablist" aria-label="Template selector">
            {DEMO_TEMPLATES.map((tmpl, idx) => (
              <button
                key={tmpl.id}
                type="button"
                role="tab"
                aria-selected={activeDemoIndex === idx}
                className={`demo-tab-btn ${activeDemoIndex === idx ? "is-active" : ""}`}
                onClick={() => setActiveDemoIndex(idx)}
              >
                <span className="demo-tab-name">{tmpl.name}</span>
                <span className="demo-tab-badge">{tmpl.badge}</span>
              </button>
            ))}
          </div>

          {/* Live Preview Display Card */}
          <div className="demo-stage-card paper-card">
            <div className="demo-info-pane">
              <div className="demo-meta-row">
                <span className="demo-badge-pill">{activeTemplate.badge}</span>
                <div className="palette-swatches" aria-label="Template color palette">
                  {activeTemplate.palette.map((color) => (
                    <span
                      key={color}
                      className="swatch-circle"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <h3>{activeTemplate.name}</h3>
              <p className="demo-vibe-desc">{activeTemplate.vibe}</p>

              <div className="demo-meta-details">
                <div className="meta-line">
                  <strong>Couple:</strong> <span>{activeTemplate.couple}</span>
                </div>
                <div className="meta-line">
                  <strong>Date:</strong> <span>{activeTemplate.date}</span>
                </div>
                <div className="meta-line">
                  <strong>Venue:</strong> <span>{activeTemplate.venue}</span>
                </div>
              </div>

              <div className="demo-actions-row">
                <Link
                  to="/intake"
                  className="button button-primary pill-btn demo-customize-btn"
                >
                  Start with {activeTemplate.name} <ArrowRight size={16} />
                </Link>
                <div className="carousel-nav-arrows">
                  <button
                    type="button"
                    className="arrow-nav-btn"
                    onClick={() =>
                      setActiveDemoIndex((i) => (i === 0 ? DEMO_TEMPLATES.length - 1 : i - 1))
                    }
                    aria-label="Previous template"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    className="arrow-nav-btn"
                    onClick={() =>
                      setActiveDemoIndex((i) => (i === DEMO_TEMPLATES.length - 1 ? 0 : i + 1))
                    }
                    aria-label="Next template"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="demo-preview-pane">
              <WeddingCard
                draft={{
                  ...emptyWeddingDraft,
                  coupleNames: activeTemplate.couple,
                  weddingDate: "2026-08-14",
                  venue: activeTemplate.venue,
                  style: activeTemplate.style,
                }}
                showKnob={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Core Value Propositions — Infinite Marquee ────────────── */}
      <section className="landing-section value-props-section">
        <div className="section-header">
          <span className="eyebrow"><Check size={13} /> CORE VALUE PROPOSITIONS</span>
          <h2>The modern way to build wedding websites</h2>
          <p className="section-subtitle">
            Simple to customize, responsive on every viewport, and free to build and publish up to three sites.
          </p>
        </div>

        {/* Full-width infinite marquee slider */}
        <div className="marquee-viewport" aria-label="Wedding venue inspiration gallery">
          <div className="marquee-track">
            {[
              {
                img: "/images/wedding-venue-1.jpg",
                title: "Garden Reception",
                desc: "Fairy-light canopies, lush florals & white chiavari chairs under open skies.",
                pill: "Outdoor · Garden",
              },
              {
                img: "/images/wedding-venue-2.jpg",
                title: "Sacred Ceremony",
                desc: "Timeless church interiors bathed in golden light with white floral altar arrangements.",
                pill: "Church · Classical",
              },
              {
                img: "/images/wedding-venue-3.jpg",
                title: "Rustic Ballroom",
                desc: "Exposed brick walls, warm amber lighting & a grand mezzanine staircase for drama.",
                pill: "Ballroom · Rustic",
              },
              {
                img: "/images/wedding-venue-4.jpg",
                title: "Estate Courtyard",
                desc: "Lavender-draped chairs, barrel florals & an elegant mansion backdrop under blue skies.",
                pill: "Outdoor · Estate",
              },
              {
                img: "/images/wedding-venue-5.jpg",
                title: "Industrial Barn",
                desc: "Soaring ceilings, rattan pendant lights & wildflower centrepieces for bohemian romance.",
                pill: "Barn · Boho",
              },
              /* Duplicate set for seamless infinite loop */
              {
                img: "/images/wedding-venue-1.jpg",
                title: "Garden Reception",
                desc: "Fairy-light canopies, lush florals & white chiavari chairs under open skies.",
                pill: "Outdoor · Garden",
              },
              {
                img: "/images/wedding-venue-2.jpg",
                title: "Sacred Ceremony",
                desc: "Timeless church interiors bathed in golden light with white floral altar arrangements.",
                pill: "Church · Classical",
              },
              {
                img: "/images/wedding-venue-3.jpg",
                title: "Rustic Ballroom",
                desc: "Exposed brick walls, warm amber lighting & a grand mezzanine staircase for drama.",
                pill: "Ballroom · Rustic",
              },
              {
                img: "/images/wedding-venue-4.jpg",
                title: "Estate Courtyard",
                desc: "Lavender-draped chairs, barrel florals & an elegant mansion backdrop under blue skies.",
                pill: "Outdoor · Estate",
              },
              {
                img: "/images/wedding-venue-5.jpg",
                title: "Industrial Barn",
                desc: "Soaring ceilings, rattan pendant lights & wildflower centrepieces for bohemian romance.",
                pill: "Barn · Boho",
              },
            ].map((item, idx) => (
              <div className="marquee-card" key={idx} aria-hidden={idx >= 5}>
                <div className="marquee-card-img-wrap">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="marquee-card-img"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                <div className="marquee-card-body">
                  <span className="marquee-card-pill">{item.pill}</span>
                  <h3 className="marquee-card-title">{item.title}</h3>
                  <p className="marquee-card-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Feature Breakdown & Optional Pro Upgrade ──────────────── */}
      <section className="landing-section pro-tier-section" id="pricing">
        <div className="pro-tier-card paper-card">
          <div className="pro-header">
            <span className="pro-badge">OPTIONAL PRO UPGRADE • FROM $19 / YEAR</span>
            <h2>Unlock advanced capabilities for your day</h2>
            <p>
              Everything you need to expand your wedding presence with custom domains, custom forms, embedded widgets, and privacy-first site analytics.
            </p>
            <div className="pro-price-tag">
              <span className="price-amount">$19</span>
              <span className="price-cadence">/ year</span>
            </div>
          </div>

          <div className="pro-features-grid">
            <div className="pro-feature-item">
              <div className="pro-icon"><Globe size={18} /></div>
              <div>
                <h4>Custom Domains</h4>
                <p>Publish sites directly to custom domain names with full SSL/HTTPS security via Let's Encrypt.</p>
              </div>
            </div>

            <div className="pro-feature-item">
              <div className="pro-icon"><Sparkles size={18} /></div>
              <div>
                <h4>Increased Site Limits</h4>
                <p>Ability to create and publish more than three sites on a single account for all your related events.</p>
              </div>
            </div>

            <div className="pro-feature-item">
              <div className="pro-icon"><Calendar size={18} /></div>
              <div>
                <h4>Forms & Lead Generation</h4>
                <p>Collect signups, detailed guest contact info, meal selections, song requests, and custom questions.</p>
              </div>
            </div>

            <div className="pro-feature-item">
              <div className="pro-icon"><Camera size={18} /></div>
              <div>
                <h4>Widgets & Third-Party Embeds</h4>
                <p>Embed custom HTML/CSS/JS code and widgets from services like Stripe, PayPal, Spotify, Gumroad, and Typeform.</p>
              </div>
            </div>

            <div className="pro-feature-item">
              <div className="pro-icon"><ShieldCheck size={18} /></div>
              <div>
                <h4>Site Analytics</h4>
                <p>Track visitor performance and RSVP conversions using privacy-conscious integrations with Google Analytics, Plausible, and Matomo.</p>
              </div>
            </div>
          </div>

          <div className="pro-cta-wrap">
            <Link to="/intake" className="button button-primary pill-btn pro-main-btn">
              Start free, upgrade whenever you're ready <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. How It Works Section ──────────────────────────────────── */}
      <section className="landing-section" id="how-it-works">
        <div className="section-header">
          <span className="eyebrow"><Sparkles size={13} /> EFFORTLESS PROCESS</span>
          <h2>How it works</h2>
          <p className="section-subtitle">
            From first draft to final celebration in three seamless steps.
          </p>
        </div>

        <div className="how-it-works-grid">
          <article className="paper-card how-step-card">
            <span className="step-num">01</span>
            <h3>Tell us the little details</h3>
            <p>
              Share your names, date, venue, and chosen aesthetic. Our intuitive questionnaire takes less than three minutes.
            </p>
            <div className="step-tag">Step 1 • Intake</div>
          </article>

          <article className="paper-card how-step-card">
            <span className="step-num">02</span>
            <h3>Make it feel like you</h3>
            <p>
              Preview your live site with customized color stories, bespoke typography, schedule breakdowns, and photo moments.
            </p>
            <div className="step-tag">Step 2 • Personalize</div>
          </article>

          <article className="paper-card how-step-card">
            <span className="step-num">03</span>
            <h3>Share the joy with everyone</h3>
            <p>
              Send your private link or custom domain to guests. Track attendance, dietary meal choices, and notes in real time.
            </p>
            <div className="step-tag">Step 3 • Celebrate</div>
          </article>
        </div>
      </section>

      {/* ── 6. Features & Benefits Section ───────────────────────────── */}
      <section className="landing-section" id="features">
        <div className="section-header">
          <span className="eyebrow"><Leaf size={13} /> THOUGHTFULLY CRAFTED</span>
          <h2>Everything you need. Nothing you don’t.</h2>
          <p className="section-subtitle">
            Designed to make planning feel lighter, and your wedding website feel unforgettable.
          </p>
        </div>

        <div className="features-grid">
          <div className="paper-card feature-card">
            <div className="feature-icon"><Calendar size={20} /></div>
            <h3>Instant RSVP & Meal Tracker</h3>
            <p>
              Guests confirm attendance and dietary preferences with one tap on their phone. Export your final headcount and seating list anytime.
            </p>
          </div>

          <div className="paper-card feature-card">
            <div className="feature-icon"><Globe size={20} /></div>
            <h3>Custom Domain & Private Links</h3>
            <p>
              Use your own domain like <em>adaezeandtunde.com</em> or our elegant Velvet short-link for save-the-dates and invitations.
            </p>
          </div>

          <div className="paper-card feature-card">
            <div className="feature-icon"><ShieldCheck size={20} /></div>
            <h3>Password & Privacy Protection</h3>
            <p>
              Keep your wedding details completely confidential with an optional custom passcode so only invited loved ones have access.
            </p>
          </div>

          <div className="paper-card feature-card">
            <div className="feature-icon"><Heart size={20} /></div>
            <h3>Gift Registry & Honeymoon Funds</h3>
            <p>
              Link your existing registries from any store or let guests contribute directly to your dream honeymoon or house fund.
            </p>
          </div>

          <div className="paper-card feature-card">
            <div className="feature-icon"><Sparkles size={20} /></div>
            <h3>Editorial Typography & Palettes</h3>
            <p>
              Curated by design artisans with warm paper cards, smooth easing, and the modern Lexend font—no clunky, dated layouts.
            </p>
          </div>

          <div className="paper-card feature-card">
            <div className="feature-icon"><Camera size={20} /></div>
            <h3>Guest Photo Keepsake Album</h3>
            <p>
              Let guests snap and upload candid photos directly from reception tables into your shared digital wedding album.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. Social Proof & Testimonials ───────────────────────────── */}
      <section className="landing-section" id="reviews">
        <div className="press-strip" aria-label="Featured publications">
          <span>TRUSTED BY COUPLES FEATURED IN</span>
          <div className="press-logos">
            <span>VOGUE WEDDINGS</span>
            <span>OVER THE MOON</span>
            <span>THE KNOT</span>
            <span>STYLE ME PRETTY</span>
            <span>BRIDES</span>
          </div>
        </div>

        <div className="section-header">
          <span className="eyebrow"><Star size={13} fill="currentColor" /> REAL CELEBRATIONS</span>
          <h2>Loved by couples across the world</h2>
          <p className="section-subtitle">
            See why couples choose Velvet Invite for their most meaningful day.
          </p>
        </div>

        <div className="reviews-grid">
          <article className="paper-card review-card">
            <div className="stars-row" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#7c8177" color="#7c8177" />
              ))}
            </div>
            <blockquote>
              "Our guests couldn't stop talking about how stunning the website was. Setting it up took under 10 minutes, and managing meal choices was completely stress-free."
            </blockquote>
            <div className="review-author">
              <strong>Elena & Marcus</strong>
              <span>Cotswolds, United Kingdom</span>
            </div>
          </article>

          <article className="paper-card review-card">
            <div className="stars-row" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#7c8177" color="#7c8177" />
              ))}
            </div>
            <blockquote>
              "Most wedding builders feel like corporate templates from 2012. Velvet Invite feels like high-end print stationery come to life. Truly worth every second."
            </blockquote>
            <div className="review-author">
              <strong>Priya & Dev</strong>
              <span>Lake Como, Italy</span>
            </div>
          </article>

          <article className="paper-card review-card">
            <div className="stars-row" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#7c8177" color="#7c8177" />
              ))}
            </div>
            <blockquote>
              "The mobile experience is flawless. Our grandparents found it effortless to RSVP, and our friends loved sending registry gifts straight from their phones."
            </blockquote>
            <div className="review-author">
              <strong>Chloe & Sam</strong>
              <span>Big Sur, California</span>
            </div>
          </article>
        </div>
      </section>

      {/* ── 8. Final Call-to-Action ──────────────────────────────────── */}
      <section className="final-cta-section">
        <div className="final-cta-card paper-card">
          <span className="eyebrow"><Sparkles size={13} /> YOUR CELEBRATION STARTS HERE</span>
          <h2>Your wedding deserves more than a generic template.</h2>
          <p>
            Create an invitation and wedding website that feels as intentional, warm, and beautiful as your love story.
          </p>
          <div className="cta-actions">
            <Link className="button button-primary pill-btn cta-main-btn" to="/templates">
              Start building your wedding site <ArrowRight size={17} />
            </Link>
          </div>
          <small>Free to design • Up to 3 sites free • No credit card required</small>
        </div>
      </section>

      {/* ── 9. Minimalist Footer ─────────────────────────────────────── */}
      <footer className="landing-footer minimalist-footer">
        <div className="footer-top">
          <Brand light />
          <p className="footer-tagline">A little more love in every detail.</p>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Velvet Invite. All rights reserved.</p>
          <div className="footer-links">
            <a href="#demos">Demos</a>
            <a href="#how-it-works">How it works</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pro ($19/yr)</a>
            <a href="#reviews">Reviews</a>
            <Link to="/login">Sign in</Link>
            <Link to="/signup">Privacy</Link>
            <Link to="/signup">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

export function Intake() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<WeddingDraft>(() => getWeddingDraft() ?? emptyWeddingDraft);
  const [step, setStep] = useState(getIntakeStep);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    saveWeddingDraft(draft);
  }, [draft]);

  const change = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
    if (name === "coupleNames" && value.trim()) setValidationError("");
  };

  const next = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === 3 && !draft.coupleNames.trim()) {
      setValidationError("Please add both names before creating your wedding website.");
      saveIntakeStep(1);
      setStep(1);
      return;
    }
    saveWeddingDraft(draft);
    if (step < 3) {
      const nextStep = step + 1;
      saveIntakeStep(nextStep);
      setStep(nextStep);
      return;
    }
    saveWeddingDraft({ ...draft, intakeComplete: true });
    saveIntakeStep(3);
    navigate("/generating");
  };

  return (
    <main className="flow-page intake-page">
      <div className="guide-lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <header className="flow-header">
        <Brand light />
        <Link className="quiet-link quiet-link-light" to="/dashboard">
          Save and come back later <ArrowRight size={15} />
        </Link>
      </header>
      <div className="intake-layout">
        <section className="intake-main paper-card mask-reveal">
          <div className="intake-progress-copy">
            <span className="eyebrow"><Sparkles size={13} /> LET'S MAKE IT YOURS</span>
            <span className="step-counter">0{step} <i>/</i> 03</span>
          </div>
          <div className="progress-track" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3}>
            <span style={{ width: `${(step / 3) * 100}%` }} />
          </div>
          <form className="intake-form" onSubmit={next}>
            {step === 1 && (
              <>
                <span className="eyebrow">FIRST, THE TWO OF YOU</span>
                <h1>What should we<br />call your story?</h1>
                <p className="flow-lede">Let's start with the names your favourite people know and love.</p>
                <label className="field-label" htmlFor="coupleNames">Your names <span>Required</span></label>
                <input id="coupleNames" className="field-input" name="coupleNames" value={draft.coupleNames} onChange={change} placeholder="e.g. Adaeze & Tunde" required autoFocus />
                <label className="field-label" htmlFor="story">A little about you <span>Optional</span></label>
                <textarea id="story" className="field-input field-textarea" name="story" value={draft.story} onChange={change} placeholder="How did you meet? What makes your story yours?" rows={3} />
              </>
            )}
            {step === 2 && (
              <>
                <span className="eyebrow">THE DAY AND THE PLACE</span>
                <h1>When and where<br />is the celebration?</h1>
                <p className="flow-lede">No worries if some details are still coming together.</p>
                <label className="field-label" htmlFor="weddingDate">Wedding date <span>Optional</span></label>
                <input id="weddingDate" className="field-input" name="weddingDate" type="date" value={draft.weddingDate} onChange={change} />
                <label className="field-label" htmlFor="venue">Venue <span>Optional</span></label>
                <input id="venue" className="field-input" name="venue" value={draft.venue} onChange={change} placeholder="The name of your venue" />
                <label className="field-label" htmlFor="city">City or location <span>Optional</span></label>
                <input id="city" className="field-input" name="city" value={draft.city} onChange={change} placeholder="e.g. Lagos, Nigeria" />
              </>
            )}
            {step === 3 && (
              <>
                <span className="eyebrow">A FEELING, NOT A TEMPLATE</span>
                <h1>What should your<br />day feel like?</h1>
                <p className="flow-lede">Choose a starting mood. You can change the details whenever you like.</p>
                {validationError && <p className="flow-error" role="alert">{validationError}</p>}
                <div className="style-options" role="group" aria-label="Choose a wedding style">
                  {styles.map((style, index) => (
                    <button
                      className={`style-option${draft.style === style ? " is-selected" : ""}`}
                      key={style}
                      type="button"
                      aria-pressed={draft.style === style}
                      onClick={() => setDraft((current) => ({ ...current, style }))}
                    >
                      <span className={`style-swatch style-swatch-${index + 1}`} />
                      <span><strong>{style}</strong><small>{["Soft greens, natural light", "Timeless details, clean lines", "Warm tones, golden hour"][index]}</small></span>
                      {draft.style === style && <Check size={17} />}
                    </button>
                  ))}
                </div>
              </>
            )}
            <div className="intake-actions">
              {step > 1 && (
                <button
                  className="button button-quiet"
                  type="button"
                  onClick={() => {
                    const previousStep = step - 1;
                    saveIntakeStep(previousStep);
                    setStep(previousStep);
                  }}
                >
                  <ArrowLeft size={16} /> Back
                </button>
              )}
              <button className="button button-primary pill-btn intake-next-btn" type="submit">
                {step === 3 ? "Create my first draft" : "Continue"} <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </section>
        <aside className="intake-aside">
          <span className="eyebrow"><Sparkles size={13} /> LIVE INVITATION PREVIEW</span>
          <div className="intake-preview-stage">
            <WeddingCard draft={draft} showKnob={false} />
          </div>
          <p className="intake-aside-hint">Your details are saved as you go. You can return and finish whenever you're ready.</p>
        </aside>
      </div>
    </main>
  );
}

export function GeneratedDraft() {
  const navigate = useNavigate();
  const draft = getWeddingDraft();

  useEffect(() => {
    if (!draft?.intakeComplete) return;
    const timer = window.setTimeout(() => navigate("/builder", { replace: true }), 2200);
    return () => window.clearTimeout(timer);
  }, [draft, navigate]);

  if (!draft?.intakeComplete) return <Navigate to="/intake" replace />;

  return (
    <main className="generation-page">
      <div className="guide-lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <header className="generation-header">
        <Brand light />
      </header>
      <div className="generation-content mask-reveal">
        <div className="generation-orbit" aria-hidden="true">
          <span />
          <Leaf size={28} />
        </div>
        <span className="eyebrow"><Sparkles size={13} /> A MOMENT, WHILE WE SET THE SCENE</span>
        <h1>Gathering your<br /><em>little details.</em></h1>
        <p>We're arranging your details into a first-draft invitation. You'll be able to edit it all in the next step.</p>
        <div className="generation-progress" role="progressbar" aria-label="Setting up preview">
          <span />
        </div>
        <small>Your draft will be waiting here when you come back.</small>
      </div>
      <div className="generation-footnote">STARTER PREVIEW / YOUR DETAILS STAY IN THIS BROWSER</div>
    </main>
  );
}

export function Builder() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<WeddingDraft | null>(() => getWeddingDraft());
  const [publishError, setPublishError] = useState("");

  useEffect(() => {
    if (draft) saveWeddingDraft(draft);
  }, [draft]);

  if (!draft?.intakeComplete) return <Navigate to="/intake" replace />;

  const change = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setDraft((current) => current ? { ...current, [name]: value, status: "draft" } : current);
  };

  const beginPublish = () => {
    if (!draft.coupleNames.trim()) {
      setPublishError("Add your names before continuing to publish.");
      return;
    }
    setPublishError("");
    setDraft((current) => current ? { ...current, status: "draft" } : current);
    navigate("/domain");
  };

  return (
    <main className="flow-page builder-page">
      <div className="guide-lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <header className="flow-header builder-header">
        <Brand light />
        <div className="builder-header-right">
          <span className="save-state"><span /> Saved in this browser</span>
          <Link className="button button-small button-glass-pill" to="/dashboard">
            Dashboard
          </Link>
        </div>
      </header>
      <div className="builder-titlebar">
        <div>
          <span className="eyebrow"><Sparkles size={13} /> YOUR WEDDING WEBSITE</span>
          <h1>Shape your story</h1>
        </div>
        <button className="button button-primary pill-btn builder-publish-cta" onClick={beginPublish} type="button">
          Continue to publish <ArrowRight size={16} />
        </button>
      </div>
      <div className="builder-workspace">
        <section className="builder-editor paper-card">
          <div className="editor-heading">
            <span className="editor-icon"><Sparkles size={17} /></span>
            <div>
              <h2>Your details</h2>
              <p>Changes appear in your preview as you type.</p>
            </div>
          </div>
          <label className="field-label" htmlFor="editNames">Names</label>
          <input id="editNames" className="field-input" name="coupleNames" value={draft.coupleNames} onChange={change} required />
          <label className="field-label" htmlFor="editDate">Wedding date</label>
          <input id="editDate" className="field-input" name="weddingDate" type="date" value={draft.weddingDate} onChange={change} />
          <label className="field-label" htmlFor="editVenue">Venue</label>
          <input id="editVenue" className="field-input" name="venue" value={draft.venue} onChange={change} placeholder="Add a venue" />
          <label className="field-label" htmlFor="editCity">Location</label>
          <input id="editCity" className="field-input" name="city" value={draft.city} onChange={change} placeholder="Add a city" />
          <label className="field-label" htmlFor="editStory">Your story</label>
          <textarea id="editStory" className="field-input field-textarea" name="story" value={draft.story} onChange={change} placeholder="A note for your guests" rows={4} />
          <div className="ai-note">
            <Sparkles size={15} />
            <p>AI conversation edits are coming soon. For now, update your details here and watch the preview change.</p>
          </div>
          {publishError && <p className="flow-error" role="alert">{publishError}</p>}
          <button className="button button-primary pill-btn button-full" onClick={beginPublish} type="button">
            Continue to publish <ArrowRight size={16} />
          </button>
        </section>
        <section className="preview-panel paper-card" aria-label="Live wedding website preview">
          <div className="preview-toolbar">
            <span><span className="preview-dot" /> LIVE PREVIEW</span>
            <span>DESKTOP <i>/</i> MOBILE</span>
          </div>
          <div className="preview-canvas">
            <div className="preview-topline">
              <span>WITH LOVE</span>
              <span>{draft.coupleNames ? "SAVE THE DATE" : "OUR WEDDING"}</span>
              <span>DETAILS</span>
            </div>
            <WeddingCard draft={draft} showKnob={false} />
            <div className="preview-below">
              <span>OUR STORY</span>
              <h3>A day to remember,<br />a story to share.</h3>
              <p>{draft.story || "A celebration of love, family, and the beginning of forever."}</p>
            </div>
          </div>
          <p className="preview-disclaimer">Starter preview • Your site is not published yet</p>
        </section>
      </div>
    </main>
  );
}

export function DomainSetup() {
  const navigate = useNavigate();
  const [draft] = useState<WeddingDraft | null>(() => getWeddingDraft());
  const [slug, setSlug] = useState(() => {
    const current = getWeddingDraft();
    if (current?.slug) return current.slug;
    return current?.coupleNames
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "our-wedding";
  });

  if (!draft?.intakeComplete || !draft.coupleNames.trim()) return <Navigate to="/intake" replace />;

  const publish = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const published = { ...draft, slug, status: "published" as const };
    saveWeddingDraft(published);
    navigate("/published");
  };

  return (
    <main className="flow-page domain-page">
      <div className="guide-lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <header className="flow-header">
        <Brand light />
        <Link className="quiet-link quiet-link-light" to="/builder">
          <ArrowLeft size={15} /> Back to your draft
        </Link>
      </header>
      <div className="centered-flow">
        <form className="domain-card paper-card mask-reveal" onSubmit={publish}>
          <span className="eyebrow"><Sparkles size={13} /> ONE LAST LITTLE DETAIL</span>
          <h1>Choose your<br /><em>shareable link.</em></h1>
          <p className="flow-lede">Give your guests one lovely place to find everything about your day.</p>
          <label className="field-label" htmlFor="siteSlug">Your free Velvet Invite link</label>
          <div className="slug-input">
            <span className="slug-prefix">velvetinvite.com/</span>
            <input
              id="siteSlug"
              value={slug}
              onChange={(event) => setSlug(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
              minLength={3}
              maxLength={48}
              required
            />
          </div>
          <p className="domain-help">Letters, numbers, and hyphens. Custom domains aren't available yet.</p>
          <button className="button button-primary pill-btn button-full" type="submit">
            Publish my wedding site <ArrowRight size={16} />
          </button>
          <span className="domain-disclaimer">This creates a local preview link for now. Online publishing will be connected in a later build.</span>
        </form>
      </div>
    </main>
  );
}

export function Published() {
  const navigate = useNavigate();
  const draft = getWeddingDraft();
  const [copyMessage, setCopyMessage] = useState("");

  if (!draft?.intakeComplete || !draft.slug || draft.status !== "published") return <Navigate to="/builder" replace />;

  const href = siteHref(draft.slug);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(href);
      setCopyMessage("Link copied.");
    } catch {
      setCopyMessage("Couldn't copy automatically. Select and copy the link above.");
    }
  };

  return (
    <main className="flow-page published-page">
      <div className="guide-lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <header className="flow-header">
        <Brand light />
        <Link className="quiet-link quiet-link-light" to="/dashboard">
          Go to dashboard <ArrowRight size={15} />
        </Link>
      </header>
      <section className="published-content paper-card mask-reveal">
        <span className="published-check"><Check size={24} /></span>
        <span className="eyebrow"><Sparkles size={13} /> YOUR FIRST DRAFT IS READY</span>
        <h1>Made with love.<br /><em>Ready to share.</em></h1>
        <p>This is a shareable preview in this browser. Online publishing is not connected yet, but your draft is saved here.</p>
        <div className="published-link-card">
          <span>YOUR PREVIEW LINK</span>
          <a href={href} target="_blank" rel="noreferrer">{href}</a>
          <button className="button button-outline pill-btn copy-btn" type="button" onClick={copyLink}>
            <Copy size={14} /> Copy link
          </button>
        </div>
        {copyMessage && <p className="copy-status" role="status">{copyMessage}</p>}
        <div className="published-actions">
          <button className="button button-primary pill-btn" type="button" onClick={() => navigate("/dashboard")}>
            Go to dashboard <ArrowRight size={16} />
          </button>
          <Link className="quiet-link" to="/builder">Keep editing</Link>
        </div>
      </section>
    </main>
  );
}

export function GuestSite() {
  const { slug } = useParams();
  const draft = getWeddingDraft();

  if (!draft?.intakeComplete || draft.slug !== slug || draft.status !== "published") {
    return (
      <main className="guest-missing">
        <Brand light />
        <div className="paper-card missing-card">
          <span className="eyebrow">NOT FOUND</span>
          <h1>This wedding page isn't here yet.</h1>
          <p>The link may have changed, or this preview is stored in another browser.</p>
          <Link className="button button-primary pill-btn" to="/">
            Back to Velvet Invite <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="guest-page">
      <header className="guest-header">
        <Brand />
        <span className="guest-header-pill">YOU'RE INVITED</span>
      </header>
      <div className="guest-invitation paper-card">
        <span className="eyebrow">TOGETHER WITH THEIR FAMILIES</span>
        <h1>{coupleTitle(draft.coupleNames)}</h1>
        <span className="wedding-card-rule" />
        <p className="guest-intro">joyfully invite you to celebrate their wedding</p>
        <p className="guest-date">{dateLabel(draft.weddingDate)}</p>
        {(draft.venue || draft.city) && (
          <p className="guest-venue">{[draft.venue, draft.city].filter(Boolean).join(" / ")}</p>
        )}
      </div>
      {draft.story && (
        <section className="guest-story paper-card">
          <span className="eyebrow">A LITTLE ABOUT US</span>
          <p>{draft.story}</p>
        </section>
      )}
      <footer className="guest-footer">MADE WITH LOVE • VELVET INVITE</footer>
    </main>
  );
}
