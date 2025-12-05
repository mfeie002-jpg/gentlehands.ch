import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowLeft, Sparkles, Heart, Moon, Zap, Mountain, Waves, Leaf, Building, RotateCcw, Check } from "lucide-react";
import confetti from "canvas-confetti";

const questions = [
  {
    id: 1,
    question: "Wie fühlen Sie sich gerade?",
    subtitle: "Seien Sie ehrlich mit sich selbst",
    options: [
      { id: "stressed", label: "Gestresst & überfordert", icon: Zap, description: "Der Alltag drückt", color: "from-red-500/20 to-orange-500/20" },
      { id: "tired", label: "Erschöpft & müde", icon: Moon, description: "Energie ist aufgebraucht", color: "from-indigo-500/20 to-purple-500/20" },
      { id: "restless", label: "Unruhig & rastlos", icon: Sparkles, description: "Gedanken kreisen", color: "from-amber-500/20 to-yellow-500/20" },
      { id: "blocked", label: "Verspannt & blockiert", icon: Mountain, description: "Körperlich angespannt", color: "from-slate-500/20 to-zinc-500/20" },
    ],
  },
  {
    id: 2,
    question: "Was wünschen Sie sich am meisten?",
    subtitle: "Was braucht Ihre Seele?",
    options: [
      { id: "release", label: "Körperlich loslassen", icon: Heart, description: "Tiefe Entspannung", color: "from-rose-500/20 to-pink-500/20" },
      { id: "calm", label: "Mentale Ruhe finden", icon: Moon, description: "Gedanken beruhigen", color: "from-blue-500/20 to-cyan-500/20" },
      { id: "energy", label: "Neue Energie tanken", icon: Zap, description: "Kraft zurückgewinnen", color: "from-yellow-500/20 to-amber-500/20" },
      { id: "grounding", label: "Wieder bei mir ankommen", icon: Mountain, description: "Im Körper landen", color: "from-emerald-500/20 to-green-500/20" },
    ],
  },
  {
    id: 3,
    question: "Welche Atmosphäre spricht Sie an?",
    subtitle: "Folgen Sie Ihrer Intuition",
    options: [
      { id: "ocean", label: "Warm & tropisch", icon: Waves, description: "Ozean & Palmen", color: "from-cyan-500/20 to-blue-500/20" },
      { id: "alpine", label: "Geborgen & natürlich", icon: Mountain, description: "Alpine Stille", color: "from-emerald-500/20 to-teal-500/20" },
      { id: "dark", label: "Dunkel & geschützt", icon: Moon, description: "Deep Dark Relax", color: "from-slate-700/30 to-zinc-800/30" },
      { id: "zen", label: "Minimalistisch & ruhig", icon: Leaf, description: "Zen Garden", color: "from-lime-500/20 to-green-500/20" },
      { id: "urban", label: "Modern & stylish", icon: Building, description: "Urban Loft", color: "from-zinc-500/20 to-slate-500/20" },
    ],
  },
  {
    id: 4,
    question: "Wie viel Zeit möchten Sie sich gönnen?",
    subtitle: "Nehmen Sie sich, was Sie brauchen",
    options: [
      { id: "short", label: "60 Minuten", description: "Kompakt aber wirkungsvoll", color: "from-primary/20 to-primary/10" },
      { id: "medium", label: "90 Minuten", description: "Ausreichend Zeit zum Ankommen", color: "from-copper/20 to-copper/10" },
      { id: "long", label: "120 Minuten", description: "Das volle Erlebnis", color: "from-forest/20 to-forest/10" },
    ],
  },
  {
    id: 5,
    question: "Wie intensiv darf die Massage sein?",
    subtitle: "Es gibt kein Richtig oder Falsch",
    options: [
      { id: "soft", label: "Sehr sanft", description: "Ich möchte nur gehalten werden", color: "from-pink-500/20 to-rose-500/20" },
      { id: "medium", label: "Mittel", description: "Spürbar aber angenehm", color: "from-amber-500/20 to-orange-500/20" },
      { id: "deep", label: "Tief", description: "Ich habe starke Verspannungen", color: "from-red-500/20 to-rose-500/20" },
    ],
  },
];

