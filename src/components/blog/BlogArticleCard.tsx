import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, User } from "lucide-react";

interface BlogArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  author?: string;
  featured?: boolean;
}

export const BlogArticleCard = ({
  slug,
  title,
  excerpt,
  image,
  category,
  readTime,
  author,
  featured = false
}: BlogArticleCardProps) => {
  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group"
      >
        <Link to={`/ratgeber/${slug}`} className="block">
          <div className="relative rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-copper/30 transition-colors">
            <div className="grid lg:grid-cols-2">
              <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                <motion.img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-copper/10 text-copper text-xs font-medium rounded-full w-fit mb-4">
                  {category}
                </span>
                <h3 className="font-display text-2xl text-foreground mb-3 group-hover:text-copper transition-colors">
                  {title}
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">{excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {readTime}
                    </span>
                    {author && (
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {author}
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-2 text-copper font-medium group-hover:gap-3 transition-all">
                    Lesen <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link to={`/ratgeber/${slug}`} className="block h-full">
        <div className="rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-copper/30 transition-colors h-full">
          <div className="aspect-video overflow-hidden">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-1 bg-copper/10 text-copper text-xs font-medium rounded-full">
                {category}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground text-xs">
                <Clock size={12} />
                {readTime}
              </span>
            </div>
            <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-copper transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{excerpt}</p>
            <span className="flex items-center gap-2 text-copper text-sm font-medium">
              Weiterlesen <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
