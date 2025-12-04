import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  age: number;
  text: string;
  rating: number;
  massage: string;
  theme: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sabrina K.",
    age: 34,
    text: "Nach Jahren chronischer Anspannung habe ich zum ersten Mal wirklich losgelassen. Morris hat eine Gabe – er spürt genau, was der Körper braucht. Ich bin mit Tränen gegangen, aber es waren Tränen der Erleichterung.",
    rating: 5,
    massage: "Deep Release Session",
    theme: "Deep Dark Relax"
  },
  {
    id: 2,
    name: "Martina L.",
    age: 42,
    text: "Als Führungskraft stehe ich ständig unter Druck. Die Feierabend-Rituale bei GentleHands sind mein Geheimnis – endlich kann ich abschalten. Luxus, den ich mir regelmässig gönne.",
    rating: 5,
    massage: "Feierabend-Ritual",
    theme: "Urban Loft"
  },
  {
    id: 3,
    name: "Elena R.",
    age: 29,
    text: "Ich war skeptisch, ob ein männlicher Masseur das Richtige für mich ist. Aber die Professionalität und Achtsamkeit bei GentleHands haben mich überzeugt. Hier fühle ich mich absolut sicher.",
    rating: 5,
    massage: "Emotional Grounding",
    theme: "Zen Garden"
  },
  {
    id: 4,
    name: "Andrea M.",
    age: 51,
    text: "Die Ozean-Atmosphäre war wie ein Kurzurlaub. Die Sounds, die Düfte, das warme Licht – ich war für zwei Stunden komplett weg. Danach fühlte ich mich wie neugeboren.",
    rating: 5,
    massage: "Ganzkörper Tiefenentspannung",
    theme: "Ozean & Palmen"
  },
  {
    id: 5,
    name: "Nina B.",
    age: 38,
    text: "Nach meiner Scheidung war ich emotional am Ende. Das Emotional Grounding bei Anna hat mir geholfen, wieder in meinen Körper zurückzufinden. Danke für diesen heilsamen Raum.",
    rating: 5,
    massage: "Emotional Grounding",
    theme: "Alpine Stille"
  },
  {
    id: 6,
    name: "Christina F.",
    age: 45,
    text: "Ich habe die Surprise Experience gewählt und war überwältigt. Sie haben genau getroffen, was ich brauchte, ohne dass ich es hätte artikulieren können. Pures Vertrauen, pure Entspannung.",
    rating: 5,
    massage: "Massgeschneidertes Erlebnis",
    theme: "Surprise Experience"
  },
];

export const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const next = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute -top-4 -left-4 md:-top-8 md:-left-8 opacity-10">
        <Quote size={80} className="text-copper" />
      </div>
      
      <div className="min-h-[400px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center px-8 md:px-16"
          >
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} size={20} className="fill-copper text-copper" />
              ))}
            </div>
            
            <blockquote className="text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed mb-8">
              „{testimonials[current].text}"
            </blockquote>
            
            <div className="space-y-2">
              <p className="font-display text-xl text-foreground">
                {testimonials[current].name}, {testimonials[current].age}
              </p>
              <p className="text-sm text-copper">
                {testimonials[current].massage} · {testimonials[current].theme}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          aria-label="Vorheriges Testimonial"
        >
          <ChevronLeft size={20} className="text-foreground" />
        </button>
        
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setAutoPlay(false);
                setCurrent(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current ? "bg-copper w-6" : "bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={next}
          className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          aria-label="Nächstes Testimonial"
        >
          <ChevronRight size={20} className="text-foreground" />
        </button>
      </div>
    </div>
  );
};
