import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/shared/SEOHead";
import { Check, MapPin, X, ArrowRight, Sparkles } from "lucide-react";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { GlowCard } from "@/components/shared/GlowCard";
import { LazyImage } from "@/components/shared/LazyImage";

// Import visit step images
import visitStepArrival from "@/assets/visit-step-arrival.jpg";
import visitStepConsultation from "@/assets/visit-step-consultation.jpg";
import visitStepPreparation from "@/assets/visit-step-preparation.jpg";
import visitStepMassage from "@/assets/visit-step-massage.jpg";

const visitSteps = [
  { 
    image: visitStepArrival, 
    title: "Ankommen", 
    text: "Kommen Sie 10-15 Minuten vor Ihrem Termin an. Unsere diskrete Lage bietet Ihnen vollständige Privatsphäre.",
    step: 1
  },
  { 
    image: visitStepConsultation, 
    title: "Beratungsgespräch", 
    text: "Ein kurzes persönliches Gespräch, um Ihre Wünsche und eventuelle Bedenken zu besprechen.",
    step: 2
  },
  { 
    image: visitStepPreparation, 
    title: "Vorbereitung", 
    text: "Der Raum wird nach Ihrem gewählten Thema eingerichtet. Sie können sich in aller Ruhe vorbereiten.",
    step: 3
  },
  { 
    image: visitStepMassage, 
    title: "Ihre Session", 
    text: "Geniessen Sie Ihre vollständig personalisierte Massage in einer Atmosphäre der Geborgenheit.",
    step: 4
  },
];

const afterSession = [
  { title: "Ruhe gönnen", text: "Planen Sie keine stressigen Aktivitäten direkt nach der Session." },
  { title: "Viel trinken", text: "Wasser hilft dem Körper, gelöste Stoffe auszuspülen." },
  { title: "Leichte Bewegung", text: "Ein kurzer Spaziergang kann das Wohlgefühl verlängern." },
  { title: "Warmhalten", text: "Halten Sie sich warm, besonders in den ersten Stunden danach." },
];

const dontDo = [
  "Direkt vorher Alkohol trinken",
  "Mit vollem Magen kommen",
  "Unter Zeitdruck anreisen",
  "Sofort wieder arbeiten",
];

const Vorbereitung = () => {
  return (
    <Layout>
      <SEOHead 
        title="Vorbereitung auf Ihre Session | GentleHands Zürich"
        description="Tipps zur optimalen Vorbereitung auf Ihre professionelle Entspannungsmassage. Erfahren Sie, was Sie vor, während und nach Ihrer Session erwartet."
        canonical="https://gentlehands.ch/vorbereitung"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        {/* Ambient Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-copper/10 blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-[80px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
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
              <Sparkles size={16} className="text-copper" />
              <span className="text-copper text-sm font-medium">Vorbereitung</span>
            </motion.div>
            
            <motion.h1 
              className="text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="block">Machen Sie das Beste</span>
              <span className="bg-gradient-to-r from-copper via-copper-light to-copper bg-clip-text text-transparent">
                aus Ihrem Erlebnis
              </span>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Mit ein paar einfachen Vorbereitungen können Sie die Wirkung Ihrer
              GentleHands-Session maximieren.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Visit Steps with Images */}
      <section className="section-padding-sm relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }} />
        </div>
        
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">Ihr Besuch bei uns</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Von der Ankunft bis zur vollständigen Entspannung – so gestaltet sich Ihr Erlebnis bei GentleHands.
            </p>
            <div className="divider-copper mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visitSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlowCard className="h-full overflow-hidden group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <LazyImage
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-copper flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{step.step}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-display text-lg text-foreground mb-2">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">{step.text}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* During - Simple info cards */}
      <section className="section-padding-sm bg-secondary/30 relative overflow-hidden">
        {/* Ambient Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/2 -left-20 w-64 h-64 rounded-full bg-copper/5 blur-[80px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">Während Ihrer Session</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ihr Wohlbefinden steht immer an erster Stelle. So gestalten wir Ihre Zeit bei uns.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <GlowCard className="h-full p-6 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden">
                  <LazyImage src={visitStepPreparation} alt="Bekleidung" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-display text-lg text-foreground mb-2">Bekleidung</h4>
                <p className="text-muted-foreground text-sm">Sie entkleiden sich so weit, wie Sie sich wohl fühlen. Während der gesamten Session sind Sie professionell abgedeckt.</p>
              </GlowCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <GlowCard className="h-full p-6 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden">
                  <LazyImage src={visitStepConsultation} alt="Kommunikation" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-display text-lg text-foreground mb-2">Kommunikation</h4>
                <p className="text-muted-foreground text-sm">Teilen Sie uns jederzeit mit, wenn etwas unangenehm ist – Druck, Temperatur, Bereiche. Wir passen uns sofort an.</p>
              </GlowCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <GlowCard className="h-full p-6 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden">
                  <LazyImage src={visitStepMassage} alt="Kontrolle" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-display text-lg text-foreground mb-2">Volle Kontrolle</h4>
                <p className="text-muted-foreground text-sm">Sie können die Session jederzeit anpassen oder beenden. Ihr Wohlbefinden hat oberste Priorität.</p>
              </GlowCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* After & Don't */}
      <section className="section-padding-sm relative">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center">
                  <span className="text-copper font-display font-bold">3</span>
                </div>
                <h2 className="text-foreground">Nach der Session</h2>
              </div>
              <div className="divider-copper ml-14 mb-8" />

              <div className="space-y-4">
                {afterSession.map((item, index) => (
                  <motion.div 
                    key={item.title} 
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-copper/20 to-copper/10 flex items-center justify-center shrink-0"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Check size={18} className="text-copper" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-muted-foreground text-sm">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X size={18} className="text-destructive" />
                </div>
                <h2 className="text-foreground">Bitte vermeiden</h2>
              </div>
              <div className="w-16 h-0.5 bg-destructive/30 ml-14 mb-8" />

              <GlowCard className="p-6 border-destructive/20">
                <div className="space-y-4">
                  {dontDo.map((item, index) => (
                    <motion.div 
                      key={item} 
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                        <X size={14} className="text-destructive" />
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Tip */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-copper/10 blur-[80px]"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="container-narrow text-center relative">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-copper/20 flex items-center justify-center"
          >
            <MapPin size={32} className="text-copper" />
          </motion.div>
          
          <h2 className="text-primary-foreground mb-4">Anreise</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Unser Studio befindet sich an einer diskreten Adresse in Zürich. Die
            genaue Adresse erhalten Sie nach Ihrer Buchungsbestätigung per E-Mail.
            Planen Sie genug Zeit für die Anreise ein.
          </p>
          <Button variant="copper" className="group" asChild>
            <Link to="/kontakt">
              Mehr zur Lage
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-copper/10 blur-[100px]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="container-narrow text-center relative">
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
            
            <h2 className="text-foreground mb-6">Bereit?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Sie haben alle Informationen. Jetzt fehlt nur noch Ihre Buchung.
            </p>
            <Button variant="copper" size="lg" className="group" asChild>
              <Link to="/buchung">
                Jetzt Termin buchen
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Vorbereitung;