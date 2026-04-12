import { StudentResult } from "./types";

const STORAGE_KEY = "edu_platform_results";

// Placeholder API functions — replace with real backend calls
export const api = {
  async submitTest(result: StudentResult): Promise<{ success: boolean }> {
    // POST /api/students/submit
    const existing = getStoredResults();
    existing.push(result);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    window.dispatchEvent(new CustomEvent("student-submitted"));
    return { success: true };
  },

  async getResults(): Promise<StudentResult[]> {
    // GET /api/students/results
    return getStoredResults();
  },

  async getAISuggestions(students: StudentResult[]): Promise<{
    activities: Record<string, string[]>;
    groups: { name: string; criteria: string; studentIds: string[] }[];
  }> {
    // POST /api/ai/suggestions
    // Simulated AI response
    const activities: Record<string, string[]> = {};
    students.forEach((s) => {
      const acts: string[] = [];
      if (s.learningStyle === "Visuel") {
        acts.push("Carte mentale interactive", "Vidéo explicative", "Infographie du concept");
      } else if (s.learningStyle === "Auditif") {
        acts.push("Podcast pédagogique", "Discussion en groupe", "Lecture à voix haute");
      } else {
        acts.push("Atelier pratique", "Jeu de rôle", "Manipulation d'objets");
      }
      if (s.score / s.totalQuestions < 0.5) {
        acts.push("Exercices de révision supplémentaires");
      }
      activities[s.id] = acts;
    });

    // Group by learning style
    const styleGroups = new Map<string, string[]>();
    students.forEach((s) => {
      const arr = styleGroups.get(s.learningStyle) || [];
      arr.push(s.id);
      styleGroups.set(s.learningStyle, arr);
    });

    const groups = Array.from(styleGroups.entries()).map(([style, ids]) => ({
      name: `Groupe ${style}`,
      criteria: `Style d'apprentissage: ${style}`,
      studentIds: ids,
    }));

    return { activities, groups };
  },
};

function getStoredResults(): StudentResult[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
