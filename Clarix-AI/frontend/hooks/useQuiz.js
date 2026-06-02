// hooks/useQuiz.js
import { useState } from 'react';

export function useQuiz() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizData, setQuizData] = useState(null);


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
