import type { WeddingPuckData } from "../../puck/types";

interface IntakeDetails {
  coupleNames?: string;
  weddingDate?: string;
  venue?: string;
  city?: string;
  story?: string;
}

function computeMonogram(names?: string): string {
  if (!names) return "C & E";
  const parts = names.split(/&|and|\+/i).map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const first = parts[0][0] || "";
    const second = parts[1][0] || "";
    return `${first} & ${second}`.toUpperCase();
  }
  return names.slice(0, 3).toUpperCase();
}

function formatDateDisplay(dateStr?: string): string {
  if (!dateStr) return "Saturday, June 19, 2027";
  try {
    const d = new Date(`${dateStr}T12:00:00`);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function createManorHeirloomPreset(intake: IntakeDetails = {}): WeddingPuckData {
  const couple = intake.coupleNames?.trim() || "Charlotte & Edward";
  const dateDisplay = formatDateDisplay(intake.weddingDate);
  const targetDate = intake.weddingDate || "2027-06-19";
  const venue = intake.venue?.trim() || "Highclere Castle";
  const city = intake.city?.trim() || "Hampshire, England";
  const monogram = computeMonogram(couple);
  const storyText =
    intake.story?.trim() ||
    "Two lives, one shared journey. Surrounded by our families and dearest friends, we gather in celebrated elegance to exchange vows and begin our next great adventure.";

  return {
    root: {
      props: {
        title: `${couple} — Wedding Celebration`,
        fontTheme: "serif-heirloom",
      },
    },
    content: [
      {
        type: "Hero",
        props: {
          id: "hero-1",
          variant: "manor",
          eyebrow: "Together with their families",
          coupleNames: couple,
          weddingDate: dateDisplay,
          venue,
          city,
          monogram,
          photoUrl: "/images/wedding-venue-1.jpg",
        },
      },
      {
        type: "OurStory",
        props: {
          id: "story-1",
          variant: "manor",
          eyebrow: "Our Heritage & Story",
          title: "A Timeless Beginning",
          story: storyText,
          quote: "Whatever our souls are made of, his and mine are the same.",
        },
      },
      {
        type: "EventDetails",
        props: {
          id: "events-1",
          variant: "manor",
          eyebrow: "The Order of the Day",
          title: "Schedule of Celebrations",
          events: [
            {
              name: "The Holy Matrimony",
              time: "2:30 PM",
              location: `${venue} Chapel`,
              description: "Please arrive fifteen minutes prior. Formal black tie attire requested.",
            },
            {
              name: "Champagne & Lawn Reception",
              time: "4:00 PM",
              location: "The North Terrace Parterre",
              description: "Artisanal canapés, string quartet melodies, and chilled vintage champagne.",
            },
            {
              name: "The Wedding Banquet",
              time: "6:30 PM",
              location: "The Great Dining Hall",
              description: "A seasonal culinary celebration, heartfelt speeches, and music until midnight.",
            },
          ],
        },
      },
      {
        type: "Countdown",
        props: {
          id: "countdown-1",
          variant: "manor",
          title: "Until We Say I Do",
          targetDate,
        },
      },
      {
        type: "Gallery",
        props: {
          id: "gallery-1",
          variant: "manor",
          eyebrow: "Treasured Moments",
          title: "The Estate & Memories",
          photos: [
            { url: "/images/wedding-venue-1.jpg", caption: "The Manor Gardens" },
            { url: "/images/wedding-venue-2.jpg", caption: "The Grand Library" },
            { url: "/images/wedding-venue-3.jpg", caption: "Evening Candlelight" },
          ],
        },
      },
      {
        type: "RSVP",
        props: {
          id: "rsvp-1",
          variant: "manor",
          eyebrow: "Formal Invitation",
          title: "Kindly Honour Us With Your Presence",
          subtitle: "Please confirm your attendance for the day and evening festivities.",
          deadline: "May 1st, 2027",
          buttonText: "Send Your RSVP",
        },
      },
      {
        type: "Footer",
        props: {
          id: "footer-1",
          variant: "manor",
          monogram,
          message: "We look forward to raising a glass with you.",
          subtext: `${venue} • ${dateDisplay}`,
        },
      },
    ],
    zones: {},
  };
}

export default createManorHeirloomPreset;

