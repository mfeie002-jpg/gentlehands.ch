import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Check, Clock, MapPin, Shirt, Droplets, Heart, Phone, Coffee, X, ArrowRight, Sparkles } from "lucide-react";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { GlowCard } from "@/components/shared/GlowCard";

const beforeVisit = [
  { icon: Clock, title: "Kommen Sie pünktlich", text: "Planen Sie 10-15 Minuten vor Ihrem Termin ein, um in Ruhe anzukommen.", color: "from-petrol/20 to-petrol/10" },
  { icon: Coffee, title: "Leichte Mahlzeit", text: "Vermeiden Sie schwere Mahlzeiten 2 Stunden vor der Session.", color: "from-copper/20 to-copper/10" },
  { icon: Droplets, title: "Gut hydriert", text: "Trinken Sie ausreichend Wasser vor Ihrem Besuch.", color: "from-primary/20 to-primary/10" },
  { icon: Phone, title: "Digital Detox", text: "Schalten Sie Ihr Handy aus oder auf lautlos – Sie werden nicht erreichbar sein.", color: "from-forest/20 to-forest/10" },
];

const duringSession = [
  { icon: Shirt, title: "Bekleidung", text: "Sie entkleiden sich so weit, wie Sie sich wohl fühlen. Professionelle Abdeckung ist garantiert." },
  { icon: Heart, title: "Kommunikation", text: "Teilen Sie uns mit, wenn etwas unangenehm ist – Druck, Temperatur, Berührung." },
  { icon: Check, title: "Loslassen", text: "Es gibt kein 'richtig' oder 'falsch'. Erlauben Sie sich einfach zu sein." },
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
      <Helmet>
        <title>Vorbereitung | GentleHands Zürich</title>
        <meta
          name="description"
          content="Tipps zur optimalen Vorbereitung auf Ihr GentleHands-Erlebnis. So holen Sie das Maximum aus Ihrer Session."
        />
      </Helmet>

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

      {/* Before */}
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
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center">
                <span className="text-copper font-display font-bold">1</span>
              </div>
              <h2 className="text-foreground">Vor Ihrem Besuch</h2>
            </div>
            <div className="divider-copper ml-14" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beforeVisit.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlowCard className="h-full p-6 group">
                  <motion.div 
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring" }}
                  >
                    <item.icon size={28} className="text-foreground" />
                  </motion.div>
                  <h4 className="font-display text-lg text-foreground mb-2">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">{item.text}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* During */}
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
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center">
                <span className="text-copper font-display font-bold">2</span>
              </div>
              <h2 className="text-foreground">Während der Session</h2>
            </div>
            <div className="divider-copper ml-14" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {duringSession.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlowCard className="h-full p-6 group">
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-copper/20 to-copper/10 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <item.icon size={28} className="text-copper" />
                  </motion.div>
                  <h4 className="font-display text-lg text-foreground mb-2">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">{item.text}</p>
                </GlowCard>
              </motion.div>
            ))}
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