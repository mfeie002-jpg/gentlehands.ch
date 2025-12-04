import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const ContactCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-8 rounded-2xl bg-card border border-border"
    >
      <h3 className="font-display text-2xl text-foreground mb-6">
        Kontaktieren Sie uns
      </h3>

      <div className="space-y-6">
        <a
          href="mailto:hello@gentlehands.ch"
          className="flex items-start gap-4 group"
        >
          <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center shrink-0 group-hover:bg-copper/20 transition-colors">
            <Mail size={18} className="text-copper" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">E-Mail</p>
            <p className="text-foreground group-hover:text-copper transition-colors">
              hello@gentlehands.ch
            </p>
          </div>
        </a>

        <a
          href="tel:+41441234567"
          className="flex items-start gap-4 group"
        >
          <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center shrink-0 group-hover:bg-copper/20 transition-colors">
            <Phone size={18} className="text-copper" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Telefon</p>
            <p className="text-foreground group-hover:text-copper transition-colors">
              +41 44 123 45 67
            </p>
          </div>
        </a>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center shrink-0">
            <MapPin size={18} className="text-copper" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Adresse</p>
            <p className="text-foreground">
              Musterstrasse 12<br />
              8001 Zürich
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center shrink-0">
            <Clock size={18} className="text-copper" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Öffnungszeiten</p>
            <p className="text-foreground">
              Mo–Fr: 10:00–21:00<br />
              Sa: 10:00–18:00<br />
              So: Geschlossen
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Hinweis:</strong> Unser Eingang ist diskret und befindet sich im Hinterhof. Sie erhalten nach der Buchung eine detaillierte Wegbeschreibung.
        </p>
      </div>
    </motion.div>
  );
};
