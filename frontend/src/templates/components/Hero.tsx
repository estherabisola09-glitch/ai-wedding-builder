import React from "react";
import type { HeroProps } from "../../puck/types";

export const Hero: React.FC<HeroProps> = ({
  variant = "manor",
  eyebrow = "Together with their families",
  coupleNames = "Charlotte & Edward",
  weddingDate = "Saturday, June 19, 2027",
  venue = "Highclere Castle",
  city = "Hampshire, England",
  monogram = "C & E",
  photoUrl,
}) => {
  const locationText = [venue, city].filter(Boolean).join(" • ");

  return (
    <section className={`wb-block wb-variant-${variant} wb-hero-${variant}`}>
      <div className="wb-container">
        {monogram && <div className="wb-monogram-seal">{monogram}</div>}
        {eyebrow && <span className="wb-eyebrow" style={{ marginTop: "16px" }}>{eyebrow}</span>}
        <h1 className="wb-hero-names">{coupleNames}</h1>
        <div className="wb-rule" />
        {weddingDate && <p className="wb-hero-meta">{weddingDate}</p>}
        {locationText && <p className="wb-hero-location">{locationText}</p>}
        {photoUrl && (
          <div className="wb-hero-photo-wrap">
            <img src={photoUrl} alt={coupleNames} className="wb-hero-photo" loading="lazy" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;

