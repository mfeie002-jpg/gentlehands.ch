import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ChevronRight, BookOpen } from "lucide-react";
import articleImage1 from "@/assets/article-burnout-signs.jpg";
import articleImage2 from "@/assets/article-nervous-system.jpg";
import articleImage3 from "@/assets/article-self-care.jpg";

const articles = [
  {
    image: articleImage1,
    category: "Burnout-Prävention",
    title: "7 Zeichen, dass Ihr Körper nach Entspannung ruft",
    excerpt: "Erkennen Sie die frühen Warnsignale und handeln Sie rechtzeitig.",
    readTime: "5 Min",
    date: "2. Dezember 2024",
  },
  {
    image: articleImage2,
    category: "Nervensystem",
    title: "Wie Massage Ihr Nervensystem reguliert",
    excerpt: "Die Wissenschaft hinter der heilsamen Wirkung von Berührung.",
    readTime: "7 Min",
    date: "28. November 2024",
  },
  {
    image: articleImage3,
    category: "Self-Care",
    title: "Warum Self-Care keine Selbstsucht ist",
    excerpt: "Ein Plädoyer für regelmässige Auszeiten – ohne schlechtes Gewissen.",
    readTime: "4 Min",
    date: "22. November 2024",
  },
];

export const BlogPreviewSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/10">
      <div className="container-wide">
        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-copper/10 px-4 py-2 rounded-full mb-4">
            <BookOpen size={14} className="text-copper" />
            <span className="text-copper text-sm font-medium">Ratgeber</span>
          </div>
          <h2 className="text-foreground text-2xl md:text-3xl mb-4">
            Wissen für Ihr <span className="text-gradient-copper">Wohlbefinden</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Tipps, Insights und Hintergründe rund um Entspannung und Selbstfürsorge.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {articles.map((article, index) => (
            <ScrollReveal key={article.title} delay={index * 0.1}>
              <motion.article
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-copper/30 transition-all h-full"
                whileHover={{ y: -4 }}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <motion.img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-copper text-xs font-medium">{article.category}</span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                      <Clock size={10} />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-foreground font-display text-lg mb-2 group-hover:text-copper transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{article.excerpt}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar size={12} className="mr-1" />
                    {article.date}
                  </div>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center">
          <Button variant="outline" asChild className="border-copper/30 hover:border-copper">
            <Link to="/ratgeber" className="flex items-center gap-2">
              Alle Artikel lesen
              <ChevronRight size={16} />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};
