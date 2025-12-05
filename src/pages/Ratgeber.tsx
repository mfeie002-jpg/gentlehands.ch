import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Clock, ArrowRight } from "lucide-react";

import articleRelaxation from "@/assets/article-relaxation.jpg";
import articleNervousSystem from "@/assets/article-nervous-system.jpg";
import articleBurnout from "@/assets/article-burnout-signs.jpg";
import articleSelfCare from "@/assets/article-self-care.jpg";

const articles = [
  {
    slug: "tiefe-entspannung-heute",
    title: "Warum tiefe Entspannung heute wichtiger ist als je zuvor",
    image: articleRelaxation,
    excerpt:
      "In einer Welt permanenter Erreichbarkeit und endloser To-Do-Listen braucht unser Nervensystem bewusste Pausen. Erfahren Sie, warum echte Entspannung keine Option, sondern eine Notwendigkeit ist.",
    readTime: "5 Min",
    category: "Wohlbefinden",
  },
  {
    slug: "beruehrung-nervensystem",
    title: "Berührung & Nervensystem: Was in Ihrem Körper passiert",
    image: articleNervousSystem,
    excerpt:
      "Was passiert eigentlich, wenn wir berührt werden? Ein Blick auf die Wissenschaft hinter der Entspannung durch achtsame Berührung.",
    readTime: "7 Min",
    category: "Wissen",
  },
  {
    slug: "fuenf-zeichen-pause",
    title: "5 Zeichen, dass Ihr Körper nach einer Pause schreit",
    image: articleBurnout,
    excerpt:
      "Oft ignorieren wir die Signale unseres Körpers, bis es zu spät ist. Lernen Sie die fünf häufigsten Anzeichen zu erkennen, dass Sie eine Auszeit brauchen.",
    readTime: "4 Min",
    category: "Selbstfürsorge",
  },
  {
    slug: "zeit-schenken",
    title: "Sich selbst Zeit zu schenken: Warum das kein Luxus ist",
    image: articleSelfCare,
    excerpt:
      "Viele Frauen fühlen sich schuldig, wenn sie sich Zeit für sich selbst nehmen. Ein Plädoyer für radikale Selbstfürsorge – ohne schlechtes Gewissen.",
    readTime: "6 Min",
    category: "Selbstfürsorge",
  },
];

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
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
              Ratgeber
            </p>
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

      {/* Articles Grid */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
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
                  <div className="h-full card-elevated p-8 border border-transparent hover:border-copper/20 transition-all">
                    {/* Image */}
                    <div className="aspect-video rounded-xl mb-6 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock size={14} />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {article.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-primary text-sm font-medium">
                      <span>Weiterlesen</span>
                      <ArrowRight
                        size={16}
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
