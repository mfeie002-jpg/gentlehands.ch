import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { FloatingCTA } from "@/components/shared/FloatingCTA";
import { NewsletterPopup } from "@/components/shared/NewsletterPopup";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { LiveChatWidget } from "@/components/shared/LiveChatWidget";
import { PageLoadingFallback } from "@/components/shared/PageLoadingFallback";
import { CriticalImagePreloader } from "@/components/shared/CriticalImagePreloader";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { GoogleAnalytics } from "@/components/shared/GoogleAnalytics";

// Critical pages - loaded immediately
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy loaded pages - loaded on demand
const Erlebnisse = lazy(() => import("./pages/Erlebnisse"));
const Massagen = lazy(() => import("./pages/Massagen"));
const Team = lazy(() => import("./pages/Team"));
const UeberUns = lazy(() => import("./pages/UeberUns"));
const Erfahrungen = lazy(() => import("./pages/Erfahrungen"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Ratgeber = lazy(() => import("./pages/Ratgeber"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const Rechtliches = lazy(() => import("./pages/Rechtliches"));
const Buchung = lazy(() => import("./pages/Buchung"));
const BuchungBestaetigung = lazy(() => import("./pages/BuchungBestaetigung"));
const Gutscheine = lazy(() => import("./pages/Gutscheine"));
const Warteliste = lazy(() => import("./pages/Warteliste"));
const Preise = lazy(() => import("./pages/Preise"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Galerie = lazy(() => import("./pages/Galerie"));
const Vorbereitung = lazy(() => import("./pages/Vorbereitung"));
const Business = lazy(() => import("./pages/Business"));
const Membership = lazy(() => import("./pages/Membership"));
const Aromatherapie = lazy(() => import("./pages/Aromatherapie"));
const Soundtherapie = lazy(() => import("./pages/Soundtherapie"));
const Vergleich = lazy(() => import("./pages/Vergleich"));
const Saisonal = lazy(() => import("./pages/Saisonal"));
const Partner = lazy(() => import("./pages/Partner"));
const Presse = lazy(() => import("./pages/Presse"));
const Karriere = lazy(() => import("./pages/Karriere"));
const Nachhaltigkeit = lazy(() => import("./pages/Nachhaltigkeit"));
const VirtualTour = lazy(() => import("./pages/VirtualTour"));
const Geschenkideen = lazy(() => import("./pages/Geschenkideen"));
const Admin = lazy(() => import("./pages/Admin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Empfehlen = lazy(() => import("./pages/Empfehlen"));
const Philosophie = lazy(() => import("./pages/Philosophie"));
const BuchungVerifizieren = lazy(() => import("./pages/BuchungVerifizieren"));
const Performance = lazy(() => import("./pages/Performance"));
const LogoPreview = lazy(() => import("./pages/LogoPreview"));
const TherapistRegistration = lazy(() => import("./pages/TherapistRegistration"));
const TherapistDashboard = lazy(() => import("./pages/TherapistDashboard"));
const TherapistConfirmation = lazy(() => import("./pages/TherapistConfirmation"));

// English pages
const IndexEN = lazy(() => import("./pages/en/Index"));
const ExperiencesEN = lazy(() => import("./pages/en/Experiences"));
const MassagesEN = lazy(() => import("./pages/en/Massages"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Route change handler for analytics and accessibility
const RouteChangeHandler = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page views (placeholder for analytics)
    const pageTitle = document.title;
    
    // Announce route change to screen readers
    const announcer = document.getElementById("page-announcer");
    if (announcer) {
      const pageName = pageTitle.split(" – ")[0] || "Seite";
      announcer.textContent = `Navigiert zu: ${pageName}`;
    }
  }, [location.pathname]);
  
  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={300}>
        <LoadingScreen duration={2500} />
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <ErrorBoundary>
            <GoogleAnalytics />
            <RouteChangeHandler />
            <Suspense fallback={<PageLoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/erlebnisse" element={<Erlebnisse />} />
                <Route path="/massagen" element={<Massagen />} />
                <Route path="/team" element={<Team />} />
                <Route path="/ueber-uns" element={<UeberUns />} />
                <Route path="/erfahrungen" element={<Erfahrungen />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/ratgeber" element={<Ratgeber />} />
                <Route path="/kontakt" element={<Kontakt />} />
                <Route path="/rechtliches" element={<Rechtliches />} />
                <Route path="/buchung" element={<Buchung />} />
                <Route path="/buchung/bestaetigung" element={<BuchungBestaetigung />} />
                <Route path="/buchung/verifizieren" element={<BuchungVerifizieren />} />
                <Route path="/gutscheine" element={<Gutscheine />} />
                <Route path="/warteliste" element={<Warteliste />} />
                <Route path="/preise" element={<Preise />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/galerie" element={<Galerie />} />
                <Route path="/vorbereitung" element={<Vorbereitung />} />
                <Route path="/business" element={<Business />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/aromatherapie" element={<Aromatherapie />} />
                <Route path="/soundtherapie" element={<Soundtherapie />} />
                <Route path="/vergleich" element={<Vergleich />} />
                <Route path="/saisonal" element={<Saisonal />} />
                <Route path="/partner" element={<Partner />} />
                <Route path="/presse" element={<Presse />} />
                <Route path="/karriere" element={<Karriere />} />
                <Route path="/nachhaltigkeit" element={<Nachhaltigkeit />} />
                <Route path="/virtual-tour" element={<VirtualTour />} />
                <Route path="/geschenkideen" element={<Geschenkideen />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/empfehlen" element={<Empfehlen />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/logo-preview" element={<LogoPreview />} />
                {/* Therapist Portal */}
                <Route path="/therapeut/registrierung" element={<TherapistRegistration />} />
                <Route path="/therapeut/dashboard" element={<TherapistDashboard />} />
                <Route path="/therapeut/bestaetigung" element={<TherapistConfirmation />} />
                {/* English routes */}
                <Route path="/en" element={<IndexEN />} />
                <Route path="/en/experiences" element={<ExperiencesEN />} />
                <Route path="/en/massages" element={<MassagesEN />} />
                <Route path="/philosophie" element={<Navigate to="/ueber-uns" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <CriticalImagePreloader />
            <FloatingCTA />
            <NewsletterPopup />
            <LiveChatWidget />
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
