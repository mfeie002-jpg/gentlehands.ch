import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { FloatingElements } from "@/components/shared/FloatingElements";

import articleRelaxation from "@/assets/article-relaxation.jpg";
import articleNervousSystem from "@/assets/article-nervous-system.jpg";
import articleBurnout from "@/assets/article-burnout-signs.jpg";
import articleSelfCare from "@/assets/article-self-care.jpg";
import articleAromatherapy from "@/assets/article-aromatherapy.jpg";
import articleMorningRitual from "@/assets/article-morning-ritual.jpg";
import articleBreathwork from "@/assets/article-breathwork.jpg";

const articles = [
  {
    slug: "tiefe-entspannung-heute",
    title: "Warum tiefe Entspannung heute wichtiger ist als je zuvor",
    image: articleRelaxation,
    excerpt:
      "In einer Welt permanenter Erreichbarkeit und endloser To-Do-Listen braucht unser Nervensystem bewusste Pausen. Erfahren Sie, warum echte Entspannung keine Option, sondern eine Notwendigkeit ist.",
    readTime: "5 Min",
    category: "Wohlbefinden",
    featured: true,
  },
  {
    slug: "beruehrung-nervensystem",
    title: "Berührung & Nervensystem: Was in Ihrem Körper passiert",
    image: articleNervousSystem,
    excerpt:
      "Was passiert eigentlich, wenn wir berührt werden? Ein Blick auf die Wissenschaft hinter der Entspannung durch achtsame Berührung.",
    readTime: "7 Min",
    category: "Wissen",
    featured: true,
  },
  {
    slug: "fuenf-zeichen-pause",
    title: "5 Zeichen, dass Ihr Körper nach einer Pause schreit",
    image: articleBurnout,
    excerpt:
      "Oft ignorieren wir die Signale unseres Körpers, bis es zu spät ist. Lernen Sie die fünf häufigsten Anzeichen zu erkennen, dass Sie eine Auszeit brauchen.",
    readTime: "4 Min",
    category: "Selbstfürsorge",
    featured: false,
  },
  {
    slug: "zeit-schenken",
    title: "Sich selbst Zeit zu schenken: Warum das kein Luxus ist",
    image: articleSelfCare,
    excerpt:
      "Viele Frauen fühlen sich schuldig, wenn sie sich Zeit für sich selbst nehmen. Ein Plädoyer für radikale Selbstfürsorge – ohne schlechtes Gewissen.",
    readTime: "6 Min",
    category: "Selbstfürsorge",
    featured: false,
  },
  {
    slug: "aromatherapie-wirkung",
    title: "Die Kraft der Düfte: Wie Aromatherapie Ihre Massage verstärkt",
    image: articleAromatherapy,
    excerpt:
      "Lavendel, Eukalyptus, Sandelholz – jeder Duft hat seine eigene Wirkung auf Körper und Geist. So wählen Sie das richtige Öl für Ihr Erlebnis.",
    readTime: "5 Min",
    category: "Wissen",
    featured: false,
  },
  {
    slug: "morgen-ritual",
    title: "Das perfekte Morgenritual: 15 Minuten für mehr Energie",
    image: articleMorningRitual,
    excerpt:
      "Der Morgen legt den Grundstein für den ganzen Tag. Mit diesem einfachen Ritual starten Sie entspannt und fokussiert in jeden Tag.",
    readTime: "4 Min",
    category: "Selbstfürsorge",
    featured: false,
  },
  {
    slug: "atemtechniken",
    title: "Atemtechniken für sofortige Entspannung",
    image: articleBreathwork,
    excerpt:
      "Ihr Atem ist das mächtigste Werkzeug zur Stressreduktion – und Sie tragen es immer bei sich. Diese drei Techniken helfen in jeder Situation.",
    readTime: "6 Min",
    category: "Wohlbefinden",
    featured: false,
  },
];

const featuredArticles = articles.filter(a => a.featured);
const regularArticles = articles.filter(a => !a.featured);

const Ratgeber = () => {
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
            
            <h1 className="text-foreground mb-6">
              Wissen für mehr Wohlbefinden
            </h1>
            <p className="text-muted-foreground text-lg">
              Artikel und Impulse rund um Entspannung, Körperbewusstsein und
              Selbstfürsorge. Für ein Leben mit mehr Leichtigkeit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
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
              >
                <Link
                  to={`/ratgeber/${article.slug}`}
                  className="group block h-full"
                >
                  <div className="h-full card-elevated overflow-hidden border border-transparent hover:border-copper/20 transition-all">
                    {/* Large Image */}
                    <div className="aspect-[16/9] overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="p-8">
                      {/* Meta */}
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <span className="px-2 py-1 bg-copper/10 text-copper rounded-full text-xs font-medium">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock size={14} />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="font-display text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {article.excerpt}
                      </p>

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <span>Weiterlesen</span>
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* All Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
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
              >
                <Link
                  to={`/ratgeber/${article.slug}`}
                  className="group block h-full"
                >
                  <div className="h-full card-elevated p-6 border border-transparent hover:border-copper/20 transition-all">
                    {/* Image */}
                    <div className="aspect-video rounded-xl mb-5 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-3 text-sm">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        {article.category}
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
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-foreground mb-6">
              Von der Theorie zur Praxis
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Wissen ist gut, Erleben ist besser. Buchen Sie Ihr erstes
              GentleHands-Erlebnis und spüren Sie den Unterschied.
            </p>
            <Button variant="copper" size="lg" asChild>
              <Link to="/buchung">Erlebnis anfragen</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Ratgeber;
