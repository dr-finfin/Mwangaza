export interface LessonActivity {
  id: number;
  name: string;
  completed: boolean;
}

export interface TestResult {
  id: number;
  name: string;
  score: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Flashcard {
  front: string;
  back: string;
}
