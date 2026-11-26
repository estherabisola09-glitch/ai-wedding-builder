import React from "react";
import type { OurStoryProps } from "../../puck/types";

export const OurStory: React.FC<OurStoryProps> = ({
  variant = "manor",
  eyebrow = "Our Journey",
  title = "How It All Began",
  story = "From a chance encounter on a rainy autumn afternoon to thousands of shared cups of coffee and adventures across the globe, we knew early on that we wanted to build a lifetime of memories together.",
  quote,
  photoUrl,
}) => {
  return (
    <section className={`wb-block wb-variant-${variant} wb-story-${variant}`}>
      <div className="wb-container">
        {eyebrow && <span className="wb-eyebrow">{eyebrow}</span>}
        {title && <h2>{title}</h2>}
        <div className="wb-rule" />
        {story && <p className="wb-story-body">{story}</p>}
        {quote && <blockquote className="wb-story-quote">"{quote}"</blockquote>}
        {photoUrl && (
          <div style={{ marginTop: "32px" }}>
            <img src={photoUrl} alt="Our Story" style={{ maxWidth: "100%", borderRadius: "4px" }} loading="lazy" />
          </div>
        )}
      </div>
    </section>
  );
};

export default OurStory;

