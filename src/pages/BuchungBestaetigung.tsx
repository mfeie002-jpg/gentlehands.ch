import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Check, Calendar, Clock, MapPin, Phone, Mail, Heart, Sparkles, User, Music, MessageSquare, Zap, Download, Share2, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import confetti from "canvas-confetti";

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
  const [hasAnimated, setHasAnimated] = useState(false);
  const bookingNumber = searchParams.get("nr") || "GH-2024-" + Math.random().toString(36).substr(2, 6).toUpperCase();

  useEffect(() => {
    const storedData = localStorage.getItem("gentlehands_booking");
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    }
  }, []);

  // Confetti effect on mount
  useEffect(() => {
    if (hasAnimated) return;
    
    const timer = setTimeout(() => {
      // First burst - center
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6, x: 0.5 },
        colors: ['#B87333', '#D4A574', '#8B7355', '#C9A86C', '#E8D4B8'],
      });
      
      // Second burst - left
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          colors: ['#B87333', '#D4A574', '#8B7355'],
        });
      }, 200);
      
      // Third burst - right
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          colors: ['#B87333', '#D4A574', '#8B7355'],
        });
      }, 400);
      
      setHasAnimated(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [hasAnimated]);

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

      <section className="py-24 md:py-32 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: `hsl(${25 + Math.random() * 20}, ${60 + Math.random() * 20}%, ${60 + Math.random() * 20}%)`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ 
                y: "110vh",
                opacity: 0 
              }}
              animate={{ 
                y: "-10vh",
                opacity: [0, 0.8, 0.8, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
        </div>
        
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-copper/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-petrol/10 rounded-full blur-[150px]" />

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
                className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-copper/20 to-copper/5 flex items-center justify-center relative"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15,
                  delay: 0.2 
                }}
              >
                {/* Animated rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-copper/40"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-copper/30"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border border-copper/20"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                />
                
                {/* Inner glow */}
                <div className="absolute inset-4 rounded-full bg-copper/10 blur-md" />
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-copper to-copper/80 flex items-center justify-center shadow-lg shadow-copper/30">
                    <Check className="w-8 h-8 text-background" strokeWidth={3} />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Success Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <motion.span 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-copper/20 to-copper/10 text-copper text-sm font-medium border border-copper/20"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                Buchungsanfrage erfolgreich
              </motion.span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6"
            >
              Vielen Dank für Ihre{" "}
              <span className="text-gradient-copper">Anfrage</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
            >
              Wir haben Ihre Buchungsanfrage erhalten und werden diese schnellstmöglich bearbeiten. 
              Sie hören von uns!
            </motion.p>

            {/* Booking Number Card */}
            <motion.div
              variants={itemVariants}
              className="relative inline-block mb-10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-copper/20 via-copper/10 to-copper/20 rounded-2xl blur-xl" />
              <div className="relative glass rounded-2xl px-10 py-8 border border-copper/20">
                <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">Ihre Buchungsnummer</p>
                <motion.p 
                  className="text-3xl md:text-4xl font-mono font-bold text-copper tracking-wider"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  {bookingNumber}
                </motion.p>
                <div className="flex justify-center gap-3 mt-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Download className="w-4 h-4 mr-1" />
                    Speichern
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Share2 className="w-4 h-4 mr-1" />
                    Teilen
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Booking Summary */}
            {bookingData && (
              <motion.div
                variants={itemVariants}
                className="relative mb-12"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-copper/5 to-petrol/5 rounded-3xl blur-2xl" />
                <div className="relative glass rounded-3xl p-8 md:p-10 border border-border/50 text-left max-w-2xl mx-auto">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-display font-semibold text-foreground">
                      Ihre Buchungsübersicht
                    </h2>
                    <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-copper" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Info */}
                    <div className="space-y-5">
                      <motion.div 
                        className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-copper" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Name</p>
                          <p className="font-medium text-foreground">{bookingData.name}</p>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-copper" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">E-Mail</p>
                          <p className="font-medium text-foreground">{bookingData.email}</p>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-copper" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Telefon</p>
                          <p className="font-medium text-foreground">{bookingData.phone}</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Appointment Info */}
                    <div className="space-y-5">
                      <motion.div 
                        className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-copper/10 to-copper/5 border border-copper/20"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-copper/20 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-copper" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Termin</p>
                          <p className="font-semibold text-foreground">{bookingData.date}</p>
                          <p className="text-copper font-medium">{bookingData.time} Uhr</p>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-copper" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Dauer</p>
                          <p className="font-medium text-foreground">{bookingData.duration}</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="border-t border-border/50 mt-8 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-muted/20 text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Masseur:in</p>
                        <p className="font-semibold text-foreground">{bookingData.masseur}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/20 text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Erlebnis</p>
                        <p className="font-semibold text-foreground">{bookingData.theme}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/20 text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Massage</p>
                        <p className="font-semibold text-foreground">{bookingData.massage}</p>
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="border-t border-border/50 mt-6 pt-6">
                    <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">Ihre Präferenzen</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-muted/50 rounded-full text-sm border border-border/50">
                        <Music className="w-3.5 h-3.5 text-copper" />
                        Musik: {bookingData.preferences.music}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-muted/50 rounded-full text-sm border border-border/50">
                        <MessageSquare className="w-3.5 h-3.5 text-copper" />
                        {bookingData.preferences.conversation}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-muted/50 rounded-full text-sm border border-border/50">
                        <Zap className="w-3.5 h-3.5 text-copper" />
                        Intensität: {bookingData.preferences.intensity}
                      </span>
                      {bookingData.preferences.intuitive && (
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-copper/10 text-copper rounded-full text-sm border border-copper/20">
                          <Sparkles className="w-3.5 h-3.5" />
                          Intuitiv
                        </span>
                      )}
                    </div>
                    {bookingData.preferences.avoidAreas && (
                      <p className="text-sm text-muted-foreground mt-4">
                        <span className="font-medium text-foreground">Zu meidende Bereiche:</span> {bookingData.preferences.avoidAreas}
                      </p>
                    )}
                    {bookingData.additionalNotes && (
                      <p className="text-sm text-muted-foreground mt-2">
                        <span className="font-medium text-foreground">Anmerkungen:</span> {bookingData.additionalNotes}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Next Steps */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-8">
                Nächste <span className="text-gradient-copper">Schritte</span>
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {nextSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.15 }}
                  >
                    {/* Connecting line */}
                    {index < nextSteps.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-gradient-to-r from-copper/30 to-copper/10" />
                    )}
                    
                    <motion.div
                      className="relative glass rounded-2xl p-6 text-left border border-border/50 hover:border-copper/30 transition-all duration-500 h-full"
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      {/* Step number */}
                      <motion.div 
                        className="absolute -top-4 -left-2 w-10 h-10 rounded-full bg-gradient-to-br from-copper to-copper/80 text-background flex items-center justify-center text-sm font-bold shadow-lg shadow-copper/30"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        {index + 1}
                      </motion.div>
                      
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-copper/15 to-copper/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                        <step.icon className="w-7 h-7 text-copper" />
                      </div>
                      
                      <h3 className="font-semibold text-foreground mb-2 text-lg">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{step.description}</p>
                      <p className="text-xs text-copper font-medium uppercase tracking-wider">{step.time}</p>
                      
                      {step.link && (
                        <Link 
                          to={step.link}
                          className="mt-4 inline-flex items-center text-sm text-copper hover:text-copper/80 transition-colors group/link"
                        >
                          Mehr erfahren 
                          <motion.span 
                            className="ml-1"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </Link>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Gift Card Suggestion */}
            <motion.div
              variants={itemVariants}
              className="mb-10"
            >
              <div className="glass rounded-2xl p-6 border border-copper/20 bg-gradient-to-r from-copper/5 to-transparent">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center">
                      <Gift className="w-6 h-6 text-copper" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground">Verschenken Sie Entspannung</p>
                      <p className="text-sm text-muted-foreground">Mit unseren exklusiven Geschenkgutscheinen</p>
                    </div>
                  </div>
                  <Button asChild variant="copper" size="sm">
                    <Link to="/gutscheine">Gutscheine entdecken</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="glass rounded-2xl p-8 mb-10 border border-border/50"
            >
              <p className="text-muted-foreground mb-5">
                Fragen zu Ihrer Buchung? Wir sind für Sie da.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a 
                  href="tel:+41441234567" 
                  className="inline-flex items-center gap-2 text-foreground hover:text-copper transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-muted/50 group-hover:bg-copper/10 flex items-center justify-center transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  +41 44 123 45 67
                </a>
                <a 
                  href="mailto:info@gentlehands.ch" 
                  className="inline-flex items-center gap-2 text-foreground hover:text-copper transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-muted/50 group-hover:bg-copper/10 flex items-center justify-center transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  info@gentlehands.ch
                </a>
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  Zürich
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button asChild variant="copper" size="lg" className="group">
                <Link to="/vorbereitung">
                  <Clock className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  Zur Vorbereitung
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group border-copper/30 hover:border-copper/50">
                <Link to="/">
                  <Heart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
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
