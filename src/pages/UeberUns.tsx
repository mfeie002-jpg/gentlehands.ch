import { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Heart, ArrowRight, Quote, Sparkles } from "lucide-react";
import { SEOHead } from "@/components/shared/SEOHead";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { GlowCard } from "@/components/shared/GlowCard";
import { LazyImage } from "@/components/shared/LazyImage";

// Team & Philosophy images
import spaMassageRoom from "@/assets/spa-massage-room.jpg";
import wellnessLounge from "@/assets/wellness-lounge.jpg";
import philosophyCaring from "@/assets/philosophy-caring-therapist.jpg";
import philosophyHands from "@/assets/philosophy-hands-connection.jpg";
import philosophySafe from "@/assets/philosophy-safe-space.jpg";
import philosophyRelax from "@/assets/philosophy-pure-relaxation.jpg";
import teamWorking from "@/assets/team-working-moment.jpg";
import teamConsultation from "@/assets/team-consultation.jpg";

// Philosophie-Grundsätze (erweitert von der ehemaligen Philosophie-Seite)
const philosophyPrinciples = [
  {
    title: "Würdevoller Raum",
    description: "Jede Frau verdient einen Ort, an dem sie sich vollkommen sicher und respektiert fühlt. Wir schaffen diesen Raum – ohne Erwartungen, ohne Bewertung.",
    image: philosophySafe,
  },
  {
    title: "Achtsame Berührung",
    description: "Berührung ist Kommunikation. Unsere Hände hören zu, bevor sie arbeiten. Wir spüren, was der Körper braucht – oft bevor Sie es selbst wissen.",
    image: philosophyHands,
  },
  {
    title: "Echte Präsenz",
    description: "Während Ihrer Session sind wir vollkommen für Sie da. Keine Ablenkung, keine Routine – nur aufmerksame, fokussierte Zuwendung.",
    image: philosophyCaring,
  },
];

const values = [
  {
    image: philosophySafe,
    title: "Vertrauen",
    description:
      "Alles beginnt mit Vertrauen. Wir schaffen einen Raum, in dem Sie sich vollständig sicher fühlen können.",
  },
  {
    image: philosophyCaring,
    title: "Präsenz",
    description:
      "Vollständige Aufmerksamkeit für Sie. Keine Ablenkungen, keine Eile – nur Sie und dieser Moment.",
  },
  {
    image: philosophyHands,
    title: "Achtsamkeit",
    description:
      "Jede Berührung ist bewusst. Wir spüren, was Ihr Körper braucht, und passen uns an.",
  },
  {
    image: philosophyRelax,
    title: "Diskretion",
    description:
      "Ihre Privatsphäre ist uns heilig. Diskreter Standort, vertraulicher Umgang, keine Kompromisse.",
  },
  {
    image: teamWorking,
    title: "Qualität",
    description:
      "Keine Massenabfertigung. Limitierte Termine, sorgfältige Vorbereitung, höchste Ansprüche.",
  },
];

