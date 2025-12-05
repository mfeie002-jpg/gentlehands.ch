import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Star, Quote, Heart, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { GlowCard } from "@/components/shared/GlowCard";

const testimonials = [
  {
    id: 1,
    content:
      "Ich hatte noch nie eine Massage, bei der ich so vollständig abschalten konnte. Das Ozean-Theme war wie ein Kurzurlaub für die Seele. Nach 90 Minuten fühlte ich mich wie neu geboren.",
    name: "Sandra M.",
    age: 42,
    location: "Zürich",
    theme: "Ozean & Palmen",
    rating: 5,
  },
  {
    id: 2,
    content:
      "Endlich ein Ort, an dem ich mich als Frau wirklich sicher und verstanden fühle. Die Professionalität und Atmosphäre sind einzigartig. Morris hat eine unglaubliche Präsenz.",
    name: "Claudia B.",
    age: 38,
    location: "Winterthur",
    theme: "Alpine Stille",
    rating: 5,
  },
  {
    id: 3,
    content:
      "Die Deep Dark Relax Session hat mir geholfen, nach Monaten des Burnouts wieder bei mir anzukommen. Absolut empfehlenswert für alle, die wirklich loslassen wollen.",
    name: "Nina K.",
    age: 35,
    location: "Zürich",
    theme: "Deep Dark Relax",
    rating: 5,
  },
  {
    id: 4,
    content:
      "Ich war skeptisch, aber schon beim Betreten des Raums hat sich mein Nervensystem beruhigt. Eine transformative Erfahrung, die ich jeder gestressten Frau ans Herz legen würde.",
    name: "Martina S.",
    age: 51,
    location: "Zug",
    theme: "Zen Garden",
    rating: 5,
  },
  {
    id: 5,
    content:
      "Die Kombination aus Alpine Stille und der sanften Massage von Anna war genau das, was ich brauchte. Danke für diesen wunderbaren Ort!",
    name: "Patricia L.",
    age: 29,
    location: "Zürich",
    theme: "Alpine Stille",
    rating: 5,
  },
  {
    id: 6,
    content:
      "Als vielbeschäftigte Unternehmerin hatte ich vergessen, wie es sich anfühlt, wirklich zur Ruhe zu kommen. GentleHands hat mir das zurückgegeben.",
    name: "Elisabeth R.",
    age: 47,
    location: "Luzern",
    theme: "Urban Loft",
    rating: 5,
  },
];

const stories = [
  {
    title: "Vom Burnout zurück ins Leben",
    content: `Nach zwei Jahren im Dauerstress hatte mein Körper einfach abgeschaltet. Ich konnte nicht mehr schlafen, hatte ständig Kopfschmerzen und fühlte mich wie in Watte gepackt – aber nicht auf die gute Art.

Eine Freundin empfahl mir GentleHands. Ich war skeptisch – noch eine Massage, die nichts bringt? Aber vom ersten Moment an war es anders. Der Raum, das Licht, die Art, wie Morris sich Zeit nahm für ein Vorgespräch.

Ich wählte Deep Dark Relax, weil ich dachte, ich brauche Reizarmut. Es war die beste Entscheidung. In der Dunkelheit, nur mit den sanften Berührungen, begann mein Körper zu zittern. Es war, als würde er endlich das loslassen, was er so lange festgehalten hatte.

Ich habe geweint. Nicht aus Traurigkeit, sondern aus Erleichterung. Nach der Session fühlte ich zum ersten Mal seit Monaten wieder meinen Körper richtig. Das war vor drei Monaten. Seitdem gehe ich alle zwei Wochen und kann sagen: GentleHands war ein wichtiger Teil meiner Genesung.`,
    author: "Nina K., 35",
    theme: "Deep Dark Relax",
  },
  {
    title: "Zeit nur für mich",
    content: `Als Mutter von zwei kleinen Kindern und Teilzeit-Berufstätige kenne ich das Gefühl, nie «fertig» zu sein. Es gibt immer noch etwas zu tun, jemand, der etwas braucht, eine Aufgabe, die wartet.

Bei GentleHands habe ich mir zum ersten Mal erlaubt, zwei Stunden nur für mich zu haben. Kein Handy, keine Erreichbarkeit, keine Verantwortung. Nur ich und die unglaubliche Atmosphäre des Ozean-Themes.

Was mich am meisten berührt hat: Es gab keinen Druck. Keine Erwartung, wie ich mich fühlen oder reagieren sollte. Ich durfte einfach sein, wie ich bin. Die Massage selbst war wunderbar, aber fast noch wichtiger war dieses Gefühl von «hier darf ich einfach existieren».

Ich habe mir vorgenommen, das jeden Monat zu machen. Nicht als Luxus, sondern als notwendige Wartung für mein Wohlbefinden.`,
    author: "Claudia B., 38",
    theme: "Ozean & Palmen",
  },
];

