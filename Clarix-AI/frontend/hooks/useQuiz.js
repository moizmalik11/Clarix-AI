// hooks/useQuiz.js
import { useState } from 'react';

export function useQuiz() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizData, setQuizData] = useState(null);

  const generateQuiz = async (documentId, settings) => {
    setIsGenerating(true);
    // API logic to generate MCQs
    try {
      // const response = await fetch('/api/quiz/generate', { body: JSON.stringify(settings) });
      const mockResult = [
 
      setIsGenerating(false);
    }
  };

  return { generateQuiz, isGenerating, quizData };
}
