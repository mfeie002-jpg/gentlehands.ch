import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Heart, Clock, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PersonalizedRecommendation {
  type: "therapist" | "theme" | "massage" | "time";
  title: string;
  subtitle: string;
  reason: string;
  value: string;
}

interface BookingPersonalizedRecommendationsProps {
  userEmail?: string;
  onSelectTherapist?: (id: string) => void;
  onSelectTheme?: (id: string) => void;
  onSelectMassage?: (id: string) => void;
  onSelectTime?: (time: string) => void;
}

export const BookingPersonalizedRecommendations = ({
  userEmail,
  onSelectTherapist,
  onSelectTheme,
  onSelectMassage,
  onSelectTime,
}: BookingPersonalizedRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      const recs: PersonalizedRecommendation[] = [];

      try {
        if (userEmail) {
          // Fetch user's previous bookings
          const { data: bookings } = await supabase
            .from("bookings")
            .select("massage, theme, masseur, appointment_time, therapist_id")
            .eq("customer_email", userEmail)
            .order("created_at", { ascending: false })
            .limit(10);

          if (bookings && bookings.length > 0) {
            // Find most booked massage type
            const massageCounts: Record<string, number> = {};
            const themeCounts: Record<string, number> = {};
            const timeCounts: Record<string, number> = {};

            bookings.forEach((b) => {
              if (b.massage) massageCounts[b.massage] = (massageCounts[b.massage] || 0) + 1;
              if (b.theme) themeCounts[b.theme] = (themeCounts[b.theme] || 0) + 1;
              if (b.appointment_time) timeCounts[b.appointment_time] = (timeCounts[b.appointment_time] || 0) + 1;
            });

            // Add favorite massage recommendation
            const favMassage = Object.entries(massageCounts).sort((a, b) => b[1] - a[1])[0];
            if (favMassage) {
              recs.push({
                type: "massage",
                title: favMassage[0],
                subtitle: `${favMassage[1]}x gebucht`,
                reason: "Ihre Lieblings-Massage",
                value: favMassage[0],
              });
            }

            // Add favorite theme recommendation
            const favTheme = Object.entries(themeCounts).sort((a, b) => b[1] - a[1])[0];
            if (favTheme) {
              recs.push({
                type: "theme",
                title: favTheme[0],
                subtitle: `${favTheme[1]}x gewählt`,
                reason: "Ihr bevorzugter Themenraum",
                value: favTheme[0],
              });
            }

            // Add favorite time recommendation
            const favTime = Object.entries(timeCounts).sort((a, b) => b[1] - a[1])[0];
            if (favTime) {
              recs.push({
                type: "time",
                title: `${favTime[0]} Uhr`,
                subtitle: "Ihre übliche Zeit",
                reason: "Basierend auf Ihren Buchungen",
                value: favTime[0],
              });
            }

            // Check for previous therapist
            const lastBookingWithTherapist = bookings.find((b) => b.masseur);
            if (lastBookingWithTherapist?.masseur) {
              recs.push({
                type: "therapist",
                title: lastBookingWithTherapist.masseur,
                subtitle: "Ihre letzte Wahl",
                reason: "Erneut buchen?",
                value: lastBookingWithTherapist.therapist_id || lastBookingWithTherapist.masseur,
              });
            }
          }
        }

        // If no personalized recommendations, show popular choices
        if (recs.length === 0) {
          // Fetch popular data
          const { data: popularMassages } = await supabase
            .from("massage_types")
            .select("name")
            .eq("is_featured", true)
            .limit(1);

          const { data: popularThemes } = await supabase
            .from("experience_themes")
            .select("name")
            .eq("is_featured", true)
            .limit(1);

          if (popularMassages?.[0]) {
            recs.push({
              type: "massage",
              title: popularMassages[0].name,
              subtitle: "Beliebteste Wahl",
              reason: "Am häufigsten gebucht",
              value: popularMassages[0].name,
            });
          }

          if (popularThemes?.[0]) {
            recs.push({
              type: "theme",
              title: popularThemes[0].name,
              subtitle: "Kundinnen-Favorit",
              reason: "Top bewertetes Erlebnis",
              value: popularThemes[0].name,
            });
          }

          recs.push({
            type: "time",
            title: "15:00 Uhr",
            subtitle: "Beliebteste Zeit",
            reason: "Optimal für Entspannung",
            value: "15:00",
          });
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }

      setRecommendations(recs);
      setIsLoading(false);
    };

    fetchRecommendations();
  }, [userEmail]);

  if (isLoading || recommendations.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case "therapist": return Heart;
      case "theme": return Sparkles;
      case "massage": return TrendingUp;
      case "time": return Clock;
      default: return Sparkles;
    }
  };

  const handleClick = (rec: PersonalizedRecommendation) => {
    switch (rec.type) {
      case "therapist": onSelectTherapist?.(rec.value); break;
      case "theme": onSelectTheme?.(rec.value); break;
      case "massage": onSelectMassage?.(rec.value); break;
      case "time": onSelectTime?.(rec.value); break;
    }
  };

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-copper/5 via-petrol/5 to-copper/5 rounded-xl border border-border/50">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-copper" />
        <span className="text-sm font-medium text-foreground">Für Sie empfohlen</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {recommendations.map((rec, index) => {
          const Icon = getIcon(rec.type);
          return (
            <motion.button
              key={`${rec.type}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleClick(rec)}
              className="flex items-center gap-2 px-3 py-2 bg-background/80 hover:bg-background rounded-lg border border-border/50 hover:border-copper/50 transition-all group"
            >
              <Icon className="w-4 h-4 text-copper" />
              <div className="text-left">
                <p className="text-sm font-medium text-foreground group-hover:text-copper transition-colors">
                  {rec.title}
                </p>
                <p className="text-xs text-muted-foreground">{rec.reason}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
