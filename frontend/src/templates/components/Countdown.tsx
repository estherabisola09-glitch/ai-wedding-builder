import React, { useState, useEffect } from "react";
import type { CountdownProps } from "../../puck/types";

export const Countdown: React.FC<CountdownProps> = ({
  variant = "manor",
  targetDate = "2027-06-19",
  title = "Counting Down to Forever",
}) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = isNaN(target) ? 0 : Math.max(0, target - now);

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className={`wb-block wb-variant-${variant} wb-countdown-${variant}`}>
      <div className="wb-container" style={{ padding: "32px 24px" }}>
        {title && <span className="wb-eyebrow">{title}</span>}
        <div className="wb-countdown-grid">
          <div className={`wb-countdown-item-${variant}`}>
            <div className="wb-countdown-num">{timeLeft.days}</div>
            <div className="wb-countdown-label">Days</div>
          </div>
          <div className={`wb-countdown-item-${variant}`}>
            <div className="wb-countdown-num">{timeLeft.hours}</div>
            <div className="wb-countdown-label">Hours</div>
          </div>
          <div className={`wb-countdown-item-${variant}`}>
            <div className="wb-countdown-num">{timeLeft.minutes}</div>
            <div className="wb-countdown-label">Mins</div>
          </div>
          <div className={`wb-countdown-item-${variant}`}>
            <div className="wb-countdown-num">{timeLeft.seconds}</div>
            <div className="wb-countdown-label">Secs</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;

