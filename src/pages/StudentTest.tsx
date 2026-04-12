import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Send, Sparkles, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getQuestionsForSubject, calculateScore, getLearningStyleFromAnswers, getTotalTechnical, subjects, Subject } from "@/lib/questions";
import { api } from "@/lib/api";
import { LearningStyle } from "@/lib/types";
import Layout from "@/components/Layout";

const styleColors: Record<LearningStyle, string> = {
  Visuel: "from-info to-primary",
  Auditif: "from-accent to-destructive",
  "Kinesthésique": "from-success to-secondary",
};

const styleEmoji: Record<LearningStyle, string> = {
  Visuel: "👁️",
  Auditif: "👂",
  "Kinesthésique": "🤲",
};

const StudentTest = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const questions = useMemo(() => selectedSubject ? getQuestionsForSubject(selectedSubject) : [], [selectedSubject]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [style, setStyle] = useState<LearningStyle>("Visuel");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    const qs = getQuestionsForSubject(subject);
    setAnswers(new Array(qs.length).fill(null));
  };

  const allAnswered = answers.length > 0 && answers.every((a) => a !== null) && firstName.trim() && lastName.trim();
  const totalTech = getTotalTechnical(questions);

  const selectAnswer = (qIndex: number, optionIndex: number) => {
    if (submitted) return;
    const next = [...answers];
    next[qIndex] = optionIndex;
    setAnswers(next);
  };

  const handleSubmit = async () => {
    if (!allAnswered || isSubmitting) return;
    setIsSubmitting(true);
    const sc = calculateScore(questions, answers);
    const ls = getLearningStyleFromAnswers(questions, answers);
    setScore(sc);
    setStyle(ls);

    await api.submitTest({
      id: crypto.randomUUID(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      score: sc,
      totalQuestions: totalTech,
      learningStyle: ls,
      answers: answers as number[],
      submittedAt: new Date().toISOString(),
    });

    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedSubject(null);
    setAnswers([]);
    setFirstName("");
    setLastName("");
  };

  if (submitted) {
    const pct = Math.round((score / totalTech) * 100);
    return (
      <Layout>
        <div className="container py-12 max-w-2xl">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card rounded-2xl shadow-elevated p-8 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="w-24 h-24 mx-auto rounded-full gradient-primary flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-primary-foreground" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Bravo {firstName} ! 🎉</h1>
            <p className="text-muted-foreground mb-1">Matière : <span className="font-semibold text-foreground">{selectedSubject}</span></p>
            <p className="text-muted-foreground mb-6">Voici tes résultats</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-muted rounded-xl p-4">
                <p className="text-sm text-muted-foreground">Score</p>
                <p className="text-3xl font-bold text-primary">{score}/{totalTech}</p>
                <p className="text-sm font-semibold text-muted-foreground">{pct}%</p>
              </div>
              <div className={`rounded-xl p-4 bg-gradient-to-br ${styleColors[style]} text-primary-foreground`}>
                <p className="text-sm opacity-90">Style dominant</p>
                <p className="text-2xl font-bold">{styleEmoji[style]}</p>
                <p className="text-sm font-bold">{style}</p>
              </div>
            </div>

            <Button variant="outline" onClick={handleReset}>Refaire le test</Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  // Subject selection screen
  if (!selectedSubject) {
    return (
      <Layout>
        <div className="container py-12 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gradient mb-2">Test de connaissances</h1>
            <p className="text-muted-foreground text-lg">Choisis ta matière pour commencer</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((s, i) => (
              <motion.button
                key={s.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelectSubject(s.value)}
                className="bg-card rounded-2xl shadow-card p-8 text-center border-2 border-transparent hover:border-primary/40 transition-colors"
              >
                <span className="text-5xl mb-4 block">{s.icon}</span>
                <span className="font-display font-bold text-lg text-foreground">{s.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-3">
            <BookOpen className="w-4 h-4" />
            {selectedSubject}
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Test de connaissances</h1>
          <p className="text-muted-foreground">Réponds aux questions et découvre ton style d'apprentissage</p>
          <Button variant="ghost" size="sm" className="mt-2" onClick={() => { setSelectedSubject(null); setAnswers([]); }}>
            ← Changer de matière
          </Button>
        </motion.div>

        {/* Name inputs */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl shadow-card p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Identité</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <Input placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
        </motion.div>

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((q, qIdx) => (
            <motion.div key={q.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * qIdx }} className="bg-card rounded-2xl shadow-card p-6">
              <p className="font-semibold mb-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full gradient-primary text-primary-foreground text-xs font-bold mr-2">
                  {qIdx + 1}
                </span>
                {q.text}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, oIdx) => {
                  const selected = answers[qIdx] === oIdx;
                  const isTechnical = q.correctIndex !== -1;
                  let optionClass = "border-border bg-muted/50 hover:border-primary/40";
                  if (selected && isTechnical) {
                    optionClass = oIdx === q.correctIndex
                      ? "border-success bg-success/10 text-success"
                      : "border-destructive bg-destructive/10 text-destructive";
                  } else if (selected) {
                    optionClass = "border-primary bg-primary/10 text-primary";
                  }
                  return (
                    <motion.button key={oIdx} whileTap={{ scale: 0.97 }} onClick={() => selectAnswer(qIdx, oIdx)} className={`flex items-center gap-2 p-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${optionClass}`}>
                      {selected && isTechnical && oIdx === q.correctIndex && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                      {selected && isTechnical && oIdx !== q.correctIndex && <XCircle className="w-4 h-4 shrink-0" />}
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 text-center">
          <Button size="lg" disabled={!allAnswered || isSubmitting} onClick={handleSubmit} className="gradient-primary text-primary-foreground hover:opacity-90 px-8 rounded-xl text-base font-bold">
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? "Envoi..." : "Soumettre le test"}
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default StudentTest;
