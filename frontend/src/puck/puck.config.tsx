import type { Config } from "@measured/puck";
import "@measured/puck/dist/index.css";
import "./puck.css";
import type { WeddingComponentProps, RootProps } from "./types";
import Hero from "../templates/components/Hero";
import OurStory from "../templates/components/OurStory";
import EventDetails from "../templates/components/EventDetails";
import RSVP from "../templates/components/RSVP";
import Countdown from "../templates/components/Countdown";
import Gallery from "../templates/components/Gallery";
import Footer from "../templates/components/Footer";

const variantOptions = [
  { label: "Manor Heirloom (Classic & Gold)", value: "manor" },
  { label: "Wedded (Modern Split)", value: "wedded" },
  { label: "Villa Tuscany (Romantic Script)", value: "tuscany" },
  { label: "Big Sur Noir (Minimalist Dark)", value: "noir" },
];

export const weddingPuckConfig: Config<WeddingComponentProps, RootProps> = {
  root: {
    render: ({ children }) => {
      return (
        <div className="velvet-wedding-site" style={{ minHeight: "100vh", width: "100%", background: "#fbfbf8" }}>
          {children}
        </div>
      );
    },
    fields: {
      title: { type: "text", label: "Wedding Title" },
      fontTheme: {
        type: "select",
        label: "Typography Theme",
        options: [
          { label: "Serif Heirloom", value: "serif-heirloom" },
          { label: "Sans Editorial", value: "sans-editorial" },
          { label: "Romantic Script", value: "romantic-script" },
          { label: "Noir Modern", value: "noir-modern" },
        ],
      },
    },
  },
  components: {
    Hero: {
      render: (props) => <Hero {...props} />,
      fields: {
        variant: { type: "select", label: "Visual Style", options: variantOptions },
        monogram: { type: "text", label: "Monogram (e.g. C & E)" },
        eyebrow: { type: "text", label: "Eyebrow / Intro text" },
        coupleNames: { type: "text", label: "Couple Names" },
        weddingDate: { type: "text", label: "Date text" },
        venue: { type: "text", label: "Venue name" },
        city: { type: "text", label: "City / Location" },
        photoUrl: { type: "text", label: "Hero Photo URL (optional)" },
      },
    },

    OurStory: {
      render: (props) => <OurStory {...props} />,
      fields: {
        variant: { type: "select", label: "Visual Style", options: variantOptions },
        eyebrow: { type: "text", label: "Eyebrow" },
        title: { type: "text", label: "Section Title" },
        story: { type: "textarea", label: "Story Narrative" },
        quote: { type: "text", label: "Featured Quote" },
        photoUrl: { type: "text", label: "Story Photo URL (optional)" },
      },
    },

    EventDetails: {
      render: (props) => <EventDetails {...props} />,
      fields: {
        variant: { type: "select", label: "Visual Style", options: variantOptions },
        eyebrow: { type: "text", label: "Eyebrow" },
        title: { type: "text", label: "Section Title" },
        events: {
          type: "array",
          label: "Events Schedule",
          getItemSummary: (item) => item.name || "Event",
          arrayFields: {
            name: { type: "text", label: "Event Name" },
            time: { type: "text", label: "Time" },
            location: { type: "text", label: "Location" },
            description: { type: "textarea", label: "Description" },
          },
        },
      },
    },

    RSVP: {
      render: (props) => <RSVP {...props} />,
      fields: {
        variant: { type: "select", label: "Visual Style", options: variantOptions },
        eyebrow: { type: "text", label: "Eyebrow" },
        title: { type: "text", label: "Title" },
        subtitle: { type: "text", label: "Subtitle" },
        deadline: { type: "text", label: "RSVP Deadline" },
        buttonText: { type: "text", label: "Button Label" },
      },
    },

    Countdown: {
      render: (props) => <Countdown {...props} />,
      fields: {
        variant: { type: "select", label: "Visual Style", options: variantOptions },
        title: { type: "text", label: "Title" },
        targetDate: { type: "text", label: "Target Date (YYYY-MM-DD)" },
      },
    },

    Gallery: {
      render: (props) => <Gallery {...props} />,
      fields: {
        variant: { type: "select", label: "Visual Style", options: variantOptions },
        eyebrow: { type: "text", label: "Eyebrow" },
        title: { type: "text", label: "Section Title" },
        photos: {
          type: "array",
          label: "Gallery Photos",
          getItemSummary: (item) => item.caption || item.url || "Photo",
          arrayFields: {
            url: { type: "text", label: "Image URL" },
            caption: { type: "text", label: "Caption (optional)" },
          },
        },
      },
    },

    Footer: {
      render: (props) => <Footer {...props} />,
      fields: {
        variant: { type: "select", label: "Visual Style", options: variantOptions },
        monogram: { type: "text", label: "Monogram Seal" },
        message: { type: "text", label: "Closing Message" },
        subtext: { type: "text", label: "Subtext / Credits" },
      },
    },
  },
};

export default weddingPuckConfig;
