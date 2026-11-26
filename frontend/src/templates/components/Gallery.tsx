import React from "react";
import type { GalleryProps } from "../../puck/types";

export const Gallery: React.FC<GalleryProps> = ({
  variant = "manor",
  eyebrow = "Moments Captured",
  title = "Our Gallery",
  photos = [
    { url: "/images/wedding-venue-1.jpg", caption: "The Grounds" },
    { url: "/images/wedding-venue-2.jpg", caption: "The Chapel" },
    { url: "/images/wedding-venue-3.jpg", caption: "Sunset Ballroom" },
  ],
}) => {
  return (
    <section className={`wb-block wb-variant-${variant} wb-gallery-${variant}`}>
      <div className="wb-container">
        {eyebrow && <span className="wb-eyebrow">{eyebrow}</span>}
        {title && <h2>{title}</h2>}
        <div className="wb-rule" />
        <div className="wb-gallery-grid">
          {photos.map((photo, idx) => (
            <div key={idx} className={`wb-gallery-card-${variant}`}>
              <img src={photo.url} alt={photo.caption || `Gallery photo ${idx + 1}`} className="wb-gallery-img" loading="lazy" />
              {photo.caption && <p className="wb-gallery-caption">{photo.caption}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

