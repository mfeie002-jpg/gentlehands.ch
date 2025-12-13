import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Waves, Mountain, Moon, Building, Leaf, Sparkles, ArrowRight, Check } from "lucide-react";
import { LazyImage } from "@/components/shared/LazyImage";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

import experienceOcean from "@/assets/experience-ocean.jpg";
import experienceAlpine from "@/assets/experience-alpine.jpg";
import experienceDark from "@/assets/experience-dark.jpg";
import experienceUrban from "@/assets/experience-urban.jpg";
import experienceZen from "@/assets/experience-zen.jpg";

const themes = [
  {
    id: "ocean",
    icon: Waves,
    title: "Ocean & Palms",
    subtitle: "Tropical Lightness",
    image: experienceOcean,
    description: "Let yourself be carried away to a warm beach at sunset. The gentle sound of the sea, the scent of coconut and sandalwood, warm light – a short vacation for your soul.",
    elements: ["Sea and beach projections", "Soft ocean sounds", "Scents: coconut, sandalwood, sea breeze", "Warm, golden lighting"],
    color: "from-cyan-500/20 to-blue-500/20"
  },
  {
    id: "alpine",
    icon: Mountain,
    title: "Alpine Silence",
    subtitle: "Mountain Retreat",
    image: experienceAlpine,
    description: "Experience the calm of a mountain hut above the clouds. Pine scents, crackling fire sounds, and the feeling of being completely removed from everyday life.",
    elements: ["Mountain landscape projections", "Crackling fire sounds", "Scents: pine, fresh air", "Cozy warm lighting"],
    color: "from-emerald-500/20 to-green-500/20"
  },
  {
    id: "dark",
    icon: Moon,
    title: "Deep Dark Relax",
    subtitle: "Sensory Reduction",
    image: experienceDark,
    description: "Complete darkness with only minimal candlelight. Maximum focus on touch and inner perception. For those who want to truly disconnect.",
    elements: ["Near-complete darkness", "Minimal candlelight", "Subtle ambient sounds", "Focus on tactile sensation"],
    color: "from-purple-500/20 to-indigo-500/20"
  },
  {
    id: "urban",
    icon: Building,
    title: "Urban Loft",
    subtitle: "Modern Self-Care",
    image: experienceUrban,
    description: "Clean lines, contemporary design, sophisticated atmosphere. For the modern woman who appreciates minimalist aesthetics.",
    elements: ["Modern loft design", "Ambient electronic sounds", "Fresh, clean scents", "Cool, sophisticated lighting"],
    color: "from-gray-500/20 to-slate-500/20"
  },
  {
    id: "zen",
    icon: Leaf,
    title: "Zen Garden",
    subtitle: "Mindful Tranquility",
    image: experienceZen,
    description: "Japanese-inspired minimalism with bamboo, water features, and meditation-inducing atmosphere for deep mental clarity.",
    elements: ["Japanese garden aesthetic", "Flowing water sounds", "Green tea and bamboo scents", "Natural, soft lighting"],
    color: "from-lime-500/20 to-green-500/20"
  }
];

const ExperiencesEN = () => {
  const hreflangLinks = [
    { lang: 'de-CH', href: 'https://gentlehands.ch/erlebnisse' },
    { lang: 'de', href: 'https://gentlehands.ch/erlebnisse' },
    { lang: 'en', href: 'https://gentlehands.ch/en/experiences' },
    { lang: 'x-default', href: 'https://gentlehands.ch/erlebnisse' },
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/en" },
    { label: "Experiences" }
  ];

  return (
    <Layout>
      <SEOHead 
        title="Themed Experiences – Immersive Massage Rooms | GentleHands"
        description="Discover our 6 unique themed rooms: Ocean, Alpine, Dark, Urban, Zen, and Surprise. Each creates a complete sensory experience for deep relaxation."
        canonical="https://gentlehands.ch/en/experiences"
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
              <Sparkles className="h-4 w-4" />
              6 Unique Themed Rooms
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Immersive <span className="text-primary">Experiences</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Each themed room creates a complete sensory journey – combining visuals, sounds, 
              scents, and ambiance for an unforgettable wellness experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Themes Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12">
            {themes.map((theme, index) => (
              <AnimatedSection key={theme.id} animation="fadeUp">
                <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                      <LazyImage
                        src={theme.image}
                        alt={theme.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${theme.color} opacity-60`} />
                    </div>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <theme.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-serif font-bold">{theme.title}</h2>
                        <p className="text-primary text-sm">{theme.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">{theme.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {theme.elements.map((element, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          {element}
                        </li>
                      ))}
                    </ul>
                    
                    <Button asChild>
                      <Link to={`/buchung?theme=${theme.id}`}>
                        Book {theme.title}
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

      {/* Surprise Experience */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection animation="fadeUp">
            <div className="max-w-2xl mx-auto">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-serif font-bold mb-4">The Surprise Experience</h2>
              <p className="text-muted-foreground mb-8">
                Trust our therapists to create a custom experience just for you. 
                Tell us about your mood and let us design the perfect atmosphere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/buchung?theme=surprise">Book Surprise Experience</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Language Switch */}
      <div className="py-8 text-center">
        <Link to="/erlebnisse" className="text-muted-foreground hover:text-primary underline">
          Zur deutschen Version →
        </Link>
      </div>
    </Layout>
  );
};

export default ExperiencesEN;
