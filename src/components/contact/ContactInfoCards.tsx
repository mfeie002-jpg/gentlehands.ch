import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Mail, Phone, MapPin, Clock, MessageCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const contactMethods = [
  {
    icon: Phone,
    title: "Telefon",
    description: "Mo-Fr 9-18 Uhr",
    value: "+41 44 123 45 67",
    link: "tel:+41441234567",
    color: "copper"
  },
  {
    icon: Mail,
    title: "E-Mail",
    description: "Antwort innerhalb 24h",
    value: "hello@gentlehands.ch",
    link: "mailto:hello@gentlehands.ch",
    color: "petrol"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Schnelle Kommunikation",
    value: "Nachricht senden",
    link: "https://wa.me/41441234567",
    color: "emerald-500"
  },
  {
    icon: Calendar,
    title: "Termin buchen",
    description: "Online Buchung",
    value: "Zum Buchungskalender",
    link: "/buchung",
    color: "amber-500"
  },
];

export const ContactInfoCards = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <ScrollReveal key={method.title} direction="up" delay={index * 0.1}>
              <motion.div whileHover={{ y: -8 }}>
                {method.link.startsWith("/") ? (
                  <Link to={method.link} className="block h-full">
                    <div className={`p-6 rounded-2xl bg-card border border-border/50 hover:border-${method.color}/30 transition-colors h-full group`}>
                      <div className={`w-14 h-14 rounded-xl bg-${method.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <method.icon className={`w-7 h-7 text-${method.color}`} />
                      </div>
                      <h3 className="text-foreground font-medium text-lg mb-1">{method.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{method.description}</p>
                      <p className={`text-${method.color} font-medium`}>{method.value}</p>
                    </div>
                  </Link>
                ) : (
                  <a href={method.link} target={method.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block h-full">
                    <div className={`p-6 rounded-2xl bg-card border border-border/50 hover:border-${method.color}/30 transition-colors h-full group`}>
                      <div className={`w-14 h-14 rounded-xl bg-${method.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <method.icon className={`w-7 h-7 text-${method.color}`} />
                      </div>
                      <h3 className="text-foreground font-medium text-lg mb-1">{method.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{method.description}</p>
                      <p className={`text-${method.color} font-medium`}>{method.value}</p>
                    </div>
                  </a>
                )}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
