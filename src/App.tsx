import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
