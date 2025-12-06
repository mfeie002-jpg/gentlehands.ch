import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ArrowRight, Clock } from "lucide-react";

interface Article {
  slug: string;
  title: string;
  image: string;
  readTime: string;
  category: string;
}

interface BlogRelatedArticlesProps {
  articles: Article[];
  currentSlug: string;
}

export const BlogRelatedArticles = ({ articles, currentSlug }: BlogRelatedArticlesProps) => {
  const related = articles.filter(a => a.slug !== currentSlug).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container-wide">
        <ScrollReveal className="mb-10">
          <h2 className="text-2xl font-display text-foreground">
            Das könnte Sie auch interessieren
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {related.map((article, index) => (
            <ScrollReveal key={article.slug} direction="up" delay={index * 0.1}>
              <Link to={`/ratgeber/${article.slug}`} className="group block">
                <motion.div
                  className="rounded-2xl overflow-hidden bg-card border border-border/50"
                  whileHover={{ y: -8 }}
                >
                  <div className="aspect-video overflow-hidden">
                    <motion.img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2 text-xs">
                      <span className="text-copper">{article.category}</span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock size={10} />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-medium text-foreground group-hover:text-copper transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
