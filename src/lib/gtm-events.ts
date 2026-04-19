import { readConsent } from "@/lib/consent";

export type GtmEventPayload = Record<
  string,
  string | number | boolean | null | undefined
>;

export function trackEvent(eventName: string, payload: GtmEventPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  if (readConsent() !== "accepted") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: eventName, ...payload });
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}
