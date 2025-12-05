import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { ThemesPreviewSection } from "@/components/home/ThemesPreviewSection";
import { MassagesPreviewSection } from "@/components/home/MassagesPreviewSection";
import { TeamPreviewSection } from "@/components/home/TeamPreviewSection";
import { WhyWomenOnlySection } from "@/components/home/WhyWomenOnlySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ExclusivitySection } from "@/components/home/ExclusivitySection";
import { StatsSection } from "@/components/home/StatsSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { CTASection } from "@/components/home/CTASection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "GentleHands",
    "description": "Exklusive Erlebnismassagen für Frauen in Zürich. Tiefenentspannung, thematische Erlebnisräume und persönliche Betreuung.",
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
          content="GentleHands bietet exklusive Erlebnismassagen nur für Frauen in Zürich. Tiefenentspannung, thematische Erlebnisräume und persönliche Betreuung."
        />
        <meta
          name="keywords"
          content="Erlebnismassage Frauen, Entspannungsmassage Zürich, Premium Massage, Wellness Frauen, Tiefenentspannung"
        />
        <link rel="canonical" href="https://gentlehands.ch/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gentlehands.ch/" />
        <meta property="og:title" content="GentleHands – Exklusive Erlebnismassagen für Frauen" />
        <meta property="og:description" content="Tiefenentspannung in atmosphärischen Erlebnisräumen. Nur für Frauen. Zürich." />
        <meta property="og:image" content="https://gentlehands.ch/og-image.jpg" />
        <meta property="og:locale" content="de_CH" />
        <meta property="og:site_name" content="GentleHands" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://gentlehands.ch/" />
        <meta name="twitter:title" content="GentleHands – Exklusive Erlebnismassagen für Frauen" />
        <meta name="twitter:description" content="Tiefenentspannung in atmosphärischen Erlebnisräumen. Nur für Frauen. Zürich." />
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

      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <BenefitsSection />
      <ThemesPreviewSection />
      <MassagesPreviewSection />
      <TeamPreviewSection />
      <WhyWomenOnlySection />
      <TestimonialsSection />
      <CTASection />
      <ExclusivitySection />
    </Layout>
  );
};

export default Index;
