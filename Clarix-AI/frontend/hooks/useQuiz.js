// hooks/useQuiz.js
import { useState } from 'react';

export function useQuiz() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizData, setQuizData] = useState(null);

  const generateQuiz = async (documentId, settings) => {
    setIsGenerating(true);
    // API logic to generate MCQs
    
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateQuiz, isGenerating, quizData };
}
