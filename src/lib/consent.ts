export const CONSENT_STORAGE_KEY = "portfolio-cookie-consent";
export const CONSENT_EVENT = "portfolio:consent-updated";

export type ConsentState = "accepted" | "rejected" | null;
let inMemoryConsent: ConsentState = null;

export function readConsent(): ConsentState {
  if (typeof window === "undefined") {
    return inMemoryConsent;
  }

  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === "accepted" || value === "rejected") {
      inMemoryConsent = value;
      return value;
    }
  } catch {
    return inMemoryConsent;
  }

  return inMemoryConsent;
}

export function writeConsent(value: Exclude<ConsentState, null>) {
  inMemoryConsent = value;

  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Ignore storage errors (private mode / blocked storage) and rely on memory fallback.
  }

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}
