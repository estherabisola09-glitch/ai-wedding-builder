import type { Data } from "@measured/puck";

export type VisualVariant = "manor" | "wedded" | "tuscany" | "noir";

export interface ScheduleEvent {
  name: string;
  time: string;
  location: string;
  description: string;
}

export interface GalleryPhoto {
  url: string;
  caption?: string;
}

export interface RootProps {
  title?: string;
  fontTheme?: "serif-heirloom" | "sans-editorial" | "romantic-script" | "noir-modern";
  themeColor?: string;
}

export interface HeroProps {
  variant: VisualVariant;
  eyebrow: string;
  coupleNames: string;
  weddingDate: string;
  venue: string;
  city: string;
  monogram: string;
  photoUrl?: string;
}

export interface OurStoryProps {
  variant: VisualVariant;
  eyebrow: string;
  title: string;
  story: string;
  quote?: string;
  photoUrl?: string;
}

export interface EventDetailsProps {
  variant: VisualVariant;
  eyebrow: string;
  title: string;
  events: ScheduleEvent[];
}

export interface RSVPProps {
  variant: VisualVariant;
  eyebrow: string;
  title: string;
  subtitle: string;
  deadline: string;
  buttonText: string;
}

export interface CountdownProps {
  variant: VisualVariant;
  targetDate: string;
  title: string;
}

export interface GalleryProps {
  variant: VisualVariant;
  eyebrow: string;
  title: string;
  photos: GalleryPhoto[];
}

export interface FooterProps {
  variant: VisualVariant;
  monogram: string;
  message: string;
  subtext: string;
}

export type WeddingComponentProps = {
  Hero: HeroProps;
  OurStory: OurStoryProps;
  EventDetails: EventDetailsProps;
  RSVP: RSVPProps;
  Countdown: CountdownProps;
  Gallery: GalleryProps;
  Footer: FooterProps;
};

export type WeddingPuckData = Data<WeddingComponentProps, RootProps>;

