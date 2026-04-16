import { StudentResult } from "./types";

const STORAGE_KEY = "edu_platform_results";

export const api = {
  // 🧪 Save student test result
  async submitTest(result: StudentResult): Promise<{ success: boolean }> {
    const existing = getStoredResults();
    existing.push(result);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

    window.dispatchEvent(new CustomEvent("student-submitted"));

    return { success: true };
  },

  // 📥 Get all results
  async getResults(): Promise<StudentResult[]> {
    return getStoredResults();
  },

  // 🤖 REAL AI (backend + Mistral)
  async getAISuggestions(students: StudentResult[]): Promise<{
    activities: Record<string, string[]>;
    groups: { name: string; criteria: string; studentIds: string[] }[];
  }> {
    const res = await fetch("http://localhost:5000/ai-suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(students)
    });

    if (!res.ok) {
      throw new Error("Erreur lors de l'appel à l'IA");
    }

    return res.json();
  }
};

// 💾 helper function (local storage)
function getStoredResults(): StudentResult[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}