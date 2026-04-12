export type LearningStyle = "Visuel" | "Auditif" | "Kinesthésique";

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  learningStyle?: LearningStyle;
}

export interface StudentResult {
  id: string;
  firstName: string;
  lastName: string;
  score: number;
  totalQuestions: number;
  learningStyle: LearningStyle;
  answers: number[];
  submittedAt: string;
}

export interface StudentGroup {
  id: string;
  name: string;
  criteria: string;
  students: StudentResult[];
}

export interface ActivitySuggestion {
  id: string;
  student: StudentResult;
  activities: string[];
}
