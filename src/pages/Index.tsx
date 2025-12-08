import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustIndicatorsSection } from "@/components/home/TrustIndicatorsSection";
import { QuickFactsBar } from "@/components/home/QuickFactsBar";
import { SocialProofBanner } from "@/components/home/SocialProofBanner";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { GuaranteeSection } from "@/components/home/GuaranteeSection";
import { WellnessJourneySection } from "@/components/home/WellnessJourneySection";
import { BeforeAfterSection } from "@/components/home/BeforeAfterSection";
import { EmotionalBenefitsSection } from "@/components/home/EmotionalBenefitsSection";
import { EmotionalReliefSection } from "@/components/home/EmotionalReliefSection";
import { StressRecognitionSection } from "@/components/home/StressRecognitionSection";
import { SelfCarePermissionSection } from "@/components/home/SelfCarePermissionSection";
import { TransformationStoriesSection } from "@/components/home/TransformationStoriesSection";
import { ExclusiveServicesSection } from "@/components/home/ExclusiveServicesSection";
import { ScentPreviewSection } from "@/components/home/ScentPreviewSection";
import { MusicPreviewSection } from "@/components/home/MusicPreviewSection";
import { ExperiencePreviewSection } from "@/components/home/ExperiencePreviewSection";
import { RoomComparisonSection } from "@/components/home/RoomComparisonSection";
import { TouchPhilosophySection } from "@/components/home/TouchPhilosophySection";
import { TherapistSpotlightSection } from "@/components/home/TherapistSpotlightSection";
import { TeamPhilosophySection } from "@/components/home/TeamPhilosophySection";
import { SafetyCommitmentSection } from "@/components/home/SafetyCommitmentSection";
import { PrivacyPromiseSection } from "@/components/home/PrivacyPromiseSection";
import { TestimonialHighlight } from "@/components/home/TestimonialHighlight";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FeaturedReviewSection } from "@/components/home/FeaturedReviewSection";
import { ClientSuccessStories } from "@/components/home/ClientSuccessStories";
import { FAQPreviewSection } from "@/components/home/FAQPreviewSection";
import { FirstVisitGuideSection } from "@/components/home/FirstVisitGuideSection";
import { PricePreviewSection } from "@/components/home/PricePreviewSection";
import { BookingBenefitsSection } from "@/components/home/BookingBenefitsSection";
import { CountdownSection } from "@/components/home/CountdownSection";
import { WellnessQuizTeaser } from "@/components/home/WellnessQuizTeaser";
import { SeasonalHighlightSection } from "@/components/home/SeasonalHighlightSection";
import { LocationPreviewSection } from "@/components/home/LocationPreviewSection";
import { GiftIdeaSection } from "@/components/home/GiftIdeaSection";
import { MembershipTeaser } from "@/components/home/MembershipTeaser";
import { CorporateWellnessTeaser } from "@/components/home/CorporateWellnessTeaser";
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";
import { SustainabilitySection } from "@/components/home/SustainabilitySection";
import { AwardsSection } from "@/components/home/AwardsSection";
import { InstagramFeedSection } from "@/components/home/InstagramFeedSection";
import { QuickContactSection } from "@/components/home/QuickContactSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";

import { UrgencyBanner } from "@/components/home/UrgencyBanner";
import { QuickBookingWidget } from "@/components/home/QuickBookingWidget";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>GentleHands – Exklusive Erlebnismassagen für Frauen | Zürich</title>
        <meta name="description" content="Exklusive Erlebnismassagen nur für Frauen in Zürich. Tiefenentspannung in atmosphärischen Themenräumen, absolute Diskretion und professionelle Betreuung." />
        <link rel="canonical" href="https://gentlehands.ch/" />
        <meta property="og:title" content="GentleHands – Exklusive Erlebnismassagen für Frauen" />
        <meta property="og:description" content="Tiefenentspannung in atmosphärischen Erlebnisräumen. Nur für Frauen. Zürich." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gentlehands.ch/" />
        <meta property="og:image" content="https://gentlehands.ch/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <HeroSection />
      <UrgencyBanner />
      <TrustIndicatorsSection />
      <QuickFactsBar />
      <SocialProofBanner />
      <PhilosophySection />
      <GuaranteeSection />
      <QuickBookingWidget />
      <WellnessJourneySection />
      <StressRecognitionSection />
      <BeforeAfterSection />
      <EmotionalBenefitsSection />
      <EmotionalReliefSection />
      <SelfCarePermissionSection />
      <ExclusiveServicesSection />
      <ScentPreviewSection />
      <MusicPreviewSection />
      <ExperiencePreviewSection />
      <RoomComparisonSection />
      <TouchPhilosophySection />
      <TherapistSpotlightSection />
      <TeamPhilosophySection />
      <SafetyCommitmentSection />
      <PrivacyPromiseSection />
      <TestimonialHighlight />
      <TransformationStoriesSection />
      <TestimonialsSection />
      <FeaturedReviewSection />
      <ClientSuccessStories />
      <FAQPreviewSection />
      <FirstVisitGuideSection />
      <PricePreviewSection />
      <BookingBenefitsSection />
      <CountdownSection />
      <WellnessQuizTeaser />
      <SeasonalHighlightSection />
      <LocationPreviewSection />
      <GiftIdeaSection />
      <MembershipTeaser />
      <CorporateWellnessTeaser />
      <BlogPreviewSection />
      <SustainabilitySection />
      <AwardsSection />
      <InstagramFeedSection />
      <QuickContactSection />
      <NewsletterSection />
      <FinalCTASection />
      
    </Layout>
  );
};

export default Index;
