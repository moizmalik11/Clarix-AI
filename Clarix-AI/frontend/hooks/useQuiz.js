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
        { question: "What is Clarix AI?", options: ["A file system", "A summarizer/quiz maker", "A game", "An OS"], correctAnswerIndex: 1 }
      ];
      setQuizData(mockResult);
      return mockResult;
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateQuiz, isGenerating, quizData };
}
