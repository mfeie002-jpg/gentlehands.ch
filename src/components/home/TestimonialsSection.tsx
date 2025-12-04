import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

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
];

export const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
            Erfahrungen
          </p>
          <h2 className="text-foreground mb-4">Was unsere Kundinnen sagen</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className="text-copper fill-copper"
              />
            ))}
            <span className="ml-2 text-foreground font-display text-xl">
              4.9/5
            </span>
          </div>
          <p className="text-muted-foreground">
            Basierend auf über 200 Bewertungen
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-elevated p-8"
            >
              {/* Quote Icon */}
              <Quote size={32} className="text-copper/30 mb-4" />

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                „{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.age} Jahre
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-copper fill-copper"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Testimonials Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {testimonials.slice(3, 5).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="card-bordered p-6"
            >
              <p className="text-foreground text-sm mb-4">
                „{testimonial.content}"
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {testimonial.name}, {testimonial.age}
                </p>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="text-copper fill-copper"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