const Erfahrungen = () => {
  const [activeStory, setActiveStory] = useState(0);
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null);

  const nextStory = () => setActiveStory((prev) => (prev + 1) % stories.length);
  const prevStory = () => setActiveStory((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <Layout>
      <Helmet>
        <title>Erfahrungen & Bewertungen | GentleHands Zürich</title>
        <meta
          name="description"
          content="Lesen Sie Erfahrungsberichte unserer Kundinnen. Echte Geschichten über Entspannung, Transformation und tiefes Loslassen bei GentleHands."
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
            className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-[80px]"
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
              <Heart size={16} className="text-copper" />
              <span className="text-copper text-sm font-medium">Über 200 zufriedene Kundinnen</span>
            </motion.div>
            
            <h1 className="text-foreground mb-6">
              Was unsere Kundinnen sagen
            </h1>
            
            {/* Rating Display */}
            <motion.div 
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <Star size={28} className="text-copper fill-copper" />
                  </motion.div>
                ))}
              </div>
              <motion.span 
                className="text-foreground font-display text-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                4.9/5
              </motion.span>
            </motion.div>
            <p className="text-muted-foreground">
              Basierend auf über 200 Bewertungen
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding-sm relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }} />
        </div>
        
        <div className="container-wide relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredTestimonial(testimonial.id)}
                onMouseLeave={() => setHoveredTestimonial(null)}
              >
                <GlowCard className="h-full p-8 relative overflow-hidden group">
                  {/* Quote Icon */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-10"
                    animate={{ 
                      scale: hoveredTestimonial === testimonial.id ? 1.2 : 1,
                      rotate: hoveredTestimonial === testimonial.id ? 10 : 0 
                    }}
                  >
                    <Quote size={48} className="text-copper" />
                  </motion.div>
                  
                  <Quote size={32} className="text-copper/30 mb-4" />
                  
                  <p className="text-foreground mb-6 leading-relaxed relative z-10">
                    „{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-display text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.age} Jahre, {testimonial.location}
                      </p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            scale: hoveredTestimonial === testimonial.id ? [1, 1.2, 1] : 1 
                          }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Star size={14} className="text-copper fill-copper" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">Theme:</span>
                    <motion.span 
                      className="ml-2 text-xs px-3 py-1 bg-secondary rounded-full inline-block"
                      whileHover={{ scale: 1.05 }}
                    >
                      {testimonial.theme}
                    </motion.span>
                  </div>
                  
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full pointer-events-none"
                    animate={hoveredTestimonial === testimonial.id ? { translateX: '200%' } : {}}
                    transition={{ duration: 0.8 }}
                  />
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Long Stories - Carousel */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-copper/5 blur-[80px]"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="container-narrow relative">
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
              <span className="text-copper text-sm font-medium">Ausführliche Berichte</span>
            </motion.div>
            <h2 className="text-foreground mb-4">Geschichten der Transformation</h2>
          </motion.div>

          {/* Story Carousel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeStory}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <GlowCard className="p-8 md:p-12">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="px-3 py-1 text-xs bg-copper/10 text-copper rounded-full">
                      {stories[activeStory].theme}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-2xl text-foreground mb-6">
                    {stories[activeStory].title}
                  </h3>
                  <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line leading-relaxed">
                    {stories[activeStory].content}
                  </div>
                  <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                    <p className="text-copper font-medium">— {stories[activeStory].author}</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-copper fill-copper" />
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </motion.article>
            </AnimatePresence>
            
            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                onClick={prevStory}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center hover:border-copper transition-colors"
              >
                <ChevronLeft size={20} className="text-foreground" />
              </motion.button>
              
              <div className="flex gap-2">
                {stories.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveStory(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === activeStory ? "bg-copper w-6" : "bg-border"
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
              
              <motion.button
                onClick={nextStory}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center hover:border-copper transition-colors"
              >
                <ChevronRight size={20} className="text-foreground" />
              </motion.button>
            </div>
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
              <Heart size={32} className="text-copper" />
            </motion.div>
            
            <h2 className="text-foreground mb-6">
              Schreiben Sie Ihre eigene Geschichte
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Erleben Sie selbst, was diese Frauen erlebt haben. Ihr
              erstes GentleHands-Erlebnis wartet auf Sie.
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

export default Erfahrungen;