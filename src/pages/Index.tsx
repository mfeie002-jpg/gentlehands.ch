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
import { VideoTestimonials } from "@/components/shared/VideoTestimonials";
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
import { SEOHead } from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ExperienceThemeGallery } from "@/components/experience/ExperienceThemeGallery";
import { AnimatedTestimonialSlider } from "@/components/testimonials/AnimatedTestimonialSlider";

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

      <HeroSection />
      <UrgencyBanner />
      
      <AnimatedSection animation="fadeUp">
        <TrustIndicatorsSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp" delay={0.1}>
        <QuickFactsBar />
      </AnimatedSection>
      
      <SocialProofBanner />
      
      <AnimatedSection animation="fadeUp">
        <PhilosophySection />
      </AnimatedSection>
      
      <AnimatedSection animation="scale">
        <GuaranteeSection />
      </AnimatedSection>
      
      <QuickBookingWidget />
      
      <AnimatedSection animation="fadeUp">
        <WellnessJourneySection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <StressRecognitionSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <BeforeAfterSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <EmotionalBenefitsSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <EmotionalReliefSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <SelfCarePermissionSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <ExclusiveServicesSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeLeft">
        <ScentPreviewSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeRight">
        <MusicPreviewSection />
      </AnimatedSection>
      
      <AnimatedSection animation="scale">
        <ExperiencePreviewSection />
      </AnimatedSection>
      
      <ExperienceThemeGallery />
      
      <AnimatedSection animation="fadeUp">
        <RoomComparisonSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <TouchPhilosophySection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <TherapistSpotlightSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <TeamPhilosophySection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <SafetyCommitmentSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <PrivacyPromiseSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <TestimonialHighlight />
      </AnimatedSection>
      
      <AnimatedTestimonialSlider />
      
      <AnimatedSection animation="fadeUp">
        <TransformationStoriesSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <TestimonialsSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <FeaturedReviewSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <ClientSuccessStories />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <VideoTestimonials />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <FAQPreviewSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <FirstVisitGuideSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <PricePreviewSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <BookingBenefitsSection />
      </AnimatedSection>
      
      <AnimatedSection animation="scale">
        <CountdownSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <WellnessQuizTeaser />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <SeasonalHighlightSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <LocationPreviewSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <GiftIdeaSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <MembershipTeaser />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <CorporateWellnessTeaser />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <BlogPreviewSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <SustainabilitySection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <AwardsSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <InstagramFeedSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <QuickContactSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeUp">
        <NewsletterSection />
      </AnimatedSection>
      
      <FinalCTASection />
    </Layout>
  );
};

export default Index;
