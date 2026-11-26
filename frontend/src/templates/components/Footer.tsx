import React from "react";
import type { FooterProps } from "../../puck/types";

export const Footer: React.FC<FooterProps> = ({
  variant = "manor",
  monogram = "C & E",
  message = "With all our love, thank you for being part of our story.",
  subtext = "Highclere Castle • June 19, 2027",
}) => {
  return (
    <footer className={`wb-block wb-variant-${variant} wb-footer-${variant}`}>
      <div className="wb-container" style={{ padding: "32px 24px" }}>
        {monogram && <div className="wb-monogram-seal">{monogram}</div>}
        {message && <p className="wb-footer-msg">{message}</p>}
        {subtext && <p className="wb-footer-sub">{subtext}</p>}
      </div>
    </footer>
  );
};

export default Footer;

