import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Star, Quote, ExternalLink } from "lucide-react";

const reviews = [
  { source: "Google", rating: 4.9, count: 127, logo: "G" },
  { source: "Facebook", rating: 5.0, count: 43, logo: "f" },
  { source: "ProvenExpert", rating: 4.8, count: 31, logo: "PE" },
];

export const FeaturedReviewSection = () => {
  return (
    <section className="py-10 bg-card border-y border-border">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <ScrollReveal direction="left" className="lg:w-1/2">
            <div className="flex items-start gap-4">
              <Quote size={32} className="text-copper/20 shrink-0 mt-1" />
              <div>
                <p className="text-foreground text-lg italic mb-4">
                  „Endlich ein Ort, an dem ich mich als Frau wirklich sicher und verstanden fühle. 
                  Die Atmosphäre ist einzigartig."
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-copper fill-copper" />
                    ))}
                  </div>
                  <span className="text-muted-foreground text-sm">— Claudia B., Google Review</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="lg:w-1/2">
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.source}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background border border-border hover:border-copper/30 transition-all"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground font-display font-bold">
                    {review.logo}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-copper fill-copper" />
                      <span className="text-foreground font-medium">{review.rating}</span>
                      <span className="text-muted-foreground text-xs">({review.count})</span>
                    </div>
                    <p className="text-muted-foreground text-xs">{review.source}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
