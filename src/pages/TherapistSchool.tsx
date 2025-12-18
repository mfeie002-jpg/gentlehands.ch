import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/shared/SEOHead";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  GraduationCap, BookOpen, CheckCircle, Clock, 
  Award, ChevronRight, Play, Lock, Star,
  ArrowLeft, ArrowRight, AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Training {
  id: string;
  massage_type_id: string;
  title: string;
  description: string;
  content: string;
  step_by_step_guide: { step: number; title: string; description: string; duration: string }[];
  duration_minutes: number;
  massage_types?: { name: string };
}

interface Quiz {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  display_order: number;
}

interface Certification {
  id: string;
  massage_type_id: string;
  passed: boolean;
  quiz_score: number;
  certified_at: string;
  attempts: number;
}

const TherapistSchool = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [therapistId, setTherapistId] = useState<string | null>(null);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: "Bitte melden Sie sich an", variant: "destructive" });
        navigate("/login");
        return;
      }

      // Get therapist profile
      const { data: therapist } = await supabase
        .from("therapists")
        .select("id, status")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!therapist || therapist.status !== "approved") {
        toast({ 
          title: "Zugriff verweigert", 
          description: "Nur freigegebene Therapeut:innen können auf die Schulung zugreifen.",
          variant: "destructive" 
        });
        navigate("/");
        return;
      }

      setTherapistId(therapist.id);

      // Load trainings with massage type names
      const { data: trainingsData } = await supabase
        .from("massage_trainings")
        .select("*, massage_types(name)")
        .eq("is_active", true)
        .order("display_order");

      // Parse JSON fields
      const parsedTrainings = (trainingsData || []).map(t => ({
        ...t,
        step_by_step_guide: typeof t.step_by_step_guide === 'string' 
          ? JSON.parse(t.step_by_step_guide) 
          : (t.step_by_step_guide || [])
      })) as Training[];

      setTrainings(parsedTrainings);

      // Load certifications
      const { data: certsData } = await supabase
        .from("therapist_certifications")
        .select("*")
        .eq("therapist_id", therapist.id);

      setCertifications(certsData || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadQuizzes = async (trainingId: string) => {
    const { data } = await supabase
      .from("training_quizzes")
      .select("*")
      .eq("training_id", trainingId)
      .order("display_order");
    
    // Parse JSON options
    const parsedQuizzes = (data || []).map(q => ({
      ...q,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : (q.options || [])
    })) as Quiz[];
    
    setQuizzes(parsedQuizzes);
  };

  const startTraining = async (training: Training) => {
    setSelectedTraining(training);
    await loadQuizzes(training.id);
    setQuizMode(false);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const startQuiz = () => {
    setQuizMode(true);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
  };

  const submitQuiz = async () => {
    if (!selectedTraining || !therapistId) return;

    const correctCount = quizzes.reduce((acc, quiz, index) => {
      return acc + (answers[index] === quiz.correct_answer ? 1 : 0);
    }, 0);

    const score = Math.round((correctCount / quizzes.length) * 100);
    const passed = score >= 80;

    // Upsert certification
    const { error } = await supabase
      .from("therapist_certifications")
      .upsert({
        therapist_id: therapistId,
        massage_type_id: selectedTraining.massage_type_id,
        training_id: selectedTraining.id,
        quiz_score: score,
        passed,
        certified_at: passed ? new Date().toISOString() : null,
        attempts: (certifications.find(c => c.massage_type_id === selectedTraining.massage_type_id)?.attempts || 0) + 1,
      }, {
        onConflict: "therapist_id,massage_type_id"
      });

    if (error) {
      toast({ title: "Fehler beim Speichern", variant: "destructive" });
      return;
    }

    setShowResults(true);

    if (passed) {
      toast({ 
        title: "Herzlichen Glückwunsch! 🎉", 
        description: `Sie haben die Zertifizierung mit ${score}% bestanden.` 
      });

      // Send certification notification email
      try {
        const { data: therapist } = await supabase
          .from("therapists")
          .select("email, name")
          .eq("id", therapistId)
          .single();

        if (therapist) {
          await supabase.functions.invoke("notify-certification", {
            body: {
              therapistEmail: therapist.email,
              therapistName: therapist.name,
              massageTypeName: selectedTraining.massage_types?.name || selectedTraining.title,
              quizScore: score
            }
          });
        }
      } catch (notifyError) {
        console.error("Failed to send certification notification:", notifyError);
      }
    } else {
      toast({ 
        title: "Nicht bestanden", 
        description: `Sie haben ${score}% erreicht. 80% werden benötigt. Versuchen Sie es erneut.`,
        variant: "destructive"
      });
    }

    // Refresh certifications
    const { data: certsData } = await supabase
      .from("therapist_certifications")
      .select("*")
      .eq("therapist_id", therapistId);
    
    setCertifications(certsData || []);
  };

  const getCertification = (massageTypeId: string) => {
    return certifications.find(c => c.massage_type_id === massageTypeId);
  };

  const completedCount = certifications.filter(c => c.passed).length;
  const overallProgress = trainings.length > 0 ? (completedCount / trainings.length) * 100 : 0;

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-copper border-t-transparent rounded-full" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title="Therapeuten-Schulung | GentleHands Academy"
        description="Interne Schulungsplattform für GentleHands Therapeut:innen"
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12 sm:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          {!selectedTraining ? (
            <>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 text-copper mb-6">
                  <GraduationCap size={18} />
                  <span className="text-sm font-medium">GentleHands Academy</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
                  Therapeuten-Schulung
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Absolvieren Sie unsere Schulungen und Quizze, um Zertifizierungen 
                  für verschiedene Massagetypen zu erhalten.
                </p>
              </motion.div>

              {/* Progress Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 mb-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Ihr Fortschritt</h2>
                    <p className="text-sm text-muted-foreground">
                      {completedCount} von {trainings.length} Zertifizierungen abgeschlossen
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-copper" />
                    <span className="text-xl font-bold text-copper">{Math.round(overallProgress)}%</span>
                  </div>
                </div>
                <Progress value={overallProgress} className="h-3" />
              </motion.div>

              {/* Training Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {trainings.map((training, index) => {
                  const cert = getCertification(training.massage_type_id);
                  const isPassed = cert?.passed;
                  
                  return (
                    <motion.div
                      key={training.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className={`h-full cursor-pointer transition-all hover:shadow-lg ${
                        isPassed ? "border-emerald-500/50 bg-emerald-500/5" : "hover:border-copper/50"
                      }`} onClick={() => startTraining(training)}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                isPassed ? "bg-emerald-500/20" : "bg-copper/10"
                              }`}>
                                {isPassed ? (
                                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                                ) : (
                                  <BookOpen className="w-6 h-6 text-copper" />
                                )}
                              </div>
                              <div>
                                <CardTitle className="text-lg">{training.title}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                  {training.massage_types?.name}
                                </p>
                              </div>
                            </div>
                            {isPassed && (
                              <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30">
                                Zertifiziert
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {training.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {training.duration_minutes} Min
                              </span>
                              {cert && (
                                <span className="flex items-center gap-1">
                                  <Star size={14} className="text-amber-500" />
                                  {cert.quiz_score}%
                                </span>
                              )}
                            </div>
                            <Button variant="ghost" size="sm" className="text-copper">
                              {isPassed ? "Wiederholen" : "Starten"}
                              <ChevronRight size={16} className="ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {/* Training Content View */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-4xl mx-auto"
              >
                <Button
                  variant="ghost"
                  onClick={() => setSelectedTraining(null)}
                  className="mb-6"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Zurück zur Übersicht
                </Button>

                {!quizMode && !showResults ? (
                  <div className="space-y-8">
                    {/* Training Header */}
                    <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-copper/10 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-copper" />
                        </div>
                        <div>
                          <h1 className="text-2xl font-display text-foreground">
                            {selectedTraining.title}
                          </h1>
                          <p className="text-muted-foreground">
                            {selectedTraining.massage_types?.name}
                          </p>
                        </div>
                      </div>

                      {/* Video Section Placeholder */}
                      <div className="mb-8 p-6 rounded-xl bg-secondary/50 border border-border">
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-muted flex items-center justify-center">
                            <Play className="w-10 h-10 text-muted-foreground/50" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">Video-Tutorial</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              Das Video-Tutorial für diese Schulung wird in Kürze verfügbar sein.
                            </p>
                            <Badge variant="outline" className="text-amber-600 border-amber-600/30">
                              <Clock size={12} className="mr-1" />
                              Kommt bald
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        {selectedTraining.content.split("\n").map((line, i) => {
                          if (line.startsWith("## ")) {
                            return <h2 key={i} className="text-xl font-display mt-6 mb-3">{line.replace("## ", "")}</h2>;
                          } else if (line.startsWith("### ")) {
                            return <h3 key={i} className="text-lg font-semibold mt-4 mb-2">{line.replace("### ", "")}</h3>;
                          } else if (line.startsWith("- ")) {
                            return <li key={i} className="ml-4">{line.replace("- ", "")}</li>;
                          } else if (line.startsWith("| ")) {
                            return null; // Skip table syntax for now
                          } else if (line.trim()) {
                            return <p key={i} className="text-muted-foreground">{line}</p>;
                          }
                          return null;
                        })}
                      </div>
                    </div>

                    {/* Step by Step Guide */}
                    {selectedTraining.step_by_step_guide && selectedTraining.step_by_step_guide.length > 0 && (
                      <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
                        <h2 className="text-xl font-display text-foreground mb-6 flex items-center gap-2">
                          <Play size={20} className="text-copper" />
                          Schritt-für-Schritt Anleitung
                        </h2>
                        <div className="space-y-4">
                          {selectedTraining.step_by_step_guide.map((step, index) => (
                            <motion.div
                              key={step.step}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex gap-4 p-4 rounded-xl bg-secondary/50"
                            >
                              <div className="w-10 h-10 rounded-full bg-copper/20 text-copper flex items-center justify-center font-bold shrink-0">
                                {step.step}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                                  <span className="text-xs text-muted-foreground">{step.duration}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Start Quiz Button */}
                    <div className="text-center">
                      <Button size="lg" onClick={startQuiz} className="min-w-[200px]">
                        <GraduationCap size={18} className="mr-2" />
                        Quiz starten
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        Sie benötigen mindestens 80% um zu bestehen
                      </p>
                    </div>
                  </div>
                ) : showResults ? (
                  /* Quiz Results */
                  <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 text-center">
                    <div className="max-w-md mx-auto">
                      {(() => {
                        const correctCount = quizzes.reduce((acc, quiz, index) => {
                          return acc + (answers[index] === quiz.correct_answer ? 1 : 0);
                        }, 0);
                        const score = Math.round((correctCount / quizzes.length) * 100);
                        const passed = score >= 80;

                        return (
                          <>
                            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
                              passed ? "bg-emerald-500/20" : "bg-destructive/20"
                            }`}>
                              {passed ? (
                                <CheckCircle className="w-12 h-12 text-emerald-500" />
                              ) : (
                                <AlertCircle className="w-12 h-12 text-destructive" />
                              )}
                            </div>
                            
                            <h2 className="text-2xl font-display text-foreground mb-2">
                              {passed ? "Bestanden! 🎉" : "Nicht bestanden"}
                            </h2>
                            
                            <p className="text-4xl font-bold text-foreground mb-2">{score}%</p>
                            <p className="text-muted-foreground mb-6">
                              {correctCount} von {quizzes.length} Fragen richtig
                            </p>

                            {/* Show answers */}
                            <div className="text-left space-y-3 mb-6">
                              {quizzes.map((quiz, index) => (
                                <div key={quiz.id} className={`p-3 rounded-lg ${
                                  answers[index] === quiz.correct_answer 
                                    ? "bg-emerald-500/10 border border-emerald-500/30" 
                                    : "bg-destructive/10 border border-destructive/30"
                                }`}>
                                  <p className="text-sm font-medium">{quiz.question}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {quiz.explanation}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div className="flex gap-3 justify-center">
                              <Button variant="outline" onClick={() => setSelectedTraining(null)}>
                                Zur Übersicht
                              </Button>
                              {!passed && (
                                <Button onClick={startQuiz}>
                                  Erneut versuchen
                                </Button>
                              )}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                ) : (
                  /* Quiz Mode */
                  <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
                    <div className="max-w-2xl mx-auto">
                      {/* Progress */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">
                            Frage {currentQuestion + 1} von {quizzes.length}
                          </span>
                          <span className="text-sm font-medium text-copper">
                            {Math.round(((currentQuestion + 1) / quizzes.length) * 100)}%
                          </span>
                        </div>
                        <Progress value={((currentQuestion + 1) / quizzes.length) * 100} className="h-2" />
                      </div>

                      {quizzes[currentQuestion] && (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                          >
                            <h2 className="text-xl font-display text-foreground mb-6">
                              {quizzes[currentQuestion].question}
                            </h2>

                            <RadioGroup
                              value={answers[currentQuestion]?.toString()}
                              onValueChange={(v) => handleAnswer(currentQuestion, parseInt(v))}
                              className="space-y-3"
                            >
                              {quizzes[currentQuestion].options.map((option, optIndex) => (
                                <div
                                  key={optIndex}
                                  className={`flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer ${
                                    answers[currentQuestion] === optIndex
                                      ? "border-copper bg-copper/5"
                                      : "border-border hover:border-copper/50"
                                  }`}
                                  onClick={() => handleAnswer(currentQuestion, optIndex)}
                                >
                                  <RadioGroupItem value={optIndex.toString()} id={`opt-${optIndex}`} />
                                  <Label htmlFor={`opt-${optIndex}`} className="flex-1 cursor-pointer">
                                    {option}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </motion.div>
                        </AnimatePresence>
                      )}

                      {/* Navigation */}
                      <div className="flex justify-between mt-8">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                          disabled={currentQuestion === 0}
                        >
                          <ArrowLeft size={16} className="mr-2" />
                          Zurück
                        </Button>

                        {currentQuestion < quizzes.length - 1 ? (
                          <Button
                            onClick={() => setCurrentQuestion(currentQuestion + 1)}
                            disabled={answers[currentQuestion] === undefined}
                          >
                            Weiter
                            <ArrowRight size={16} className="ml-2" />
                          </Button>
                        ) : (
                          <Button
                            onClick={submitQuiz}
                            disabled={Object.keys(answers).length < quizzes.length}
                          >
                            Quiz abschliessen
                            <CheckCircle size={16} className="ml-2" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TherapistSchool;