const getResult = (answers: Record<number, string>) => {
  const themeMap: Record<string, string> = {
    ocean: "Ozean & Palmen",
    alpine: "Alpine Stille",
    dark: "Deep Dark Relax",
    zen: "Zen Garden",
    urban: "Urban Loft",
  };

  const durationMap: Record<string, string> = {
    short: "60 Min",
    medium: "90 Min",
    long: "120 Min",
  };

  const massageMap: Record<string, string> = {
    "stressed-release": "Deep Release Session",
    "stressed-calm": "Stress Reset",
    "tired-release": "Ganzkörper Tiefenentspannung",
    "tired-calm": "Emotional Grounding",
    "restless-calm": "Emotional Grounding",
    "restless-grounding": "Emotional Grounding",
    "blocked-release": "Deep Release Session",
    "blocked-energy": "Stress Reset",
  };

  const feeling = answers[0];
  const wish = answers[1];
  const theme = answers[2];
  const duration = answers[3];
  
  const massageKey = `${feeling}-${wish}`;
  const massage = massageMap[massageKey] || "Signature Experience";

  return {
    massage,
    theme: themeMap[theme] || "Surprise Experience",
    duration: durationMap[duration] || "90 Min",
    description: `Basierend auf Ihren Antworten empfehlen wir Ihnen ein ${massage} im ${themeMap[theme] || 'Surprise'}-Theme. Die ${durationMap[duration] || '90 Min'} geben Ihnen genug Zeit, vollständig anzukommen und loszulassen.`,
  };
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (answerId: string) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newAnswers = { ...answers, [currentQuestion]: answerId };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setShowResult(true);
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B57850', '#2A5A5A', '#3D6B5E']
        });
      }
      setIsTransitioning(false);
    }, 300);
  };

  const result = getResult(answers);
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  return (
    <Layout>
      <Helmet>
        <title>Finden Sie Ihr Erlebnis | GentleHands Zürich</title>
        <meta name="description" content="Entdecken Sie in wenigen Fragen, welches GentleHands-Erlebnis perfekt zu Ihnen passt." />
      </Helmet>

      <section className="pt-32 pb-20 min-h-screen relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/4 -right-32 w-96 h-96 bg-copper/10 rounded-full blur-[120px]"
            animate={{ 
              scale: [1, 1.2, 1], 
              x: [0, 50, 0],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
            animate={{ 
              scale: [1.2, 1, 1.2], 
              x: [0, -50, 0],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 5 }}
          />
        </div>

        <div className="container-narrow relative z-10">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {/* Progress */}
                <div className="mb-12">
                  <div className="flex justify-between text-sm text-muted-foreground mb-3">
                    <span className="font-medium">Frage {currentQuestion + 1} von {questions.length}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden relative">
                    <motion.div
                      className="h-full bg-gradient-to-r from-copper to-copper-light rounded-full"
                      initial={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: [-80, 400] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </div>
                  
                  {/* Progress dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {questions.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i < currentQuestion 
                            ? 'bg-copper' 
                            : i === currentQuestion 
                              ? 'bg-copper/60' 
                              : 'bg-secondary'
                        }`}
                        animate={i === currentQuestion ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 0.5, repeat: i === currentQuestion ? Infinity : 0, repeatDelay: 1 }}
                      />
                    ))}
                  </div>
                </div>

                {/* Question */}
                <motion.div 
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-foreground text-3xl md:text-4xl mb-3">
                    {questions[currentQuestion].question}
                  </h1>
                  <p className="text-muted-foreground">
                    {questions[currentQuestion].subtitle}
                  </p>
                </motion.div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handleAnswer(option.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isTransitioning}
                      className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
                        answers[currentQuestion] === option.id
                          ? "border-copper bg-copper/5 shadow-lg shadow-copper/20"
                          : "border-border hover:border-copper/50 bg-card hover:shadow-lg"
                      }`}
                    >
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 hover:opacity-100 transition-opacity`} />
                      
                      <div className="flex items-center gap-4 relative z-10">
                        {option.icon && (
                          <motion.div 
                            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                              answers[currentQuestion] === option.id 
                                ? 'bg-copper text-accent-foreground' 
                                : 'bg-primary/10'
                            }`}
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <option.icon size={24} className={answers[currentQuestion] === option.id ? '' : 'text-primary'} />
                          </motion.div>
                        )}
                        <div>
                          <span className="font-medium text-foreground block">{option.label}</span>
                          {option.description && (
                            <span className="text-sm text-muted-foreground">{option.description}</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Selection indicator */}
                      {answers[currentQuestion] === option.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-copper flex items-center justify-center"
                        >
                          <Check size={14} className="text-accent-foreground" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Navigation */}
                {currentQuestion > 0 && (
                  <motion.div 
                    className="text-center mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentQuestion((prev) => prev - 1)}
                      className="group"
                    >
                      <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
                      Zurück
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="text-center"
              >
                {/* Success icon */}
                <motion.div 
                  className="w-24 h-24 rounded-full bg-copper/20 flex items-center justify-center mx-auto mb-8 relative"
                  animate={{ boxShadow: ['0 0 0 0 rgba(181, 120, 80, 0.4)', '0 0 0 20px rgba(181, 120, 80, 0)', '0 0 0 0 rgba(181, 120, 80, 0)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <Sparkles size={48} className="text-copper" />
                  </motion.div>
                </motion.div>

                <motion.h1 
                  className="text-foreground mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Ihr perfektes <span className="text-gradient-copper">Erlebnis</span>
                </motion.h1>

                <motion.div 
                  className="card-elevated p-8 md:p-12 max-w-xl mx-auto mb-8 relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-copper/10 to-transparent" />
                  
                  <div className="space-y-6 relative z-10">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-muted-foreground text-sm mb-1">Massage</p>
                      <p className="font-display text-2xl text-foreground">{result.massage}</p>
                    </motion.div>
                    
                    <div className="w-16 h-px bg-gradient-to-r from-copper/50 to-transparent mx-auto" />
                    
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-muted-foreground text-sm mb-1">Theme</p>
                      <p className="font-display text-2xl text-copper">{result.theme}</p>
                    </motion.div>
                    
                    <div className="w-16 h-px bg-gradient-to-r from-copper/50 to-transparent mx-auto" />
                    
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <p className="text-muted-foreground text-sm mb-1">Empfohlene Dauer</p>
                      <p className="font-display text-xl text-foreground">{result.duration}</p>
                    </motion.div>
                  </div>

                  <motion.p 
                    className="text-muted-foreground mt-8 text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {result.description}
                  </motion.p>
                </motion.div>

                <motion.div 
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="copper" size="lg" asChild className="group">
                      <Link to={`/buchung?massage=${encodeURIComponent(result.massage)}&theme=${encodeURIComponent(result.theme)}`}>
                        Dieses Erlebnis buchen
                        <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" onClick={resetQuiz} className="group">
                      <RotateCcw size={16} className="mr-2 transition-transform group-hover:-rotate-180" />
                      Quiz wiederholen
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Quiz;