import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Morris hat eine unglaubliche Gabe, genau zu spüren, wo mein Körper Aufmerksamkeit braucht.",
    author: "Sandra M.",
    therapist: "Morris",
    rating: 5,
  },
  {
    quote: "Bei Anna fühle ich mich so sicher, dass ich komplett loslassen kann. Das ist selten.",
    author: "Julia K.",
    therapist: "Anna",
    rating: 5,
  },
  {
    quote: "Luca's Deep Tissue hat meine chronischen Verspannungen endlich gelöst. Danke!",
    author: "Christina W.",
    therapist: "Luca",
    rating: 5,
  },
];

export const TeamTestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-foreground mb-4">Was Kundinnen sagen</h2>
          <p className="text-muted-foreground">Echte Stimmen über unser Team</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-secondary/50 border border-border/50 relative"
            >
              <Quote size={32} className="absolute top-4 right-4 text-copper/20" />
              
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-copper fill-copper" />
                ))}
              </div>

              <p className="text-foreground italic mb-4">"{testimonial.quote}"</p>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{testimonial.author}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-copper/10 text-copper">
                  über {testimonial.therapist}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
