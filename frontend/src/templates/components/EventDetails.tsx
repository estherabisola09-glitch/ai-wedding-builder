import React from "react";
import type { EventDetailsProps } from "../../puck/types";

export const EventDetails: React.FC<EventDetailsProps> = ({
  variant = "manor",
  eyebrow = "Schedule of Events",
  title = "The Celebration",
  events = [
    {
      name: "The Ceremony",
      time: "3:00 PM",
      location: "The Grand Library & Chapel",
      description: "Exchange of vows followed by a celebratory champagne toast.",
    },
    {
      name: "Cocktail Reception",
      time: "4:30 PM",
      location: "The South Terrace Gardens",
      description: "Acoustic strings, artisanal cocktails, and seasonal hors d'oeuvres.",
    },
    {
      name: "Dinner & Dancing",
      time: "6:30 PM",
      location: "The Grand Ballroom",
      description: "A four-course candlelit dinner, heartfelt toasts, and live music into the night.",
    },
  ],
}) => {
  return (
    <section className={`wb-block wb-variant-${variant} wb-events-${variant}`}>
      <div className="wb-container">
        {eyebrow && <span className="wb-eyebrow">{eyebrow}</span>}
        {title && <h2>{title}</h2>}
        <div className="wb-rule" />
        <div className="wb-events-grid">
          {events.map((event, idx) => (
            <div key={idx} className={`wb-event-card-${variant}`}>
              <div className="wb-event-name">{event.name}</div>
              <div className="wb-event-time">{event.time}</div>
              <div className="wb-event-location">{event.location}</div>
              <div className="wb-event-desc">{event.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;

