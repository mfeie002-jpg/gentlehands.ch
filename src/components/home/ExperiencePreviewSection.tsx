import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Play, Volume2, Eye } from "lucide-react";
import roomOcean from "@/assets/room-ozean.jpg";
import roomAlpine from "@/assets/room-alpine.jpg";
import roomDark from "@/assets/room-dark.jpg";

const rooms = [
  {
    name: "Ocean & Palmen",
    image: roomOcean,
    sounds: "Meeresrauschen, sanfte Wellen",
    scent: "Meersalz, Kokos",
    mood: "Urlaubsfeeling & Leichtigkeit",
  },
  {
    name: "Alpine Stille",
    image: roomAlpine,
    sounds: "Bergbach, Vogelgesang",
    scent: "Zirbe, frische Bergluft",
    mood: "Erdung & Geborgenheit",
  },
  {
    name: "Deep Dark Relax",
    image: roomDark,
    sounds: "Tiefe Frequenzen, Stille",
    scent: "Sandelholz, Weihrauch",
    mood: "Totale Entspannung",
  },
];

export const ExperiencePreviewSection = () => {
  return (
    <section className="section-padding bg-foreground text-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-copper/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-petrol/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />

      <div className="container-wide relative">
        <ScrollReveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Ein Einblick
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
          </div>
          <h2 className="text-background mb-4">
            Erleben Sie unsere <span className="text-copper">Themenräume</span>
          </h2>
          <p className="text-background/70 text-lg max-w-2xl mx-auto">
            Jeder Raum ist ein eigenes Universum – gestaltet für Ihre Sinne.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {rooms.map((room, index) => (
            <ScrollReveal key={room.name} delay={index * 0.15}>
              <motion.div
                className="group relative rounded-2xl overflow-hidden"
                whileHover={{ y: -6 }}
              >
                {/* Image */}
                <div className="aspect-[3/4] relative">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-display text-background mb-4">{room.name}</h3>
                  
                  <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 text-background/80 text-sm">
                      <Volume2 size={14} className="text-copper" />
                      <span>{room.sounds}</span>
                    </div>
                    <div className="flex items-center gap-2 text-background/80 text-sm">
                      <Eye size={14} className="text-copper" />
                      <span>{room.scent}</span>
                    </div>
                  </div>

                  {/* Mood Badge */}
                  <div className="mt-4 inline-flex items-center gap-2 bg-copper/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-copper text-xs font-medium">{room.mood}</span>
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
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
