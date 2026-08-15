/**
 * Tracking für Landingpages.
 * - Keine personenbezogenen Daten (Namen, Telefonnummern, Adressen, Gesundheitsdaten).
 * - Marketing-Tracker (Meta Pixel) laden erst nach Marketing-Einwilligung.
 */

import { campaignConfig, isSet } from "@/config/campaign";

export type LpEvent =
  | "lp_view"
  | "cta_primary_click"
  | "cta_whatsapp_click"
  | "lead_form_start"
  | "lead_form_submit"
  | "booking_confirmed";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const UTM_STORAGE_KEY = "gh_lp_utm";
const CONSENT_KEY = "gh_marketing_consent";

export const captureUtmParams = (search: string): Record<string, string> => {
  try {
    const params = new URLSearchParams(search);
    const stored = getUtmParams();
    const next: Record<string, string> = { ...stored };
    UTM_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) next[key] = value.slice(0, 100);
    });
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return {};
  }
};

export const getUtmParams = (): Record<string, string> => {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

export const hasMarketingConsent = (): boolean => {
  try {
    return localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
};

export const setMarketingConsent = (granted: boolean) => {
  try {
    localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
  } catch {
    /* ignore */
  }
  if (granted) loadMetaPixel();
};

let pixelLoaded = false;

export const loadMetaPixel = () => {
  if (pixelLoaded) return;
  if (!hasMarketingConsent()) return;
  if (!isSet(campaignConfig.metaPixelId)) return;
  if (typeof document === "undefined") return;

  pixelLoaded = true;
  const id = String(campaignConfig.metaPixelId);
  const w = window as unknown as Record<string, any>;
  /* eslint-disable */
  (function (f: any, b: Document, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode?.insertBefore(t, s);
  })(w, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  w.fbq?.("init", id);
  w.fbq?.("track", "PageView");
};

/** Nur nicht-personenbezogene Metadaten erlaubt. */
type SafeParams = Record<string, string | number | boolean>;

export const trackLpEvent = (event: LpEvent, params: SafeParams = {}) => {
  const payload = { ...getUtmParams(), ...params, page_path: "/lp/mobile-wellnessmassage-zuerich" };

  try {
    (window as any).gtag?.("event", event, payload);
  } catch {
    /* ignore */
  }

  if (hasMarketingConsent()) {
    try {
      (window as any).fbq?.("trackCustom", event, payload);
    } catch {
      /* ignore */
    }
  }
};
