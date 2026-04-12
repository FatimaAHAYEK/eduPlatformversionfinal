import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Trophy, Eye, Ear, Hand } from "lucide-react";
import { api } from "@/lib/api";
import { StudentResult, LearningStyle } from "@/lib/types";
import Layout from "@/components/Layout";

const styleIcons: Record<LearningStyle, typeof Eye> = {
  Visuel: Eye,
  Auditif: Ear,
  "Kinesthésique": Hand,
};

const styleBadgeClass: Record<LearningStyle, string> = {
  Visuel: "bg-info/15 text-info",
  Auditif: "bg-accent/15 text-accent-foreground",
  "Kinesthésique": "bg-success/15 text-success",
};

const Dashboard = () => {
  const [results, setResults] = useState<StudentResult[]>([]);

  const loadResults = () => api.getResults().then(setResults);

  useEffect(() => {
    loadResults();
    const handler = () => loadResults();
    window.addEventListener("student-submitted", handler);
    return () => window.removeEventListener("student-submitted", handler);
  }, []);

  return (
    <Layout>
      <div className="container py-8 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-gradient">Dashboard Professeur</h1>
          </div>
          <p className="text-muted-foreground">Résultats des élèves en temps réel</p>
        </motion.div>

        {results.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-card rounded-2xl shadow-card">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-semibold text-muted-foreground">Aucun élève n'a encore soumis le test</p>
            <p className="text-sm text-muted-foreground">Les résultats apparaîtront ici en temps réel</p>
          </motion.div>
        ) : (
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-bold text-muted-foreground">#</th>
                    <th className="text-left p-4 text-sm font-bold text-muted-foreground">Prénom</th>
                    <th className="text-left p-4 text-sm font-bold text-muted-foreground">Nom</th>
                    <th className="text-left p-4 text-sm font-bold text-muted-foreground">Score</th>
                    <th className="text-left p-4 text-sm font-bold text-muted-foreground">Style</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {results.map((r, i) => {
                      const Icon = styleIcons[r.learningStyle];
                      const pct = Math.round((r.score / r.totalQuestions) * 100);
                      return (
                        <motion.tr
                          key={r.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`border-b border-border/50 ${i % 2 === 0 ? "bg-muted/30" : ""}`}
                        >
                          <td className="p-4 text-sm font-semibold text-muted-foreground">{i + 1}</td>
                          <td className="p-4 text-sm font-semibold">{r.firstName}</td>
                          <td className="p-4 text-sm">{r.lastName}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Trophy className="w-4 h-4 text-accent" />
                              <span className="text-sm font-bold">{r.score}/{r.totalQuestions}</span>
                              <span className="text-xs text-muted-foreground">({pct}%)</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${styleBadgeClass[r.learningStyle]}`}>
                              <Icon className="w-3 h-3" />
                              {r.learningStyle}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
