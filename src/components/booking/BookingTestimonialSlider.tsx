import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sandra K.",
    text: "Die beste Massage meines Lebens. Endlich konnte ich komplett loslassen.",
    rating: 5,
    massage: "Tiefenentspannung",
  },
  {
    name: "Monika B.",
    text: "Ein sicherer Raum, in dem ich mich wirklich entspannen konnte. Absolut empfehlenswert!",
    rating: 5,
    massage: "Aromatherapie",
  },
  {
    name: "Christine W.",
    text: "Professionell, diskret und unglaublich wohltuend. Ich komme definitiv wieder.",
    rating: 5,
    massage: "Hot Stone",
  },
  {
    name: "Eva M.",
    text: "Nach Wochen voller Stress war das genau das, was ich gebraucht habe.",
    rating: 5,
    massage: "Swedish Massage",
  },
  {
    name: "Petra L.",
    text: "Die Atmosphäre ist einzigartig. Man fühlt sich sofort geborgen.",
    rating: 5,
    massage: "Klangtherapie",
  },
];

export const BookingTestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[current];

  return (
    <div className="relative overflow-hidden rounded-xl bg-muted/30 p-6">
      <Quote className="absolute top-4 right-4 w-8 h-8 text-petrol/20" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="relative z-10"
        >
          {/* Stars */}
          <div className="flex gap-1 mb-3">
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Star className="w-4 h-4 fill-copper text-copper" />
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <p className="text-foreground text-sm italic leading-relaxed mb-4">
            "{testimonial.text}"
          </p>

          {/* Author */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
              <p className="text-xs text-muted-foreground">{testimonial.massage}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-forest">
              <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
              Verifizierte Kundin
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-petrol w-6" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
