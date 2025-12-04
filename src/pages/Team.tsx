import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Languages, Award, Heart, Star, GraduationCap } from "lucide-react";

const team = [
  {
    id: "morris",
    name: "Morris",
    role: "Inhaber & Leitender Masseur",
    isOwner: true,
    experience: "12+ Jahre",
    languages: ["Deutsch", "English", "Français"],
    specialties: ["Tiefenentspannung", "Intuitive Berührung", "Emotional Grounding"],
    certifications: [
      "Dipl. Masseur FA",
      "Craniosacral-Therapie Grundlagen",
      "Trauma-sensitive Körperarbeit",
    ],
    description:
      "Morris gründete GentleHands aus der tiefen Überzeugung, dass Frauen einen geschützten Raum für echte Entspannung verdienen. Mit über einem Jahrzehnt Erfahrung in ganzheitlicher Körperarbeit verbindet er technisches Können mit intuitiver Präsenz.",
    style:
      "Ruhig, aufmerksam und sehr präsent. Morris ist bekannt für seine Fähigkeit, genau zu spüren, was der Körper braucht – oft bevor die Kundin es selbst weiss.",
    quote:
      "Mein Ziel ist es, dass Sie für einen Moment alles loslassen können – den Alltag, die Erwartungen, die Anspannung. Einfach nur sein.",
  },
  {
    id: "anna",
    name: "Anna",
    role: "Masseurin",
    isOwner: false,
    experience: "8 Jahre",
    languages: ["Deutsch", "English"],
    specialties: ["Sanfte Massage", "Stress Reset", "Nervensystem-Regulation"],
    certifications: [
      "Dipl. Masseurin",
      "Ayurveda-Massage",
      "Breathwork Facilitator",
    ],
    description:
      "Anna bringt eine besonders sanfte, achtsame Herangehensweise mit. Ihr Fokus liegt auf dem Nervensystem und der Fähigkeit des Körpers, sich selbst zu regulieren.",
    style:
      "Sehr sanft und fliessend. Anna kreiert einen Raum der absoluten Sicherheit, in dem sich das Nervensystem von selbst beruhigt.",
    quote:
      "Ich glaube, dass echter Wandel im Körper nur in einem Zustand von Sicherheit und Geborgenheit passieren kann.",
  },
  {
    id: "luca",
    name: "Luca",
    role: "Masseur",
    isOwner: false,
    experience: "6 Jahre",
    languages: ["Deutsch", "Italiano", "English"],
    specialties: ["Deep Tissue", "Sportmassage", "Körperarbeit"],
    certifications: [
      "Dipl. Sportmasseur",
      "Myofasziale Release Technik",
      "Triggerpunkt-Therapie",
    ],
    description:
      "Luca kommt aus dem sportlichen Bereich und bringt eine intensivere Technik mit. Perfekt für Frauen, die tiefe Verspannungen lösen und wirklich spüren möchten.",
    style:
      "Kraftvoller und direkter, aber immer im Dialog mit dem Körper. Luca arbeitet gezielt an Problemzonen und tiefen Blockaden.",
    quote:
      "Manchmal braucht der Körper klare Arbeit, um loszulassen. Ich finde den Punkt, wo Intensität in Entspannung umschlägt.",
  },
];

const Team = () => {
  return (
    <Layout>
      <Helmet>
        <title>Unser Team | GentleHands Zürich</title>
        <meta
          name="description"
          content="Lernen Sie unser Team kennen: Professionelle Masseur:innen mit langjähriger Erfahrung und individuellen Spezialisierungen."
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
              Unser Team
            </p>
            <h1 className="text-foreground mb-6">
              Menschen, die Sie begleiten
            </h1>
            <p className="text-muted-foreground text-lg">
              Alle unsere Masseur:innen sind professionell ausgebildet und
              bringen ihre eigene, einzigartige Herangehensweise mit. Wählen
              Sie, wer Sie begleiten soll.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="section-padding-sm">
        <div className="container-wide space-y-16">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              id={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="scroll-mt-32"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-3 gap-10 ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                {/* Portrait */}
                <div className={`${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-sand to-sand-dark relative overflow-hidden">
                    {member.isOwner && (
                      <div className="absolute top-4 right-4 bg-copper text-accent-foreground text-xs font-medium px-3 py-1 rounded-full z-10">
                        Inhaber
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-warm-gray text-sm text-center px-6">
                        [Platzhalter: Professionelles Portrait von {member.name}]
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-2 ${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-foreground">{member.name}</h2>
                    <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                      {member.role}
                    </span>
                  </div>
                  <div className="divider-copper mb-6" />

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 text-lg">
                    {member.description}
                  </p>

                  {/* Style */}
                  <div className="mb-6 p-5 rounded-xl bg-secondary/50">
                    <p className="text-foreground font-medium mb-2">Stil:</p>
                    <p className="text-muted-foreground">{member.style}</p>
                  </div>

                  {/* Quote */}
                  <blockquote className="mb-8 pl-5 border-l-2 border-copper">
                    <p className="text-foreground italic">„{member.quote}"</p>
                  </blockquote>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Award size={18} className="text-copper" />
                        <h4 className="font-display text-foreground">Erfahrung</h4>
                      </div>
                      <p className="text-muted-foreground">{member.experience}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Languages size={18} className="text-copper" />
                        <h4 className="font-display text-foreground">Sprachen</h4>
                      </div>
                      <p className="text-muted-foreground">
                        {member.languages.join(", ")}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Heart size={18} className="text-copper" />
                        <h4 className="font-display text-foreground">Spezialisierungen</h4>
                      </div>
                      <ul className="text-muted-foreground text-sm space-y-1">
                        {member.specialties.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <GraduationCap size={18} className="text-copper" />
                        <h4 className="font-display text-foreground">Ausbildungen</h4>
                      </div>
                      <ul className="text-muted-foreground text-sm space-y-1">
                        {member.certifications.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button variant="copper" size="lg" asChild>
                    <Link to={`/buchung?masseur=${member.id}`}>
                      Mit {member.name} buchen
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* No Preference Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-foreground mb-6">
              Keine Präferenz?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Wenn Sie sich nicht entscheiden können oder möchten, wählen wir
              gerne intuitiv für Sie – basierend auf Ihren Wünschen und der
              aktuellen Verfügbarkeit.
            </p>
            <Button variant="copper" size="lg" asChild>
              <Link to="/buchung">Intuitiv wählen lassen</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
