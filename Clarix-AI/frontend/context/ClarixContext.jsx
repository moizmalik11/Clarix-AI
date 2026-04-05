"use client";

import { createContext, useContext, useState } from 'react';

const ClarixContext = createContext();

export function ClarixProvider({ children }) {
  const [file, setFile] = useState(null);
  const [settings, setSettings] = useState({ mcqCount: 5, difficulty: 'medium' });
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [extractedTopics, setExtractedTopics] = useState([]);

  return (
    <ClarixContext.Provider value={{
      file, setFile,
      settings, setSettings,
      result, setResult,
      isAnalyzing, setIsAnalyzing,
      isAnalyzed, setIsAnalyzed,
      extractedTopics, setExtractedTopics
    }}>
      {children}
    </ClarixContext.Provider>
  );
}

export function useClarix() {
  return useContext(ClarixContext);
}
