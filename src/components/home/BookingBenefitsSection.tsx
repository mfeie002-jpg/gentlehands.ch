import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { LazyImage } from "@/components/shared/LazyImage";

// Import images
import flexibleImage from "@/assets/booking-flexible.jpg";
import punctualImage from "@/assets/booking-punctual.jpg";
import giftImage from "@/assets/booking-gift.jpg";
import relaxedImage from "@/assets/emotional-relaxed-face.jpg";
import contentImage from "@/assets/emotional-content-smile.jpg";
import therapistImage from "@/assets/emotional-therapist-hands.jpg";

const benefits = [
  { image: flexibleImage, title: "Flexible Termine", description: "Mo–Sa, 10–21 Uhr" },
  { image: punctualImage, title: "Pünktlicher Start", description: "Keine Wartezeiten" },
  { image: contentImage, title: "Einfache Zahlung", description: "Bar, Karte, TWINT" },
  { image: relaxedImage, title: "Kostenlose Stornierung", description: "Bis 24h vorher" },
  { image: therapistImage, title: "Zufriedenheitsgarantie", description: "Oder Geld zurück" },
  { image: giftImage, title: "Gutscheine verfügbar", description: "Das perfekte Geschenk" },
];

export const BookingBenefitsSection = () => {
  return (
    <section className="py-10 bg-card border-y border-border">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.05}>
              <motion.div
                className="text-center group"
                whileHover={{ y: -2 }}
              >
                {/* Image thumbnail */}
                <div className="w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden">
                  <LazyImage
                    src={benefit.image}
                    alt={benefit.title}
                    className="group-hover:scale-110 transition-transform duration-500"
                    aspectRatio="square"
                  />
                </div>
                <p className="text-foreground text-sm font-medium">{benefit.title}</p>
                <p className="text-muted-foreground text-xs">{benefit.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
