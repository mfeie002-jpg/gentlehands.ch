import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/shared/SEOHead";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { de } from "date-fns/locale";
import { Check, ArrowLeft, ArrowRight, User, Sparkles, Clock, Settings, Calendar, CheckCircle, Waves, Mountain, Moon, Building, Leaf, Heart, Zap, Star, CalendarIcon, Loader2, ChevronLeft, ChevronRight, AlertCircle, Users, Volume2, VolumeX, Volume1, MessageCircle, MessageCircleOff, Hand, Feather, Shield, Award, Scale, Gift, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { BookingProgressIndicator } from "@/components/booking/BookingProgressIndicator";
import { BookingIntroduction } from "@/components/booking/BookingIntroduction";
import { BookingSummaryCard } from "@/components/booking/BookingSummaryCard";
import { BookingTrustBadges } from "@/components/booking/BookingTrustBadges";
import { BookingFloatingSummary } from "@/components/booking/BookingFloatingSummary";
import { BookingDraftRecovery } from "@/components/booking/BookingDraftRecovery";
import { BookingSocialProof } from "@/components/booking/BookingSocialProof";
import { BookingFOMOPopup } from "@/components/booking/BookingFOMOPopup";
import { BookingTestimonialSlider } from "@/components/booking/BookingTestimonialSlider";
import { BookingCountdownTimer } from "@/components/booking/BookingCountdownTimer";
import { BookingLiveVisitors } from "@/components/booking/BookingLiveVisitors";
import { BookingPersonalizedRecommendations } from "@/components/booking/BookingPersonalizedRecommendations";
import { BookingAvailabilityIndicator } from "@/components/booking/BookingAvailabilityIndicator";
import { BookingGiftCardInput } from "@/components/booking/BookingGiftCardInput";
import { BookingTherapistCompare } from "@/components/booking/BookingTherapistCompare";
import { BookingStepTransition } from "@/components/booking/BookingStepTransition";
import { BookingSmartRecommendations } from "@/components/booking/BookingSmartRecommendations";
import { BookingTherapistVideo, TherapistVideoPlayButton } from "@/components/booking/BookingTherapistVideo";
import { BookingRealtimeCalendar } from "@/components/booking/BookingRealtimeCalendar";
import { MassageDetailModal } from "@/components/booking/MassageDetailModal";
import { MassageVideoPreview } from "@/components/booking/MassageVideoPreview";
import { BookingStepHelp } from "@/components/booking/BookingStepHelp";
import { BookingEstimatedTime } from "@/components/booking/BookingEstimatedTime";
import { BookingMobileStepIndicator } from "@/components/booking/BookingMobileStepIndicator";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { useBookingAutosave } from "@/hooks/useBookingAutosave";
import { triggerHaptic } from "@/hooks/useHapticFeedback";
import { bookingContactSchema, bookingPreferencesSchema } from "@/lib/validations";
import { z } from "zod";
import { useThrottle } from "@/hooks/useThrottle";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useCustomerJourney } from "@/hooks/useCustomerJourney";
import { useApprovedTherapists, useExperienceThemes, useMassageTypes } from "@/hooks/useTherapists";

// Theme images
import themeOcean from "@/assets/themes/theme-ocean.jpg";
import themeAlpine from "@/assets/themes/theme-alpine.jpg";
import themeDark from "@/assets/themes/theme-dark.jpg";
import themeUrban from "@/assets/themes/theme-urban.jpg";
import themeZen from "@/assets/themes/theme-zen.jpg";
import themeSurprise from "@/assets/themes/theme-surprise.jpg";

// Massage images
import massageRelaxation from "@/assets/massages/massage-relaxation.jpg";
import massageDeepTissue from "@/assets/massages/massage-deep-tissue.jpg";
import massageAroma from "@/assets/massages/massage-aroma.jpg";
import massageHotstone from "@/assets/massages/massage-hotstone.jpg";
import massageSound from "@/assets/massages/massage-sound.jpg";
import massageFullbody from "@/assets/massages/massage-fullbody.jpg";

const themeImages: Record<string, string> = {
  "Ozean & Palmen": themeOcean,
  "Alpine Stille": themeAlpine,
  "Deep Dark Relax": themeDark,
  "Urban Loft": themeUrban,
  "Zen Garden": themeZen,
  "Surprise Experience": themeSurprise,
};

