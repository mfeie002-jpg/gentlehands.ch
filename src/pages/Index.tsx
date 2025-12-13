import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustIndicatorsSection } from "@/components/home/TrustIndicatorsSection";
import { EmotionalBenefitsSection } from "@/components/home/EmotionalBenefitsSection";
import { ExclusiveServicesSection } from "@/components/home/ExclusiveServicesSection";
import { ExperiencePreviewSection } from "@/components/home/ExperiencePreviewSection";
import { TherapistSpotlightSection } from "@/components/home/TherapistSpotlightSection";
import { SafetyCommitmentSection } from "@/components/home/SafetyCommitmentSection";
import { FAQPreviewSection } from "@/components/home/FAQPreviewSection";
import { FirstVisitGuideSection } from "@/components/home/FirstVisitGuideSection";
import { PricePreviewSection } from "@/components/home/PricePreviewSection";
import { WellnessQuizTeaser } from "@/components/home/WellnessQuizTeaser";
import { LocationPreviewSection } from "@/components/home/LocationPreviewSection";
import { GiftIdeaSection } from "@/components/home/GiftIdeaSection";
import { MembershipTeaser } from "@/components/home/MembershipTeaser";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import { SEOHead } from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { AnimatedTestimonialSlider } from "@/components/testimonials/AnimatedTestimonialSlider";
import { AnimatedStatsSection } from "@/components/stats/AnimatedStatsSection";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "GentleHands",
    "description": "Exklusive Erlebnismassagen für Frauen in Zürich. Tiefenentspannung in atmosphärisch gestalteten Themenräumen.",
    "url": "https://gentlehands.ch",
    "telephone": "+41000000000",
    "email": "kontakt@gentlehands.ch",
    "address": { 
      "@type": "PostalAddress", 
      "addressLocality": "Zürich", 
      "addressRegion": "ZH",
      "addressCountry": "CH" 
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "47.3769",
      "longitude": "8.5417"
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
      <SEOHead 
        title="GentleHands – Exklusive Erlebnismassagen für Frauen | Zürich"
        description="Exklusive Erlebnismassagen nur für Frauen in Zürich. Tiefenentspannung in atmosphärischen Themenräumen, absolute Diskretion und professionelle Betreuung."
        canonical="https://gentlehands.ch/"
        type="website"
        jsonLd={jsonLd}
      />

      {/* 1. HERO - Erster Eindruck, emotionaler Hook */}
      <HeroSection />
      
      {/* 2. TRUST - Sofortige Glaubwürdigkeit nach Hero */}
      <AnimatedSection animation="fadeUp">
        <TrustIndicatorsSection />
      </AnimatedSection>
      
      {/* 3. EMOTIONAL BENEFITS - Warum es wichtig ist (Schmerzpunkte ansprechen) */}
      <AnimatedSection animation="fadeUp">
        <EmotionalBenefitsSection />
      </AnimatedSection>
      
      {/* 4. SERVICES - Was wir anbieten (Massagen) */}
      <AnimatedSection animation="fadeUp">
        <ExclusiveServicesSection />
      </AnimatedSection>
      
      {/* 5. EXPERIENCES - Die einzigartigen Themenräume */}
      <AnimatedSection animation="scale">
        <ExperiencePreviewSection />
      </AnimatedSection>
      
      {/* 6. TEAM - Wer führt die Behandlungen durch */}
      <AnimatedSection animation="fadeUp">
        <TherapistSpotlightSection />
      </AnimatedSection>
      
      {/* 7. SICHERHEIT & DISKRETION - Bedenken zerstreuen */}
      <AnimatedSection animation="fadeUp">
        <SafetyCommitmentSection />
      </AnimatedSection>
      
      {/* 8. TESTIMONIALS - Social Proof */}
      <AnimatedTestimonialSlider />
      
      {/* 9. STATS - Zahlen die überzeugen */}
      <AnimatedStatsSection />
      
      {/* 10. ERSTER BESUCH - Unsicherheit nehmen */}
      <AnimatedSection animation="fadeUp">
        <FirstVisitGuideSection />
      </AnimatedSection>
      
      {/* 11. PREISE - Transparenz schaffen */}
      <AnimatedSection animation="fadeUp">
        <PricePreviewSection />
      </AnimatedSection>
      
      {/* 12. QUIZ - Personalisierte Empfehlung → Engagement */}
      <AnimatedSection animation="fadeUp">
        <WellnessQuizTeaser />
      </AnimatedSection>
      
      {/* 13. STANDORT - Wo wir sind */}
      <AnimatedSection animation="fadeUp">
        <LocationPreviewSection />
      </AnimatedSection>
      
      {/* 14. GESCHENK - Zusätzliche Conversion-Option */}
      <AnimatedSection animation="fadeUp">
        <GiftIdeaSection />
      </AnimatedSection>
      
      {/* 15. MEMBERSHIP - Wiederkehrende Kunden */}
      <AnimatedSection animation="fadeUp">
        <MembershipTeaser />
      </AnimatedSection>
      
      {/* 16. FAQ - Letzte Fragen beantworten */}
      <AnimatedSection animation="fadeUp">
        <FAQPreviewSection />
      </AnimatedSection>
      
      {/* 17. FINAL CTA mit Newsletter - Letzte Conversion-Chance */}
      <FinalCTASection />
    </Layout>
  );
};

export default Index;
