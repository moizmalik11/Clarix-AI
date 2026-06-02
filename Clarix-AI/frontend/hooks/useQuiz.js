// hooks/useQuiz.js
import { useState } from 'react';

export function useQuiz() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizData, setQuizData] = useState(null);


  return { generateQuiz, isGenerating, quizData };
}
