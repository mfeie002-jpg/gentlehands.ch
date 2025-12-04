import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowLeft, Sparkles, Heart, Moon, Zap, Mountain, Waves, Leaf, Building } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Wie fühlen Sie sich gerade?",
    options: [
      { id: "stressed", label: "Gestresst & überfordert", icon: Zap },
      { id: "tired", label: "Erschöpft & müde", icon: Moon },
      { id: "restless", label: "Unruhig & rastlos", icon: Sparkles },
      { id: "blocked", label: "Verspannt & blockiert", icon: Mountain },
    ],
  },
  {
    id: 2,
    question: "Was wünschen Sie sich am meisten?",
    options: [
      { id: "release", label: "Körperlich loslassen", icon: Heart },
      { id: "calm", label: "Mentale Ruhe finden", icon: Moon },
      { id: "energy", label: "Neue Energie tanken", icon: Zap },
      { id: "grounding", label: "Wieder bei mir ankommen", icon: Mountain },
    ],
  },
  {
    id: 3,
    question: "Welche Atmosphäre spricht Sie an?",
    options: [
      { id: "ocean", label: "Warm & tropisch", icon: Waves },
      { id: "alpine", label: "Geborgen & natürlich", icon: Mountain },
      { id: "dark", label: "Dunkel & geschützt", icon: Moon },
      { id: "zen", label: "Minimalistisch & ruhig", icon: Leaf },
      { id: "urban", label: "Modern & stylish", icon: Building },
    ],
  },
  {
    id: 4,
    question: "Wie viel Zeit möchten Sie sich gönnen?",
    options: [
      { id: "short", label: "60 Minuten – kompakt aber wirkungsvoll" },
      { id: "medium", label: "90 Minuten – ausreichend Zeit zum Ankommen" },
      { id: "long", label: "120 Minuten – das volle Erlebnis" },
    ],
  },
  {
    id: 5,
    question: "Wie intensiv darf die Massage sein?",
    options: [
      { id: "soft", label: "Sehr sanft – ich möchte nur gehalten werden" },
      { id: "medium", label: "Mittel – spürbar aber angenehm" },
      { id: "deep", label: "Tief – ich habe starke Verspannungen" },
    ],
  },
];

const results = {
  "stressed-release-ocean-medium-medium": {
    massage: "Deep Release Session",
    theme: "Ozean & Palmen",
    duration: "90 Min",
    description: "Für Sie empfehlen wir eine Deep Release Session im Ozean-Theme. Die warme, tropische Atmosphäre kombiniert mit einer spürbaren Massage hilft Ihrem gestressten Körper, endlich loszulassen.",
  },
  default: {
    massage: "Signature Experience",
    theme: "Surprise Experience",
    duration: "90 Min",
    description: "Basierend auf Ihren Antworten empfehlen wir Ihnen unser Signature-Erlebnis mit einer Überraschungs-Atmosphäre. Lassen Sie sich von uns überraschen – wir gestalten Ihr perfektes Erlebnis intuitiv.",
  },
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answerId: string) => {
    const newAnswers = { ...answers, [currentQuestion]: answerId };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion((prev) => prev + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const result = results.default;

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Layout>
      <Helmet>
        <title>Finden Sie Ihr Erlebnis | GentleHands Zürich</title>
        <meta
          name="description"
          content="Entdecken Sie in wenigen Fragen, welches GentleHands-Erlebnis perfekt zu Ihnen passt."
        />
      </Helmet>

      <section className="pt-32 pb-20 min-h-screen">
        <div className="container-narrow">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress */}
                <div className="mb-12">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Frage {currentQuestion + 1} von {questions.length}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-copper rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="text-center mb-12">
                  <h1 className="text-foreground text-3xl md:text-4xl mb-4">
                    {questions[currentQuestion].question}
                  </h1>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {questions[currentQuestion].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(option.id)}
                      className={`p-6 rounded-2xl border-2 text-left transition-all hover:-translate-y-1 ${
                        answers[currentQuestion] === option.id
                          ? "border-copper bg-copper/5"
                          : "border-border hover:border-copper/50 bg-card"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {option.icon && (
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <option.icon size={24} className="text-primary" />
                          </div>
                        )}
                        <span className="font-medium text-foreground">
                          {option.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                {currentQuestion > 0 && (
                  <div className="text-center mt-8">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentQuestion((prev) => prev - 1)}
                    >
                      <ArrowLeft size={16} />
                      Zurück
                    </Button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-copper/20 flex items-center justify-center mx-auto mb-8">
                  <Sparkles size={48} className="text-copper" />
                </div>

                <h1 className="text-foreground mb-4">
                  Ihr perfektes Erlebnis
                </h1>

                <div className="card-elevated p-8 md:p-12 max-w-xl mx-auto mb-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Massage</p>
                      <p className="font-display text-2xl text-foreground">
                        {result.massage}
                      </p>
                    </div>
                    <div className="w-16 h-px bg-border mx-auto" />
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Theme</p>
                      <p className="font-display text-2xl text-copper">
                        {result.theme}
                      </p>
                    </div>
                    <div className="w-16 h-px bg-border mx-auto" />
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Empfohlene Dauer</p>
                      <p className="font-display text-xl text-foreground">
                        {result.duration}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mt-8">
                    {result.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="copper" size="lg" asChild>
                    <Link to={`/buchung?massage=${result.massage}&theme=${result.theme}`}>
                      Dieses Erlebnis buchen
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentQuestion(0);
                      setAnswers({});
                      setShowResult(false);
                    }}
                  >
                    Quiz wiederholen
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Quiz;
