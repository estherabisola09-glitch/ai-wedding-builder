import type { WeddingPuckData } from "./puck/types";

export interface WeddingDraft {
  templateId: string;
  coupleNames: string;
  weddingDate: string;
  venue: string;
  city: string;
  style: string;
  story: string;
  slug: string;
  status: "draft" | "published";
  intakeComplete: boolean;
  puckData?: WeddingPuckData;
}

const STORAGE_KEY = "velvet-invite-wedding-draft";
const INTAKE_STEP_KEY = "velvet-invite-intake-step";

type StoredWeddingDraft = Omit<WeddingDraft, "intakeComplete"> & {
  intakeComplete?: unknown;
};

export const emptyWeddingDraft: WeddingDraft = {
  templateId: "",
  coupleNames: "",
  weddingDate: "",
  venue: "",
  city: "",
  style: "Garden romance",
  story: "",
  slug: "",
  status: "draft",
  intakeComplete: false,
};

function isWeddingDraft(value: unknown): value is StoredWeddingDraft {
  if (!value || typeof value !== "object") return false;
  const draft = value as Record<string, unknown>;
  return (
    typeof draft.coupleNames === "string" &&
    typeof draft.weddingDate === "string" &&
    typeof draft.venue === "string" &&
    typeof draft.city === "string" &&
    typeof draft.style === "string" &&
    typeof draft.story === "string" &&
    typeof draft.slug === "string" &&
    (draft.status === "draft" || draft.status === "published") &&
    (draft.intakeComplete === undefined || typeof draft.intakeComplete === "boolean")
  );
}

export function getWeddingDraft(): WeddingDraft | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    const value: unknown = JSON.parse(stored);
    if (isWeddingDraft(value)) {
      return {
        ...value,
        intakeComplete:
          typeof value.intakeComplete === "boolean"
            ? value.intakeComplete
            : value.status === "published" || Boolean(value.slug),
      };
    }
    console.error("Saved wedding draft has an unexpected format.");
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error("Saved wedding draft could not be parsed.", error);
    } else {
      throw error;
    }
  }

  return null;
}

export function saveWeddingDraft(draft: WeddingDraft): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function getIntakeStep(): number {
  const step = Number(localStorage.getItem(INTAKE_STEP_KEY));
  return Number.isInteger(step) && step >= 1 && step <= 3 ? step : 1;
}

export function saveIntakeStep(step: number): void {
  localStorage.setItem(INTAKE_STEP_KEY, String(step));
}
