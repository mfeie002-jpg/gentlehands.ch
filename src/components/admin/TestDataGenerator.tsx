import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Sparkles, Loader2, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const massageTypes = [
  "Tiefenentspannung Classic",
  "Hot Stone Massage",
  "Aromatherapie Massage",
  "Deep Tissue Release",
  "Stress Reset Treatment",
];

const themes = [
  "Ozean & Palmen",
  "Alpine Stille",
  "Deep Dark Relax",
  "Urban Loft",
  "Zen Garden",
  "Surprise Experience",
];

const therapists = ["Sophie", "Anna", "Luca", "Morris"];

const firstNames = ["Laura", "Sarah", "Anna", "Julia", "Maria", "Lisa", "Nina", "Emma", "Lea", "Sophie"];
const lastNames = ["Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker"];

const testimonialTexts = [
  "Ein wunderbares Erlebnis! Die Atmosphäre war einzigartig und ich fühlte mich vollkommen entspannt.",
  "Ich komme immer wieder gerne. Die Therapeuten sind sehr professionell und einfühlsam.",
  "Das beste Wellness-Erlebnis, das ich je hatte. Absolute Empfehlung!",
  "Die Deep Dark Relax Session war transformativ. Ich habe noch nie so gut geschlafen.",
  "Fantastische Massage mit wunderschönem Ambiente. Werde definitiv wiederkommen.",
];

interface TestDataGeneratorProps {
  onDataGenerated?: () => void;
}

export const TestDataGenerator = ({ onDataGenerated }: TestDataGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [results, setResults] = useState<{bookings: number; testimonials: number; giftCards: number} | null>(null);
  const { toast } = useToast();

  const generateRandomDate = (daysFromNow: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
  };

  const generateRandomTime = () => {
    const hours = [9, 10, 11, 14, 15, 16, 17];
    return `${hours[Math.floor(Math.random() * hours.length)]}:00`;
  };

  const generateBookingNumber = () => {
    return `GH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  };

  const generateGiftCardCode = () => {
    return `GIFT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  };

  const generateTestData = async () => {
    setIsGenerating(true);
    setResults(null);

    try {
      // Generate 10 bookings
      const bookings = [];
      for (let i = 0; i < 10; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        
        bookings.push({
          booking_number: generateBookingNumber(),
          customer_name: `${firstName} ${lastName}`,
          customer_email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
          customer_phone: `+41 7${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10}`,
          massage: massageTypes[Math.floor(Math.random() * massageTypes.length)],
          theme: themes[Math.floor(Math.random() * themes.length)],
          masseur: therapists[Math.floor(Math.random() * therapists.length)],
          duration: ['60', '90', '120'][Math.floor(Math.random() * 3)],
          appointment_date: generateRandomDate(Math.floor(Math.random() * 60) - 30),
          appointment_time: generateRandomTime(),
          status: ['pending', 'confirmed', 'completed'][Math.floor(Math.random() * 3)],
        });
      }

      const { error: bookingsError } = await supabase.from('bookings').insert(bookings);
      if (bookingsError) throw bookingsError;

      // Generate 5 testimonials
      const testimonials = [];
      for (let i = 0; i < 5; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        
        testimonials.push({
          name: firstName,
          content: testimonialTexts[Math.floor(Math.random() * testimonialTexts.length)],
          rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
          location: ['Zürich', 'Basel', 'Bern', 'Luzern'][Math.floor(Math.random() * 4)],
          theme: themes[Math.floor(Math.random() * themes.length)],
          is_approved: Math.random() > 0.5,
        });
      }

      const { error: testimonialsError } = await supabase.from('testimonial_submissions').insert(testimonials);
      if (testimonialsError) throw testimonialsError;

      // Generate 3 gift cards
      const giftCards = [];
      for (let i = 0; i < 3; i++) {
        const value = [100, 150, 200, 250, 300][Math.floor(Math.random() * 5)];
        
        giftCards.push({
          code: generateGiftCardCode(),
          value,
          remaining_balance: Math.random() > 0.5 ? value : Math.floor(value * Math.random()),
          recipient_name: firstNames[Math.floor(Math.random() * firstNames.length)],
          recipient_email: `recipient${i}@example.com`,
          purchaser_email: `purchaser${i}@example.com`,
          message: 'Ein Geschenk für dich – geniesse eine entspannende Auszeit!',
          is_redeemed: Math.random() > 0.7,
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        });
      }

      const { error: giftCardsError } = await supabase.from('gift_cards').insert(giftCards);
      if (giftCardsError) throw giftCardsError;

      setResults({ bookings: 10, testimonials: 5, giftCards: 3 });
      onDataGenerated?.();
      toast({ 
        title: 'Testdaten erstellt', 
        description: '10 Buchungen, 5 Testimonials, 3 Gutscheine generiert' 
      });
    } catch (error: any) {
      toast({ 
        title: 'Fehler', 
        description: error.message, 
        variant: 'destructive' 
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const clearTestData = async () => {
    setIsClearing(true);
    
    try {
      // Only delete test data (emails ending with @example.com)
      await supabase.from('bookings').delete().like('customer_email', '%@example.com');
      await supabase.from('gift_cards').delete().like('purchaser_email', '%@example.com');
      
      setResults(null);
      onDataGenerated?.();
      toast({ 
        title: 'Testdaten gelöscht', 
        description: 'Alle Testdaten wurden entfernt' 
      });
    } catch (error: any) {
      toast({ 
        title: 'Fehler', 
        description: error.message, 
        variant: 'destructive' 
      });
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
          <Database className="w-5 h-5 text-violet-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Testdaten Generator</h3>
          <p className="text-sm text-muted-foreground">Demo-Daten für Präsentationen erstellen</p>
        </div>
      </div>

      {results && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="font-medium text-emerald-500">Erfolgreich erstellt</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{results.bookings}</p>
              <p className="text-xs text-muted-foreground">Buchungen</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{results.testimonials}</p>
              <p className="text-xs text-muted-foreground">Testimonials</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{results.giftCards}</p>
              <p className="text-xs text-muted-foreground">Gutscheine</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex gap-3">
        <Button 
          onClick={generateTestData} 
          disabled={isGenerating || isClearing}
          className="flex-1"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2" />
          )}
          Testdaten generieren
        </Button>
        <Button 
          variant="destructive" 
          onClick={clearTestData}
          disabled={isGenerating || isClearing}
        >
          {isClearing ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4 mr-2" />
          )}
          Löschen
        </Button>
      </div>
    </motion.div>
  );
};
