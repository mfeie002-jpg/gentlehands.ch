import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Sparkles, ArrowRight, ArrowLeft, Check, 
  User, Palette, Music, MessageCircle, Zap, Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LazyImage } from "@/components/shared/LazyImage";

import teamAnna from "@/assets/team-anna-new.jpg";
import teamLuca from "@/assets/team-luca-new.jpg";
import teamMorris from "@/assets/team-morris-new.jpg";

interface Question {
  id: string;
  question: string;
  icon: React.ElementType;
  options: { value: string; label: string; description: string }[];
}

interface TherapistProfile {
  id: string;
  name: string;
  image: string;
  specialty: string;
  description: string;
  traits: string[];
  matchScore?: number;
}

const questions: Question[] = [
  {
    id: "atmosphere",
    question: "Welche Atmosphäre bevorzugen Sie?",
    icon: Palette,
    options: [
      { value: "calm", label: "Ruhig & Meditativ", description: "Sanfte Klänge, gedämpftes Licht" },
      { value: "warm", label: "Warm & Geborgen", description: "Gemütlich, wie zuhause" },
      { value: "energizing", label: "Erfrischend & Belebend", description: "Leicht, natürlich, vitalisierend" },
    ],
  },
  {
    id: "touch",
    question: "Welche Berührungsintensität mögen Sie?",
    icon: Zap,
    options: [
      { value: "gentle", label: "Sanft & Fliessend", description: "Leichte, entspannende Bewegungen" },
      { value: "medium", label: "Ausgewogen", description: "Mal sanft, mal fester" },
      { value: "deep", label: "Tief & Intensiv", description: "Tiefenwirksame Druckmassage" },
    ],
  },
  {
    id: "communication",
    question: "Wie viel Gespräch wünschen Sie?",
    icon: MessageCircle,
    options: [
      { value: "silent", label: "Stille bevorzugt", description: "Ich möchte komplett abschalten" },
      { value: "minimal", label: "Nur das Nötigste", description: "Kurze Abstimmungen sind ok" },
      { value: "open", label: "Offener Austausch", description: "Gerne auch über Befinden sprechen" },
    ],
  },
  {
    id: "focus",
    question: "Was ist Ihr Hauptziel?",
    icon: Leaf,
    options: [
      { value: "relaxation", label: "Tiefe Entspannung", description: "Loslassen und regenerieren" },
      { value: "tension", label: "Verspannungen lösen", description: "Gezielte Problemzonen behandeln" },
      { value: "balance", label: "Balance finden", description: "Körper und Geist harmonisieren" },
    ],
  },
];

const therapists: TherapistProfile[] = [
  {
    id: "anna",
    name: "Anna",
    image: teamAnna,
    specialty: "Tiefenentspannung & Aromatherapie",
    description: "Anna kreiert mit ihrer einfühlsamen Art eine Atmosphäre der Geborgenheit. Ihre sanften Techniken führen zu tiefster Entspannung.",
    traits: ["calm", "gentle", "silent", "relaxation"],
  },
  {
    id: "luca",
    name: "Luca",
    image: teamLuca,
    specialty: "Deep Tissue & Sportwellness",
    description: "Luca verbindet Kraft mit Präzision. Ideal für alle, die intensive Tiefenmassagen schätzen und Verspannungen gezielt lösen möchten.",
    traits: ["energizing", "deep", "minimal", "tension"],
  },
  {
    id: "morris",
    name: "Morris",
    image: teamMorris,
    specialty: "Ganzheitliche Balance",
    description: "Morris findet die perfekte Balance zwischen Entspannung und Aktivierung. Er geht intuitiv auf individuelle Bedürfnisse ein.",
    traits: ["warm", "medium", "open", "balance"],
  },
];

export const TherapistMatcher = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [matchedTherapist, setMatchedTherapist] = useState<TherapistProfile | null>(null);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      calculateMatch(newAnswers);
    }
  };

  const calculateMatch = (finalAnswers: Record<string, string>) => {
    const answerValues = Object.values(finalAnswers);
    
    const scoredTherapists = therapists.map(therapist => {
      const matchCount = answerValues.filter(answer => 
        therapist.traits.includes(answer)
      ).length;
      return {
        ...therapist,
        matchScore: Math.round((matchCount / questions.length) * 100),
      };
    });

    scoredTherapists.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    setMatchedTherapist(scoredTherapists[0]);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setMatchedTherapist(null);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 rounded-2xl bg-copper/10 flex items-center justify-center mx-auto mb-4"
            >
              <Heart className="w-8 h-8 text-copper" />
            </motion.div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Finden Sie Ihre:n ideale:n <span className="text-gradient-copper">Therapeut:in</span>
            </h2>
            <p className="text-muted-foreground">
              Beantworten Sie 4 kurze Fragen für Ihre persönliche Empfehlung
            </p>
          </div>

          {/* Quiz Card */}
          <div className="glass rounded-3xl p-8 border border-border/50">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={`question-${currentStep}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Progress */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Frage {currentStep + 1} von {questions.length}
                      </span>
                      <span className="text-sm font-medium text-copper">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-copper rounded-full"
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center">
                        <currentQuestion.icon className="w-5 h-5 text-copper" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {currentQuestion.question}
                      </h3>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleAnswer(option.value)}
                        className={`w-full p-4 rounded-xl border text-left transition-all hover:border-copper/50 hover:bg-copper/5 ${
                          answers[currentQuestion.id] === option.value
                            ? "border-copper bg-copper/10"
                            : "border-border/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">{option.label}</p>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                          {answers[currentQuestion.id] === option.value && (
                            <Check className="w-5 h-5 text-copper" />
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Navigation */}
                  {currentStep > 0 && (
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="mt-6 gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Zurück
                    </Button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  {matchedTherapist && (
                    <>
                      {/* Match Score */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="mb-6"
                      >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/30">
                          <Sparkles className="w-4 h-4 text-copper" />
                          <span className="text-sm font-medium text-copper">
                            {matchedTherapist.matchScore}% Match
                          </span>
                        </div>
                      </motion.div>

                      {/* Therapist Card */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                      >
                        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-copper/30">
                          <LazyImage
                            src={matchedTherapist.image}
                            alt={matchedTherapist.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                          {matchedTherapist.name}
                        </h3>
                        <p className="text-copper font-medium mb-4">
                          {matchedTherapist.specialty}
                        </p>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          {matchedTherapist.description}
                        </p>
                      </motion.div>

                      {/* Actions */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3"
                      >
                        <Button variant="copper" size="lg" asChild>
                          <Link to={`/buchung?therapist=${matchedTherapist.id}`}>
                            Mit {matchedTherapist.name} buchen
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                        <Button variant="outline" onClick={resetQuiz}>
                          Nochmal versuchen
                        </Button>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
