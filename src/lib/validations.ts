import { z } from "zod";

// Login/Signup validation
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-Mail-Adresse ist erforderlich")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein")
    .max(255, "E-Mail-Adresse ist zu lang"),
  password: z
    .string()
    .min(6, "Passwort muss mindestens 6 Zeichen haben")
    .max(128, "Passwort ist zu lang"),
});

export const signupSchema = loginSchema.extend({
  fullName: z
    .string()
    .min(2, "Name muss mindestens 2 Zeichen haben")
    .max(100, "Name ist zu lang")
    .regex(/^[a-zA-ZäöüÄÖÜßàâçéèêëîïôûùüÿñæœ\s'-]+$/, "Name enthält ungültige Zeichen"),
});

// Booking form validation
export const bookingContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name muss mindestens 2 Zeichen haben")
    .max(100, "Name ist zu lang")
    .regex(/^[a-zA-ZäöüÄÖÜßàâçéèêëîïôûùüÿñæœ\s'-]+$/, "Name enthält ungültige Zeichen"),
  email: z
    .string()
    .min(1, "E-Mail-Adresse ist erforderlich")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein")
    .max(255, "E-Mail-Adresse ist zu lang"),
  phone: z
    .string()
    .min(10, "Telefonnummer muss mindestens 10 Zeichen haben")
    .max(20, "Telefonnummer ist zu lang")
    .regex(/^[+]?[\d\s()-]+$/, "Telefonnummer enthält ungültige Zeichen"),
});

export const bookingPreferencesSchema = z.object({
  avoidAreas: z
    .string()
    .max(500, "Text ist zu lang")
    .optional(),
  additionalNotes: z
    .string()
    .max(1000, "Notizen sind zu lang")
    .optional(),
  intensityPreference: z
    .enum(["sanft", "mittel", "intensiv"])
    .optional(),
  conversationPreference: z
    .enum(["still", "wenig", "gespraechig"])
    .optional(),
  musicPreference: z
    .enum(["leise", "mittel", "laut", "keine"])
    .optional(),
});

export const fullBookingSchema = bookingContactSchema.merge(bookingPreferencesSchema).extend({
  masseur: z.string().min(1, "Bitte wählen Sie eine/n Therapeut:in"),
  theme: z.string().min(1, "Bitte wählen Sie ein Erlebnis"),
  massage: z.string().min(1, "Bitte wählen Sie eine Massage"),
  duration: z.string().min(1, "Bitte wählen Sie eine Dauer"),
  appointmentDate: z.string().min(1, "Bitte wählen Sie ein Datum"),
  appointmentTime: z.string().min(1, "Bitte wählen Sie eine Uhrzeit"),
  agbAccepted: z.literal(true, {
    errorMap: () => ({ message: "Bitte akzeptieren Sie die AGB" }),
  }),
  privacyAccepted: z.literal(true, {
    errorMap: () => ({ message: "Bitte akzeptieren Sie die Datenschutzerklärung" }),
  }),
});

// Gift card validation
export const giftCardCodeSchema = z.object({
  code: z
    .string()
    .min(8, "Gutscheincode muss mindestens 8 Zeichen haben")
    .max(20, "Gutscheincode ist zu lang")
    .regex(/^[A-Z0-9-]+$/, "Ungültiges Gutscheincode-Format"),
});

// Contact form validation
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name muss mindestens 2 Zeichen haben")
    .max(100, "Name ist zu lang"),
  email: z
    .string()
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein")
    .max(255, "E-Mail-Adresse ist zu lang"),
  subject: z
    .string()
    .min(3, "Betreff muss mindestens 3 Zeichen haben")
    .max(200, "Betreff ist zu lang"),
  message: z
    .string()
    .min(10, "Nachricht muss mindestens 10 Zeichen haben")
    .max(2000, "Nachricht ist zu lang"),
});

// Chat message validation
export const chatMessageSchema = z.object({
  message: z
    .string()
    .min(1, "Nachricht darf nicht leer sein")
    .max(500, "Nachricht ist zu lang"),
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type BookingContactData = z.infer<typeof bookingContactSchema>;
export type BookingPreferencesData = z.infer<typeof bookingPreferencesSchema>;
export type FullBookingData = z.infer<typeof fullBookingSchema>;
export type GiftCardCodeData = z.infer<typeof giftCardCodeSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ChatMessageData = z.infer<typeof chatMessageSchema>;
