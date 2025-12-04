import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Marquee } from "@/components/shared/Marquee";

const testimonials = [
  {
    id: 1,
    content:
      "Ich hatte noch nie eine Massage, bei der ich so vollständig abschalten konnte. Das Ozean-Theme war wie ein Kurzurlaub für die Seele.",
    name: "Sandra M.",
    age: 42,
    rating: 5,
  },
  {
    id: 2,
    content:
      "Endlich ein Ort, an dem ich mich als Frau wirklich sicher und verstanden fühle. Die Professionalität und Atmosphäre sind einzigartig.",
    name: "Claudia B.",
    age: 38,
    rating: 5,
  },
  {
    id: 3,
    content:
      "Die Deep Dark Relax Session hat mir geholfen, nach Monaten des Burnouts wieder bei mir anzukommen. Absolut empfehlenswert.",
    name: "Nina K.",
    age: 35,
    rating: 5,
  },
  {
    id: 4,
    content:
      "Ich war skeptisch, aber schon beim Betreten des Raums hat sich mein Nervensystem beruhigt. Eine transformative Erfahrung.",
    name: "Martina S.",
    age: 51,
    rating: 5,
  },
  {
    id: 5,
    content:
      "Die Kombination aus Alpine Stille und der sanften Massage von Anna war genau das, was ich brauchte. Danke!",
    name: "Patricia L.",
    age: 29,
    rating: 5,
  },
  {
    id: 6,
    content:
      "Hier wird Entspannung auf ein ganz neues Level gehoben. Ich komme jeden Monat wieder.",
    name: "Julia F.",
    age: 33,
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial, featured = false }: { testimonial: typeof testimonials[0]; featured?: boolean }) => (
  <motion.div
    className={`${featured ? 'card-elevated p-8' : 'card-bordered p-6'} group relative overflow-hidden`}
    whileHover={{ y: featured ? -4 : -2 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    {/* Shimmer Effect on Hover */}
    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    
    {/* Quote Icon */}
    {featured && (
      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 12 }}
        className="mb-4"
      >
        <Quote size={32} className="text-copper/30" />
      </motion.div>
    )}

    {/* Content */}
    <p className={`text-foreground ${featured ? 'mb-6 leading-relaxed' : 'text-sm mb-4'}`}>
      „{testimonial.content}"
    </p>

    {/* Author */}
    <div className="flex items-center justify-between">
      <div>
        <p className={`font-display text-foreground ${!featured && 'text-sm'}`}>
          {testimonial.name}
        </p>
        <p className={`text-muted-foreground ${featured ? 'text-sm' : 'text-xs'}`}>
          {testimonial.age} Jahre
        </p>
      </div>
      <div className="flex gap-0.5">
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Star
              size={featured ? 14 : 12}
              className="text-copper fill-copper"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

export const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-copper/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-petrol/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container-wide relative">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-copper font-medium tracking-[0.2em] uppercase text-xs mb-4">
            Erfahrungen
          </p>
          <h2 className="text-foreground mb-6">Was unsere Kundinnen sagen</h2>
          
          {/* Rating Badge */}
          <motion.div 
            className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-sm px-6 py-3 rounded-full border border-border/50"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                >
                  <Star size={18} className="text-copper fill-copper" />
                </motion.div>
              ))}
            </div>
            <span className="text-foreground font-display text-lg">4.9/5</span>
            <span className="text-muted-foreground text-sm">• 200+ Bewertungen</span>
          </motion.div>
        </ScrollReveal>

        {/* Featured Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} direction="up" delay={index * 0.1}>
              <TestimonialCard testimonial={testimonial} featured />
            </ScrollReveal>
          ))}
        </div>

        {/* Marquee Testimonials */}
        <Marquee speed={40} className="py-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-80 flex-shrink-0">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
