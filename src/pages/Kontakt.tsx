import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, Clock, Car, Train } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import zurichMap from "@/assets/zurich-map.jpg";

const Kontakt = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Nachricht gesendet",
      description: "Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze bei Ihnen.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <Helmet>
        <title>Kontakt | GentleHands Zürich</title>
        <meta
          name="description"
          content="Kontaktieren Sie GentleHands in Zürich. Fragen, Terminanfragen oder persönliche Beratung – wir sind für Sie da."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
              Kontakt
            </p>
            <h1 className="text-foreground mb-6">
              Wir freuen uns auf Sie
            </h1>
            <p className="text-muted-foreground text-lg">
              Haben Sie Fragen oder möchten Sie einen Termin anfragen?
              Kontaktieren Sie uns – wir antworten in der Regel innerhalb
              von 24 Stunden.
            </p>
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
              <div className="card-elevated p-8">
                <h2 className="font-display text-2xl text-foreground mb-6">
                  Nachricht senden
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Ihr Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="ihre@email.ch"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Betreff</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Worum geht es?"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Nachricht *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Ihre Nachricht an uns..."
                      rows={5}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="copper"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
                  </Button>
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
                <h2 className="font-display text-2xl text-foreground mb-6">
                  Kontaktdaten
                </h2>
                <div className="space-y-6">
                  <a
                    href="mailto:kontakt@gentlehands.ch"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        E-Mail
                      </p>
                      <p className="text-muted-foreground">
                        kontakt@gentlehands.ch
                      </p>
                    </div>
                  </a>
                  <a
                    href="tel:+41000000000"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        Telefon
                      </p>
                      <p className="text-muted-foreground">
                        +41 00 000 00 00
                      </p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Standort</p>
                      <p className="text-muted-foreground">
                        Diskrete Lage in Zürich
                        <br />
                        <span className="text-sm">
                          (Genaue Adresse nach Buchung)
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Öffnungszeiten
                      </p>
                      <p className="text-muted-foreground">
                        Termine nach Vereinbarung
                        <br />
                        Mo–Sa, 10:00–21:00 Uhr
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Getting There */}
              <div className="card-bordered p-8">
                <h3 className="font-display text-xl text-foreground mb-4">
                  Anreise
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Train size={18} className="text-copper mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Mit ÖV</p>
                      <p className="text-sm text-muted-foreground">
                        Zentral gelegen, 5 Min. vom Hauptbahnhof Zürich. Tram-Linien 4, 11 und 15 halten in unmittelbarer Nähe.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Car size={18} className="text-copper mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Mit Auto</p>
                      <p className="text-sm text-muted-foreground">
                        Parkmöglichkeiten im Parkhaus Urania (2 Min. zu Fuss). Blaue Zone in den umliegenden Strassen verfügbar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative aspect-video rounded-2xl overflow-hidden group">
                <img 
                  src={zurichMap} 
                  alt="GentleHands Standort in Zürich"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/90 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-copper flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">GentleHands</p>
                      <p className="text-xs text-muted-foreground">Zürich Innenstadt</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Kontakt;