const massageImages: Record<string, string> = {
  "Deep Release Session": massageDeepTissue,
  "Stress Reset": massageRelaxation,
  "Emotional Grounding": massageSound,
  "Ganzkörper Tiefenentspannung": massageFullbody,
  "Aromatherapie": massageAroma,
  "Hot Stone": massageHotstone,
  "Klangtherapie": massageSound,
  "Swedish Massage": massageRelaxation,
  "Tiefenentspannung": massageFullbody,
};

const steps = [
  { id: 1, title: "Masseur:in", icon: User },
  { id: 2, title: "Themenraum", icon: Sparkles },
  { id: 3, title: "Massage", icon: Clock },
  { id: 4, title: "Präferenzen", icon: Settings },
  { id: 5, title: "Termin", icon: Calendar },
  { id: 6, title: "Bestätigung", icon: CheckCircle },
];

// Fallback static data (used if DB is empty)
const fallbackMasseurs = [
  { id: "morris", name: "Morris", role: "Inhaber & Leitender Masseur", specialties: ["Tiefenentspannung", "Emotional Grounding"] },
  { id: "anna", name: "Anna", role: "Masseurin", specialties: ["Sanfte Massage", "Stress Reset"] },
  { id: "luca", name: "Luca", role: "Masseur", specialties: ["Deep Tissue", "Körperarbeit"] },
];

const themeIcons: Record<string, React.ElementType> = {
  "Ozean & Palmen": Waves,
  "Alpine Stille": Mountain,
  "Deep Dark Relax": Moon,
  "Urban Loft": Building,
  "Zen Garden": Leaf,
  "Surprise Experience": Sparkles,
};

const massageIcons: Record<string, React.ElementType> = {
  "Deep Release Session": Heart,
  "Stress Reset": Zap,
  "Emotional Grounding": Moon,
  "Ganzkörper Tiefenentspannung": Star,
};

