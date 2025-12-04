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
  return (
    <Layout>
      <Helmet>
        <title>GentleHands – Exklusive Erlebnismassagen für Frauen | Zürich</title>
        <meta
          name="description"
          content="GentleHands bietet exklusive Erlebnismassagen nur für Frauen in Zürich. Tiefenentspannung, thematische Erlebnisräume und persönliche Betreuung."
        />
        <meta
          name="keywords"
          content="Erlebnismassage Frauen, Entspannungsmassage Zürich, Premium Massage, Wellness Frauen"
        />
        <link rel="canonical" href="https://gentlehands.ch/" />
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
