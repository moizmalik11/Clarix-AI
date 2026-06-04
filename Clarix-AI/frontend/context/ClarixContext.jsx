"use client";

import { createContext, useContext, useState } from 'react';

const ClarixContext = createContext();

export function ClarixProvider({ children }) {
  const [file, setFile] = useState(null);
  const [settings, setSettings] = useState({ mcqCount: 5, difficulty: 'medium' });
  const [result, setResult] = useState(null); // stores either study response or quiz response
  const [activeMode, setActiveMode] = useState('study'); // 'study' or 'quiz'
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [extractedTopics, setExtractedTopics] = useState([]);
  const [extractedText, setExtractedText] = useState("");

  return (
    <ClarixContext.Provider value={{
      file, setFile,
      settings, setSettings,

      extractedTopics, setExtractedTopics,
      extractedText, setExtractedText
    }}>
      {children}
    </ClarixContext.Provider>
  );
}

export function useClarix() {
  return useContext(ClarixContext);
}
