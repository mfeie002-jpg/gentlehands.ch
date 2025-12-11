import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Shield, Sparkles, Quote, ArrowRight } from "lucide-react";
import { SEOHead } from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { LazyImage } from "@/components/shared/LazyImage";

import philosophyCaringTherapist from "@/assets/philosophy-caring-therapist.jpg";
import philosophyHandsConnection from "@/assets/philosophy-hands-connection.jpg";
import philosophySafeSpace from "@/assets/philosophy-safe-space.jpg";
import philosophyPureRelaxation from "@/assets/philosophy-pure-relaxation.jpg";
import emotionalInnerPeace from "@/assets/emotional-inner-peace.jpg";
import emotionalDeepRest from "@/assets/emotional-deep-rest.jpg";

const coreValues = [
  {
    title: "Würdevoller Raum",
    description: "Jede Frau verdient einen Ort, an dem sie sich vollkommen sicher und respektiert fühlt. Wir schaffen diesen Raum – ohne Erwartungen, ohne Bewertung.",
    image: philosophySafeSpace,
  },
  {
    title: "Achtsame Berührung",
    description: "Berührung ist Kommunikation. Unsere Hände hören zu, bevor sie arbeiten. Wir spüren, was der Körper braucht – oft bevor Sie es selbst wissen.",
    image: philosophyHandsConnection,
  },
  {
    title: "Echte Präsenz",
    description: "Während Ihrer Session sind wir vollkommen für Sie da. Keine Ablenkung, keine Routine – nur aufmerksame, fokussierte Zuwendung.",
    image: philosophyCaringTherapist,
  },
];

const personalStories = [
  {
    quote: "Ich habe GentleHands gegründet, weil ich gesehen habe, wie viele Frauen sich nach einem geschützten Raum sehnen – einem Ort, an dem sie einfach sein dürfen, ohne funktionieren zu müssen.",
    author: "Morris, Gründer",
    image: philosophyCaringTherapist,
  },
  {
    quote: "Nach Jahren im Stress habe ich vergessen, wie es sich anfühlt, wirklich loszulassen. Bei GentleHands habe ich dieses Gefühl wiedergefunden.",
    author: "Eine langjährige Kundin",
    image: philosophyPureRelaxation,
  },
];

const Philosophie = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <Layout>
      <SEOHead 
        title="Unsere Philosophie – Werte & Überzeugungen | GentleHands Zürich"
        description="Erfahren Sie, wofür GentleHands steht: Würdevoller Raum, achtsame Berührung und echte Präsenz. Unsere Philosophie für tiefe Entspannung."
        canonical="https://gentlehands.ch/philosophie"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={philosophyPureRelaxation} alt="GentleHands Philosophie" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </motion.div>
        
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/4 -right-32 w-96 h-96 bg-copper/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <FloatingElements variant="dots" />
        
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6"
            >
              <Heart size={16} className="text-copper" />
              <span className="text-copper text-sm font-medium">Unsere Werte</span>
            </motion.div>
            
            <motion.h1 
              className="text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Wofür wir <span className="text-gradient-copper">stehen</span>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Mehr als Massage. Ein Versprechen an jede Frau, die zu uns kommt.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Core Values with Images */}
      <section className="section-padding">
        <div className="container-wide">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-foreground mb-4">Unsere <span className="text-gradient-copper">Überzeugungen</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Drei Grundsätze, die alles leiten, was wir tun.
            </p>
          </AnimatedSection>
          
          <div className="space-y-24">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                  <motion.div 
                    className="relative aspect-[4/3] rounded-3xl overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LazyImage
                      src={value.image}
                      alt={value.title}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                  </motion.div>
                </div>
                
                <div className={index % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 1 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-copper font-medium text-sm uppercase tracking-wide">
                      Grundsatz {index + 1}
                    </span>
                    <h3 className="text-foreground text-3xl mt-2 mb-4">{value.title}</h3>
                    <div className="divider-copper mb-6" />
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Stories */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-foreground mb-4">Persönliche <span className="text-gradient-copper">Geschichten</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Die Menschen hinter GentleHands und die Frauen, die wir begleiten dürfen.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {personalStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden bg-card border border-border/50">
                  <div className="aspect-[16/9] relative">
                    <LazyImage
                      src={story.image}
                      alt={story.author}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  </div>
                  <div className="p-8 -mt-16 relative">
                    <Quote size={32} className="text-copper/30 mb-4" />
                    <p className="text-foreground text-lg italic mb-4 leading-relaxed">
                      „{story.quote}"
                    </p>
                    <p className="text-copper font-medium">{story.author}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Philosophy Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-foreground mb-4">So fühlt sich <span className="text-gradient-copper">GentleHands</span> an</h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { image: emotionalInnerPeace, text: "Innere Ruhe" },
              { image: philosophyHandsConnection, text: "Verbundenheit" },
              { image: emotionalDeepRest, text: "Tiefe Erholung" },
              { image: philosophySafeSpace, text: "Geborgenheit" },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-square rounded-2xl overflow-hidden"
              >
                <LazyImage
                  src={item.image}
                  alt={item.text}
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-medium text-sm">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-copper/20 to-primary/20 flex items-center justify-center"
            >
              <Sparkles size={32} className="text-copper" />
            </motion.div>
            
            <h2 className="text-foreground mb-6">
              Erleben Sie unsere Philosophie
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Worte können nur andeuten, was wir meinen. Erleben Sie es selbst – 
              wir freuen uns darauf, Sie willkommen zu heissen.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="copper" size="lg" className="group" asChild>
                <Link to="/buchung">
                  Erlebnis buchen
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="petrol-outline" size="lg" asChild>
                <Link to="/team">Unser Team kennenlernen</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Philosophie;