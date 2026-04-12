import { Question } from "./types";

export type Subject = "Informatique" | "Mathématiques" | "Français" | "Sciences" | "Histoire-Géo";

export const subjects: { value: Subject; label: string; icon: string }[] = [
  { value: "Informatique", label: "Informatique", icon: "💻" },
  { value: "Mathématiques", label: "Mathématiques", icon: "🔢" },
  { value: "Français", label: "Français", icon: "📖" },
  { value: "Sciences", label: "Sciences", icon: "🔬" },
  { value: "Histoire-Géo", label: "Histoire-Géo", icon: "🌍" },
];

const questionsBySubject: Record<Subject, Question[]> = {
  Informatique: [
    { id: 1, text: "Que signifie HTML ?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correctIndex: 0 },
    { id: 2, text: "Quel langage est utilisé pour styliser une page web ?", options: ["JavaScript", "Python", "CSS", "HTML"], correctIndex: 2 },
    { id: 3, text: "Quelle est la base du système binaire ?", options: ["Base 8", "Base 10", "Base 2", "Base 16"], correctIndex: 2 },
    { id: 4, text: "Quel composant est le « cerveau » de l'ordinateur ?", options: ["RAM", "Disque dur", "Processeur (CPU)", "Carte graphique"], correctIndex: 2 },
    { id: 5, text: "Que signifie l'acronyme URL ?", options: ["Uniform Resource Locator", "Universal Reference Link", "Unified Resource Language", "Universal Resource Locator"], correctIndex: 0 },
  ],
  Mathématiques: [
    { id: 1, text: "Quel est le résultat de 15 × 4 ?", options: ["45", "60", "55", "65"], correctIndex: 1 },
    { id: 2, text: "Combien de côtés a un hexagone ?", options: ["5", "6", "7", "8"], correctIndex: 1 },
    { id: 3, text: "Quelle est la racine carrée de 144 ?", options: ["10", "11", "12", "14"], correctIndex: 2 },
    { id: 4, text: "Combien font 2³ ?", options: ["6", "8", "9", "12"], correctIndex: 1 },
    { id: 5, text: "Quel est le PGCD de 12 et 18 ?", options: ["3", "6", "9", "12"], correctIndex: 1 },
  ],
  Français: [
    { id: 1, text: "Quel est le passé composé de « aller » avec « je » ?", options: ["J'ai allé", "Je suis allé", "J'allais", "Je vais allé"], correctIndex: 1 },
    { id: 2, text: "Quel est le pluriel de « journal » ?", options: ["Journals", "Journaux", "Journales", "Journeaux"], correctIndex: 1 },
    { id: 3, text: "Quel type de mot est « rapidement » ?", options: ["Adjectif", "Nom", "Adverbe", "Verbe"], correctIndex: 2 },
    { id: 4, text: "Quelle figure de style : « Il pleut des cordes » ?", options: ["Métaphore", "Comparaison", "Hyperbole", "Personnification"], correctIndex: 2 },
    { id: 5, text: "Quel est le féminin de « acteur » ?", options: ["Acteuse", "Actrice", "Acteure", "Actrisse"], correctIndex: 1 },
  ],
  Sciences: [
    { id: 1, text: "Quel gaz les plantes absorbent-elles pendant la photosynthèse ?", options: ["Oxygène", "Azote", "Dioxyde de carbone", "Hydrogène"], correctIndex: 2 },
    { id: 2, text: "Quelle est la formule chimique de l'eau ?", options: ["HO₂", "H₂O", "OH", "H₂O₂"], correctIndex: 1 },
    { id: 3, text: "Quelle planète est la plus proche du Soleil ?", options: ["Vénus", "Terre", "Mercure", "Mars"], correctIndex: 2 },
    { id: 4, text: "Quel organe pompe le sang dans le corps ?", options: ["Poumons", "Foie", "Cerveau", "Cœur"], correctIndex: 3 },
    { id: 5, text: "Combien d'os compte le corps humain adulte ?", options: ["186", "206", "256", "306"], correctIndex: 1 },
  ],
  "Histoire-Géo": [
    { id: 1, text: "Quelle est la capitale de l'Australie ?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correctIndex: 2 },
    { id: 2, text: "En quelle année a eu lieu la Révolution française ?", options: ["1776", "1789", "1804", "1815"], correctIndex: 1 },
    { id: 3, text: "Quel est le plus long fleuve d'Afrique ?", options: ["Congo", "Niger", "Nil", "Zambèze"], correctIndex: 2 },
    { id: 4, text: "Qui a découvert l'Amérique en 1492 ?", options: ["Vasco de Gama", "Magellan", "Christophe Colomb", "Marco Polo"], correctIndex: 2 },
    { id: 5, text: "Quel est le plus grand continent ?", options: ["Afrique", "Amérique", "Europe", "Asie"], correctIndex: 3 },
  ],
};

const learningStyleQuestions: Question[] = [
  { id: 100, text: "Pour apprendre un nouveau concept, vous préférez :", options: ["Regarder un schéma ou une vidéo", "Écouter une explication orale", "Manipuler et expérimenter"], correctIndex: -1, learningStyle: "Visuel" },
  { id: 101, text: "Quand vous étudiez, vous retenez mieux en :", options: ["Surlignant avec des couleurs", "Répétant à voix haute", "Écrivant et réécrivant les notes"], correctIndex: -1, learningStyle: "Visuel" },
  { id: 102, text: "En classe, vous êtes plus attentif quand :", options: ["Le professeur utilise le tableau et des images", "Le professeur explique oralement", "Vous participez à une activité pratique"], correctIndex: -1, learningStyle: "Visuel" },
];

export function getQuestionsForSubject(subject: Subject): Question[] {
  return [...questionsBySubject[subject], ...learningStyleQuestions];
}

export function getLearningStyleFromAnswers(questions: Question[], answers: (number | null)[]): "Visuel" | "Auditif" | "Kinesthésique" {
  const counts = { Visuel: 0, Auditif: 0, Kinesthésique: 0 };
  questions.forEach((q, i) => {
    if (q.learningStyle && answers[i] !== null) {
      if (answers[i] === 0) counts.Visuel++;
      else if (answers[i] === 1) counts.Auditif++;
      else if (answers[i] === 2) counts.Kinesthésique++;
    }
  });
  if (counts.Kinesthésique >= counts.Visuel && counts.Kinesthésique >= counts.Auditif) return "Kinesthésique";
  if (counts.Auditif >= counts.Visuel) return "Auditif";
  return "Visuel";
}

export function calculateScore(questions: Question[], answers: (number | null)[]): number {
  return questions.reduce((score, q, i) => score + (q.correctIndex !== -1 && answers[i] === q.correctIndex ? 1 : 0), 0);
}

export function getTotalTechnical(questions: Question[]): number {
  return questions.filter((q) => q.correctIndex !== -1).length;
}
