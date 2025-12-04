import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content:
      "Ich hatte noch nie eine Massage, bei der ich so vollständig abschalten konnte. Das Ozean-Theme war wie ein Kurzurlaub für die Seele. Nach 90 Minuten fühlte ich mich wie neu geboren.",
    name: "Sandra M.",
    age: 42,
    location: "Zürich",
    theme: "Ozean & Palmen",
    rating: 5,
  },
  {
    id: 2,
    content:
      "Endlich ein Ort, an dem ich mich als Frau wirklich sicher und verstanden fühle. Die Professionalität und Atmosphäre sind einzigartig. Morris hat eine unglaubliche Präsenz.",
    name: "Claudia B.",
    age: 38,
    location: "Winterthur",
    theme: "Alpine Stille",
    rating: 5,
  },
  {
    id: 3,
    content:
      "Die Deep Dark Relax Session hat mir geholfen, nach Monaten des Burnouts wieder bei mir anzukommen. Absolut empfehlenswert für alle, die wirklich loslassen wollen.",
    name: "Nina K.",
    age: 35,
    location: "Zürich",
    theme: "Deep Dark Relax",
    rating: 5,
  },
  {
    id: 4,
    content:
      "Ich war skeptisch, aber schon beim Betreten des Raums hat sich mein Nervensystem beruhigt. Eine transformative Erfahrung, die ich jeder gestressten Frau ans Herz legen würde.",
    name: "Martina S.",
    age: 51,
    location: "Zug",
    theme: "Zen Garden",
    rating: 5,
  },
  {
    id: 5,
    content:
      "Die Kombination aus Alpine Stille und der sanften Massage von Anna war genau das, was ich brauchte. Danke für diesen wunderbaren Ort!",
    name: "Patricia L.",
    age: 29,
    location: "Zürich",
    theme: "Alpine Stille",
    rating: 5,
  },
  {
    id: 6,
    content:
      "Als vielbeschäftigte Unternehmerin hatte ich vergessen, wie es sich anfühlt, wirklich zur Ruhe zu kommen. GentleHands hat mir das zurückgegeben.",
    name: "Elisabeth R.",
    age: 47,
    location: "Luzern",
    theme: "Urban Loft",
    rating: 5,
  },
];

const stories = [
  {
    title: "Vom Burnout zurück ins Leben",
    content: `Nach zwei Jahren im Dauerstress hatte mein Körper einfach abgeschaltet. Ich konnte nicht mehr schlafen, hatte ständig Kopfschmerzen und fühlte mich wie in Watte gepackt – aber nicht auf die gute Art.

Eine Freundin empfahl mir GentleHands. Ich war skeptisch – noch eine Massage, die nichts bringt? Aber vom ersten Moment an war es anders. Der Raum, das Licht, die Art, wie Morris sich Zeit nahm für ein Vorgespräch.

Ich wählte Deep Dark Relax, weil ich dachte, ich brauche Reizarmut. Es war die beste Entscheidung. In der Dunkelheit, nur mit den sanften Berührungen, begann mein Körper zu zittern. Es war, als würde er endlich das loslassen, was er so lange festgehalten hatte.

Ich habe geweint. Nicht aus Traurigkeit, sondern aus Erleichterung. Nach der Session fühlte ich zum ersten Mal seit Monaten wieder meinen Körper richtig. Das war vor drei Monaten. Seitdem gehe ich alle zwei Wochen und kann sagen: GentleHands war ein wichtiger Teil meiner Genesung.`,
    author: "Nina K., 35",
  },
  {
    title: "Zeit nur für mich",
    content: `Als Mutter von zwei kleinen Kindern und Teilzeit-Berufstätige kenne ich das Gefühl, nie «fertig» zu sein. Es gibt immer noch etwas zu tun, jemand, der etwas braucht, eine Aufgabe, die wartet.

Bei GentleHands habe ich mir zum ersten Mal erlaubt, zwei Stunden nur für mich zu haben. Kein Handy, keine Erreichbarkeit, keine Verantwortung. Nur ich und die unglaubliche Atmosphäre des Ozean-Themes.

Was mich am meisten berührt hat: Es gab keinen Druck. Keine Erwartung, wie ich mich fühlen oder reagieren sollte. Ich durfte einfach sein, wie ich bin. Die Massage selbst war wunderbar, aber fast noch wichtiger war dieses Gefühl von «hier darf ich einfach existieren».

Ich habe mir vorgenommen, das jeden Monat zu machen. Nicht als Luxus, sondern als notwendige Wartung für mein Wohlbefinden.`,
    author: "Claudia B., 38",
  },
];

const Erfahrungen = () => {
  return (
    <Layout>
      <Helmet>
        <title>Erfahrungen & Bewertungen | GentleHands Zürich</title>
        <meta
          name="description"
          content="Lesen Sie Erfahrungsberichte unserer Kundinnen. Echte Geschichten über Entspannung, Transformation und tiefes Loslassen bei GentleHands."
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
              Erfahrungen
            </p>
            <h1 className="text-foreground mb-6">
              Was unsere Kundinnen sagen
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-copper fill-copper" />
              ))}
              <span className="ml-3 text-foreground font-display text-2xl">4.9/5</span>
            </div>
            <p className="text-muted-foreground">
              Basierend auf über 200 Bewertungen
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-elevated p-8"
              >
                <Quote size={32} className="text-copper/30 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed">
                  „{testimonial.content}"
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-display text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.age} Jahre, {testimonial.location}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="text-copper fill-copper" />
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">Theme:</span>
                  <span className="ml-2 text-xs px-2 py-1 bg-secondary rounded-full">
                    {testimonial.theme}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Long Stories */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
              Ausführliche Berichte
            </p>
            <h2 className="text-foreground mb-4">Geschichten der Transformation</h2>
          </motion.div>

          <div className="space-y-12">
            {stories.map((story, index) => (
              <motion.article
                key={story.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-elevated p-8 md:p-12"
              >
                <h3 className="font-display text-2xl text-foreground mb-6">
                  {story.title}
                </h3>
                <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line">
                  {story.content}
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-copper font-medium">— {story.author}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-foreground mb-6">
              Schreiben Sie Ihre eigene Geschichte
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Erleben Sie selbst, was diese Frauen erlebt haben. Ihr
              erstes GentleHands-Erlebnis wartet auf Sie.
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

export default Erfahrungen;
