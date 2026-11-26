import React, { useState } from "react";
import type { RSVPProps } from "../../puck/types";

export const RSVP: React.FC<RSVPProps> = ({
  variant = "manor",
  eyebrow = "Kindly Respond",
  title = "RSVP",
  subtitle = "Please let us know if you will celebrate with us by the date below.",
  deadline = "May 1, 2027",
  buttonText = "Send RSVP",
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState<"attending" | "regret">("attending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className={`wb-block wb-variant-${variant} wb-rsvp-${variant}`}>
      <div className="wb-container">
        {eyebrow && <span className="wb-eyebrow">{eyebrow}</span>}
        {title && <h2>{title}</h2>}
        <div className="wb-rule" />
        {subtitle && <p className="wb-rsvp-sub">{subtitle}</p>}
        {deadline && <div className="wb-rsvp-deadline">Kindly reply by {deadline}</div>}

        {submitted ? (
          <div style={{ padding: "24px", background: "rgba(150, 125, 88, 0.1)", borderRadius: "6px", maxWidth: "440px", margin: "0 auto" }}>
            <p style={{ fontWeight: 600, color: "#171914" }}>Thank you, {guestName}!</p>
            <p style={{ fontSize: "14px", marginTop: "4px", color: "#63685e" }}>
              {attendance === "attending"
                ? "Your response has been recorded. We can't wait to celebrate with you!"
                : "Thank you for letting us know. You will be missed dearly."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ maxWidth: "440px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
            <input
              type="text"
              placeholder="Your Full Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid rgba(150, 125, 88, 0.3)",
                background: "#ffffff",
                fontFamily: "inherit",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", fontSize: "14px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="attending"
                  checked={attendance === "attending"}
                  onChange={() => setAttendance("attending")}
                />
                Joyfully Accepts
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="attending"
                  checked={attendance === "regret"}
                  onChange={() => setAttendance("regret")}
                />
                Regretfully Declines
              </label>
            </div>
            <button type="submit" className={`wb-rsvp-btn-${variant}`}>
              {buttonText}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default RSVP;

