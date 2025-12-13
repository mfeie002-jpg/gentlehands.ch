import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustIndicatorsSection } from "@/components/home/TrustIndicatorsSection";
import { PhilosophySection } from "@/components/home/PhilosophySection";
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
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import { QuickBookingWidget } from "@/components/home/QuickBookingWidget";
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
      
      {/* 3. QUICK BOOKING - Frühe Conversion-Möglichkeit für Entschlossene */}
      <QuickBookingWidget />
      
      {/* 4. PHILOSOPHIE - Wer wir sind, was uns ausmacht */}
      <AnimatedSection animation="fadeUp">
        <PhilosophySection />
      </AnimatedSection>
      
      {/* 5. EMOTIONAL BENEFITS - Warum es wichtig ist (Schmerzpunkte ansprechen) */}
      <AnimatedSection animation="fadeUp">
        <EmotionalBenefitsSection />
      </AnimatedSection>
      
      {/* 6. SERVICES - Was wir anbieten (Massagen) */}
      <AnimatedSection animation="fadeUp">
        <ExclusiveServicesSection />
      </AnimatedSection>
      
      {/* 7. EXPERIENCES - Die einzigartigen Themenräume */}
      <AnimatedSection animation="scale">
        <ExperiencePreviewSection />
      </AnimatedSection>
      
      {/* 8. TEAM - Wer führt die Behandlungen durch */}
      <AnimatedSection animation="fadeUp">
        <TherapistSpotlightSection />
      </AnimatedSection>
      
      {/* 9. SICHERHEIT & DISKRETION - Bedenken zerstreuen */}
      <AnimatedSection animation="fadeUp">
        <SafetyCommitmentSection />
      </AnimatedSection>
      
      {/* 10. TESTIMONIALS - Social Proof */}
      <AnimatedTestimonialSlider />
      
      {/* 11. STATS - Zahlen die überzeugen */}
      <AnimatedStatsSection />
      
      {/* 12. ERSTER BESUCH - Unsicherheit nehmen */}
      <AnimatedSection animation="fadeUp">
        <FirstVisitGuideSection />
      </AnimatedSection>
      
      {/* 13. PREISE - Transparenz schaffen */}
      <AnimatedSection animation="fadeUp">
        <PricePreviewSection />
      </AnimatedSection>
      
      {/* 14. QUIZ - Personalisierte Empfehlung → Engagement */}
      <AnimatedSection animation="fadeUp">
        <WellnessQuizTeaser />
      </AnimatedSection>
      
      {/* 15. STANDORT - Wo wir sind */}
      <AnimatedSection animation="fadeUp">
        <LocationPreviewSection />
      </AnimatedSection>
      
      {/* 16. GESCHENK - Zusätzliche Conversion-Option */}
      <AnimatedSection animation="fadeUp">
        <GiftIdeaSection />
      </AnimatedSection>
      
      {/* 17. MEMBERSHIP - Wiederkehrende Kunden */}
      <AnimatedSection animation="fadeUp">
        <MembershipTeaser />
      </AnimatedSection>
      
      {/* 18. FAQ - Letzte Fragen beantworten */}
      <AnimatedSection animation="fadeUp">
        <FAQPreviewSection />
      </AnimatedSection>
      
      {/* 19. BLOG - SEO Content & Expertise zeigen */}
      <AnimatedSection animation="fadeUp">
        <BlogPreviewSection />
      </AnimatedSection>
      
      {/* 20. NEWSLETTER - Lead Capture */}
      <AnimatedSection animation="fadeUp">
        <NewsletterSection />
      </AnimatedSection>
      
      {/* 21. FINAL CTA - Letzte Conversion-Chance */}
      <FinalCTASection />
    </Layout>
  );
};

export default Index;
