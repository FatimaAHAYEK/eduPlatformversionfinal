import { useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Bot, Sparkles, Users, Loader2, Save, Eye, Ear, Hand, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { StudentResult, LearningStyle } from "@/lib/types";
import Layout from "@/components/Layout";

const styleEmoji: Record<LearningStyle, string> = { Visuel: "👁️", Auditif: "👂", "Kinesthésique": "🤲" };
const styleBadge: Record<LearningStyle, string> = {
  Visuel: "bg-info/15 text-info",
  Auditif: "bg-accent/15 text-accent-foreground",
  "Kinesthésique": "bg-success/15 text-success",
};

interface Group {
  name: string;
  criteria: string;
  students: StudentResult[];
}

const AIAssistant = () => {
  // Liste des élèves
  const [students, setStudents] = useState<StudentResult[]>([]);
  // Activités générées
  const [activities, setActivities] = useState<Record<string, string[]>>({});
  // Groupes d’élèves
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [saved, setSaved] = useState(false);
// récupère les élèves
  useEffect(() => {
    api.getResults().then(setStudents);
  }, []);

  const generate = async () => {
    if (students.length === 0) return;
    setLoading(true);
    setSaved(false);
    const res = await api.getAISuggestions(students);
    setActivities(res.activities);
    setGroups(
      res.groups.map((g) => ({
        ...g,
        students: g.studentIds.map((id) => students.find((s) => s.id === id)!).filter(Boolean),
      }))
    );
    setGenerated(true);
    setLoading(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Layout>
      <div className="container py-8 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-secondary flex items-center justify-center">
              <Bot className="w-5 h-5 text-secondary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-gradient">AI Assistant</h1>
          </div>
          <p className="text-muted-foreground">Suggestions personnalisées et regroupement intelligent des élèves</p>
        </motion.div>

        {students.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl shadow-card">
            <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-semibold text-muted-foreground">Aucune donnée élève disponible</p>
            <p className="text-sm text-muted-foreground">Les élèves doivent d'abord soumettre le test</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex gap-3">
              <Button onClick={generate} disabled={loading} className="gradient-primary text-primary-foreground hover:opacity-90 rounded-xl font-bold">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                {loading ? "Génération..." : "Générer les suggestions"}
              </Button>
              {generated && (
                <Button onClick={handleSave} variant="outline" className="rounded-xl font-bold">
                  <Save className="w-4 h-4 mr-2" />
                  {saved ? "✓ Enregistré" : "Enregistrer"}
                </Button>
              )}
            </div>

            <AnimatePresence>
              {generated && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  {/* Activities per student */}
                  <section>
                    <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent" />
                      Activités personnalisées
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {students.map((s, i) => {
                        const pct = Math.round((s.score / s.totalQuestions) * 100);
                        return (
                          <motion.div
                            key={s.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-card rounded-xl shadow-card p-5 border border-border/50"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <p className="font-bold text-sm">{s.firstName} {s.lastName}</p>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${styleBadge[s.learningStyle]}`}>
                                {styleEmoji[s.learningStyle]} {s.learningStyle}
                              </span>
                            </div>
                            <div className="mb-3">
                              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>Score</span>
                                <span>{s.score}/{s.totalQuestions} ({pct}%)</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ delay: 0.3, duration: 0.6 }}
                                  className={`h-full rounded-full ${pct >= 60 ? "bg-success" : pct >= 40 ? "bg-accent" : "bg-destructive"}`}
                                />
                              </div>
                            </div>
                            <ul className="space-y-1">
                              {(activities[s.id] || []).map((act, j) => (
                                <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                  <span className="text-primary mt-0.5">•</span>
                                  {act}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Groups */}
                  <section>
                    <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-secondary" />
                      Groupes suggérés
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {groups.map((g, gIdx) => (
                        <motion.div
                          key={g.name}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: gIdx * 0.1 }}
                          className="bg-card rounded-xl shadow-card p-5 border border-border/50"
                        >
                          <h3 className="font-bold text-sm mb-1">{g.name}</h3>
                          <p className="text-xs text-muted-foreground mb-3">{g.criteria}</p>
                          <Reorder.Group values={g.students} onReorder={(newOrder) => {
                            setGroups((prev) => prev.map((grp, i) => i === gIdx ? { ...grp, students: newOrder } : grp));
                          }} className="space-y-1.5">
                            {g.students.map((s) => (
                              <Reorder.Item key={s.id} value={s} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 cursor-grab active:cursor-grabbing text-sm">
                                <GripVertical className="w-3.5 h-3.5 text-muted-foreground" />
                                <span className="font-medium">{s.firstName} {s.lastName}</span>
                                <span className="ml-auto text-xs text-muted-foreground">{s.score}/{s.totalQuestions}</span>
                              </Reorder.Item>
                            ))}
                          </Reorder.Group>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </Layout>
  );
};

export default AIAssistant;
