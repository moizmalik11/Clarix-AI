// services/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const uploadFileAPI = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });


  return res.json();
};

export const studySyllabusAPI = async (text, topics = []) => {
  const res = await fetch(`${API_URL}/study`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, topics }),
  });

  if (!res.ok) {
    throw new Error('Failed to generate study material');
  }

  return res.json();
};

export const takeQuizAPI = async (text, questionCount = 5, difficulty = 'medium') => {
  const res = await fetch(`${API_URL}/quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, question_count: questionCount, difficulty }),
  });

  if (!res.ok) {
    throw new Error('Failed to generate quiz');
  }

  return res.json();
};

