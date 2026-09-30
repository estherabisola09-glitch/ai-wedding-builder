import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  Leaf,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  emptyWeddingDraft,
  getIntakeStep,
  getWeddingDraft,
  saveIntakeStep,
  saveWeddingDraft,
  type WeddingDraft,
} from "../weddingDraft";

const styles = ["Garden romance", "Modern heirloom", "Sunset celebration"];

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand${light ? " brand-light" : ""}`} to="/" aria-label="Velvet Invite home">
      <span className="brand-mark"><Leaf size={18} aria-hidden="true" /></span>
      <span>velvet invite</span>
    </Link>
  );
}

function dateLabel(date: string): string {
  if (!date) return "The day we say I do";
  return new Date(`${date}T12:00:00`).toLocaleDateString("en", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function coupleTitle(names: string): string {
  return names.trim() || "Your names";
}

function siteHref(slug: string): string {
  return `${window.location.origin}/sites/${slug}`;
}

export function WeddingCard({ draft }: { draft: WeddingDraft }) {
  const styleKey = draft.style.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="wedding-card" data-style={styleKey}>
      <div className="wedding-card-art" aria-hidden="true">
        <span className="art-sun" />
        <span className="art-stem art-stem-one" />
        <span className="art-stem art-stem-two" />
        <span className="art-leaf art-leaf-one" />
        <span className="art-leaf art-leaf-two" />
        <span className="art-leaf art-leaf-three" />
      </div>
      <div className="wedding-card-copy">
        <span className="eyebrow">TOGETHER WITH THEIR FAMILIES</span>
        <h2>{coupleTitle(draft.coupleNames)}</h2>
        <span className="wedding-card-rule" />
        <p>{dateLabel(draft.weddingDate)}</p>
        {(draft.venue || draft.city) && (
          <p className="wedding-card-place">{[draft.venue, draft.city].filter(Boolean).join(" / ")}</p>
        )}
        <span className="wedding-card-invite">joyfully invite you to celebrate</span>
      </div>
    </div>
  );
}

export function Landing() {
  return (
    <main className="landing-page">
      <header className="site-header">
        <Brand light />
        <nav aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <Link className="header-login" to="/login">Log in <ChevronRight size={15} /></Link>
        </nav>
      </header>
      <section className="landing-hero">
        <div className="landing-copy">
          <span className="eyebrow landing-eyebrow"><Sparkles size={14} /> MADE FOR YOUR KIND OF LOVE</span>
          <h1>Your day.<br />Your story.<br /><em>Beautifully told.</em></h1>
          <p className="landing-description">
            A wedding website that feels like you. Share the details, the little moments, and the joy of bringing everyone together.
          </p>
          <Link className="button button-primary" to="/signup">
            Start building your wedding site <ArrowRight size={17} />
          </Link>
          <div className="landing-note"><LockKeyhole size={13} /> A lovely first draft, in just a few minutes</div>
        </div>
        <div className="landing-art" aria-label="A preview of a wedding invitation">
          <div className="landing-art-glow" />
          <div className="landing-stamp">MADE<br />WITH<br />LOVE</div>
          <WeddingCard draft={emptyWeddingDraft} />
          <div className="landing-art-caption"><span /> YOUR STORY, IN ONE PLACE</div>
        </div>
      </section>
      <section className="landing-bottom" id="how-it-works">
        <div><span>01</span><p>Tell us the little details</p></div>
        <div><span>02</span><p>Make it feel like you</p></div>
        <div><span>03</span><p>Share the joy with everyone</p></div>
      </section>
      <footer className="landing-footer"><Brand light /><span>A little more love in every detail.</span></footer>
    </main>
  );
}

export function Intake() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<WeddingDraft>(() => getWeddingDraft() ?? emptyWeddingDraft);
  const [step, setStep] = useState(getIntakeStep);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    saveWeddingDraft(draft);
  }, [draft]);

  const change = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
    if (name === "coupleNames" && value.trim()) setValidationError("");
  };

  const next = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === 3 && !draft.coupleNames.trim()) {
      setValidationError("Please add both names before creating your wedding website.");
      saveIntakeStep(1);
      setStep(1);
      return;
    }
    saveWeddingDraft(draft);
    if (step < 3) {
      const nextStep = step + 1;
      saveIntakeStep(nextStep);
      setStep(nextStep);
      return;
    }
    saveWeddingDraft({ ...draft, intakeComplete: true });
    saveIntakeStep(3);
    navigate("/generating");
  };

  return (
    <main className="flow-page">
      <header className="flow-header">
        <Brand />
        <Link className="quiet-link" to="/dashboard">Save and come back later <ArrowRight size={15} /></Link>
      </header>
      <div className="intake-layout">
        <section className="intake-main">
          <div className="intake-progress-copy"><span>LET'S MAKE IT YOURS</span><span>0{step} <i /> 03</span></div>
          <div className="progress-track"><span style={{ width: `${step / 3 * 100}%` }} /></div>
          <form className="intake-form" onSubmit={next}>
            {step === 1 && (
              <>
                <span className="eyebrow">FIRST, THE TWO OF YOU</span>
                <h1>What should we<br />call your story?</h1>
                <p className="flow-lede">Let's start with the names your favourite people know and love.</p>
                <label className="field-label" htmlFor="coupleNames">Your names <span>Required</span></label>
                <input id="coupleNames" className="field-input" name="coupleNames" value={draft.coupleNames} onChange={change} placeholder="e.g. Adaeze & Tunde" required autoFocus />
                <label className="field-label" htmlFor="story">A little about you <span>Optional</span></label>
                <textarea id="story" className="field-input field-textarea" name="story" value={draft.story} onChange={change} placeholder="How did you meet? What makes your story yours?" rows={3} />
              </>
            )}
            {step === 2 && (
              <>
                <span className="eyebrow">THE DAY AND THE PLACE</span>
                <h1>When and where<br />is the celebration?</h1>
                <p className="flow-lede">No worries if some details are still coming together.</p>
                <label className="field-label" htmlFor="weddingDate">Wedding date <span>Optional</span></label>
                <input id="weddingDate" className="field-input" name="weddingDate" type="date" value={draft.weddingDate} onChange={change} />
                <label className="field-label" htmlFor="venue">Venue <span>Optional</span></label>
                <input id="venue" className="field-input" name="venue" value={draft.venue} onChange={change} placeholder="The name of your venue" />
                <label className="field-label" htmlFor="city">City or location <span>Optional</span></label>
                <input id="city" className="field-input" name="city" value={draft.city} onChange={change} placeholder="e.g. Lagos, Nigeria" />
              </>
            )}
            {step === 3 && (
              <>
                <span className="eyebrow">A FEELING, NOT A TEMPLATE</span>
                <h1>What should your<br />day feel like?</h1>
                <p className="flow-lede">Choose a starting mood. You can change the details whenever you like.</p>
                {validationError && <p className="flow-error" role="alert">{validationError}</p>}
                <div className="style-options" role="group" aria-label="Choose a wedding style">
                  {styles.map((style, index) => (
                    <button
                      className={`style-option${draft.style === style ? " is-selected" : ""}`}
                      key={style}
                      type="button"
                      aria-pressed={draft.style === style}
                      onClick={() => setDraft((current) => ({ ...current, style }))}
                    >
                      <span className={`style-swatch style-swatch-${index + 1}`} />
                      <span><strong>{style}</strong><small>{["Soft greens, natural light", "Timeless details, clean lines", "Warm tones, golden hour"][index]}</small></span>
                      {draft.style === style && <Check size={17} />}
                    </button>
                  ))}
                </div>
              </>
            )}
            <div className="intake-actions">
              {step > 1 && <button className="button button-quiet" type="button" onClick={() => { const previousStep = step - 1; saveIntakeStep(previousStep); setStep(previousStep); }}><ArrowLeft size={16} /> Back</button>}
              <button className="button button-primary" type="submit">
                {step === 3 ? "Create my first draft" : "Continue"} <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </section>
        <aside className="intake-aside">
          <span className="eyebrow">A LITTLE PREVIEW</span>
          <WeddingCard draft={draft} />
          <p>Your details are saved as you go. You can return and finish whenever you're ready.</p>
        </aside>
      </div>
    </main>
  );
}

export function GeneratedDraft() {
  const navigate = useNavigate();
  const draft = getWeddingDraft();

  useEffect(() => {
    if (!draft?.intakeComplete) return;
    const timer = window.setTimeout(() => navigate("/builder", { replace: true }), 2200);
    return () => window.clearTimeout(timer);
  }, [draft, navigate]);

  if (!draft?.intakeComplete) return <Navigate to="/intake" replace />;

  return (
    <main className="generation-page">
      <Brand light />
      <div className="generation-content">
        <div className="generation-orbit"><span /><Leaf size={28} aria-hidden="true" /></div>
        <span className="eyebrow">A MOMENT, WHILE WE SET THE SCENE</span>
        <h1>Gathering your<br /><em>little details.</em></h1>
        <p>We're arranging your details into a first-draft invitation. You'll be able to edit it all in the next step.</p>
        <div className="generation-progress"><span /></div>
        <small>Your draft will be waiting here when you come back.</small>
      </div>
      <div className="generation-footnote">STARTER PREVIEW / YOUR DETAILS STAY IN THIS BROWSER</div>
    </main>
  );
}

export function Builder() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<WeddingDraft | null>(() => getWeddingDraft());
  const [publishError, setPublishError] = useState("");

  useEffect(() => {
    if (draft) saveWeddingDraft(draft);
  }, [draft]);

  if (!draft?.intakeComplete) return <Navigate to="/intake" replace />;

  const change = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setDraft((current) => current ? { ...current, [name]: value, status: "draft" } : current);
  };

  const beginPublish = () => {
    if (!draft.coupleNames.trim()) {
      setPublishError("Add your names before continuing to publish.");
      return;
    }
    setPublishError("");
    setDraft((current) => current ? { ...current, status: "draft" } : current);
    navigate("/domain");
  };

  return (
    <main className="builder-page">
      <header className="builder-header">
        <Brand />
        <div className="builder-header-right"><span className="save-state"><span /> Saved in this browser</span><Link className="button button-small button-outline" to="/dashboard">Dashboard</Link></div>
      </header>
      <div className="builder-titlebar">
        <div><span className="eyebrow">YOUR WEDDING WEBSITE</span><h1>Shape your story</h1></div>
        <button className="button button-primary" onClick={beginPublish} type="button">Continue to publish <ArrowRight size={16} /></button>
      </div>
      <div className="builder-workspace">
        <section className="builder-editor">
          <div className="editor-heading"><span className="editor-icon"><Sparkles size={17} /></span><div><h2>Your details</h2><p>Changes appear in your preview as you type.</p></div></div>
          <label className="field-label" htmlFor="editNames">Names</label>
          <input id="editNames" className="field-input" name="coupleNames" value={draft.coupleNames} onChange={change} required />
          <label className="field-label" htmlFor="editDate">Wedding date</label>
          <input id="editDate" className="field-input" name="weddingDate" type="date" value={draft.weddingDate} onChange={change} />
          <label className="field-label" htmlFor="editVenue">Venue</label>
          <input id="editVenue" className="field-input" name="venue" value={draft.venue} onChange={change} placeholder="Add a venue" />
          <label className="field-label" htmlFor="editCity">Location</label>
          <input id="editCity" className="field-input" name="city" value={draft.city} onChange={change} placeholder="Add a city" />
          <label className="field-label" htmlFor="editStory">Your story</label>
          <textarea id="editStory" className="field-input field-textarea" name="story" value={draft.story} onChange={change} placeholder="A note for your guests" rows={4} />
          <div className="ai-note"><Sparkles size={15} /><p>AI conversation edits are coming soon. For now, update your details here and watch the preview change.</p></div>
          {publishError && <p className="flow-error" role="alert">{publishError}</p>}
          <button className="button button-primary button-full" onClick={beginPublish} type="button">Continue to publish <ArrowRight size={16} /></button>
        </section>
        <section className="preview-panel" aria-label="Live wedding website preview">
          <div className="preview-toolbar"><span><span className="preview-dot" /> LIVE PREVIEW</span><span>DESKTOP <i /> MOBILE</span></div>
          <div className="preview-canvas">
            <div className="preview-topline"><span>WITH LOVE,</span><span>{draft.coupleNames ? "SAVE THE DATE" : "OUR WEDDING"}</span><span>DETAILS</span></div>
            <WeddingCard draft={draft} />
            <div className="preview-below"><span>OUR STORY</span><h3>A day to remember,<br />a story to share.</h3><p>{draft.story || "A celebration of love, family, and the beginning of forever."}</p></div>
          </div>
          <p className="preview-disclaimer">Starter preview / Your site is not published yet</p>
        </section>
      </div>
    </main>
  );
}

export function DomainSetup() {
  const navigate = useNavigate();
  const [draft] = useState<WeddingDraft | null>(() => getWeddingDraft());
  const [slug, setSlug] = useState(() => {
    const current = getWeddingDraft();
    if (current?.slug) return current.slug;
    return current?.coupleNames
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "our-wedding";
  });

  if (!draft?.intakeComplete || !draft.coupleNames.trim()) return <Navigate to="/intake" replace />;

  const publish = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const published = { ...draft, slug, status: "published" as const };
    saveWeddingDraft(published);
    navigate("/published");
  };

  return (
    <main className="flow-page">
      <header className="flow-header"><Brand /><Link className="quiet-link" to="/builder"><ArrowLeft size={15} /> Back to your draft</Link></header>
      <div className="centered-flow">
        <span className="eyebrow">ONE LAST LITTLE DETAIL</span>
        <h1>Choose your<br /><em>shareable link.</em></h1>
        <p className="flow-lede">Give your guests one lovely place to find everything about your day.</p>
        <form className="domain-card" onSubmit={publish}>
          <label className="field-label" htmlFor="siteSlug">Your free Velvet Invite link</label>
          <div className="slug-input"><span>velvetinvite.com/</span><input id="siteSlug" value={slug} onChange={(event) => setSlug(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} minLength={3} maxLength={48} required /></div>
          <p className="domain-help">Letters, numbers, and hyphens. Custom domains aren't available yet.</p>
          <button className="button button-primary button-full" type="submit">Publish my wedding site <ArrowRight size={16} /></button>
          <span className="domain-disclaimer">This creates a local preview link for now. Online publishing will be connected in a later build.</span>
        </form>
      </div>
    </main>
  );
}

export function Published() {
  const navigate = useNavigate();
  const draft = getWeddingDraft();
  const [copyMessage, setCopyMessage] = useState("");

  if (!draft?.intakeComplete || !draft.slug || draft.status !== "published") return <Navigate to="/builder" replace />;

  const href = siteHref(draft.slug);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(href);
      setCopyMessage("Link copied.");
    } catch {
      setCopyMessage("Couldn't copy automatically. Select and copy the link above.");
    }
  };

  return (
    <main className="flow-page">
      <header className="flow-header"><Brand /><Link className="quiet-link" to="/dashboard">Go to dashboard <ArrowRight size={15} /></Link></header>
      <section className="published-content">
        <span className="published-check"><Check size={23} /></span>
        <span className="eyebrow">YOUR FIRST DRAFT IS READY</span>
        <h1>Made with love.<br /><em>Ready to share.</em></h1>
        <p>This is a shareable preview in this browser. Online publishing is not connected yet, but your draft is saved here.</p>
        <div className="published-link-card"><span>YOUR PREVIEW LINK</span><a href={href}>{href}</a><button className="button button-outline" type="button" onClick={copyLink}><Copy size={15} /> Copy link</button></div>
        {copyMessage && <p className="copy-status" role="status">{copyMessage}</p>}
        <div className="published-actions"><button className="button button-primary" type="button" onClick={() => navigate("/dashboard")}>Go to dashboard <ArrowRight size={16} /></button><Link className="quiet-link" to="/builder">Keep editing</Link></div>
      </section>
    </main>
  );
}

export function GuestSite() {
  const { slug } = useParams();
  const draft = getWeddingDraft();

  if (!draft?.intakeComplete || draft.slug !== slug || draft.status !== "published") {
    return <main className="guest-missing"><Brand /><div><span className="eyebrow">NOT FOUND</span><h1>This wedding page isn't here yet.</h1><p>The link may have changed, or this preview is stored in another browser.</p><Link className="button button-primary" to="/">Back to Velvet Invite <ArrowRight size={16} /></Link></div></main>;
  }

  return (
    <main className="guest-page">
      <header className="guest-header"><Brand /><span>YOU'RE INVITED</span></header>
      <div className="guest-invitation">
        <span className="eyebrow">TOGETHER WITH THEIR FAMILIES</span>
        <h1>{coupleTitle(draft.coupleNames)}</h1>
        <span className="wedding-card-rule" />
        <p className="guest-intro">joyfully invite you to celebrate their wedding</p>
        <p className="guest-date">{dateLabel(draft.weddingDate)}</p>
        {(draft.venue || draft.city) && <p className="guest-venue">{[draft.venue, draft.city].filter(Boolean).join(" / ")}</p>}
      </div>
      {draft.story && <section className="guest-story"><span className="eyebrow">A LITTLE ABOUT US</span><p>{draft.story}</p></section>}
      <footer className="guest-footer">MADE WITH LOVE / VELVET INVITE</footer>
    </main>
  );
}
