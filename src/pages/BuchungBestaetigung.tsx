import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Check, Calendar, Clock, MapPin, Phone, Mail, Heart, Sparkles, User, Music, MessageSquare, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";

interface BookingData {
  bookingNumber: string;
  masseur: string;
  theme: string;
  massage: string;
  duration: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  preferences: {
    music: string;
    conversation: string;
    intensity: string;
    avoidAreas: string;
    intuitive: boolean;
  };
  additionalNotes: string;
}

const BuchungBestaetigung = () => {
  const [searchParams] = useSearchParams();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const bookingNumber = searchParams.get("nr") || "GH-2024-" + Math.random().toString(36).substr(2, 6).toUpperCase();

  useEffect(() => {
    const storedData = localStorage.getItem("gentlehands_booking");
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    }
  }, []);

  const nextSteps = [
    {
      icon: Mail,
      title: "Bestätigung per E-Mail",
      description: "Sie erhalten in Kürze eine detaillierte Buchungsbestätigung per E-Mail.",
      time: "Innerhalb weniger Minuten"
    },
    {
      icon: Phone,
      title: "Persönliche Kontaktaufnahme",
      description: "Unser Team meldet sich bei Ihnen, um letzte Details zu besprechen und Ihre Wünsche aufzunehmen.",
      time: "Innerhalb von 24 Stunden"
    },
    {
      icon: Calendar,
      title: "Vorbereitung auf Ihr Erlebnis",
      description: "Lesen Sie unsere Tipps zur optimalen Vorbereitung auf Ihre Massage.",
      time: "Vor Ihrem Termin",
      link: "/vorbereitung"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Buchung bestätigt | GentleHands Zürich</title>
        <meta name="description" content="Ihre Buchung bei GentleHands wurde erfolgreich aufgenommen. Wir freuen uns auf Ihren Besuch." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/20"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: "100%",
                opacity: 0 
              }}
              animate={{ 
                y: "-20%",
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        <div className="container-custom relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            {/* Success Animation */}
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <motion.div 
                className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15,
                  delay: 0.2 
                }}
              >
                {/* Animated rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/20"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                />
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                >
                  <Check className="w-12 h-12 text-primary" strokeWidth={3} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Success Message */}
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Buchungsanfrage erfolgreich
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6"
            >
              Vielen Dank für Ihre Anfrage
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto"
            >
              Wir haben Ihre Buchungsanfrage erhalten und werden diese schnellstmöglich bearbeiten. 
              Sie hören von uns!
            </motion.p>

            {/* Booking Number */}
            <motion.div
              variants={itemVariants}
              className="inline-block bg-secondary/50 rounded-2xl px-8 py-6 mb-8"
            >
              <p className="text-sm text-muted-foreground mb-2">Ihre Buchungsnummer</p>
              <p className="text-2xl font-mono font-bold text-foreground tracking-wider">{bookingNumber}</p>
            </motion.div>

            {/* Booking Summary */}
            {bookingData && (
              <motion.div
                variants={itemVariants}
                className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 mb-12 text-left max-w-2xl mx-auto"
              >
                <h2 className="text-xl font-playfair font-semibold text-foreground mb-6 text-center">
                  Ihre Buchungsübersicht
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium text-foreground">{bookingData.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">E-Mail</p>
                        <p className="font-medium text-foreground">{bookingData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Telefon</p>
                        <p className="font-medium text-foreground">{bookingData.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Info */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Termin</p>
                        <p className="font-medium text-foreground">{bookingData.date}</p>
                        <p className="text-foreground">{bookingData.time} Uhr</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Dauer</p>
                        <p className="font-medium text-foreground">{bookingData.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/50 mt-6 pt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Masseur:in</p>
                      <p className="font-medium text-foreground">{bookingData.masseur}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Erlebnis</p>
                      <p className="font-medium text-foreground">{bookingData.theme}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground mb-1">Massage</p>
                      <p className="font-medium text-foreground">{bookingData.massage}</p>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="border-t border-border/50 mt-6 pt-6">
                  <p className="text-sm text-muted-foreground mb-3">Ihre Präferenzen</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-full text-sm">
                      <Music className="w-3.5 h-3.5" />
                      Musik: {bookingData.preferences.music}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-full text-sm">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {bookingData.preferences.conversation}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-full text-sm">
                      <Zap className="w-3.5 h-3.5" />
                      Intensität: {bookingData.preferences.intensity}
                    </span>
                    {bookingData.preferences.intuitive && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                        Intuitiv
                      </span>
                    )}
                  </div>
                  {bookingData.preferences.avoidAreas && (
                    <p className="text-sm text-muted-foreground mt-3">
                      <span className="font-medium">Zu meidende Bereiche:</span> {bookingData.preferences.avoidAreas}
                    </p>
                  )}
                  {bookingData.additionalNotes && (
                    <p className="text-sm text-muted-foreground mt-2">
                      <span className="font-medium">Anmerkungen:</span> {bookingData.additionalNotes}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Next Steps */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-playfair font-semibold text-foreground mb-8">
                Nächste Schritte
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {nextSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative bg-card rounded-2xl p-6 text-left border border-border/50 hover:border-primary/30 transition-colors group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.15 }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Step number */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                    <p className="text-xs text-primary font-medium">{step.time}</p>
                    
                    {step.link && (
                      <Link 
                        to={step.link}
                        className="mt-4 inline-flex items-center text-sm text-primary hover:underline"
                      >
                        Mehr erfahren →
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="bg-secondary/30 rounded-2xl p-8 mb-10"
            >
              <p className="text-muted-foreground mb-4">
                Fragen zu Ihrer Buchung? Wir sind für Sie da.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a 
                  href="tel:+41441234567" 
                  className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +41 44 123 45 67
                </a>
                <a 
                  href="mailto:info@gentlehands.ch" 
                  className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@gentlehands.ch
                </a>
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  Zürich
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button asChild variant="copper" size="lg">
                <Link to="/vorbereitung">
                  <Clock className="w-4 h-4 mr-2" />
                  Zur Vorbereitung
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">
                  <Heart className="w-4 h-4 mr-2" />
                  Zurück zur Startseite
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BuchungBestaetigung;
