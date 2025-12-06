import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const ContactFormSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Nachricht gesendet",
      description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12">
          <ScrollReveal direction="left">
            <span className="text-copper text-sm font-medium uppercase tracking-wider mb-4 block">
              Kontakt
            </span>
            <h2 className="text-foreground text-3xl md:text-4xl mb-6">
              Wir freuen uns auf <span className="text-gradient-copper">Ihre Nachricht</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Haben Sie Fragen oder möchten Sie mehr über unsere Angebote erfahren? 
              Schreiben Sie uns – wir antworten Ihnen schnellstmöglich.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-copper" />
                </div>
                <div>
                  <p className="text-foreground font-medium">E-Mail</p>
                  <p className="text-muted-foreground">hello@gentlehands.ch</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-copper" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Telefon</p>
                  <p className="text-muted-foreground">+41 44 123 45 67</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-copper" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Adresse</p>
                  <p className="text-muted-foreground">Bahnhofstrasse 42, 8001 Zürich</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-card border border-border/50"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-foreground text-xl font-display mb-2">Vielen Dank!</h3>
                <p className="text-muted-foreground">
                  Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border/50">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-foreground mb-2 block">Name *</label>
                      <Input placeholder="Ihr Name" required />
                    </div>
                    <div>
                      <label className="text-sm text-foreground mb-2 block">E-Mail *</label>
                      <Input type="email" placeholder="ihre@email.ch" required />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Telefon</label>
                    <Input placeholder="+41 79 123 45 67" />
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Betreff *</label>
                    <Input placeholder="Worum geht es?" required />
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Nachricht *</label>
                    <Textarea placeholder="Ihre Nachricht..." rows={5} required />
                  </div>
                  <Button 
                    type="submit" 
                    variant="copper" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Wird gesendet..."
                    ) : (
                      <>
                        Nachricht senden
                        <Send size={16} className="ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
