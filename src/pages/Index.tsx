import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustIndicatorsSection } from "@/components/home/TrustIndicatorsSection";
import { QuickFactsBar } from "@/components/home/QuickFactsBar";
import { SocialProofBanner } from "@/components/home/SocialProofBanner";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { GuaranteeSection } from "@/components/home/GuaranteeSection";
import { ExclusiveServicesSection } from "@/components/home/ExclusiveServicesSection";
import { WellnessJourneySection } from "@/components/home/WellnessJourneySection";
import { EmotionalBenefitsSection } from "@/components/home/EmotionalBenefitsSection";
import { TherapistSpotlightSection } from "@/components/home/TherapistSpotlightSection";
import { ExperiencePreviewSection } from "@/components/home/ExperiencePreviewSection";
import { PrivacyPromiseSection } from "@/components/home/PrivacyPromiseSection";
import { ValuePropositionSection } from "@/components/home/ValuePropositionSection";
import { TestimonialHighlight } from "@/components/home/TestimonialHighlight";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ClientSuccessStories } from "@/components/home/ClientSuccessStories";
import { FAQPreviewSection } from "@/components/home/FAQPreviewSection";
import { SeasonalHighlightSection } from "@/components/home/SeasonalHighlightSection";
import { QuickBookingWidget } from "@/components/home/QuickBookingWidget";
import { LocationPreviewSection } from "@/components/home/LocationPreviewSection";
import { GiftCardSection } from "@/components/home/GiftCardSection";
import { MembershipTeaser } from "@/components/home/MembershipTeaser";
import { AwardsSection } from "@/components/home/AwardsSection";
import { InstagramFeedSection } from "@/components/home/InstagramFeedSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import { FloatingContactButton } from "@/components/shared/FloatingContactButton";
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
    "address": { "@type": "PostalAddress", "addressLocality": "Zürich", "addressCountry": "CH" },
    "geo": { "@type": "GeoCoordinates", "latitude": 47.3769, "longitude": 8.5417 },
    "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "opens": "10:00", "closes": "21:00" },
    "priceRange": "$$$$",
    "image": "https://gentlehands.ch/og-image.jpg"
  };

  return (
    <Layout>
      <Helmet>
        <title>GentleHands – Exklusive Erlebnismassagen für Frauen | Zürich</title>
        <meta name="description" content="GentleHands bietet exklusive Erlebnismassagen nur für Frauen in Zürich. Tiefenentspannung in atmosphärischen Themenräumen, absolute Diskretion und professionelle Betreuung." />
        <meta name="keywords" content="Erlebnismassage Frauen Zürich, Entspannungsmassage Frauen, Premium Massage Zürich, Wellness Frauen, Tiefenentspannung" />
        <link rel="canonical" href="https://gentlehands.ch/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gentlehands.ch/" />
        <meta property="og:title" content="GentleHands – Exklusive Erlebnismassagen für Frauen in Zürich" />
        <meta property="og:description" content="Tiefenentspannung in atmosphärischen Themenräumen. Nur für Frauen. Absolute Diskretion. Zürich." />
        <meta property="og:image" content="https://gentlehands.ch/og-image.jpg" />
        <meta property="og:locale" content="de_CH" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <HeroSection />
      <TrustIndicatorsSection />
      <QuickFactsBar />
      <SocialProofBanner />
      <PhilosophySection />
      <GuaranteeSection />
      <WellnessJourneySection />
      <ValuePropositionSection />
      <EmotionalBenefitsSection />
      <ExclusiveServicesSection />
      <ExperiencePreviewSection />
      <TherapistSpotlightSection />
      <PrivacyPromiseSection />
      <TestimonialHighlight />
      <TestimonialsSection />
      <ClientSuccessStories />
      <FAQPreviewSection />
      <SeasonalHighlightSection />
      <QuickBookingWidget />
      <LocationPreviewSection />
      <GiftCardSection />
      <MembershipTeaser />
      <AwardsSection />
      <InstagramFeedSection />
      <NewsletterSection />
      <FinalCTASection />
      <FloatingContactButton />
    </Layout>
  );
};

export default Index;
