import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Clock, Heart, Lock, ArrowRight, Sparkles } from "lucide-react";
import { LazyImage } from "@/components/shared/LazyImage";
import { useLCPOptimization } from "@/hooks/useLCPOptimization";
import heroImage from "@/assets/massage-hands-back.jpg";

const trustBadges = [
  { icon: Shield, label: "Women Only", sublabel: "Safe Space" },
  { icon: Lock, label: "100% Discreet", sublabel: "No Data Collection" },
  { icon: Clock, label: "Limited Slots", sublabel: "Exclusive Availability" },
  { icon: Heart, label: "Professional", sublabel: "Certified Therapists" },
];

const IndexEN = () => {
  // Preload hero image for LCP optimization
  useLCPOptimization(heroImage);

  const hreflangLinks = [
    { lang: 'de-CH', href: 'https://gentlehands.ch/' },
    { lang: 'de', href: 'https://gentlehands.ch/' },
    { lang: 'en', href: 'https://gentlehands.ch/en' },
    { lang: 'x-default', href: 'https://gentlehands.ch/' },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "GentleHands",
    "description": "Exclusive experience massages for women in Zurich. Deep relaxation in atmospheric themed rooms.",
    "url": "https://gentlehands.ch/en",
    "telephone": "+41000000000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zurich",
      "addressRegion": "ZH",
      "addressCountry": "CH"
    },
    "priceRange": "$$$$"
  };

  return (
    <Layout>
      <SEOHead 
        title="GentleHands – Exclusive Experience Massages for Women | Zurich"
        description="Exclusive experience massages for women in Zurich. Deep relaxation in atmospheric themed rooms, complete discretion and professional care."
        canonical="https://gentlehands.ch/en"
        hreflang={hreflangLinks}
        jsonLd={jsonLd}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Professional massage therapy" 
            className="w-full h-full object-cover"
            // @ts-ignore - fetchpriority is a valid HTML attribute
            fetchpriority="high"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              For Women Only
            </span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
              <span className="block">A Protected Space</span>
              <span className="block text-primary">for Deep Relaxation</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              For women who give their all every day – and finally deserve a place 
              where they can completely let go.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="group">
                <Link to="/en/experiences">
                  Discover Experiences
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/buchung">Book Now</Link>
              </Button>
            </div>
          </motion.div>
          
          {/* Trust Badges */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex flex-col items-center p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
                <badge.icon className="h-6 w-6 text-primary mb-2" />
                <span className="font-medium text-sm">{badge.label}</span>
                <span className="text-xs text-muted-foreground">{badge.sublabel}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AnimatedSection animation="fadeUp">
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Premium Wellness Experience
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                GentleHands offers exclusive experience massages in Zurich – designed exclusively 
                for women. Our six unique themed rooms create immersive atmospheres that transport 
                you to a world of deep relaxation and rejuvenation.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-background border border-border/50">
                  <h3 className="font-semibold mb-2">6 Themed Rooms</h3>
                  <p className="text-sm text-muted-foreground">Ocean, Alpine, Dark, Urban, Zen & Surprise</p>
                </div>
                <div className="p-6 rounded-xl bg-background border border-border/50">
                  <h3 className="font-semibold mb-2">Certified Therapists</h3>
                  <p className="text-sm text-muted-foreground">Professional & experienced team</p>
                </div>
                <div className="p-6 rounded-xl bg-background border border-border/50">
                  <h3 className="font-semibold mb-2">Complete Privacy</h3>
                  <p className="text-sm text-muted-foreground">Discreet location, no cameras</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Ready to Experience Deep Relaxation?</h2>
          <p className="text-muted-foreground mb-8">Book your exclusive wellness experience today.</p>
          <Button size="lg" asChild>
            <Link to="/buchung">Book Your Experience</Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            <Link to="/" className="underline hover:text-primary">Zur deutschen Version →</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default IndexEN;
