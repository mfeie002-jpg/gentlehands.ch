/**
 * Zentrale Campaign-Config für die Landingpage
 * /lp/mobile-wellnessmassage-zuerich
 *
 * WICHTIG (Wahrheitsregel):
 * - Hier dürfen NUR nachweislich bestätigte Angaben eingetragen werden.
 * - Fehlende Pflichtangaben bleiben auf "TODO_REQUIRED".
 * - Solange Pflichtwerte fehlen, bleibt `campaignEnabled` false und die Seite
 *   wird als "nicht startbereit" behandelt (Preview only, noindex).
 */

export const TODO = "TODO_REQUIRED" as const;
export type Todo = typeof TODO;

export type MaybeTodo<T> = T | Todo;

export interface CampaignConfig {
  /** Vorname des Anbieters (bestätigt) */
  providerFirstName: MaybeTodo<string>;
  /** Vollständiger Name für Impressum/Transparenz */
  providerFullName: MaybeTodo<string>;
  /** NUR nachweislich vorhandene Qualifikationen. Leer = keine Angabe machen. */
  verifiedQualifications: string[];
  /** Echte WhatsApp-Nummer im Format +41... — keine Platzhalter veröffentlichen */
  whatsappNumber: MaybeTodo<string>;
  contactEmail: MaybeTodo<string>;
  /** Umschreibung des Einsatzgebiets, z.B. "Stadt Zürich" */
  serviceAreaText: MaybeTodo<string>;
  /** Bestätigte Postleitzahlen des Einsatzgebiets */
  servicePostcodes: string[];
  serviceRadiusKm: MaybeTodo<number>;

  /** Kennenlern-Angebot */
  offerEnabled: boolean;
  offerDurationMinutes: MaybeTodo<number>;
  offerPrice: MaybeTodo<number>;
  offerConditions: MaybeTodo<string>;

  /** Nur tatsächlich verfügbare, freigegebene Zeitfenster */
  availableTimeSlots: string[];

  /** Meta Pixel — wird erst nach Marketing-Einwilligung geladen */
  metaPixelId: MaybeTodo<string>;

  /** Master-Schalter: erst true, wenn die Launch-Checkliste vollständig ist */
  campaignEnabled: boolean;

  /** Medien: Pfade nur setzen, wenn echtes Material vorliegt (mit Einwilligung) */
  media: {
    portraitImage: MaybeTodo<string>;
    videoSrc: MaybeTodo<string>;
    videoPoster: MaybeTodo<string>;
    videoCaptionsSrc: MaybeTodo<string>;
  };
}

export const campaignConfig: CampaignConfig = {
  providerFirstName: "Morris",
  providerFullName: "Morris Feierabend",
  verifiedQualifications: [], // Keine Qualifikation behaupten, solange nicht geprüft
  whatsappNumber: "+41 76 568 13 02",
  contactEmail: "info@gentlehands.ch",
  serviceAreaText: "Stadt Zürich, Kanton Zürich und Zug",
  servicePostcodes: ["8001", "8002", "8003", "8004", "8005", "8006", "8008", "8032", "8037", "8038", "8041", "8044", "8045", "8046", "8047", "8048", "8049", "8050", "8051", "8052", "8053", "8055", "8057", "8064", "6300", "6330", "6340"],
  serviceRadiusKm: 40,

  offerEnabled: true,
  offerDurationMinutes: 30,
  offerPrice: 0,
  offerConditions:
    "Kennenlern-Angebot: einmalig und kostenlos für neue Kundinnen ab 18 Jahren, buchbar innerhalb einer Woche ab Anfrage, im Einsatzgebiet Stadt Zürich, Kanton Zürich und Zug sowie nach Terminbestätigung. Keine Mitgliedschaft, keine automatische Verlängerung und keine versteckten Kosten.",

  availableTimeSlots: [
    "Vormittag (09:00–12:00)",
    "Nachmittag (12:00–17:00)",
    "Abend (17:00–21:00)",
    "Zeit nach Absprache",
  ],

  metaPixelId: TODO,
  campaignEnabled: true,

  media: {
    portraitImage: morrisPortrait.url,
    videoSrc: TODO,
    videoPoster: TODO,
    videoCaptionsSrc: TODO,
  },
};

export const isSet = <T,>(value: MaybeTodo<T> | null | undefined): value is T =>
  value !== undefined && value !== null && value !== TODO && value !== "";

/** Pflichtwerte, die vor dem Launch gesetzt sein müssen */
export const requiredFields: { key: string; label: string; ok: boolean }[] = (() => {
  const c = campaignConfig;
  return [
    { key: "providerFullName", label: "Vollständiger Name des Anbieters (Impressum)", ok: isSet(c.providerFullName) },
    { key: "whatsappNumber", label: "Echte WhatsApp-Nummer", ok: isSet(c.whatsappNumber) },
    { key: "contactEmail", label: "Kontakt-E-Mail", ok: isSet(c.contactEmail) },
    { key: "serviceAreaText", label: "Einsatzgebiet (Text)", ok: isSet(c.serviceAreaText) },
    { key: "servicePostcodes", label: "Bestätigte Postleitzahlen", ok: c.servicePostcodes.length > 0 },
    { key: "serviceRadiusKm", label: "Einsatzradius in km", ok: isSet(c.serviceRadiusKm) },
    { key: "availableTimeSlots", label: "Freigegebene Zeitfenster", ok: c.availableTimeSlots.length > 0 },
    { key: "media.portraitImage", label: "Echtes Portrait (mit Einwilligung)", ok: isSet(c.media.portraitImage) },
    { key: "metaPixelId", label: "Meta Pixel ID", ok: isSet(c.metaPixelId) },
  ];
})();

export const missingRequiredFields = requiredFields.filter((f) => !f.ok);

/** Angebot nur zeigen, wenn aktiv UND vollständig definiert */
export const offerIsDisplayable =
  campaignConfig.offerEnabled &&
  isSet(campaignConfig.offerDurationMinutes) &&
  campaignConfig.offerPrice !== TODO &&
  typeof campaignConfig.offerPrice === "number" &&
  isSet(campaignConfig.offerConditions);

export const whatsappHref = (() => {
  if (!isSet(campaignConfig.whatsappNumber)) return null;
  const digits = String(campaignConfig.whatsappNumber).replace(/[^\d]/g, "");
  const text = `Hallo ${
    isSet(campaignConfig.providerFirstName) ? campaignConfig.providerFirstName : ""
  }, ich interessiere mich für den kostenlosen Kennenlerntermin von GentleHands. Meine Postleitzahl ist ____. Mein gewünschtes Zeitfenster ist ____.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
})();

/** Seite ist erst produktiv startbereit, wenn nichts mehr fehlt */
export const campaignIsLaunchReady =
  campaignConfig.campaignEnabled && missingRequiredFields.length === 0;
