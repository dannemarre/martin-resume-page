declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: gtag is dynamic by design
    gtag?: (...args: any[]) => void;
    // biome-ignore lint/suspicious/noExplicitAny: dataLayer is dynamic by design
    dataLayer?: any[];
  }
}

export const GA4_MEASUREMENT_ID: string | null =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GA4_MEASUREMENT_ID) || null;

export const CONSENT_KEY = "md_consent_v1";

export type ConsentValue = "granted" | "denied";

export function readConsent(): ConsentValue | null {
  if (typeof localStorage === "undefined") return null;
  const v = localStorage.getItem(CONSENT_KEY);
  if (v === "granted" || v === "denied") return v;
  return null;
}

export function setConsent(value: ConsentValue) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(CONSENT_KEY, value);
  }
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: value,
    });
  }
}
