import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Clock, ArrowRight, BookOpen, Search, Sparkles, Tag } from "lucide-react";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { GlowCard } from "@/components/shared/GlowCard";
import { Input } from "@/components/ui/input";

import articleRelaxation from "@/assets/article-relaxation.jpg";
import articleNervousSystem from "@/assets/article-nervous-system.jpg";
import articleBurnout from "@/assets/article-burnout-signs.jpg";
import articleSelfCare from "@/assets/article-self-care.jpg";
import articleAromatherapy from "@/assets/article-aromatherapy.jpg";
import articleMorningRitual from "@/assets/article-morning-ritual.jpg";
import articleBreathwork from "@/assets/article-breathwork.jpg";

const categories = [
  { id: "all", label: "Alle Artikel" },
  { id: "wohlbefinden", label: "Wohlbefinden" },
  { id: "wissen", label: "Wissen" },
  { id: "selbstfuersorge", label: "Selbstfürsorge" },
];

const articles = [
  {
    slug: "tiefe-entspannung-heute",
    title: "Warum tiefe Entspannung heute wichtiger ist als je zuvor",
    image: articleRelaxation,
    excerpt:
      "In einer Welt permanenter Erreichbarkeit und endloser To-Do-Listen braucht unser Nervensystem bewusste Pausen. Erfahren Sie, warum echte Entspannung keine Option, sondern eine Notwendigkeit ist.",
    readTime: "5 Min",
    category: "wohlbefinden",
    categoryLabel: "Wohlbefinden",
    featured: true,
  },
  {
    slug: "beruehrung-nervensystem",
    title: "Berührung & Nervensystem: Was in Ihrem Körper passiert",
    image: articleNervousSystem,
    excerpt:
      "Was passiert eigentlich, wenn wir berührt werden? Ein Blick auf die Wissenschaft hinter der Entspannung durch achtsame Berührung.",
    readTime: "7 Min",
    category: "wissen",
    categoryLabel: "Wissen",
    featured: true,
  },
  {
    slug: "fuenf-zeichen-pause",
    title: "5 Zeichen, dass Ihr Körper nach einer Pause schreit",
    image: articleBurnout,
    excerpt:
      "Oft ignorieren wir die Signale unseres Körpers, bis es zu spät ist. Lernen Sie die fünf häufigsten Anzeichen zu erkennen, dass Sie eine Auszeit brauchen.",
    readTime: "4 Min",
    category: "selbstfuersorge",
    categoryLabel: "Selbstfürsorge",
    featured: false,
  },
  {
    slug: "zeit-schenken",
    title: "Sich selbst Zeit zu schenken: Warum das kein Luxus ist",
    image: articleSelfCare,
    excerpt:
      "Viele Frauen fühlen sich schuldig, wenn sie sich Zeit für sich selbst nehmen. Ein Plädoyer für radikale Selbstfürsorge – ohne schlechtes Gewissen.",
    readTime: "6 Min",
    category: "selbstfuersorge",
    categoryLabel: "Selbstfürsorge",
    featured: false,
  },
  {
    slug: "aromatherapie-wirkung",
    title: "Die Kraft der Düfte: Wie Aromatherapie Ihre Massage verstärkt",
    image: articleAromatherapy,
    excerpt:
      "Lavendel, Eukalyptus, Sandelholz – jeder Duft hat seine eigene Wirkung auf Körper und Geist. So wählen Sie das richtige Öl für Ihr Erlebnis.",
    readTime: "5 Min",
    category: "wissen",
    categoryLabel: "Wissen",
    featured: false,
  },
  {
    slug: "morgen-ritual",
    title: "Das perfekte Morgenritual: 15 Minuten für mehr Energie",
    image: articleMorningRitual,
    excerpt:
      "Der Morgen legt den Grundstein für den ganzen Tag. Mit diesem einfachen Ritual starten Sie entspannt und fokussiert in jeden Tag.",
    readTime: "4 Min",
    category: "selbstfuersorge",
    categoryLabel: "Selbstfürsorge",
    featured: false,
  },
  {
    slug: "atemtechniken",
    title: "Atemtechniken für sofortige Entspannung",
    image: articleBreathwork,
    excerpt:
      "Ihr Atem ist das mächtigste Werkzeug zur Stressreduktion – und Sie tragen es immer bei sich. Diese drei Techniken helfen in jeder Situation.",
    readTime: "6 Min",
    category: "wohlbefinden",
    categoryLabel: "Wohlbefinden",
    featured: false,
  },
];

