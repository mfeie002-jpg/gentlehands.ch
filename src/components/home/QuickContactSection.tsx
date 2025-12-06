import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Phone, Mail, MessageCircle, Clock } from "lucide-react";

const contacts = [
  { icon: Phone, label: "+41 00 000 00 00", href: "tel:+41000000000", sublabel: "Anrufen" },
  { icon: Mail, label: "kontakt@gentlehands.ch", href: "mailto:kontakt@gentlehands.ch", sublabel: "E-Mail" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/41000000000", sublabel: "Chat starten" },
];

export const QuickContactSection = () => {
  return (
    <section className="py-10 bg-card border-y border-border">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <ScrollReveal direction="left">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-display text-foreground mb-2">Fragen? Wir sind für Sie da.</h3>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground text-sm">
                <Clock size={14} className="text-copper" />
                <span>Antwort innerhalb von 24 Stunden</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {contacts.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-background border border-border hover:border-copper/30 transition-all group"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors">
                    <contact.icon size={18} className="text-copper" />
                  </div>
                  <div className="text-left">
                    <p className="text-foreground text-sm font-medium">{contact.sublabel}</p>
                    <p className="text-muted-foreground text-xs">{contact.label}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
