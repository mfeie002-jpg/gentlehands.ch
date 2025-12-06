import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { ThemesPreviewSection } from "@/components/home/ThemesPreviewSection";
import { MassagesPreviewSection } from "@/components/home/MassagesPreviewSection";
import { TeamPreviewSection } from "@/components/home/TeamPreviewSection";

import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ExclusivitySection } from "@/components/home/ExclusivitySection";
import { StatsSection } from "@/components/home/StatsSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { CTASection } from "@/components/home/CTASection";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { SessionProcessSection } from "@/components/home/SessionProcessSection";
import { TrustIndicatorsSection } from "@/components/home/TrustIndicatorsSection";
import { HomeFAQSection } from "@/components/home/HomeFAQSection";
import { SafetyBoundariesSection } from "@/components/home/SafetyBoundariesSection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "GentleHands",
    "description": "Exklusive Erlebnismassagen für Frauen in Zürich. Tiefenentspannung in atmosphärischen Themenräumen, absolute Diskretion und professionelle Betreuung.",
    "url": "https://gentlehands.ch",
    "telephone": "+41 00 000 00 00",
    "email": "kontakt@gentlehands.ch",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zürich",
      "addressCountry": "CH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.3769,
      "longitude": 8.5417
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:00",
      "closes": "21:00"
    },
    "priceRange": "$$$$",
    "image": "https://gentlehands.ch/og-image.jpg",
    "sameAs": []
  };

  return (
    <Layout>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>GentleHands – Exklusive Erlebnismassagen für Frauen | Zürich</title>
        <meta
          name="description"
          content="GentleHands bietet exklusive Erlebnismassagen nur für Frauen in Zürich. Tiefenentspannung in atmosphärischen Themenräumen, absolute Diskretion und professionelle Betreuung."
        />
        <meta
          name="keywords"
          content="Erlebnismassage Frauen Zürich, Entspannungsmassage Frauen, Premium Massage Zürich, Wellness Frauen, Tiefenentspannung, Massagen nur für Frauen"
        />
        <link rel="canonical" href="https://gentlehands.ch/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gentlehands.ch/" />
        <meta property="og:title" content="GentleHands – Exklusive Erlebnismassagen für Frauen in Zürich" />
        <meta property="og:description" content="Tiefenentspannung in atmosphärischen Themenräumen. Nur für Frauen. Absolute Diskretion. Zürich." />
        <meta property="og:image" content="https://gentlehands.ch/og-image.jpg" />
        <meta property="og:locale" content="de_CH" />
        <meta property="og:site_name" content="GentleHands" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://gentlehands.ch/" />
        <meta name="twitter:title" content="GentleHands – Exklusive Erlebnismassagen für Frauen" />
        <meta name="twitter:description" content="Tiefenentspannung in atmosphärischen Themenräumen. Nur für Frauen. Zürich." />
        <meta name="twitter:image" content="https://gentlehands.ch/og-image.jpg" />
        
        {/* Additional Meta */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="GentleHands" />
        <meta name="geo.region" content="CH-ZH" />
        <meta name="geo.placename" content="Zürich" />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      {/* Hero - Emotionaler Einstieg */}
      <HeroSection />

      {/* Trust Indicators - Vertrauenssignale direkt nach Hero */}
      <TrustIndicatorsSection />

      {/* Stats - Soziale Beweise */}
      <StatsSection />

      {/* Philosophy - Werte & Versprechen */}
      <PhilosophySection />

      {/* How It Works - Buchungsprozess erklärt */}
      <HowItWorksSection />

      {/* Benefits - Vorteile von GentleHands */}
      <BenefitsSection />

      {/* Themes - Erlebnisräume */}
      <ThemesPreviewSection />

      {/* Massages - Massage-Angebote */}
      <MassagesPreviewSection />

      {/* Session Process - Was erwartet Sie */}
      <SessionProcessSection />

      {/* Team - Therapeut:innen */}
      <TeamPreviewSection />

      {/* Safety & Boundaries - Grenzen & Kontrolle */}
      <SafetyBoundariesSection />

      {/* Testimonials - Kundenstimmen */}
      <TestimonialsSection />

      {/* Home FAQ - Wichtigste Fragen */}
      <HomeFAQSection />

      {/* CTA - Handlungsaufforderung */}
      <CTASection />

      {/* Exclusivity - Limitierte Verfügbarkeit */}
      <ExclusivitySection />
    </Layout>
  );
};

export default Index;
