export type MCQ = {
  id: number;
  question: string;
  options: string[];
};

export const LISTENING_QUESTIONS: MCQ[] = [
  { id: 1, question: "Where is the conversation taking place?", options: ["At home", "At the airport", "At a restaurant", "At school"] },
  { id: 2, question: "What does the man need to find?", options: ["His passport", "A taxi", "His keys", "His phone"] }
];

export const READING_QUESTIONS: MCQ[] = [
  { id: 1, question: "What is the main idea of the passage?", options: ["Global warming", "Local tourism", "Healthy diets", "Economic growth"] },
  { id: 2, question: "Which word is closest in meaning to 'rapid'?", options: ["Slow", "Quick", "Boring", "Weak"] }
];