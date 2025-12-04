import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Languages, Award, Heart } from "lucide-react";

const team = [
  {
    id: "morris",
    name: "Morris",
    role: "Inhaber & Leitender Masseur",
    description:
      "Mit über 10 Jahren Erfahrung in ganzheitlicher Körperarbeit. Spezialisiert auf Deep Relax und Emotional Grounding.",
    languages: ["DE", "EN", "FR"],
    specialties: ["Tiefenentspannung", "Intuitive Berührung"],
    isOwner: true,
  },
  {
    id: "anna",
    name: "Anna",
    role: "Masseurin",
    description:
      "Sanfte, achtsame Herangehensweise mit Fokus auf Stressabbau und Nervensystem-Regulation.",
    languages: ["DE", "EN"],
    specialties: ["Sanfte Massage", "Stress Reset"],
    isOwner: false,
  },
  {
    id: "luca",
    name: "Luca",
    role: "Masseur",
    description:
      "Sportlicher Hintergrund mit intensiverer Technik für tiefe Verspannungen und körperliche Blockaden.",
    languages: ["DE", "IT", "EN"],
    specialties: ["Deep Tissue", "Körperarbeit"],
    isOwner: false,
  },
];

export const TeamPreviewSection = () => {
  return (
    <section className="section-padding">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
            Unser Team
          </p>
          <h2 className="text-foreground mb-4">
            Wählen Sie Ihre Begleitung
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Alle unsere Masseur:innen sind professionell ausgebildet und bringen
            ihre eigene, einzigartige Herangehensweise mit.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={member.isOwner ? "md:col-span-1" : ""}
            >
              <div
                className={`h-full card-elevated p-6 border border-transparent hover:border-copper/20 transition-all ${
                  member.isOwner ? "ring-2 ring-copper/20" : ""
                }`}
              >
                {/* Avatar Placeholder */}
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-sand to-sand-dark mb-6 relative overflow-hidden">
                  {member.isOwner && (
                    <div className="absolute top-3 right-3 bg-copper text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                      Inhaber
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-warm-gray text-xs text-center px-4">
                      [Platzhalter: Professionelles Portrait von {member.name}]
                    </p>
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-xl font-display text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-copper text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  {member.description}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Languages size={14} className="text-primary" />
                    <span>{member.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Heart size={14} className="text-primary mt-0.5" />
                    <span>{member.specialties.join(", ")}</span>
                  </div>
                </div>

                {/* CTA */}
                <Button variant="petrol-outline" size="sm" className="w-full" asChild>
                  <Link to={`/buchung?masseur=${member.id}`}>
                    Mit {member.name} buchen
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="ghost" size="lg" asChild>
            <Link to="/team">
              Mehr über unser Team
              <ArrowRight size={18} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
