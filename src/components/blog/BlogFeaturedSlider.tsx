import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
}

interface BlogFeaturedSliderProps {
  articles: Article[];
  autoPlay?: boolean;
  interval?: number;
}

export const BlogFeaturedSlider = ({
  articles,
  autoPlay = true,
  interval = 6000
}: BlogFeaturedSliderProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoPlay || articles.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % articles.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, articles.length]);

  const next = () => setCurrent((prev) => (prev + 1) % articles.length);
  const prev = () => setCurrent((prev) => (prev - 1 + articles.length) % articles.length);

  if (articles.length === 0) return null;

  return (
    <div className="relative rounded-3xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative aspect-[21/9]"
        >
          <img
            src={articles[current].image}
            alt={articles[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="container-wide">
              <div className="max-w-xl">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-3 py-1 bg-copper text-background text-xs font-medium rounded-full mb-4"
                >
                  {articles[current].category}
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-display text-background mb-4"
                >
                  {articles[current].title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-background/80 mb-6 line-clamp-2"
                >
                  {articles[current].excerpt}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-6"
                >
                  <span className="flex items-center gap-2 text-background/70 text-sm">
                    <Clock size={14} />
                    {articles[current].readTime}
                  </span>
                  <Link
                    to={`/ratgeber/${articles[current].slug}`}
                    className="flex items-center gap-2 text-copper font-medium hover:gap-3 transition-all"
                  >
                    Artikel lesen <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {articles.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/30 transition-colors"
          >
            <ChevronLeft size={24} className="text-background" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/30 transition-colors"
          >
            <ChevronRight size={24} className="text-background" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current ? "w-8 bg-copper" : "bg-background/50 hover:bg-background/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
