import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { FloatingCTA } from "@/components/shared/FloatingCTA";
import { NewsletterPopup } from "@/components/shared/NewsletterPopup";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import Index from "./pages/Index";
import Erlebnisse from "./pages/Erlebnisse";
import Massagen from "./pages/Massagen";
import Team from "./pages/Team";
import UeberUns from "./pages/UeberUns";
import Erfahrungen from "./pages/Erfahrungen";
import FAQ from "./pages/FAQ";
import Ratgeber from "./pages/Ratgeber";
import Kontakt from "./pages/Kontakt";
import Rechtliches from "./pages/Rechtliches";
import Buchung from "./pages/Buchung";
import BuchungBestaetigung from "./pages/BuchungBestaetigung";
import Gutscheine from "./pages/Gutscheine";
import Warteliste from "./pages/Warteliste";
import Preise from "./pages/Preise";
import Quiz from "./pages/Quiz";
import Galerie from "./pages/Galerie";
import Vorbereitung from "./pages/Vorbereitung";
import Business from "./pages/Business";
import Membership from "./pages/Membership";
import Aromatherapie from "./pages/Aromatherapie";
import Soundtherapie from "./pages/Soundtherapie";
import Vergleich from "./pages/Vergleich";
import Saisonal from "./pages/Saisonal";
import Partner from "./pages/Partner";
import Presse from "./pages/Presse";
import Karriere from "./pages/Karriere";
import Nachhaltigkeit from "./pages/Nachhaltigkeit";
import VirtualTour from "./pages/VirtualTour";
import Geschenkideen from "./pages/Geschenkideen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LoadingScreen duration={2500} />
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingCTA />
          <CookieConsent />
          <NewsletterPopup />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
