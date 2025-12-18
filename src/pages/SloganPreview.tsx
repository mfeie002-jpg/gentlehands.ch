import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/massage-hands-back.jpg";

const slogans = [
  {
    main: "Ein geschützter Raum",
    highlight: "für tiefe Entspannung",
    subtitle: "Für Frauen, die jeden Tag ihr Bestes geben – und endlich einen Ort verdienen, an dem sie vollkommen loslassen können."
  },
  {
    main: "Dein Moment.",
    highlight: "Nur für dich.",
    subtitle: "Ein exklusiver Rückzugsort, an dem du im Mittelpunkt stehst."
  },
  {
    main: "Wo Stress endet",
    highlight: "und Wohlbefinden beginnt",
    subtitle: "Tauche ein in eine Welt der Ruhe und Regeneration."
  },
  {
    main: "Zeit für das Wichtigste:",
    highlight: "Dich selbst",
    subtitle: "Gönn dir die Auszeit, die du verdienst."
  },
  {
    main: "Eintauchen. Loslassen.",
    highlight: "Aufleben.",
    subtitle: "Eine transformative Erfahrung für Körper und Seele."
  },
  {
    main: "Dein privates Refugium",
    highlight: "in Zürich",
    subtitle: "Exklusive Wellness nur für Frauen – diskret und professionell."
  },
  {
    main: "Berührung,",
    highlight: "die heilt",
    subtitle: "Professionelle Hände für tiefgreifende Entspannung."
  },
  {
    main: "Atme tief ein.",
    highlight: "Lass los.",
    subtitle: "Ein Ort, an dem du nichts sein musst – ausser du selbst."
  },
  {
    main: "Sanfte Kraft",
    highlight: "für starke Frauen",
    subtitle: "Weil du es verdienst, auch mal schwach sein zu dürfen."
  },
  {
    main: "Hier beginnt",
    highlight: "deine Auszeit",
    subtitle: "Schalte ab und finde zurück zu dir."
  },
  {
    main: "Stille finden.",
    highlight: "Kraft schöpfen.",
    subtitle: "In unseren Themenräumen erwartet dich pure Regeneration."
  },
  {
    main: "Mehr als Massage.",
    highlight: "Ein Erlebnis.",
    subtitle: "Sechs einzigartige Welten warten darauf, von dir entdeckt zu werden."
  },
];

const SloganPreview = () => {
  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4 mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Slogan Preview</h1>
          <p className="text-muted-foreground">Scrolle durch die verschiedenen Varianten</p>
        </div>

        {slogans.map((slogan, index) => (
          <section 
            key={index} 
            className="relative min-h-[80vh] flex items-center justify-center overflow-hidden mb-8 mx-4 rounded-2xl"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src={heroImage} 
                alt="Professional massage therapy" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10 text-center py-20">
              <div className="absolute top-4 left-4 bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                Variante {index + 1}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Sparkles className="h-4 w-4" />
                  Nur für Frauen
                </span>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
                  <span className="block">{slogan.main}</span>
                  <span className="block text-primary">{slogan.highlight}</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  {slogan.subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="group">
                    Erlebnisse entdecken
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Jetzt buchen
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
};

export default SloganPreview;
