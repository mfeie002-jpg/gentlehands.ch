import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Languages, Award, Heart, Star, GraduationCap, Quote, ArrowRight, Users } from "lucide-react";
import { SEOHead } from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { TeamHeroEnhanced } from "@/components/team/TeamHeroEnhanced";
import { TeamCultureSection } from "@/components/team/TeamCultureSection";
import { TeamTestimonialsSection } from "@/components/team/TeamTestimonialsSection";
import { TherapistProfileCard } from "@/components/team/TherapistProfileCard";
import { TeamPhilosophyCard } from "@/components/team/TeamPhilosophyCard";
import { LazyImage } from "@/components/shared/LazyImage";
import teamMorris from "@/assets/team-morris-new.jpg";
import teamAnna from "@/assets/team-anna-new.jpg";
import teamLuca from "@/assets/team-luca-new.jpg";
import teamWorkingMoment from "@/assets/team-working-moment.jpg";
import teamConsultation from "@/assets/team-consultation.jpg";
import emotionalTherapistHands from "@/assets/emotional-therapist-hands.jpg";

const team = [
  {
    id: "morris",
    name: "Morris",
    role: "Inhaber & Leitender Masseur",
    isOwner: true,
    image: teamMorris,
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
    image: teamAnna,
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
    image: teamLuca,
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
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <Layout>
      <SEOHead 
        title="Team – Zertifizierte Therapeut:innen | GentleHands Zürich"
        description="Lernen Sie unsere zertifizierten Therapeut:innen kennen. Jahrelange Erfahrung in Tiefenentspannung, individueller Stil und respektvoller Umgang in unseren Themenräumen."
        canonical="https://gentlehands.ch/team"
      />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/4 -right-32 w-48 sm:w-96 h-48 sm:h-96 bg-copper/10 rounded-full blur-[80px] sm:blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 -left-32 w-48 sm:w-96 h-48 sm:h-96 bg-primary/10 rounded-full blur-[80px] sm:blur-[120px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          />
        </div>
        
        <FloatingElements variant="dots" />
        
        <div className="container-wide relative z-10 px-4 sm:px-6">
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
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-copper/10 border border-copper/20 mb-4 sm:mb-6"
            >
              <Users size={14} className="sm:w-4 sm:h-4 text-copper" />
              <span className="text-copper text-xs sm:text-sm font-medium">3 Expert:innen</span>
            </motion.div>
            
            <motion.h1 
              className="text-foreground mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Menschen, die Sie <span className="text-gradient-copper">begleiten</span>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-sm sm:text-base md:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Alle unsere Masseur:innen sind professionell ausgebildet und bringen ihre eigene, einzigartige Herangehensweise mit.
            </motion.p>

            <TeamHeroEnhanced />
          </motion.div>
        </div>
      </section>

      {/* Working Moments Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-foreground mb-4">Momente der <span className="text-gradient-copper">Fürsorge</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Einblicke in unsere tägliche Arbeit – mit Achtsamkeit und Hingabe.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { image: teamWorkingMoment, text: "Achtsame Berührung", desc: "Jede Massage beginnt mit Aufmerksamkeit" },
              { image: teamConsultation, text: "Persönliches Gespräch", desc: "Wir hören zu, bevor wir beginnen" },
              { image: emotionalTherapistHands, text: "Professionelle Hände", desc: "Jahrelange Erfahrung spürt man" },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <LazyImage
                    src={item.image}
                    alt={item.text}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-display text-xl mb-1">{item.text}</h3>
                    <p className="text-white/70 text-sm">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TeamCultureSection />

      {/* Team Members */}
      <section className="section-padding-sm px-4 sm:px-0">
        <div className="container-wide space-y-16 sm:space-y-24">
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
              <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10 ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                <div className={`${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <motion.div 
                    className="aspect-[3/4] sm:aspect-[3/4] rounded-2xl sm:rounded-3xl relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {member.isOwner && (
                      <motion.div 
                        className="absolute top-4 right-4 z-10"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-copper text-accent-foreground text-xs font-medium rounded-full shadow-lg">
                          <Star size={12} fill="currentColor" />
                          Inhaber
                        </span>
                      </motion.div>
                    )}
                    <img 
                      src={member.image} 
                      alt={`${member.name} - ${member.role}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Name overlay on hover */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    >
                      <p className="text-white font-display text-xl">{member.name}</p>
                      <p className="text-white/70 text-sm">{member.role}</p>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-2 ${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 1 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <h2 className="text-foreground">{member.name}</h2>
                      <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                        {member.role}
                      </span>
                    </div>
                    <div className="divider-copper mb-6" />

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                      {member.description}
                    </p>

                    {/* Style */}
                    <motion.div 
                      className="mb-6 p-5 rounded-xl bg-gradient-to-r from-secondary/50 to-secondary/30 border border-border/50"
                      whileHover={{ scale: 1.01 }}
                    >
                      <p className="text-foreground font-medium mb-2">Stil:</p>
                      <p className="text-muted-foreground">{member.style}</p>
                    </motion.div>

                    {/* Quote */}
                    <motion.blockquote 
                      className="mb-8 pl-5 border-l-2 border-copper relative"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <Quote size={24} className="absolute -left-3 -top-2 text-copper/30" />
                      <p className="text-foreground italic text-lg">„{member.quote}"</p>
                    </motion.blockquote>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
                      {[
                        { icon: Award, title: "Erfahrung", content: member.experience },
                        { icon: Languages, title: "Sprachen", content: member.languages.join(", ") },
                        { icon: Heart, title: "Spezialisierungen", content: member.specialties },
                        { icon: GraduationCap, title: "Ausbildungen", content: member.certifications },
                      ].map((item, i) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i }}
                          className="group"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <item.icon size={18} className="text-copper" />
                            </motion.div>
                            <h4 className="font-display text-foreground">{item.title}</h4>
                          </div>
                          {Array.isArray(item.content) ? (
                            <ul className="text-muted-foreground text-sm space-y-1">
                              {item.content.map((s) => (
                                <li key={s} className="flex items-start gap-2">
                                  <span className="w-1 h-1 rounded-full bg-copper mt-2 shrink-0" />
                                  {s}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">{item.content}</p>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="copper" size="lg" asChild className="group">
                        <Link to={`/buchung?masseur=${member.id}`}>
                          Mit {member.name} buchen
                          <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* No Preference Section */}
      <section className="section-padding bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-copper/5 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="container-narrow text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-copper/10 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Star size={40} className="text-copper" />
            </motion.div>
            
            <h2 className="text-foreground mb-6">Keine Präferenz?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Wenn Sie sich nicht entscheiden können oder möchten, wählen wir gerne intuitiv für Sie – basierend auf Ihren Wünschen und der aktuellen Verfügbarkeit.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="copper" size="lg" asChild className="group">
                <Link to="/buchung">
                  Intuitiv wählen lassen
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <TeamTestimonialsSection />
    </Layout>
  );
};

export default Team;