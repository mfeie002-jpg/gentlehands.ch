import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const FAQContactPrompt = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-gradient-to-br from-copper/10 to-primary/5 border border-copper/20 text-center"
        >
          <motion.div
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-copper/10 flex items-center justify-center"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <MessageCircle size={32} className="text-copper" />
          </motion.div>

          <h2 className="text-2xl font-display text-foreground mb-4">
            Frage nicht dabei?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Wir sind für Sie da. Kontaktieren Sie uns direkt – wir antworten innerhalb von 24 Stunden.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="copper" asChild>
              <Link to="/kontakt">
                <Mail size={18} className="mr-2" />
                Kontaktformular
              </Link>
            </Button>
            <Button variant="petrol-outline" asChild>
              <a href="tel:+41000000000">
                <Phone size={18} className="mr-2" />
                Anrufen
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