const UeberUns = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });

  return (
    <Layout>
      <SEOHead 
        title="Über uns – Philosophie & Werte | GentleHands Zürich"
        description="Erfahren Sie, wofür GentleHands steht: Unsere Philosophie, Werte und warum wir exklusive Themenräume nur für Frauen anbieten. Würdevoller Raum, achtsame Berührung."
        canonical="https://gentlehands.ch/ueber-uns"
      />

      {/* Hero with Image */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={wellnessLounge} alt="GentleHands Wellness Lounge" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </motion.div>
        
        {/* Ambient Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-copper/10 blur-[100px]"
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6 backdrop-blur-sm"
            >
              <Heart size={16} className="text-copper" />
              <span className="text-copper text-sm font-medium">Über GentleHands</span>
            </motion.div>
            
            <motion.h1 
              className="text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="block">Ein Ort für</span>
              <span className="bg-gradient-to-r from-copper via-copper-light to-copper bg-clip-text text-transparent">
                tiefe Entspannung
              </span>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              GentleHands ist mehr als ein Massage-Studio. Es ist ein
              geschützter Raum, in dem Frauen sich erlauben dürfen, vollständig
              loszulassen.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding-sm relative" ref={storyRef}>
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-foreground mb-4">Unsere Geschichte</h2>
              <div className="divider-copper mx-auto" />
            </div>
            
            <GlowCard className="p-8 md:p-12">
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={storyInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.2 }}
                >
                  GentleHands entstand aus einer einfachen Beobachtung: Viele
                  Frauen tragen eine enorme Last – beruflich, familiär, emotional.
                  Sie funktionieren, kümmern sich um andere, halten zusammen, was
                  zusammengehalten werden muss. Aber wann dürfen sie selbst
                  loslassen?
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={storyInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  Die Idee war, einen Ort zu schaffen, an dem Frauen nicht
                  funktionieren müssen. Keinen Spa mit Massenabfertigung, keine
                  Wellness-Fabrik, kein Ort, an dem man zwischen Terminen
                  durchgeschleust wird. Sondern ein Raum der vollständigen Präsenz
                  und Aufmerksamkeit.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={storyInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  GentleHands wurde gegründet, um genau das zu sein: Eine private
                  Suite, in der jede Frau für die Dauer ihrer Session im
                  Mittelpunkt steht. Wo das Ambiente nicht Standard ist, sondern
                  individuell gewählt werden kann. Wo die Berührung nicht
                  mechanisch ist, sondern bewusst und achtsam.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={storyInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  Der Fokus auf Frauen ist bewusst gewählt. Es geht darum, einen
                  Raum zu schaffen, in dem Vertrauen die Grundlage ist. In dem
                  sich Frauen vollständig sicher fühlen können, ohne erklären zu
                  müssen, was sie brauchen oder sich rechtfertigen zu müssen, dass
                  sie sich Zeit für sich nehmen.
                </motion.p>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-copper/10 blur-[80px]"
            animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-primary-foreground/5 blur-[60px]"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="container-narrow text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-copper/20 flex items-center justify-center"
            >
              <Quote size={28} className="text-copper" />
            </motion.div>
            
            <p className="text-copper-light font-medium tracking-wide uppercase text-sm mb-4">
              Unsere Vision
            </p>
            <motion.h2 
              className="text-primary-foreground mb-8 text-2xl md:text-3xl font-display"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              „Ein Raum, in dem Frauen sich gehalten, gesehen und entspannt
              fühlen dürfen."
            </motion.h2>
            <p className="text-primary-foreground/80 text-lg">
              Wir glauben, dass echte Entspannung nur in einem Zustand von
              Sicherheit und Vertrauen möglich ist. Deshalb investieren wir in
              Atmosphäre, Qualität und Beziehung – nicht in Quantität.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophie Principles - NEU integriert */}
      <section className="section-padding-sm bg-secondary/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6"
            >
              <Heart size={16} className="text-copper" />
              <span className="text-copper text-sm font-medium">Unsere Philosophie</span>
            </motion.div>
            <h2 className="text-foreground mb-4">
              Drei <span className="text-gradient-copper">Grundsätze</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Diese Überzeugungen leiten alles, was wir tun.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyPrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <GlowCard className="h-full overflow-hidden group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <LazyImage 
                      src={principle.image} 
                      alt={principle.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs bg-copper/20 text-copper-light rounded-full backdrop-blur-sm">
                        Grundsatz {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-foreground mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6"
            >
              <Sparkles size={16} className="text-copper" />
              <span className="text-copper text-sm font-medium">Unsere Werte</span>
            </motion.div>
            <h2 className="text-foreground mb-4">Wofür wir stehen</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlowCard className="h-full overflow-hidden group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <LazyImage 
                      src={value.image} 
                      alt={value.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-display text-xl text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
          
          {/* Team Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  className="aspect-[3/4] rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <LazyImage src={teamWorking} alt="Team bei der Arbeit" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div 
                  className="aspect-[3/4] rounded-2xl overflow-hidden mt-8"
                  whileHover={{ scale: 1.02 }}
                >
                  <LazyImage src={teamConsultation} alt="Beratungsgespräch" className="w-full h-full object-cover" />
                </motion.div>
              </div>
              <div>
                <h3 className="font-display text-2xl text-foreground mb-4">Unser Team</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Bei GentleHands arbeiten ausschliesslich sorgfältig ausgewählte und professionell 
                    ausgebildete Therapeut:innen, die unsere Philosophie der achtsamen Berührung teilen.
                  </p>
                  <p>
                    Jedes Teammitglied bringt jahrelange Erfahrung in ganzheitlicher Körperarbeit mit und 
                    hat sich auf die Bedürfnisse von Frauen spezialisiert, die einen sicheren Raum für 
                    tiefe Entspannung suchen.
                  </p>
                  <p className="italic text-foreground">
                    "Wir sehen uns nicht nur als Massage-Therapeut:innen, sondern als Begleiter:innen 
                    auf Ihrem Weg zu mehr Wohlbefinden und innerer Ruhe."
                  </p>
                </div>
                <Button variant="petrol-outline" className="mt-6 group" asChild>
                  <Link to="/team">
                    Unser Team kennenlernen
                    <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding-sm bg-secondary/30 relative overflow-hidden">
        {/* Ambient Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-copper/5 blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="container-wide relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative group">
                <motion.img 
                  src={spaMassageRoom} 
                  alt="GentleHands Massageraum" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Badge */}
                <motion.div
                  className="absolute top-6 left-6 px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-sm font-medium text-copper">Gründer & Lead Masseur</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
                Der Gründer
              </p>
              <h2 className="text-foreground mb-6">Morris</h2>
              <div className="divider-copper mb-6" />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Mit über 12 Jahren Erfahrung in ganzheitlicher Körperarbeit
                  gründete Morris GentleHands aus der Vision heraus, einen
                  wirklich einzigartigen Ort für Frauen zu schaffen.
                </p>
                <p>
                  Nach Ausbildungen in klassischer Massage, Craniosacral-Arbeit
                  und trauma-sensitiver Körperarbeit entwickelte er einen
                  eigenen Stil, der technische Kompetenz mit tiefer Präsenz
                  verbindet.
                </p>
                <GlowCard className="p-6 mt-6">
                  <Quote size={24} className="text-copper/30 mb-2" />
                  <p className="italic text-foreground">
                    „Ich habe gesehen, wie viele Frauen in klassischen
                    Massage-Settings nie wirklich loslassen können. GentleHands
                    ist meine Antwort darauf – ein Raum, in dem das endlich
                    möglich ist."
                  </p>
                </GlowCard>
              </div>
              <div className="mt-8">
                <Button variant="petrol-outline" className="group" asChild>
                  <Link to="/team">
                    Das ganze Team kennenlernen
                    <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-copper/10 blur-[100px]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="container-narrow text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
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
              Bereit für Ihr Erlebnis?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Erleben Sie selbst, was es bedeutet, in einem wirklich
              geschützten Raum vollständig loszulassen.
            </p>
            <Button variant="copper" size="lg" className="group" asChild>
              <Link to="/buchung">
                Erlebnis anfragen
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default UeberUns;