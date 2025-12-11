import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Clock, Plus, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  duration?: number;
}

const massageTypes = [
  { id: "classic", name: "Classic Massage", basePrice: 120 },
  { id: "deep-tissue", name: "Deep Tissue", basePrice: 140 },
  { id: "hot-stone", name: "Hot Stone", basePrice: 160 },
  { id: "aromatherapy", name: "Aromatherapie", basePrice: 150 },
  { id: "thai", name: "Thai Massage", basePrice: 145 },
];

const durations = [
  { minutes: 60, multiplier: 1, label: "60 Min" },
  { minutes: 90, multiplier: 1.4, label: "90 Min", popular: true },
  { minutes: 120, multiplier: 1.8, label: "120 Min" },
];

const addOns: AddOn[] = [
  { id: "aromatherapy", name: "Aromatherapie", price: 25, description: "Ätherische Öle nach Wahl", duration: 0 },
  { id: "hot-towels", name: "Heisse Tücher", price: 15, description: "Wärmende Entspannung", duration: 5 },
  { id: "scalp", name: "Kopfmassage", price: 30, description: "Intensive Kopfentspannung", duration: 15 },
  { id: "foot", name: "Fussreflexzonen", price: 35, description: "Ganzheitliche Stimulation", duration: 15 },
  { id: "sound", name: "Klangschalen", price: 20, description: "Vibrierende Tiefenentspannung", duration: 10 },
];

export const PriceCalculator = () => {
  const [selectedMassage, setSelectedMassage] = useState(massageTypes[0].id);
  const [selectedDuration, setSelectedDuration] = useState(90);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const massage = massageTypes.find(m => m.id === selectedMassage)!;
  const duration = durations.find(d => d.minutes === selectedDuration)!;

  const calculation = useMemo(() => {
    const basePrice = massage.basePrice * duration.multiplier;
    const addOnsPrice = selectedAddOns.reduce((sum, id) => {
      const addOn = addOns.find(a => a.id === id);
      return sum + (addOn?.price || 0);
    }, 0);
    const addOnsDuration = selectedAddOns.reduce((sum, id) => {
      const addOn = addOns.find(a => a.id === id);
      return sum + (addOn?.duration || 0);
    }, 0);
    
    return {
      basePrice: Math.round(basePrice),
      addOnsPrice,
      total: Math.round(basePrice) + addOnsPrice,
      totalDuration: selectedDuration + addOnsDuration,
    };
  }, [massage, duration, selectedAddOns, selectedDuration]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-3xl p-8 border border-border/50"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-copper" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold text-foreground">Preiskalkulator</h3>
          <p className="text-muted-foreground">Stellen Sie Ihr perfektes Erlebnis zusammen</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Selection */}
        <div className="space-y-6">
          {/* Massage Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Massageart</label>
            <div className="grid grid-cols-1 gap-2">
              {massageTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedMassage(type.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedMassage === type.id
                      ? 'border-copper bg-copper/10'
                      : 'border-border/50 hover:border-copper/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{type.name}</span>
                    <span className="text-copper font-semibold">ab CHF {type.basePrice}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Dauer</label>
            <div className="flex gap-3">
              {durations.map((dur) => (
                <button
                  key={dur.minutes}
                  onClick={() => setSelectedDuration(dur.minutes)}
                  className={`flex-1 p-4 rounded-xl border text-center transition-all relative ${
                    selectedDuration === dur.minutes
                      ? 'border-copper bg-copper/10'
                      : 'border-border/50 hover:border-copper/50'
                  }`}
                >
                  {dur.popular && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-copper text-white text-xs rounded-full">
                      Beliebt
                    </span>
                  )}
                  <Clock className="w-5 h-5 mx-auto mb-1 text-copper" />
                  <span className="font-medium text-foreground">{dur.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              <Plus className="w-4 h-4 inline mr-1" />
              Extras hinzufügen
            </label>
            <div className="grid grid-cols-1 gap-2">
              {addOns.map((addOn) => (
                <button
                  key={addOn.id}
                  onClick={() => toggleAddOn(addOn.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedAddOns.includes(addOn.id)
                      ? 'border-copper bg-copper/10'
                      : 'border-border/50 hover:border-copper/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedAddOns.includes(addOn.id) ? 'border-copper bg-copper' : 'border-muted-foreground'
                      }`}>
                        {selectedAddOns.includes(addOn.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div>
                        <span className="font-medium text-foreground">{addOn.name}</span>
                        <p className="text-xs text-muted-foreground">{addOn.description}</p>
                      </div>
                    </div>
                    <span className="text-copper font-semibold">+CHF {addOn.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:sticky lg:top-24 h-fit">
          <motion.div
            layout
            className="p-6 rounded-2xl bg-gradient-to-br from-copper/10 to-petrol/10 border border-copper/20"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-copper" />
              <h4 className="font-display text-lg font-semibold text-foreground">Ihre Auswahl</h4>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-3 border-b border-border/30">
                <div>
                  <p className="font-medium text-foreground">{massage.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedDuration} Minuten</p>
                </div>
                <span className="text-foreground font-semibold">CHF {calculation.basePrice}</span>
              </div>

              <AnimatePresence mode="popLayout">
                {selectedAddOns.map((id) => {
                  const addOn = addOns.find(a => a.id === id)!;
                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between items-center"
                    >
                      <span className="text-muted-foreground">{addOn.name}</span>
                      <span className="text-foreground">+CHF {addOn.price}</span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="pt-4 border-t border-copper/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Gesamtdauer</span>
                <span className="text-foreground font-medium">{calculation.totalDuration} Min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-foreground">Gesamtpreis</span>
                <motion.span
                  key={calculation.total}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-copper"
                >
                  CHF {calculation.total}
                </motion.span>
              </div>
            </div>

            <Button variant="copper" size="lg" className="w-full mt-6" asChild>
              <Link to="/buchung">
                Jetzt buchen
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
