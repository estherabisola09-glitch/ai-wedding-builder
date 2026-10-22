import { ArrowRight, Check, ChevronRight, Leaf, LockKeyhole, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getWeddingDraft } from "../weddingDraft";
import { Brand, WeddingCard } from "./WeddingFlow";

function dateLabel(date: string): string {
  if (!date) return "Add your date whenever you're ready.";
  return new Date(`${date}T12:00:00`).toLocaleDateString("en", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [draft] = useState(() => getWeddingDraft());
  const hasWeddingDetails = Boolean(draft?.coupleNames.trim());
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="dashboard-page">
      <div className="guide-lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <header className="flow-header dashboard-header">
        <Brand light />
        <button className="quiet-link quiet-link-light" onClick={handleLogout} type="button">
          Log out
        </button>
      </header>
      <section className="dashboard-welcome">
        <span className="eyebrow"><Sparkles size={13} /> YOUR LITTLE CORNER</span>
        <h1>Welcome back{draft?.coupleNames ? `, ${draft.coupleNames.split("&")[0].trim()}` : ""}.</h1>
        <p>All the details of your day, gathered in one place.</p>
      </section>
      <section className="dashboard-content paper-card mask-reveal">
        <div className="dashboard-section-title">
          <div>
            <span className="eyebrow"><Sparkles size={13} /> YOUR WEDDING</span>
            <h2>{draft?.coupleNames || "Your story starts here"}</h2>
          </div>
          <span className={`status-pill${draft?.status === "published" && draft.intakeComplete ? " status-live" : ""}`}>
            <span />
            {draft?.status === "published" && draft.intakeComplete
              ? "Preview published"
              : draft?.intakeComplete
              ? "Draft saved"
              : hasWeddingDetails
              ? "Setup in progress"
              : "Not started"}
          </span>
        </div>
        {draft && hasWeddingDetails ? (
          <div className="dashboard-site-card paper-card">
            <WeddingCard draft={draft} showKnob={false} />
            <div className="dashboard-site-copy">
              <span className="eyebrow">
                {draft.status === "published" && draft.intakeComplete
                  ? "YOUR SHAREABLE PREVIEW"
                  : "PICK UP WHERE YOU LEFT OFF"}
              </span>
              <h3>
                {draft.status === "published" && draft.intakeComplete
                  ? "Your invitation is ready to share."
                  : draft.intakeComplete
                  ? "Your first draft is waiting."
                  : "Your details are saved."}
              </h3>
              <p>{dateLabel(draft.weddingDate)}</p>
              <div className="dashboard-buttons">
                <Link className="button button-primary pill-btn" to={draft.intakeComplete ? "/builder" : "/intake"}>
                  {draft.status === "published" && draft.intakeComplete
                    ? "Edit your site"
                    : draft.intakeComplete
                    ? "Continue building"
                    : "Resume your details"}{" "}
                  <ArrowRight size={16} />
                </Link>
                {draft.status === "published" && draft.intakeComplete && draft.slug && (
                  <Link className="button button-outline pill-btn" to={`/sites/${draft.slug}`}>
                    View preview <ChevronRight size={15} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="dashboard-empty paper-card">
            <span className="empty-mark"><Leaf size={24} /></span>
            <h3>A lovely little space, ready for your story.</h3>
            <p>Share a few details and we'll help you begin your wedding website.</p>
            <Link className="button button-primary pill-btn" to="/intake">
              Start your wedding site <ArrowRight size={16} />
            </Link>
          </div>
        )}
        <div className="dashboard-footer-note">
          <LockKeyhole size={14} /> Your wedding draft is saved in this browser for now.
        </div>
      </section>
      {draft?.status === "published" && (
        <div className="dashboard-toast">
          <Check size={15} /> Your local preview is ready.
        </div>
      )}
    </main>
  );
}
