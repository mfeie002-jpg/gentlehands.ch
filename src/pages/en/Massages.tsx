import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Zap, Moon, Star, ArrowRight, Check, Clock } from "lucide-react";
import { LazyImage } from "@/components/shared/LazyImage";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

import massageDeepRelease from "@/assets/massage-deep-release.jpg";
import massageStressReset from "@/assets/massage-stress-reset.jpg";
import massageHotStones from "@/assets/massage-hot-stones.jpg";
import massageBack from "@/assets/massage-hands-back.jpg";

const massages = [
  {
    id: "deep-release",
    title: "Deep Release Session",
    subtitle: "Deep Physical Relaxation",
    image: massageDeepRelease,
    durations: ["90 min", "120 min"],
    description: "Our most intensive massage for maximum physical and mental release. Perfect for severe tension, chronic stress, or when you simply feel like you're holding onto everything.",
    details: [
      "Deep, slow pressure techniques",
      "Focus on problem areas as discussed",
      "Long strokes for nervous system calming",
      "Optional: breathing exercises integration"
    ],
    intensity: "Medium to Deep",
    highlight: "Popular",
    icon: Heart
  },
  {
    id: "stress-reset",
    title: "Stress Reset",
    subtitle: "Targeted Relief",
    image: massageStressReset,
    durations: ["60 min", "90 min"],
    description: "The perfect massage for busy women with limited time. Targeted, effective, and deeply relaxing. Ideal as regular 'maintenance' for your body.",
    details: [
      "Efficient full-body treatment",
      "Focus on typical stress zones",
      "Flowing transitions between techniques",
      "Quick entry into relaxation"
    ],
    intensity: "Light to Medium",
    highlight: "Express",
    icon: Zap
  },
  {
    id: "hot-stones",
    title: "Hot Stone Harmony",
    subtitle: "Thermal Therapy",
    image: massageHotStones,
    durations: ["90 min", "120 min"],
    description: "Warm basalt stones combined with massage techniques. The heat penetrates deep into muscles while the stones' energy balances your system.",
    details: [
      "Heated basalt stones",
      "Stone placement on key points",
      "Combined with massage strokes",
      "Deep muscle penetration"
    ],
    intensity: "Medium",
    highlight: "Premium",
    icon: Moon
  },
  {
    id: "signature",
    title: "Signature Massage",
    subtitle: "Our House Classic",
    image: massageBack,
    durations: ["60 min", "90 min", "120 min"],
    description: "The quintessential GentleHands experience. A balanced combination of techniques, perfectly attuned to your needs on the day.",
    details: [
      "Personalized technique mix",
      "Adapts to your current state",
      "Full body coverage",
      "Intuitive, flowing approach"
    ],
    intensity: "Customized",
    highlight: "Classic",
    icon: Star
  }
];

const MassagesEN = () => {
  const hreflangLinks = [
    { lang: 'de-CH', href: 'https://gentlehands.ch/massagen' },
    { lang: 'de', href: 'https://gentlehands.ch/massagen' },
    { lang: 'en', href: 'https://gentlehands.ch/en/massages' },
    { lang: 'x-default', href: 'https://gentlehands.ch/massagen' },
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/en" },
    { label: "Massages" }
  ];

  return (
    <Layout>
      <SEOHead 
        title="Massage Types – Professional Treatments | GentleHands Zurich"
        description="Discover our massage offerings: Deep Release, Stress Reset, Hot Stone, and Signature massages. Professional treatments in a protected space for women."
        canonical="https://gentlehands.ch/en/massages"
        hreflang={hreflangLinks}
      />

      {/* Hero */}
      <section className="relative py-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} className="mb-8" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Star className="h-4 w-4" />
              Professional Treatments
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Our <span className="text-primary">Massages</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Each massage can be combined with any of our themed rooms. 
              Together, we'll find the perfect match for your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Massages Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {massages.map((massage) => (
              <AnimatedSection key={massage.id} animation="fadeUp">
                <div className="group rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all bg-background">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <LazyImage
                      src={massage.image}
                      alt={massage.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        {massage.highlight}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm">
                      <massage.icon className="h-4 w-4 text-primary" />
                      {massage.intensity}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-xl font-serif font-bold">{massage.title}</h2>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {massage.durations.join(" / ")}
                      </div>
                    </div>
                    
                    <p className="text-primary text-sm mb-3">{massage.subtitle}</p>
                    <p className="text-muted-foreground text-sm mb-4">{massage.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {massage.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full" asChild>
                      <Link to={`/buchung?massage=${massage.id}`}>
                        Book {massage.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Not Sure Which to Choose?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Take our personalization quiz and we'll recommend the perfect massage and theme combination for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/quiz">Take the Quiz</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/en/experiences">Explore Themes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Language Switch */}
      <div className="py-8 text-center">
        <Link to="/massagen" className="text-muted-foreground hover:text-primary underline">
          Zur deutschen Version →
        </Link>
      </div>
    </Layout>
  );
};

export default MassagesEN;
