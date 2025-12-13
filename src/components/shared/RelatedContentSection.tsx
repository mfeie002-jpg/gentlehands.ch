import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface RelatedItem {
  href: string;
  title: string;
  description: string;
  image?: string;
}

interface RelatedContentSectionProps {
  title?: string;
  items: RelatedItem[];
  className?: string;
}

export function RelatedContentSection({ 
  title = "Weiterführende Inhalte",
  items,
  className = ''
}: RelatedContentSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-serif font-bold mb-8 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group block rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all"
            >
              {item.image && (
                <div className="aspect-video overflow-hidden bg-muted">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                  {item.title}
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