const Ratgeber = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredArticle, setHoveredArticle] = useState<string | null>(null);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

  return (
    <Layout>
      <Helmet>
        <title>Ratgeber | GentleHands Zürich</title>
        <meta
          name="description"
          content="Artikel und Tipps rund um Entspannung, Selbstfürsorge und Wohlbefinden. Wissen für ein entspannteres Leben."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        
        {/* Ambient Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-copper/10 blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-[80px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <FloatingElements variant="dots" />
        
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6"
            >
              <BookOpen size={16} className="text-copper" />
              <span className="text-copper text-sm font-medium">{articles.length} Artikel</span>
            </motion.div>
            
            <motion.h1 
              className="text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="block">Wissen für mehr</span>
              <span className="bg-gradient-to-r from-copper via-copper-light to-copper bg-clip-text text-transparent">
                Wohlbefinden
              </span>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Artikel und Impulse rund um Entspannung, Körperbewusstsein und
              Selbstfürsorge. Für ein Leben mit mehr Leichtigkeit.
            </motion.p>
            
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-md mx-auto relative group"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-copper transition-colors" size={20} />
              <Input
                type="text"
                placeholder="Artikel suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 rounded-full bg-background border-border/50 text-base focus:border-copper"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-border/50 sticky top-16 z-30 bg-background/80 backdrop-blur-md">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-copper text-accent-foreground shadow-lg shadow-copper/20"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="section-padding-sm relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }} />
        </div>
        
        <div className="container-wide relative">
          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8 flex items-center gap-3"
              >
                <Sparkles size={20} className="text-copper" />
                <h2 className="text-2xl font-display text-foreground">Empfohlene Artikel</h2>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {featuredArticles.map((article, index) => (
                  <motion.article
                    key={article.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredArticle(article.slug)}
                    onMouseLeave={() => setHoveredArticle(null)}
                  >
                    <Link to={`/ratgeber/${article.slug}`} className="group block h-full">
                      <GlowCard className="h-full overflow-hidden">
                        {/* Large Image */}
                        <div className="aspect-[16/9] overflow-hidden relative">
                          <motion.img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover"
                            animate={{ scale: hoveredArticle === article.slug ? 1.05 : 1 }}
                            transition={{ duration: 0.6 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                          
                          {/* Category Badge */}
                          <motion.span 
                            className="absolute top-4 left-4 px-3 py-1 bg-copper/90 backdrop-blur-sm text-accent-foreground rounded-full text-xs font-medium"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            {article.categoryLabel}
                          </motion.span>
                        </div>
                        
                        <div className="p-8">
                          {/* Meta */}
                          <div className="flex items-center gap-4 mb-4 text-sm">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Clock size={14} />
                              {article.readTime}
                            </span>
                          </div>

                          {/* Content */}
                          <h3 className="font-display text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>

                          {/* Read More */}
                          <div className="flex items-center gap-2 text-primary font-medium">
                            <span>Weiterlesen</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </GlowCard>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </>
          )}

          {/* All Articles */}
          {regularArticles.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8 flex items-center gap-3"
              >
                <Tag size={20} className="text-muted-foreground" />
                <h2 className="text-2xl font-display text-foreground">Alle Artikel</h2>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularArticles.map((article, index) => (
                  <motion.article
                    key={article.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredArticle(article.slug)}
                    onMouseLeave={() => setHoveredArticle(null)}
                  >
                    <Link to={`/ratgeber/${article.slug}`} className="group block h-full">
                      <GlowCard className="h-full p-6">
                        {/* Image */}
                        <div className="aspect-video rounded-xl mb-5 overflow-hidden relative">
                          <motion.img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover"
                            animate={{ scale: hoveredArticle === article.slug ? 1.05 : 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-3 mb-3 text-sm">
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                            {article.categoryLabel}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground text-xs">
                            <Clock size={12} />
                            {article.readTime}
                          </span>
                        </div>

                        {/* Content */}
                        <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                          {article.excerpt}
                        </p>

                        {/* Read More */}
                        <div className="flex items-center gap-2 text-primary text-sm font-medium">
                          <span>Weiterlesen</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </GlowCard>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </>
          )}

          {/* No Results */}
          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Search size={48} className="mx-auto mb-4 text-muted-foreground/30" />
              <h3 className="text-xl font-display text-foreground mb-2">Keine Artikel gefunden</h3>
              <p className="text-muted-foreground mb-6">
                Versuchen Sie einen anderen Suchbegriff oder Kategorie.
              </p>
              <Button variant="petrol-outline" onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
                Filter zurücksetzen
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-copper/10 blur-[100px]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="container-narrow text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-copper/20 to-primary/20 flex items-center justify-center"
            >
              <Sparkles size={32} className="text-copper" />
            </motion.div>
            
            <h2 className="text-foreground mb-6">
              Von der Theorie zur Praxis
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Wissen ist gut, Erleben ist besser. Buchen Sie Ihr erstes
              GentleHands-Erlebnis und spüren Sie den Unterschied.
            </p>
            <Button variant="copper" size="lg" className="group" asChild>
              <Link to="/buchung">
                Erlebnis anfragen
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Ratgeber;