const Buchung = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { trackBookingStart, trackBookingStep, trackBookingComplete } = useAnalytics();
  const { 
    trackBookingStart: journeyBookingStart, 
    trackBookingStep: journeyBookingStep, 
    trackBookingComplete: journeyBookingComplete,
    trackTherapistView,
    trackExperienceView,
    trackVideoPlay,
    trackFormInteraction
  } = useCustomerJourney();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [stepDirection, setStepDirection] = useState<"forward" | "backward">("forward");
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [appliedGiftCard, setAppliedGiftCard] = useState<{ code: string; discount: number } | null>(null);
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; therapist: { name: string; videoUrl?: string | null; photoUrl?: string | null } | null }>({
    isOpen: false,
    therapist: null,
  });
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [massageDetailModal, setMassageDetailModal] = useState<{ isOpen: boolean; massageTitle: string }>({
    isOpen: false,
    massageTitle: ""
  });

  // Track booking start on mount
  useEffect(() => {
    trackBookingStart();
    journeyBookingStart();
  }, []);

  // Check for authenticated user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUserId(data.user?.id || null);
    });
  }, []);
  
  // Fetch dynamic data from database
  const { therapists: dbTherapists, isLoading: therapistsLoading } = useApprovedTherapists();
  const { themes: dbThemes, isLoading: themesLoading } = useExperienceThemes();
  const { massageTypes: dbMassageTypes, isLoading: massagesLoading } = useMassageTypes();
  
  // Build masseurs list from database + "Keine Präferenz" option
  const masseurs = useMemo(() => {
    const dynamicMasseurs = dbTherapists.length > 0 
      ? dbTherapists.map(t => ({
          id: t.id,
          name: t.name,
          role: t.specialty?.join(", ") || "Therapeut:in",
          specialties: t.specialty || [],
          photo_url: t.photo_url
        }))
      : fallbackMasseurs.map(m => ({ ...m, photo_url: null }));
    
    return [
      ...dynamicMasseurs,
      { id: "none", name: "Keine Präferenz", role: "Wir wählen intuitiv", specialties: [], photo_url: null }
    ];
  }, [dbTherapists]);
  
  // Build themes list from database
  const themes = useMemo(() => {
    if (dbThemes.length > 0) {
      return dbThemes.map(t => ({
        id: t.id,
        title: t.name,
        icon: themeIcons[t.name] || Sparkles,
        description: t.short_description || t.description || ""
      }));
    }
    // Fallback
    return [
      { id: "ozean", title: "Ozean & Palmen", icon: Waves, description: "Tropische Leichtigkeit" },
      { id: "alpine", title: "Alpine Stille", icon: Mountain, description: "Berghütten-Geborgenheit" },
      { id: "dark", title: "Deep Dark Relax", icon: Moon, description: "Maximale Tiefe" },
      { id: "urban", title: "Urban Loft", icon: Building, description: "City-Wellness" },
      { id: "zen", title: "Zen Garden", icon: Leaf, description: "Asiatische Ruhe" },
      { id: "surprise", title: "Surprise Experience", icon: Sparkles, description: "Vertrauen & Hingabe" },
    ];
  }, [dbThemes]);
  
  // Build massages list from database
  const massages = useMemo(() => {
    if (dbMassageTypes.length > 0) {
      return dbMassageTypes.map(m => ({
        id: m.id,
        title: m.name,
        icon: massageIcons[m.name] || Heart,
        durations: Array.isArray(m.durations) 
          ? m.durations.map((d: any) => d.duration || d) 
          : ["90 Min"]
      }));
    }
    // Fallback
    return [
      { id: "deep-release", title: "Deep Release Session", icon: Heart, durations: ["90 Min", "120 Min"] },
      { id: "stress-reset", title: "Stress Reset", icon: Zap, durations: ["60 Min", "90 Min"] },
      { id: "emotional-grounding", title: "Emotional Grounding", icon: Moon, durations: ["90 Min"] },
      { id: "ganzkoerper", title: "Ganzkörper Tiefenentspannung", icon: Star, durations: ["120 Min"] },
    ];
  }, [dbMassageTypes]);
  
  // Track booking start on mount
  useEffect(() => {
    trackBookingStart();
  }, []);
  
  // Rate limiting - max 3 submissions per minute, minimum 5 seconds between attempts
  const { canSubmit, cooldownSeconds, attemptsRemaining, recordSubmission } = useThrottle({
    limitMs: 5000,
    maxAttempts: 3,
    windowMs: 60000,
  });
  // Honeypot field for spam protection - bots will fill this, humans won't see it
  const [honeypot, setHoneypot] = useState("");
  
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

  // Calculate dynamic price based on selected therapist and duration
  const calculatedPrice = useMemo(() => {
    if (!formData.masseur || formData.masseur === "none" || !formData.duration) {
      return null;
    }
    
    // Find selected therapist
    const selectedTherapist = dbTherapists.find(t => t.id === formData.masseur);
    if (!selectedTherapist?.hourly_rate) {
      return null;
    }
    
    // Parse duration (e.g., "90 Min" -> 90)
    const durationMatch = formData.duration.match(/(\d+)/);
    if (!durationMatch) return null;
    
    const durationMinutes = parseInt(durationMatch[1], 10);
    const price = (selectedTherapist.hourly_rate / 60) * durationMinutes;
    
    return Math.round(price);
  }, [formData.masseur, formData.duration, dbTherapists]);

  // Final price with gift card discount
  const finalPrice = useMemo(() => {
    if (!calculatedPrice) return null;
    if (appliedGiftCard) {
      return Math.max(0, calculatedPrice - appliedGiftCard.discount);
    }
    return calculatedPrice;
  }, [calculatedPrice, appliedGiftCard]);

  // Autosave functionality
  const handleRestoreBooking = useCallback((data: Record<string, unknown>, step: number) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(step);
  }, []);

  const { hasDraft, draftAge, restoreDraft, dismissDraft, clearDraft } = useBookingAutosave(
    formData as unknown as Record<string, unknown>,
    currentStep,
    handleRestoreBooking
  );

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
            
            {/* Loading state */}
            {therapistsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-border animate-pulse">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-muted" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 bg-muted rounded w-24" />
                        <div className="h-4 bg-muted rounded w-32" />
                        <div className="flex gap-1">
                          <div className="h-5 bg-muted rounded w-16" />
                          <div className="h-5 bg-muted rounded w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {masseurs.map((masseur) => {
                  const isSelected = formData.masseur === masseur.id;
                  const therapistData = dbTherapists.find(t => t.id === masseur.id);
                  const isFeatured = therapistData?.is_featured;
                  
                  return (
                    <motion.button
                      key={masseur.id}
                      onClick={() => {
                        updateFormData("masseur", masseur.id);
                        triggerHaptic('light');
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 text-left transition-all min-h-[100px] touch-manipulation",
                        isSelected
                          ? "border-copper bg-copper/5 shadow-md"
                          : "border-border hover:border-copper/50 active:border-copper/50"
                      )}
                    >
                      {/* Featured badge */}
                      {isFeatured && (
                        <div className="absolute -top-2 -right-2 bg-copper text-accent-foreground text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Award size={10} />
                          <span>Top</span>
                        </div>
                      )}
                      
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="relative flex-shrink-0">
                          {masseur.photo_url ? (
                            <img 
                              src={masseur.photo_url} 
                              alt={masseur.name}
                              className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl object-cover ring-2 ring-background"
                            />
                          ) : (
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-sand flex items-center justify-center">
                              {masseur.id === "none" ? (
                                <Users size={20} className="text-warm-gray sm:hidden" />
                              ) : (
                                <User size={20} className="text-warm-gray sm:hidden" />
                              )}
                              {masseur.id === "none" ? (
                                <Users size={24} className="text-warm-gray hidden sm:block" />
                              ) : (
                                <User size={24} className="text-warm-gray hidden sm:block" />
                              )}
                            </div>
                          )}
                          {/* Video Play Button */}
                          {therapistData?.video_url && (
                            <TherapistVideoPlayButton
                              hasVideo={!!therapistData.video_url}
                              onClick={() => setVideoModal({
                                isOpen: true,
                                therapist: {
                                  name: masseur.name,
                                  videoUrl: therapistData.video_url,
                                  photoUrl: masseur.photo_url,
                                },
                              })}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-base sm:text-lg text-foreground mb-0.5 sm:mb-1">
                            {masseur.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">
                            {masseur.role}
                          </p>
                          {therapistData?.hourly_rate && (
                            <p className="text-xs text-copper font-medium mb-1">
                              CHF {therapistData.hourly_rate}/Std.
                            </p>
                          )}
                          {masseur.specialties.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {masseur.specialties.slice(0, 2).map((s) => (
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
                      {isSelected && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-5 h-5 sm:w-6 sm:h-6 bg-copper rounded-full flex items-center justify-center"
                        >
                          <Check size={12} className="text-accent-foreground sm:hidden" />
                          <Check size={14} className="text-accent-foreground hidden sm:block" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}
            
            {/* Compare therapists button */}
            {!therapistsLoading && dbTherapists.length > 1 && (
              <button
                onClick={() => setShowCompareModal(true)}
                className="flex items-center gap-2 text-sm text-petrol hover:text-petrol/80 transition-colors mx-auto mt-4"
              >
                <Scale size={16} />
                <span>Therapeut:innen vergleichen</span>
              </button>
            )}
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
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {themes.map((theme) => {
                const isSelected = formData.theme === theme.id;
                const themeImage = themeImages[theme.title] || themeSurprise;
                
                return (
                  <motion.button
                    key={theme.id}
                    onClick={() => {
                      updateFormData("theme", theme.id);
                      triggerHaptic('light');
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "relative rounded-xl sm:rounded-2xl border-2 text-left transition-all overflow-hidden group aspect-[4/3]",
                      isSelected
                        ? "border-copper shadow-lg ring-2 ring-copper/30"
                        : "border-transparent hover:border-copper/50"
                    )}
                  >
                    {/* Background Image */}
                    <img
                      src={themeImage}
                      alt={theme.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
                      <h3 className="font-display text-sm sm:text-lg text-white mb-0.5 leading-tight drop-shadow-md">
                        {theme.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-white/80 line-clamp-2 drop-shadow">
                        {theme.description}
                      </p>
                    </div>
                    
                    {/* Selection indicator */}
                    {isSelected && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-7 sm:h-7 bg-copper rounded-full flex items-center justify-center z-10 shadow-lg"
                      >
                        <Check size={12} className="text-white sm:hidden" />
                        <Check size={14} className="text-white hidden sm:block" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
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
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {massages.map((massage) => {
                const isSelected = formData.massage === massage.id;
                const massageImage = massageImages[massage.title] || massageFullbody;
                
                return (
                  <motion.button
                    key={massage.id}
                    onClick={() => {
                      updateFormData("massage", massage.id);
                      updateFormData("duration", "");
                      triggerHaptic('light');
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "relative rounded-xl sm:rounded-2xl border-2 text-left transition-all overflow-hidden group aspect-[4/3]",
                      isSelected
                        ? "border-copper shadow-lg ring-2 ring-copper/30"
                        : "border-transparent hover:border-copper/50"
                    )}
                  >
                    {/* Video Preview on Hover */}
                    <MassageVideoPreview
                      massageTitle={massage.title}
                      imageUrl={massageImage}
                      isSelected={isSelected}
                      onSelect={() => {
                        updateFormData("massage", massage.id);
                        updateFormData("duration", "");
                      }}
                      onShowDetails={() => setMassageDetailModal({ isOpen: true, massageTitle: massage.title })}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end pointer-events-none">
                      <h3 className="font-display text-sm sm:text-lg text-white mb-1 leading-tight">
                        {massage.title}
                      </h3>
                      <p className="text-xs text-white/70 line-clamp-1">
                        {massage.durations.join(" / ")}
                      </p>
                    </div>
                    
                    {/* Selection Indicator */}
                    {isSelected && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 bg-copper rounded-full flex items-center justify-center shadow-lg pointer-events-none"
                      >
                        <Check size={14} className="text-accent-foreground sm:hidden" />
                        <Check size={18} className="text-accent-foreground hidden sm:block" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {formData.massage && (
              <div className="space-y-4">
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
                
                {/* Price Display */}
                {calculatedPrice && formData.duration && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-copper/5 border border-copper/20 rounded-xl"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Geschätzter Preis</span>
                      <span className="font-display text-2xl text-copper font-medium">
                        CHF {calculatedPrice}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Basierend auf Therapeut:in & Dauer (exkl. MwSt.)
                    </p>
                  </motion.div>
                )}
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
                <Label className="mb-4 block flex items-center gap-2">
                  <Volume2 size={16} className="text-copper" />
                  Musik
                </Label>
                <RadioGroup
                  value={formData.music}
                  onValueChange={(v) => updateFormData("music", v)}
                  className="flex flex-wrap gap-3"
                >
                  {[
                    { value: "leise", label: "Sehr leise", icon: Volume1 },
                    { value: "normal", label: "Normal", icon: Volume2 },
                    { value: "keine", label: "Keine Musik", icon: VolumeX },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center">
                      <RadioGroupItem value={opt.value} id={`music-${opt.value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`music-${opt.value}`}
                        className={cn(
                          "px-4 py-2.5 rounded-lg border cursor-pointer transition-all flex items-center gap-2",
                          formData.music === opt.value
                            ? "border-copper bg-copper/10 text-copper"
                            : "border-border hover:border-copper/50"
                        )}
                      >
                        <opt.icon size={16} />
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="mb-4 block flex items-center gap-2">
                  <MessageCircle size={16} className="text-copper" />
                  Gespräch
                </Label>
                <RadioGroup
                  value={formData.conversation}
                  onValueChange={(v) => updateFormData("conversation", v)}
                  className="flex flex-wrap gap-3"
                >
                  {[
                    { value: "schweigend", label: "Bitte schweigend", icon: MessageCircleOff },
                    { value: "smalltalk", label: "Leichter Smalltalk ok", icon: MessageCircle },
                    { value: "spontan", label: "Ich entscheide spontan", icon: Sparkles },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center">
                      <RadioGroupItem value={opt.value} id={`conv-${opt.value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`conv-${opt.value}`}
                        className={cn(
                          "px-4 py-2.5 rounded-lg border cursor-pointer transition-all flex items-center gap-2",
                          formData.conversation === opt.value
                            ? "border-copper bg-copper/10 text-copper"
                            : "border-border hover:border-copper/50"
                        )}
                      >
                        <opt.icon size={16} />
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="mb-4 block flex items-center gap-2">
                  <Hand size={16} className="text-copper" />
                  Berührungsintensität
                </Label>
                <RadioGroup
                  value={formData.intensity}
                  onValueChange={(v) => updateFormData("intensity", v)}
                  className="flex flex-wrap gap-3"
                >
                  {[
                    { value: "sanft", label: "Sehr sanft", icon: Feather },
                    { value: "mittel", label: "Mittel", icon: Hand },
                    { value: "tief", label: "Tief, aber nicht schmerzhaft", icon: Heart },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center">
                      <RadioGroupItem value={opt.value} id={`int-${opt.value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`int-${opt.value}`}
                        className={cn(
                          "px-4 py-2.5 rounded-lg border cursor-pointer transition-all flex items-center gap-2",
                          formData.intensity === opt.value
                            ? "border-copper bg-copper/10 text-copper"
                            : "border-border hover:border-copper/50"
                        )}
                      >
                        <opt.icon size={16} />
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

              <motion.div 
                className={cn(
                  "flex items-start space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer",
                  formData.intuitive 
                    ? "bg-copper/10 border-copper" 
                    : "bg-secondary/50 border-transparent hover:border-copper/30"
                )}
                onClick={() => updateFormData("intuitive", !formData.intuitive)}
                whileTap={{ scale: 0.99 }}
              >
                <Checkbox
                  id="intuitive"
                  checked={formData.intuitive}
                  onCheckedChange={(c) => updateFormData("intuitive", c)}
                  className="mt-0.5"
                />
                <div>
                  <Label htmlFor="intuitive" className="font-medium cursor-pointer flex items-center gap-2">
                    <Sparkles size={16} className="text-copper" />
                    Ich überlasse GentleHands vieles intuitiv
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Wir entscheiden basierend auf Ihrem Zustand vor Ort – für maximale Entspannung.
                  </p>
                </div>
              </motion.div>
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

            {/* Availability Indicator - Hot Slots */}
            <div className="mb-6">
              <BookingAvailabilityIndicator
                selectedDate={formData.selectedDate}
                selectedTime={formData.selectedTime}
                onSelectSlot={(date, time) => {
                  updateFormData("selectedDate", date);
                  updateFormData("selectedTime", time);
                  triggerHaptic('medium');
                }}
              />
            </div>

            {/* Realtime Availability Calendar */}
            <div className="mb-8">
              <BookingRealtimeCalendar
                selectedTherapistId={formData.masseur}
                therapists={masseurs.map(m => ({
                  id: m.id,
                  name: m.name,
                  photo_url: m.photo_url,
                  color: dbTherapists.find(t => t.id === m.id)?.color,
                }))}
                onSelectSlot={(therapistId, therapistName, date, time) => {
                  updateFormData("selectedDate", date);
                  updateFormData("selectedTime", time);
                  // Update masseur if "none" was selected
                  if (formData.masseur === "none" || formData.masseur === "") {
                    updateFormData("masseur", therapistId);
                  }
                  triggerHaptic('medium');
                  toast({
                    title: "Termin ausgewählt",
                    description: `${format(date, "d. MMMM yyyy", { locale: de })} um ${time} Uhr bei ${therapistName}`,
                  });
                }}
                selectedDate={formData.selectedDate}
                selectedTime={formData.selectedTime}
              />
              
              {/* Selected appointment display */}
              {formData.selectedDate && formData.selectedTime && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/30 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Ausgewählter Termin</p>
                    <p className="text-sm text-muted-foreground">
                      {format(formData.selectedDate, "EEEE, d. MMMM yyyy", { locale: de })} um {formData.selectedTime} Uhr
                    </p>
                  </div>
                </motion.div>
              )}
              
              {/* Countdown Timer for selected time */}
              {formData.selectedTime && (
                <div className="mt-4">
                  <BookingCountdownTimer selectedTime={formData.selectedTime} />
                </div>
              )}
              
              {/* Social Proof */}
              <div className="mt-4">
                <BookingSocialProof 
                  selectedTime={formData.selectedTime}
                  selectedDate={formData.selectedDate}
                />
              </div>
              
              {/* Animated Testimonials */}
              <div className="mt-6">
                <BookingTestimonialSlider />
              </div>
            </div>
            
            {/* Gift Card Input */}
            <div className="mb-6">
              <BookingGiftCardInput
                onApply={(code, discount) => setAppliedGiftCard({ code, discount })}
                onRemove={() => setAppliedGiftCard(null)}
                appliedCode={appliedGiftCard?.code}
                appliedDiscount={appliedGiftCard?.discount}
                maxDiscount={calculatedPrice || undefined}
              />
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
                  aria-invalid={!!formErrors.name}
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                />
                {formErrors.name && (
                  <p id="name-error" className="text-sm text-destructive" role="alert">{formErrors.name}</p>
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
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? "email-error" : undefined}
                />
                {formErrors.email && (
                  <p id="email-error" className="text-sm text-destructive" role="alert">{formErrors.email}</p>
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
                  aria-invalid={!!formErrors.phone}
                  aria-describedby={formErrors.phone ? "phone-error" : undefined}
                />
                {formErrors.phone && (
                  <p id="phone-error" className="text-sm text-destructive" role="alert">{formErrors.phone}</p>
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

            {/* Honeypot field - hidden from humans, bots will fill it */}
            <div 
              className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" 
              aria-hidden="true"
              tabIndex={-1}
            >
              <label htmlFor="website_url">Website (leave empty)</label>
              <input
                type="text"
                id="website_url"
                name="website_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
              />
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
                  <Link to="/rechtliches#agb" className="text-primary underline" target="_blank" onClick={(e) => e.stopPropagation()}>
                    AGB
                  </Link>{" "}
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
                  <Link to="/rechtliches#datenschutz" className="text-primary underline" target="_blank" onClick={(e) => e.stopPropagation()}>
                    Datenschutzerklärung
                  </Link>{" "}
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
              
              {/* Dynamic Price Display */}
              {calculatedPrice && (
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Geschätzter Preis</span>
                    <span className="text-2xl font-display text-copper font-semibold">
                      CHF {calculatedPrice}.-
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Basierend auf dem Stundensatz von {dbTherapists.find(t => t.id === formData.masseur)?.name}
                  </p>
                </div>
              )}
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
      <SEOHead 
        title="Online Buchen – Themenraum & Massage wählen | GentleHands Zürich"
        description="Buchen Sie Ihre Tiefenentspannung online: Wählen Sie Therapeut:in, Themenraum, Massageart und Ihre persönlichen Präferenzen. In 6 einfachen Schritten."
        canonical="https://gentlehands.ch/buchung"
      />

      {/* FOMO Popup */}
      <BookingFOMOPopup />

      {/* Draft Recovery Banner */}
      <BookingDraftRecovery
        isVisible={hasDraft}
        draftAge={draftAge}
        onRestore={restoreDraft}
        onDismiss={dismissDraft}
      />

      {/* Floating Summary Sidebar (Desktop) */}
      <BookingFloatingSummary
        currentStep={currentStep}
        formData={formData}
        masseurs={masseurs}
        themes={themes}
        massages={massages}
        calculatedPrice={calculatedPrice}
        appliedGiftCard={appliedGiftCard}
      />

      {/* Therapist Compare Modal */}
      <BookingTherapistCompare
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        therapists={dbTherapists.map(t => ({
          id: t.id,
          name: t.name,
          specialties: t.specialty || [],
          photo_url: t.photo_url,
          hourly_rate: t.hourly_rate,
          average_rating: t.average_rating,
          total_bookings: t.total_bookings,
          experience_years: t.experience_years,
          is_featured: t.is_featured,
        }))}
        selectedId={formData.masseur}
        onSelect={(id) => {
          updateFormData("masseur", id);
          triggerHaptic('success');
        }}
      />

      {/* Therapist Video Modal */}
      <BookingTherapistVideo
        therapistName={videoModal.therapist?.name || ""}
        videoUrl={videoModal.therapist?.videoUrl}
        photoUrl={videoModal.therapist?.photoUrl}
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ isOpen: false, therapist: null })}
      />

      <section className="pt-24 sm:pt-32 pb-8 sm:pb-16 min-h-screen">
        <div className="container-narrow px-3 sm:px-6">
          {/* Progress Steps - Mobile Optimized */}
          <div className="mb-8 sm:mb-12">
            {/* Mobile: Enhanced step indicator */}
            <div className="flex flex-col items-center sm:hidden mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-copper/10 flex items-center justify-center">
                  {(() => {
                    const StepIcon = steps[currentStep - 1]?.icon || User;
                    return <StepIcon size={16} className="text-copper" />;
                  })()}
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">{steps[currentStep - 1]?.title}</span>
                  <span className="text-xs text-muted-foreground ml-2">({currentStep}/{steps.length})</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 w-full max-w-[200px]">
                {steps.map((step) => (
                  <motion.div
                    key={step.id}
                    initial={false}
                    animate={{
                      width: currentStep >= step.id ? 32 : 16,
                      backgroundColor: currentStep >= step.id ? 'hsl(var(--copper))' : 'hsl(var(--border))'
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-1.5 rounded-full"
                  />
                ))}
              </div>
            </div>
            
            {/* Desktop: Full step indicator */}
            <div className="hidden sm:flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center min-w-[60px]">
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
                      className={`mt-2 text-xs text-center whitespace-nowrap ${
                        currentStep >= step.id
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-2 min-w-[20px] ${
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

          {/* Live Visitors */}
          {currentStep < 6 && (
            <div className="mb-6">
              <BookingLiveVisitors />
            </div>
          )}

          {/* Personalized Recommendations */}
          {currentStep === 1 && (
            <BookingPersonalizedRecommendations
              userEmail={formData.email}
              onSelectTherapist={(id) => {
                updateFormData("masseur", id);
                triggerHaptic('light');
              }}
              onSelectTheme={(id) => {
                updateFormData("theme", id);
                triggerHaptic('light');
              }}
              onSelectMassage={(id) => {
                updateFormData("massage", id);
                triggerHaptic('light');
              }}
              onSelectTime={(time) => {
                updateFormData("selectedTime", time);
                triggerHaptic('light');
              }}
            />
          )}

          {/* Smart Recommendations */}
          {currentStep <= 3 && (
            <BookingSmartRecommendations
              userId={currentUserId}
              onSelectTherapist={(id) => {
                updateFormData("masseur", id);
                triggerHaptic('light');
              }}
              onSelectTheme={(id) => {
                updateFormData("theme", id);
                triggerHaptic('light');
              }}
              onSelectMassage={(id) => {
                updateFormData("massage", id);
                updateFormData("duration", "");
                triggerHaptic('light');
              }}
              currentTherapist={formData.masseur}
              currentTheme={formData.theme}
              currentMassage={formData.massage}
            />
          )}

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

          {/* Enhanced Trust Badges */}
          {currentStep < 6 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-petrol/5 via-copper/5 to-petrol/5 rounded-xl border border-border/50">
              <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap text-xs sm:text-sm">
                <div className="flex items-center gap-1.5">
                  <Shield size={14} className="text-copper" />
                  <span className="text-muted-foreground">100% Diskret</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-copper" />
                  <span className="text-muted-foreground">4.9/5 ★</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-copper" />
                  <span className="text-muted-foreground">Kostenlose Stornierung</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <Award size={14} className="text-copper" />
                  <span className="text-muted-foreground">Zertifizierte Therapeut:innen</span>
                </div>
                <div className="hidden md:flex items-center gap-1.5">
                  <Lock size={14} className="text-copper" />
                  <span className="text-muted-foreground">Sichere Buchung</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation - Mobile Optimized */}
          <div className="flex justify-between mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border gap-3">
            {currentStep > 1 && currentStep < 6 ? (
              <Button
                variant="outline"
                onClick={() => {
                  setStepDirection("backward");
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
                  setStepDirection("forward");
                  const nextStep = currentStep + 1;
                  setCurrentStep(nextStep);
                  trackBookingStep(nextStep, steps[nextStep - 1]?.title || '');
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

                  // Check honeypot - if filled, silently reject (bot detected)
                  if (honeypot) {
                    console.warn("Honeypot triggered - potential bot submission blocked");
                    // Simulate success to avoid revealing detection
                    setIsSubmitting(true);
                    setTimeout(() => {
                      setIsSubmitting(false);
                      toast({
                        title: "Buchung erfolgreich",
                        description: "Wir melden uns in Kürze bei Ihnen.",
                      });
                    }, 1500);
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
                    
                    // Save to database with status 'pending_verification'
                    const { data: insertedBooking, error } = await supabase.from("bookings").insert({
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
                      status: "pending_verification", // New status for email verification
                      is_verified: false,
                    }).select("id, verification_token").single();

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

                    // Send verification email via edge function
                    try {
                      await supabase.functions.invoke("send-booking-verification", {
                        body: {
                          booking_id: insertedBooking.id,
                          customer_email: formData.email.trim().toLowerCase(),
                          customer_name: formData.name.trim(),
                          booking_number: bookingNumber,
                          verification_token: insertedBooking.verification_token,
                        },
                      });
                    } catch (verifyError) {
                      console.error("Verification email error:", verifyError);
                      // Don't block - user can still verify later
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
                      pendingVerification: true, // Flag for confirmation page
                    };
                    localStorage.setItem("gentlehands_booking", JSON.stringify(bookingData));
                    
                    // Track booking (note: not complete until verified)
                    trackBookingComplete(bookingNumber);
                    
                    // Clear draft on successful submission
                    clearDraft();
                    
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
      
      {/* Massage Detail Modal */}
      <MassageDetailModal
        isOpen={massageDetailModal.isOpen}
        onClose={() => setMassageDetailModal({ isOpen: false, massageTitle: "" })}
        massageTitle={massageDetailModal.massageTitle}
        onSelect={() => {
          const massage = massages.find(m => m.title === massageDetailModal.massageTitle);
          if (massage) {
            updateFormData("massage", massage.id);
            updateFormData("duration", "");
          }
        }}
      />
    </Layout>
  );
};

export default Buchung;
