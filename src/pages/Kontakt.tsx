import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, Clock, Car, Train, Send, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FloatingElements } from "@/components/shared/FloatingElements";

import zurichMap from "@/assets/zurich-map.jpg";

const Kontakt = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFocused, setFormFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Nachricht gesendet",
      description: "Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze bei Ihnen.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "E-Mail",
      value: "kontakt@gentlehands.ch",
      href: "mailto:kontakt@gentlehands.ch",
    },
    {
      icon: Phone,
      title: "Telefon",
      value: "+41 00 000 00 00",
      href: "tel:+41000000000",
    },
    {
      icon: MapPin,
      title: "Standort",
      value: "Diskrete Lage in Zürich",
      subtitle: "(Genaue Adresse nach Buchung)",
    },
    {
      icon: Clock,
      title: "Öffnungszeiten",
      value: "Termine nach Vereinbarung",
      subtitle: "Mo–Sa, 10:00–21:00 Uhr",
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Kontakt | GentleHands Zürich</title>
        <meta name="description" content="Kontaktieren Sie GentleHands in Zürich. Fragen, Terminanfragen oder persönliche Beratung – wir sind für Sie da." />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/4 -right-32 w-96 h-96 bg-copper/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
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
              <MessageCircle size={16} className="text-copper" />
              <span className="text-copper text-sm font-medium">24h Antwortzeit</span>
            </motion.div>
            
            <motion.h1 
              className="text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Wir freuen uns auf <span className="text-gradient-copper">Sie</span>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Haben Sie Fragen oder möchten Sie einen Termin anfragen?
              Kontaktieren Sie uns – wir antworten in der Regel innerhalb von 24 Stunden.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="card-elevated p-8 relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-copper/10 to-transparent" />
                
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center"
                  >
                    <Send size={20} className="text-copper" />
                  </motion.div>
                  <h2 className="font-display text-2xl text-foreground">Nachricht senden</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div 
                      className="space-y-2"
                      animate={{ scale: formFocused === 'name' ? 1.02 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Ihr Name"
                        onFocus={() => setFormFocused('name')}
                        onBlur={() => setFormFocused(null)}
                        className="transition-all focus:ring-2 focus:ring-copper/20"
                      />
                    </motion.div>
                    <motion.div 
                      className="space-y-2"
                      animate={{ scale: formFocused === 'email' ? 1.02 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Label htmlFor="email">E-Mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="ihre@email.ch"
                        onFocus={() => setFormFocused('email')}
                        onBlur={() => setFormFocused(null)}
                        className="transition-all focus:ring-2 focus:ring-copper/20"
                      />
                    </motion.div>
                  </div>
                  <motion.div 
                    className="space-y-2"
                    animate={{ scale: formFocused === 'subject' ? 1.02 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Label htmlFor="subject">Betreff</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Worum geht es?"
                      onFocus={() => setFormFocused('subject')}
                      onBlur={() => setFormFocused(null)}
                      className="transition-all focus:ring-2 focus:ring-copper/20"
                    />
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    animate={{ scale: formFocused === 'message' ? 1.02 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Label htmlFor="message">Nachricht *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Ihre Nachricht an uns..."
                      rows={5}
                      onFocus={() => setFormFocused('message')}
                      onBlur={() => setFormFocused(null)}
                      className="transition-all focus:ring-2 focus:ring-copper/20"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      variant="copper"
                      size="lg"
                      className="w-full group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles size={20} />
                        </motion.div>
                      ) : (
                        <>
                          Nachricht senden
                          <Send size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="card-elevated p-8">
                <h2 className="font-display text-2xl text-foreground mb-6">Kontaktdaten</h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.href ? (
                        <a href={item.href} className="flex items-start gap-4 group">
                          <motion.div 
                            className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <item.icon size={20} className="text-primary" />
                          </motion.div>
                          <div>
                            <p className="font-medium text-foreground group-hover:text-copper transition-colors">
                              {item.title}
                            </p>
                            <p className="text-muted-foreground">{item.value}</p>
                            {item.subtitle && (
                              <p className="text-sm text-muted-foreground/70">{item.subtitle}</p>
                            )}
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-start gap-4">
                          <motion.div 
                            className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <item.icon size={20} className="text-primary" />
                          </motion.div>
                          <div>
                            <p className="font-medium text-foreground">{item.title}</p>
                            <p className="text-muted-foreground">{item.value}</p>
                            {item.subtitle && (
                              <p className="text-sm text-muted-foreground/70">{item.subtitle}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Getting There */}
              <motion.div 
                className="card-bordered p-8"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-display text-xl text-foreground mb-4">Anreise</h3>
                <div className="space-y-4">
                  {[
                    { icon: Train, title: "Mit ÖV", text: "Zentral gelegen, 5 Min. vom Hauptbahnhof Zürich. Tram-Linien 4, 11 und 15." },
                    { icon: Car, title: "Mit Auto", text: "Parkhaus Urania (2 Min. zu Fuss). Blaue Zone in umliegenden Strassen." },
                  ].map((item, index) => (
                    <motion.div 
                      key={item.title}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.div whileHover={{ rotate: 10 }}>
                        <item.icon size={18} className="text-copper mt-1" />
                      </motion.div>
                      <div>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Map */}
              <motion.div 
                className="relative aspect-video rounded-2xl overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={zurichMap} 
                  alt="GentleHands Standort in Zürich"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                <motion.div 
                  className="absolute bottom-4 left-4 right-4"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-background/90 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 shadow-lg">
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-copper flex items-center justify-center shrink-0"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <MapPin size={18} className="text-accent-foreground" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-foreground text-sm">GentleHands</p>
                      <p className="text-xs text-muted-foreground">Zürich Innenstadt</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Kontakt;