import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Languages, Heart, Award } from "lucide-react";
import { LazyImage } from "@/components/shared/LazyImage";

import teamMorris from "@/assets/team-morris.jpg";
import teamAnna from "@/assets/team-anna.jpg";
import teamLuca from "@/assets/team-luca.jpg";

const team = [
  {
    id: "morris",
    name: "Morris",
    role: "Inhaber & Leitender Masseur",
    image: teamMorris,
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
    image: teamAnna,
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
    image: teamLuca,
    description:
      "Sportlicher Hintergrund mit intensiverer Technik für tiefe Verspannungen und körperliche Blockaden.",
    languages: ["DE", "IT", "EN"],
    specialties: ["Deep Tissue", "Körperarbeit"],
    isOwner: false,
  },
];

export const TeamPreviewSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-copper/3 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-petrol/3 rounded-full blur-[150px]" />
      
      <div className="container-wide relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16 px-4 sm:px-0"
        >
          <motion.div className="flex items-center justify-center gap-4 mb-4">
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Unser Team
            </span>
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
          <h2 className="text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4">
            Wählen Sie Ihre <span className="text-gradient-copper">Begleitung</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Alle unsere Masseur:innen sind professionell ausgebildet und bringen
            ihre eigene, einzigartige Herangehensweise mit.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 px-4 sm:px-0">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className={`h-full card-elevated p-6 border border-transparent hover:border-copper/20 transition-all duration-300 group ${
                  member.isOwner ? "ring-1 ring-copper/20" : ""
                }`}
                whileHover={{ y: -4 }}
              >
                {/* Avatar */}
                <div className="aspect-square rounded-2xl mb-6 relative overflow-hidden">
                  <LazyImage 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    wrapperClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {member.isOwner && (
                    <motion.div 
                      className="absolute top-3 right-3 bg-copper text-accent-foreground text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-copper"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Award size={12} />
                      Inhaber
                    </motion.div>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-xl font-display text-foreground mb-1 group-hover:text-copper transition-colors">
                  {member.name}
                </h3>
                <p className="text-copper text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {member.description}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Languages size={14} className="text-petrol" />
                    <span>{member.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Heart size={14} className="text-copper mt-0.5" />
                    <span>{member.specialties.join(", ")}</span>
                  </div>
                </div>

                {/* CTA */}
                <Button variant="outline" size="sm" className="w-full border-copper/30 hover:border-copper hover:bg-copper/5 group/btn" asChild>
                  <Link to={`/buchung?masseur=${member.id}`}>
                    Mit {member.name} buchen
                    <ArrowRight size={14} className="ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
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
          <Button variant="ghost" size="lg" asChild className="group text-muted-foreground hover:text-foreground">
            <Link to="/team">
              Mehr über unser Team
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
