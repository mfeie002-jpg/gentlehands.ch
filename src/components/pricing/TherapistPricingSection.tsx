import { motion } from "framer-motion";
import { useApprovedTherapists } from "@/hooks/useTherapists";
import { Star, Clock, Award, Banknote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export const TherapistPricingSection = () => {
  const { therapists, isLoading } = useApprovedTherapists();

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (therapists.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="container-wide px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 mb-4">
            <Banknote size={16} className="text-copper" />
            <span className="text-copper text-sm font-medium">Individuelle Preise</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
            Unsere Therapeut:innen
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jede:r unserer Therapeut:innen bringt einzigartige Fähigkeiten und Erfahrungen mit. 
            Die Preise variieren je nach Spezialisierung und Erfahrung.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapists.map((therapist, index) => (
            <motion.div
              key={therapist.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl border border-border overflow-hidden hover:border-copper/50 transition-all duration-300 hover:shadow-lg hover:shadow-copper/5">
                {/* Header with photo */}
                <div className="relative h-48 bg-gradient-to-br from-copper/20 to-primary/10">
                  {therapist.photo_url ? (
                    <img
                      src={therapist.photo_url}
                      alt={therapist.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl font-display text-copper/30">
                        {therapist.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Price badge */}
                  <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-muted-foreground">CHF</span>
                      <span className="text-2xl font-display text-copper">
                        {therapist.hourly_rate || 120}
                      </span>
                      <span className="text-xs text-muted-foreground">/h</span>
                    </div>
                  </div>
                  
                  {therapist.is_featured && (
                    <div className="absolute top-4 left-4 bg-copper text-accent-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star size={12} fill="currentColor" />
                      Beliebt
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-xl text-foreground">{therapist.name}</h3>
                    {therapist.average_rating > 0 && (
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm font-medium">{therapist.average_rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                    {therapist.experience_years > 0 && (
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{therapist.experience_years} Jahre</span>
                      </div>
                    )}
                    {therapist.total_bookings > 0 && (
                      <div className="flex items-center gap-1">
                        <Award size={14} />
                        <span>{therapist.total_bookings}+ Sessions</span>
                      </div>
                    )}
                  </div>

                  {therapist.specialty && therapist.specialty.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {therapist.specialty.slice(0, 3).map((spec) => (
                        <span
                          key={spec}
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {spec}
                        </span>
                      ))}
                      {therapist.specialty.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                          +{therapist.specialty.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {therapist.bio && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {therapist.bio}
                    </p>
                  )}

                  <Button variant="petrol-outline" className="w-full group" asChild>
                    <Link to={`/buchung?therapist=${encodeURIComponent(therapist.name)}`}>
                      Termin buchen
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Price note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Die angezeigten Preise sind Stundensätze. Der Endpreis berechnet sich aus 
            Stundensatz × Dauer. Alle Preise inkl. MwSt.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
