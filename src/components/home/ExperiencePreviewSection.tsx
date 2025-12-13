import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Play, Volume2, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import roomOcean from "@/assets/room-ozean.jpg";
import roomAlpine from "@/assets/room-alpine.jpg";
import roomDark from "@/assets/room-dark.jpg";

const rooms = [
  {
    name: "Ocean & Palmen",
    image: roomOcean,
    sounds: "Meeresrauschen, sanfte Wellen",
    scent: "Meersalz, Kokos",
    mood: "Urlaubsfeeling",
    cta: "Flucht vom Alltag",
  },
  {
    name: "Alpine Stille",
    image: roomAlpine,
    sounds: "Bergbach, Vogelgesang",
    scent: "Zirbe, frische Bergluft",
    mood: "Erdung",
    cta: "Kraft tanken",
  },
  {
    name: "Deep Dark Relax",
    image: roomDark,
    sounds: "Tiefe Frequenzen, Stille",
    scent: "Sandelholz, Weihrauch",
    mood: "Totale Ruhe",
    cta: "Tief entspannen",
  },
];

export const ExperiencePreviewSection = () => {
  return (
    <section className="section-padding bg-foreground text-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-copper/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-petrol/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />

      <div className="container-wide relative">
        <ScrollReveal className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Virtueller Einblick
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
          </div>
          <h2 className="text-background mb-4">
            Tauchen Sie ein in unsere <span className="text-copper">Welten</span>
          </h2>
          <p className="text-background/70 text-lg max-w-2xl mx-auto">
            Jeder Raum erzählt eine Geschichte. Welche möchten Sie erleben?
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
          {rooms.map((room, index) => (
            <ScrollReveal key={room.name} delay={index * 0.12}>
              <motion.div
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ y: -6 }}
              >
                <Link to="/erlebnisse" className="block">
                  {/* Image */}
                  <div className="aspect-[3/4] relative">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/30 to-transparent" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-display text-background mb-3">{room.name}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-background/80 text-sm">
                        <Volume2 size={14} className="text-copper shrink-0" />
                        <span className="truncate">{room.sounds}</span>
                      </div>
                      <div className="flex items-center gap-2 text-background/80 text-sm">
                        <Eye size={14} className="text-copper shrink-0" />
                        <span className="truncate">{room.scent}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 bg-copper/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <span className="text-copper text-xs font-medium">{room.mood}</span>
                      </span>
                      <motion.span 
                        className="flex items-center gap-1 text-copper text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        {room.cta}
                        <ArrowRight size={14} />
                      </motion.span>
                    </div>
                  </div>

                  {/* Play Button */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-copper/80 backdrop-blur-sm flex items-center justify-center">
                      <Play size={24} className="text-background ml-1" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-10 sm:mt-12">
          <Button variant="outline" size="lg" asChild className="border-copper/50 text-copper hover:bg-copper/10 group">
            <Link to="/virtual-tour">
              Virtuelle Tour starten
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};
