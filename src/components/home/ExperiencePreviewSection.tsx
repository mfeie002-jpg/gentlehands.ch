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
    <section className="py-16 sm:py-20 md:py-24 bg-foreground text-background relative overflow-hidden">
      {/* Decorative - desktop only */}
      <div className="hidden md:block">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-copper/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-petrol/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-wide relative">
        <ScrollReveal className="text-center mb-10 sm:mb-16 px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-8 sm:w-12" />
            <span className="text-copper font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[10px] sm:text-xs">
              Virtueller Einblick
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-8 sm:w-12" />
          </div>
          <h2 className="text-background mb-4 text-2xl sm:text-3xl md:text-4xl">
            Tauchen Sie ein in unsere <span className="text-copper">Welten</span>
          </h2>
          <p className="text-background/70 text-base sm:text-lg max-w-2xl mx-auto">
            Jeder Raum erzählt eine Geschichte. Welche möchten Sie erleben?
          </p>
        </ScrollReveal>

        {/* Mobile: horizontal scroll, Desktop: grid */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-6 lg:px-4 xl:px-0">
          <div className="flex lg:contents gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 lg:px-0 -mx-4 lg:mx-0 pb-4 lg:pb-0">
            {rooms.map((room, index) => (
              <ScrollReveal key={room.name} delay={index * 0.12} className="contents lg:block">
                <motion.div
                  className="group relative flex-shrink-0 w-[280px] sm:w-[320px] lg:w-auto snap-center lg:snap-align-none rounded-2xl overflow-hidden cursor-pointer"
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
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <h3 className="text-lg sm:text-2xl font-display text-background mb-2 sm:mb-3">{room.name}</h3>
                      
                      <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 text-background/80 text-xs sm:text-sm">
                          <Volume2 size={12} className="sm:w-[14px] sm:h-[14px] text-copper shrink-0" />
                          <span className="truncate">{room.sounds}</span>
                        </div>
                        <div className="flex items-center gap-2 text-background/80 text-xs sm:text-sm">
                          <Eye size={12} className="sm:w-[14px] sm:h-[14px] text-copper shrink-0" />
                          <span className="truncate">{room.scent}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 bg-copper/20 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                          <span className="text-copper text-[10px] sm:text-xs font-medium">{room.mood}</span>
                        </span>
                        <span className="flex items-center gap-1 text-copper text-xs sm:text-sm font-medium lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                          {room.cta}
                          <ArrowRight size={12} className="sm:w-[14px] sm:h-[14px]" />
                        </span>
                      </div>
                    </div>

                    {/* Play Button - desktop only */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex opacity-0 group-hover:opacity-100 transition-opacity"
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
        </div>

        <ScrollReveal className="text-center mt-8 sm:mt-12 px-4">
          <Button variant="outline" size="lg" asChild className="border-copper/50 text-copper hover:bg-copper/10 group h-12 touch-manipulation">
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
