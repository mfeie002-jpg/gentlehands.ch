import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { de } from "date-fns/locale";
import { Check, ArrowLeft, ArrowRight, User, Sparkles, Clock, Settings, Calendar, CheckCircle, Waves, Mountain, Moon, Building, Leaf, Heart, Zap, Star, CalendarIcon, Loader2, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { BookingProgressIndicator } from "@/components/booking/BookingProgressIndicator";
import { BookingIntroduction } from "@/components/booking/BookingIntroduction";
import { BookingSummaryCard } from "@/components/booking/BookingSummaryCard";
import { BookingTrustBadges } from "@/components/booking/BookingTrustBadges";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { triggerHaptic } from "@/hooks/useHapticFeedback";
import { bookingContactSchema, bookingPreferencesSchema } from "@/lib/validations";
import { z } from "zod";
import { useThrottle } from "@/hooks/useThrottle";

const steps = [
  { id: 1, title: "Masseur:in", icon: User },
  { id: 2, title: "Erlebnis", icon: Sparkles },
  { id: 3, title: "Massage", icon: Clock },
  { id: 4, title: "Präferenzen", icon: Settings },
  { id: 5, title: "Termin & Daten", icon: Calendar },
  { id: 6, title: "Bestätigung", icon: CheckCircle },
];

const masseurs = [
  { id: "morris", name: "Morris", role: "Inhaber & Leitender Masseur", specialties: ["Tiefenentspannung", "Emotional Grounding"] },
  { id: "anna", name: "Anna", role: "Masseurin", specialties: ["Sanfte Massage", "Stress Reset"] },
  { id: "luca", name: "Luca", role: "Masseur", specialties: ["Deep Tissue", "Körperarbeit"] },
  { id: "none", name: "Keine Präferenz", role: "Wir wählen intuitiv", specialties: [] },
];

const themes = [
  { id: "ozean", title: "Ozean & Palmen", icon: Waves, description: "Tropische Leichtigkeit" },
  { id: "alpine", title: "Alpine Stille", icon: Mountain, description: "Berghütten-Geborgenheit" },
  { id: "dark", title: "Deep Dark Relax", icon: Moon, description: "Maximale Tiefe" },
  { id: "urban", title: "Urban Loft", icon: Building, description: "City-Wellness" },
  { id: "zen", title: "Zen Garden", icon: Leaf, description: "Asiatische Ruhe" },
  { id: "surprise", title: "Surprise Experience", icon: Sparkles, description: "Vertrauen & Hingabe" },
];

const massages = [
  { id: "deep-release", title: "Deep Release Session", icon: Heart, durations: ["90 Min", "120 Min"] },
  { id: "stress-reset", title: "Stress Reset", icon: Zap, durations: ["60 Min", "90 Min"] },
  { id: "emotional-grounding", title: "Emotional Grounding", icon: Moon, durations: ["90 Min"] },
  { id: "ganzkoerper", title: "Ganzkörper Tiefenentspannung", icon: Star, durations: ["120 Min"] },
];

const Buchung = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Rate limiting - max 3 submissions per minute, minimum 5 seconds between attempts
  const { canSubmit, cooldownSeconds, attemptsRemaining, recordSubmission } = useThrottle({
    limitMs: 5000,
    maxAttempts: 3,
    windowMs: 60000,
  });
  const [formData, setFormData] = useState({
    masseur: "",
    theme: "",
    massage: "",
    duration: "",
    music: "normal",
    conversation: "spontan",
    intensity: "mittel",
    avoidAreas: "",
    intuitive: false,
    selectedDate: undefined as Date | undefined,
    selectedTime: "",
    name: "",
    email: "",
    phone: "",
    preferredContact: "email",
    agb: false,
    datenschutz: false,
    newsletter: false,
    additionalNotes: "",
  });

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
  ];

  const updateFormData = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Clear error when field is updated
    if (formErrors[key]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validateContactForm = (): boolean => {
    try {
      bookingContactSchema.parse({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setFormErrors(newErrors);
      }
      return false;
    }
  };

  const validatePreferences = (): boolean => {
    try {
      bookingPreferencesSchema.parse({
        avoidAreas: formData.avoidAreas,
        additionalNotes: formData.additionalNotes,
        intensityPreference: formData.intensity as "sanft" | "mittel" | "intensiv",
        conversationPreference: formData.conversation as "still" | "wenig" | "gespraechig",
        musicPreference: formData.music as "leise" | "mittel" | "laut" | "keine",
      });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setFormErrors(newErrors);
      }
      return false;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.masseur !== "";
      case 2:
        return formData.theme !== "";
      case 3:
        return formData.massage !== "" && formData.duration !== "";
      case 4:
        return true;
      case 5:
        return formData.selectedDate && formData.selectedTime && formData.name && formData.email && formData.phone && formData.agb && formData.datenschutz;
      default:
        return true;
    }
  };

  // Swipe navigation for mobile
  const { swipeOffset, handlers: swipeHandlers } = useSwipeNavigation({
    onSwipeLeft: () => {
      if (currentStep < 5 && canProceed()) {
        setCurrentStep((prev) => prev + 1);
      }
    },
    onSwipeRight: () => {
      if (currentStep > 1 && currentStep < 6) {
        setCurrentStep((prev) => prev - 1);
      }
    },
    threshold: 60,
    disabled: currentStep === 5 || currentStep === 6, // Disable on form/confirmation steps
  });

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-foreground mb-2 text-xl sm:text-2xl">Wählen Sie Ihre:n Therapeut:in</h2>
              <p className="text-muted-foreground text-sm sm:text-base px-2">
                Jede:r unserer professionell ausgebildeten Therapeut:innen bringt einen eigenen Stil mit.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {masseurs.map((masseur) => (
                <button
                  key={masseur.id}
                  onClick={() => {
                    updateFormData("masseur", masseur.id);
                    triggerHaptic('light');
                  }}
                  className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 text-left transition-all min-h-[100px] touch-manipulation active:scale-[0.98] ${
                    formData.masseur === masseur.id
                      ? "border-copper bg-copper/5"
                      : "border-border active:border-copper/50"
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-sand flex-shrink-0 flex items-center justify-center">
                      <User size={20} className="text-warm-gray sm:hidden" />
                      <User size={24} className="text-warm-gray hidden sm:block" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-base sm:text-lg text-foreground mb-0.5 sm:mb-1">
                        {masseur.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">
                        {masseur.role}
                      </p>
                      {masseur.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {masseur.specialties.map((s) => (
                            <span
                              key={s}
                              className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 bg-secondary rounded-full"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {formData.masseur === masseur.id && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-5 h-5 sm:w-6 sm:h-6 bg-copper rounded-full flex items-center justify-center">
                      <Check size={12} className="text-accent-foreground sm:hidden" />
                      <Check size={14} className="text-accent-foreground hidden sm:block" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-foreground mb-2 text-xl sm:text-2xl">Wählen Sie Ihre Atmosphäre</h2>
              <p className="text-muted-foreground text-sm sm:text-base px-2">
                Jeder Themenraum bietet eine einzigartige Entspannungserfahrung.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    updateFormData("theme", theme.id);
                    triggerHaptic('light');
                  }}
                  className={`relative p-3 sm:p-6 rounded-xl sm:rounded-2xl border-2 text-left transition-all min-h-[100px] sm:min-h-[140px] touch-manipulation active:scale-[0.98] ${
                    formData.theme === theme.id
                      ? "border-copper bg-copper/5"
                      : "border-border active:border-copper/50"
                  }`}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 mb-2 sm:mb-4 flex items-center justify-center">
                    <theme.icon size={20} className="text-primary sm:hidden" />
                    <theme.icon size={24} className="text-primary hidden sm:block" />
                  </div>
                  <h3 className="font-display text-sm sm:text-lg text-foreground mb-0.5 sm:mb-1 leading-tight">
                    {theme.title}
                  </h3>
                  <p className="text-[10px] sm:text-sm text-muted-foreground line-clamp-2">
                    {theme.description}
                  </p>
                  {formData.theme === theme.id && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 bg-copper rounded-full flex items-center justify-center">
                      <Check size={10} className="text-accent-foreground sm:hidden" />
                      <Check size={12} className="text-accent-foreground hidden sm:block" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-foreground mb-2 text-xl sm:text-2xl">Wählen Sie Ihre Massage</h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Welche Art der Entspannung wünschen Sie?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8">
              {massages.map((massage) => (
                <button
                  key={massage.id}
                  onClick={() => {
                    updateFormData("massage", massage.id);
                    updateFormData("duration", "");
                    triggerHaptic('light');
                  }}
                  className={`relative p-3 sm:p-6 rounded-xl sm:rounded-2xl border-2 text-left transition-all min-h-[90px] sm:min-h-[120px] touch-manipulation active:scale-[0.98] ${
                    formData.massage === massage.id
                      ? "border-copper bg-copper/5"
                      : "border-border active:border-copper/50"
                  }`}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 mb-2 sm:mb-4 flex items-center justify-center">
                    <massage.icon size={18} className="text-primary sm:hidden" />
                    <massage.icon size={24} className="text-primary hidden sm:block" />
                  </div>
                  <h3 className="font-display text-xs sm:text-lg text-foreground leading-tight">
                    {massage.title}
                  </h3>
                  {formData.massage === massage.id && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 bg-copper rounded-full flex items-center justify-center">
                      <Check size={10} className="text-accent-foreground sm:hidden" />
                      <Check size={12} className="text-accent-foreground hidden sm:block" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {formData.massage && (
              <div>
                <Label className="mb-3 sm:mb-4 block text-sm sm:text-base">Dauer wählen</Label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {massages
                    .find((m) => m.id === formData.massage)
                    ?.durations.map((duration) => (
                      <button
                        key={duration}
                        onClick={() => {
                          updateFormData("duration", duration);
                          triggerHaptic('light');
                        }}
                        className={`px-4 sm:px-6 py-3 sm:py-3 rounded-lg sm:rounded-xl border-2 transition-all min-h-[48px] text-sm sm:text-base touch-manipulation active:scale-[0.98] ${
                          formData.duration === duration
                            ? "border-copper bg-copper text-accent-foreground"
                            : "border-border active:border-copper/50"
                        }`}
                      >
                        {duration}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-foreground mb-2">Ihre Präferenzen</h2>
              <p className="text-muted-foreground">
                Gestalten Sie Ihr Erlebnis nach Ihren Wünschen.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="mb-4 block">Musik</Label>
                <RadioGroup
                  value={formData.music}
                  onValueChange={(v) => updateFormData("music", v)}
                  className="flex flex-wrap gap-3"
                >
                  {[
                    { value: "leise", label: "Sehr leise" },
                    { value: "normal", label: "Normal" },
                    { value: "keine", label: "Keine Musik" },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center">
                      <RadioGroupItem value={opt.value} id={`music-${opt.value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`music-${opt.value}`}
                        className={`px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                          formData.music === opt.value
                            ? "border-copper bg-copper/10"
                            : "border-border hover:border-copper/50"
                        }`}
                      >
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="mb-4 block">Gespräch</Label>
                <RadioGroup
                  value={formData.conversation}
                  onValueChange={(v) => updateFormData("conversation", v)}
                  className="flex flex-wrap gap-3"
                >
                  {[
                    { value: "schweigend", label: "Bitte schweigend" },
                    { value: "smalltalk", label: "Leichter Smalltalk ok" },
                    { value: "spontan", label: "Ich entscheide spontan" },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center">
                      <RadioGroupItem value={opt.value} id={`conv-${opt.value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`conv-${opt.value}`}
                        className={`px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                          formData.conversation === opt.value
                            ? "border-copper bg-copper/10"
                            : "border-border hover:border-copper/50"
                        }`}
                      >
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="mb-4 block">Berührungsintensität</Label>
                <RadioGroup
                  value={formData.intensity}
                  onValueChange={(v) => updateFormData("intensity", v)}
                  className="flex flex-wrap gap-3"
                >
                  {[
                    { value: "sanft", label: "Sehr sanft" },
                    { value: "mittel", label: "Mittel" },
                    { value: "tief", label: "Tief, aber nicht schmerzhaft" },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center">
                      <RadioGroupItem value={opt.value} id={`int-${opt.value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`int-${opt.value}`}
                        className={`px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                          formData.intensity === opt.value
                            ? "border-copper bg-copper/10"
                            : "border-border hover:border-copper/50"
                        }`}
                      >
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="avoid">Bereiche, die gemieden werden sollen (optional)</Label>
                <Textarea
                  id="avoid"
                  placeholder="z.B. unterer Rücken wegen Bandscheibenvorfall"
                  value={formData.avoidAreas}
                  onChange={(e) => updateFormData("avoidAreas", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="flex items-start space-x-3 p-4 bg-secondary/50 rounded-xl">
                <Checkbox
                  id="intuitive"
                  checked={formData.intuitive}
                  onCheckedChange={(c) => updateFormData("intuitive", c)}
                />
                <div>
                  <Label htmlFor="intuitive" className="font-medium">
                    Ich überlasse GentleHands vieles intuitiv
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Wir entscheiden basierend auf Ihrem Zustand vor Ort.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-foreground mb-2">Termin & Ihre Daten</h2>
              <p className="text-muted-foreground">
                Fast geschafft! Noch einige Angaben für Ihre Buchung.
              </p>
            </div>

            {/* Calendar & Time Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Calendar */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Wunschtermin wählen *</Label>
                <div className="p-4 rounded-2xl bg-card border border-border">
                  <CalendarComponent
                    mode="single"
                    selected={formData.selectedDate}
                    onSelect={(date) => updateFormData("selectedDate", date)}
                    disabled={(date) => 
                      isBefore(date, startOfToday()) || 
                      date.getDay() === 0 || // No Sundays
                      isBefore(addDays(new Date(), 60), date) // Max 60 days ahead
                    }
                    locale={de}
                    className="pointer-events-auto mx-auto"
                    classNames={{
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_today: "bg-accent text-accent-foreground",
                    }}
                  />
                  {formData.selectedDate && (
                    <p className="text-center text-sm text-copper mt-4 font-medium">
                      {format(formData.selectedDate, "EEEE, d. MMMM yyyy", { locale: de })}
                    </p>
                  )}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Uhrzeit wählen *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => updateFormData("selectedTime", time)}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all text-center",
                        formData.selectedTime === time
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Clock className="w-5 h-5 mx-auto mb-2 opacity-70" />
                      <span className="font-medium">{time} Uhr</span>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Termine sind begrenzt verfügbar. Bei hoher Nachfrage kontaktieren wir Sie für Alternativen.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  placeholder="Ihr Name"
                  className={formErrors.name ? "border-destructive" : ""}
                  maxLength={100}
                  required
                />
                {formErrors.name && (
                  <p className="text-sm text-destructive">{formErrors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="ihre@email.ch"
                  className={formErrors.email ? "border-destructive" : ""}
                  maxLength={255}
                  required
                />
                {formErrors.email && (
                  <p className="text-sm text-destructive">{formErrors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="+41 00 000 00 00"
                  className={formErrors.phone ? "border-destructive" : ""}
                  maxLength={20}
                  required
                />
                {formErrors.phone && (
                  <p className="text-sm text-destructive">{formErrors.phone}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Bevorzugter Kontaktkanal</Label>
                <RadioGroup
                  value={formData.preferredContact}
                  onValueChange={(v) => updateFormData("preferredContact", v)}
                  className="flex gap-4 pt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="contact-email" />
                    <Label htmlFor="contact-email">E-Mail</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="contact-phone" />
                    <Label htmlFor="contact-phone">Telefon</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sms" id="contact-sms" />
                    <Label htmlFor="contact-sms">SMS</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agb"
                  checked={formData.agb}
                  onCheckedChange={(c) => updateFormData("agb", c)}
                  required
                />
                <Label htmlFor="agb" className="text-sm">
                  Ich habe die{" "}
                  <a href="/rechtliches#agb" className="text-primary underline">
                    AGB
                  </a>{" "}
                  gelesen und akzeptiere sie. *
                </Label>
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="datenschutz"
                  checked={formData.datenschutz}
                  onCheckedChange={(c) => updateFormData("datenschutz", c)}
                  required
                />
                <Label htmlFor="datenschutz" className="text-sm">
                  Ich habe die{" "}
                  <a href="/rechtliches#datenschutz" className="text-primary underline">
                    Datenschutzerklärung
                  </a>{" "}
                  gelesen. *
                </Label>
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(c) => updateFormData("newsletter", c)}
                />
                <Label htmlFor="newsletter" className="text-sm">
                  Ich möchte über zukünftige Angebote informiert werden
                  (optional).
                </Label>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-copper/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-copper" />
              </div>
              <h2 className="text-foreground mb-2">Vielen Dank!</h2>
              <p className="text-muted-foreground">
                Ihre Anfrage wurde erfolgreich übermittelt.
              </p>
            </div>

            <div className="card-elevated p-8 space-y-4">
              <h3 className="font-display text-lg text-foreground mb-4">
                Zusammenfassung Ihrer Buchung
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Masseur:in</p>
                  <p className="text-foreground font-medium">
                    {masseurs.find((m) => m.id === formData.masseur)?.name}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Erlebnis</p>
                  <p className="text-foreground font-medium">
                    {themes.find((t) => t.id === formData.theme)?.title}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Massage</p>
                  <p className="text-foreground font-medium">
                    {massages.find((m) => m.id === formData.massage)?.title}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Dauer</p>
                  <p className="text-foreground font-medium">{formData.duration}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Wunschtermin</p>
                  <p className="text-foreground font-medium">
                    {formData.selectedDate ? format(formData.selectedDate, "d. MMMM yyyy", { locale: de }) : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Uhrzeit</p>
                  <p className="text-foreground font-medium">{formData.selectedTime} Uhr</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
              <p className="text-muted-foreground">
                <strong>Wichtig:</strong> Ihr Termin ist erst nach unserer
                persönlichen Bestätigung per E-Mail oder SMS fix. Wir melden
                uns in der Regel innerhalb von 24 Stunden.
              </p>
            </div>

            <div>
              <Label htmlFor="notes">Zusätzliche Hinweise (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Haben Sie uns noch etwas mitzuteilen?"
                value={formData.additionalNotes}
                onChange={(e) => updateFormData("additionalNotes", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Buchung | GentleHands Zürich</title>
        <meta
          name="description"
          content="Buchen Sie Ihr exklusives GentleHands-Erlebnis. Wählen Sie Masseur:in, Theme, Massage und Ihre persönlichen Präferenzen."
        />
      </Helmet>

      <section className="pt-24 sm:pt-32 pb-8 sm:pb-16 min-h-screen">
        <div className="container-narrow px-3 sm:px-6">
          {/* Progress Steps - Mobile Optimized */}
          <div className="mb-8 sm:mb-12">
            {/* Mobile: Simple step indicator */}
            <div className="flex items-center justify-center gap-2 sm:hidden mb-4">
              <span className="text-sm font-medium text-copper">Schritt {currentStep}</span>
              <span className="text-sm text-muted-foreground">von {steps.length}</span>
            </div>
            <div className="flex sm:hidden items-center justify-center gap-1.5 mb-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`h-1.5 rounded-full transition-all ${
                    currentStep >= step.id ? "bg-copper w-8" : "bg-border w-4"
                  }`}
                />
              ))}
            </div>
            
            {/* Desktop: Full step indicator */}
            <div className="hidden sm:flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex flex-col items-center ${
                      index < steps.length - 1 ? "flex-1" : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        currentStep > step.id
                          ? "bg-copper text-accent-foreground"
                          : currentStep === step.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check size={18} />
                      ) : (
                        <step.icon size={18} />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs ${
                        currentStep >= step.id
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-2 ${
                        currentStep > step.id ? "bg-copper" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Swipe hint for mobile */}
          <div className="flex sm:hidden items-center justify-center gap-2 text-xs text-muted-foreground mb-4">
            <ChevronLeft size={14} />
            <span>Wischen zum Navigieren</span>
            <ChevronRight size={14} />
          </div>

          {/* Step Content with Swipe */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              {...swipeHandlers}
              style={{ 
                transform: `translateX(${swipeOffset * 0.5}px)`,
                touchAction: 'pan-y'
              }}
              className="touch-manipulation"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation - Mobile Optimized */}
          <div className="flex justify-between mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border gap-3">
            {currentStep > 1 && currentStep < 6 ? (
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentStep((prev) => prev - 1);
                  triggerHaptic('light');
                }}
                className="min-h-[48px] px-4 sm:px-6"
              >
                <ArrowLeft size={16} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Zurück</span>
              </Button>
            ) : (
              <div />
            )}
            {currentStep < 5 && (
              <Button
                variant="copper"
                onClick={() => {
                  setCurrentStep((prev) => prev + 1);
                  triggerHaptic('success');
                }}
                disabled={!canProceed()}
                className="ml-auto min-h-[48px] px-6 sm:px-8"
              >
                <span>Weiter</span>
                <ArrowRight size={16} className="ml-1 sm:ml-2" />
              </Button>
            )}
            {currentStep === 5 && (
              <Button
                variant="copper"
                onClick={async () => {
                  // Check rate limiting first
                  if (!canSubmit) {
                    toast({
                      title: "Bitte warten Sie",
                      description: cooldownSeconds > 0 
                        ? `Sie können in ${cooldownSeconds} Sekunden erneut versuchen.`
                        : "Zu viele Versuche. Bitte warten Sie eine Minute.",
                      variant: "destructive",
                    });
                    return;
                  }

                  // Validate form before submission
                  if (!validateContactForm()) {
                    toast({
                      title: "Bitte überprüfen Sie Ihre Eingaben",
                      description: "Einige Felder enthalten ungültige Daten.",
                      variant: "destructive",
                    });
                    return;
                  }
                  
                  if (!validatePreferences()) {
                    toast({
                      title: "Bitte überprüfen Sie Ihre Präferenzen",
                      description: "Einige Felder sind zu lang.",
                      variant: "destructive",
                    });
                    return;
                  }

                  // Record the submission attempt for rate limiting
                  if (!recordSubmission()) {
                    toast({
                      title: "Zu schnell",
                      description: "Bitte warten Sie einen Moment vor dem nächsten Versuch.",
                      variant: "destructive",
                    });
                    return;
                  }
                  
                  setIsSubmitting(true);
                  try {
                    // Generate booking number
                    const bookingNumber = `GH-${Date.now().toString(36).toUpperCase()}`;
                    
                    // Save to database
                    const { error } = await supabase.from("bookings").insert({
                      booking_number: bookingNumber,
                      masseur: masseurs.find(m => m.id === formData.masseur)?.name || formData.masseur,
                      theme: themes.find(t => t.id === formData.theme)?.title || formData.theme,
                      massage: massages.find(m => m.id === formData.massage)?.title || formData.massage,
                      duration: formData.duration,
                      appointment_date: formData.selectedDate ? format(formData.selectedDate, "yyyy-MM-dd") : null,
                      appointment_time: formData.selectedTime,
                      customer_name: formData.name.trim(),
                      customer_email: formData.email.trim().toLowerCase(),
                      customer_phone: formData.phone.trim(),
                      preferred_contact: formData.preferredContact,
                      music_preference: formData.music,
                      conversation_preference: formData.conversation,
                      intensity_preference: formData.intensity,
                      avoid_areas: formData.avoidAreas?.trim() || null,
                      intuitive: formData.intuitive,
                      additional_notes: formData.additionalNotes?.trim() || null,
                      newsletter_consent: formData.newsletter,
                    });

                    if (error) {
                      console.error("Booking error:", error);
                      toast({
                        title: "Fehler bei der Buchung",
                        description: "Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.",
                        variant: "destructive",
                      });
                      setIsSubmitting(false);
                      return;
                    }

                    // Send notification via edge function
                    try {
                      await supabase.functions.invoke("notify-booking", {
                        body: {
                          booking_number: bookingNumber,
                          customer_name: formData.name,
                          customer_email: formData.email,
                          customer_phone: formData.phone,
                          masseur: masseurs.find(m => m.id === formData.masseur)?.name,
                          theme: themes.find(t => t.id === formData.theme)?.title,
                          massage_type: massages.find(m => m.id === formData.massage)?.title,
                          duration: formData.duration,
                          appointment_date: formData.selectedDate ? format(formData.selectedDate, "yyyy-MM-dd") : null,
                          appointment_time: formData.selectedTime,
                          special_notes: formData.additionalNotes,
                        },
                      });
                    } catch (notifyError) {
                      console.error("Notification error:", notifyError);
                      // Don't block booking if notification fails
                    }

                    // Save to localStorage for confirmation page
                    const bookingData = {
                      bookingNumber,
                      masseur: masseurs.find(m => m.id === formData.masseur)?.name || formData.masseur,
                      theme: themes.find(t => t.id === formData.theme)?.title || formData.theme,
                      massage: massages.find(m => m.id === formData.massage)?.title || formData.massage,
                      duration: formData.duration,
                      date: formData.selectedDate ? format(formData.selectedDate, "EEEE, d. MMMM yyyy", { locale: de }) : "",
                      time: formData.selectedTime,
                      name: formData.name,
                      email: formData.email,
                      phone: formData.phone,
                      preferences: {
                        music: formData.music,
                        conversation: formData.conversation,
                        intensity: formData.intensity,
                        avoidAreas: formData.avoidAreas,
                        intuitive: formData.intuitive,
                      },
                      additionalNotes: formData.additionalNotes,
                    };
                    localStorage.setItem("gentlehands_booking", JSON.stringify(bookingData));
                    
                    navigate(`/buchung/bestaetigung?nr=${bookingNumber}`);
                  } catch (err) {
                    console.error("Unexpected error:", err);
                    toast({
                      title: "Fehler",
                      description: "Ein unerwarteter Fehler ist aufgetreten.",
                      variant: "destructive",
                    });
                    setIsSubmitting(false);
                  }
                }}
                disabled={!canProceed() || isSubmitting || !canSubmit}
                className="ml-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Wird gesendet...
                  </>
                ) : cooldownSeconds > 0 ? (
                  <>
                    <AlertCircle size={16} className="mr-2" />
                    Warten ({cooldownSeconds}s)
                  </>
                ) : (
                  <>
                    Anfrage absenden
                    <Check size={16} className="ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Buchung;
