import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/shared/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  User, Mail, Phone, Briefcase, Award, Heart, 
  Upload, CheckCircle, Sparkles, Shield, Star, Banknote 
} from "lucide-react";

const specialtyOptions = [
  "Entspannungsmassage",
  "Tiefengewebe-Massage",
  "Hot Stone Massage",
  "Aromatherapie-Massage",
  "Stress-Reset",
  "Ganzkörper-Ritual"
];

const TherapistRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    experience_years: "",
    hourly_rate: "120",
    specialties: [] as string[],
    qualifications: "",
    agreeTerms: false,
    agreePrivacy: false
  });

  const updateField = (key: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.agreeTerms || !formData.agreePrivacy) {
      toast({
        title: "Bitte stimmen Sie den Bedingungen zu",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('therapists')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          bio: formData.bio || null,
          experience_years: parseInt(formData.experience_years) || 0,
          hourly_rate: parseFloat(formData.hourly_rate) || 120,
          specialty: formData.specialties,
          qualifications: formData.qualifications.split(',').map(q => q.trim()).filter(Boolean),
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Bewerbung eingereicht!",
        description: "Wir werden Ihre Bewerbung prüfen und uns bei Ihnen melden.",
      });

      navigate('/therapeut/bestaetigung');
    } catch (err) {
      console.error('Registration error:', err);
      toast({
        title: "Fehler bei der Registrierung",
        description: "Bitte versuchen Sie es erneut.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Therapeut:in werden | GentleHands"
        description="Werden Sie Teil des GentleHands-Teams. Registrieren Sie sich als professionelle:r Therapeut:in."
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-sand/20 py-12 sm:py-20">
        <div className="container max-w-3xl mx-auto px-4">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 text-copper mb-6">
              <Sparkles size={16} />
              <span className="text-sm font-medium">Werde Teil unseres Teams</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
              Therapeut:in bei GentleHands
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Arbeiten Sie in einem exklusiven, sicheren Umfeld und bieten Sie 
              unseren Kundinnen einzigartige Entspannungserlebnisse.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
          >
            {[
              { icon: Shield, title: "Sicherer Raum", desc: "Professionelles Umfeld" },
              { icon: Star, title: "Faire Vergütung", desc: "70% Provision" },
              { icon: Heart, title: "Flexible Zeiten", desc: "Sie bestimmen Ihre Termine" }
            ].map((benefit, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border text-center">
                <benefit.icon size={28} className="text-copper mx-auto mb-3" />
                <h3 className="font-medium text-foreground mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-6 sm:p-8"
          >
            {/* Progress */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= s ? 'bg-copper text-accent-foreground' : 'bg-secondary text-muted-foreground'
                  }`}>
                    {step > s ? <CheckCircle size={16} /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`w-16 sm:w-24 h-1 mx-2 rounded ${
                      step > s ? 'bg-copper' : 'bg-secondary'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-display text-foreground mb-6">Persönliche Daten</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                      <User size={16} /> Vollständiger Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Ihr Name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                      <Mail size={16} /> E-Mail-Adresse *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="ihre@email.ch"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                      <Phone size={16} /> Telefonnummer
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+41 79 123 45 67"
                    />
                  </div>
                </div>

                <Button 
                  onClick={() => setStep(2)}
                  disabled={!formData.name || !formData.email}
                  className="w-full"
                >
                  Weiter
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-display text-foreground mb-6">Qualifikationen</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experience" className="flex items-center gap-2 mb-2">
                        <Briefcase size={16} /> Berufserfahrung *
                      </Label>
                      <Input
                        id="experience"
                        type="number"
                        min="0"
                        value={formData.experience_years}
                        onChange={(e) => updateField('experience_years', e.target.value)}
                        placeholder="Jahre"
                      />
                    </div>

                    <div>
                      <Label htmlFor="hourlyRate" className="flex items-center gap-2 mb-2">
                        <Banknote size={16} /> Stundensatz (CHF) *
                      </Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        min="80"
                        max="300"
                        value={formData.hourly_rate}
                        onChange={(e) => updateField('hourly_rate', e.target.value)}
                        placeholder="120"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Empfohlen: 100-180 CHF/Stunde
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-3">
                      <Award size={16} /> Spezialisierungen *
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {specialtyOptions.map((specialty) => (
                        <button
                          key={specialty}
                          onClick={() => toggleSpecialty(specialty)}
                          className={`p-3 rounded-lg border text-left text-sm transition-all ${
                            formData.specialties.includes(specialty)
                              ? 'border-copper bg-copper/10 text-foreground'
                              : 'border-border text-muted-foreground hover:border-copper/50'
                          }`}
                        >
                          {specialty}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="qualifications" className="flex items-center gap-2 mb-2">
                      Ausbildungen & Zertifikate
                    </Label>
                    <Input
                      id="qualifications"
                      value={formData.qualifications}
                      onChange={(e) => updateField('qualifications', e.target.value)}
                      placeholder="z.B. EMR-Anerkennung, Craniosacral-Zertifikat"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Mehrere Einträge mit Komma trennen
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Zurück
                  </Button>
                  <Button 
                    onClick={() => setStep(3)}
                    disabled={!formData.experience_years || formData.specialties.length === 0 || !formData.hourly_rate}
                    className="flex-1"
                  >
                    Weiter
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-display text-foreground mb-6">Über Sie</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bio" className="flex items-center gap-2 mb-2">
                      <Heart size={16} /> Kurzbiografie
                    </Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => updateField('bio', e.target.value)}
                      placeholder="Beschreiben Sie Ihren Massagestil und was Sie antreibt..."
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Diese Beschreibung wird auf Ihrer Profilseite angezeigt.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border space-y-3">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => updateField('agreeTerms', checked)}
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                        Ich akzeptiere die <Link to="/rechtliches" className="text-copper underline" target="_blank" onClick={(e) => e.stopPropagation()}>AGB</Link> und 
                        die Zusammenarbeitsbedingungen von GentleHands. *
                      </Label>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="privacy"
                        checked={formData.agreePrivacy}
                        onCheckedChange={(checked) => updateField('agreePrivacy', checked)}
                      />
                      <Label htmlFor="privacy" className="text-sm leading-relaxed cursor-pointer">
                        Ich habe die <Link to="/rechtliches" className="text-copper underline" target="_blank" onClick={(e) => e.stopPropagation()}>Datenschutzrichtlinien</Link> gelesen 
                        und stimme der Verarbeitung meiner Daten zu. *
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Zurück
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.agreeTerms || !formData.agreePrivacy}
                    className="flex-1"
                  >
                    {isSubmitting ? "Wird gesendet..." : "Bewerbung absenden"}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Info Note */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            Nach Prüfung Ihrer Bewerbung erhalten Sie eine E-Mail mit weiteren Schritten.
            Bei Fragen wenden Sie sich an <a href="mailto:team@gentlehands.ch" className="text-copper">team@gentlehands.ch</a>
          </motion.p>
        </div>
      </div>
    </Layout>
  );
};

export default TherapistRegistration;
