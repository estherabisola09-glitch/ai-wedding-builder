import { useEffect, useState } from "react";

interface RingHeroProps {
  className?: string;
  size?: "hero" | "auth";
}

export default function RingHero({ className = "", size = "hero" }: RingHeroProps) {
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    // Check for reduced motion and screen width < 900px
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 900;
    setCanAnimate(!prefersReduced && !isMobile);

    const handleResize = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setCanAnimate(!reduced && window.innerWidth >= 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isHero = size === "hero";

  return (
    <div
      className={`ring-hero-container ${isHero ? "ring-hero--lg" : "ring-hero--sm"} ${
        canAnimate ? "ring-hero--animated par" : "ring-hero--still"
      } ${className}`}
      style={{
        // Parallax depth tunables matching Sylva spec
        "--pd": isHero ? 16 : 8,
        "--pr": isHero ? 1.8 : 0.8,
      } as React.CSSProperties}
      aria-hidden="true"
    >
      {/* Soft pale background light pool */}
      <div className="ring-hero-glow" />

      {/* Floating container */}
      <div className="ring-hero-float">
        <img
          src="/images/ring.webp"
          alt="Velvet Invite diamond ring"
          className="ring-hero-image"
          loading="eager"
          decoding="async"
        />

        {/* Twinkling sparkle accents over the diamond crown */}
        <div className="ring-sparkle ring-sparkle-1" style={{ top: "34%", left: "48%" }}>
          <SparkleIcon size={18} />
        </div>
        <div className="ring-sparkle ring-sparkle-2" style={{ top: "39%", left: "42%" }}>
          <SparkleIcon size={14} />
        </div>
        <div className="ring-sparkle ring-sparkle-3" style={{ top: "33%", left: "56%" }}>
          <SparkleIcon size={20} />
        </div>
        <div className="ring-sparkle ring-sparkle-4" style={{ top: "45%", left: "53%" }}>
          <SparkleIcon size={12} />
        </div>
      </div>
    </div>
  );
}

function SparkleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="sparkle-svg"
    >
      <path
        d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z"
        fill="#fdfefb"
      />
    </svg>
  );
}
