import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Star, Heart, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import teamAnna from "@/assets/team-anna.jpg";
import teamSophie from "@/assets/team-sophie.jpg";
import teamLuca from "@/assets/team-luca.jpg";

const therapists = [
  {
    name: "Anna",
    specialty: "Tiefenentspannung & Stress-Release",
    experience: "8 Jahre Erfahrung",
    rating: 4.9,
    image: teamAnna,
    quote: "Jede Berührung sollte heilend sein.",
  },
  {
    name: "Sophie",
    specialty: "Ganzheitliche Körperarbeit",
    experience: "6 Jahre Erfahrung",
    rating: 4.8,
    image: teamSophie,
    quote: "Entspannung beginnt im Vertrauen.",
  },
  {
    name: "Luca",
    specialty: "Deep Tissue & Faszienarbeit",
    experience: "10 Jahre Erfahrung",
    rating: 5.0,
    image: teamLuca,
    quote: "Ihr Wohlbefinden ist meine Priorität.",
  },
];

export const TherapistSpotlightSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-copper/5 rounded-full blur-[120px]" />

      <div className="container-wide relative">
        <ScrollReveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Unser Team
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
          </div>
          <h2 className="text-foreground mb-4">
            Diplomierte <span className="text-gradient-copper">Therapeut:innen</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Erfahrene Fachkräfte mit Herz und Expertise – Sie wählen, wer Sie begleitet.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {therapists.map((therapist, index) => (
            <ScrollReveal key={therapist.name} delay={index * 0.15}>
              <motion.div
                className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-copper/30 transition-all duration-500"
                whileHover={{ y: -6 }}
              >
                {/* Image */}
                <div className="aspect-[4/5] overflow-hidden">
                  <motion.img
                    src={therapist.image}
                    alt={therapist.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 -mt-20 relative">
                  {/* Quote */}
                  <p className="text-sm text-muted-foreground italic mb-4">
                    „{therapist.quote}"
                  </p>

                  <h3 className="text-xl font-display text-foreground mb-1">{therapist.name}</h3>
                  <p className="text-copper text-sm font-medium mb-2">{therapist.specialty}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-copper fill-copper" />
                      <span className="text-sm text-foreground font-medium">{therapist.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Award size={12} />
                      <span>{therapist.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-10 h-10 rounded-full bg-copper/20 backdrop-blur-sm flex items-center justify-center">
                    <Heart size={18} className="text-copper" />
                  </div>
                </motion.div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center">
          <Button variant="outline" size="lg" asChild className="border-copper/30 hover:border-copper">
            <Link to="/team">Gesamtes Team kennenlernen</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};
