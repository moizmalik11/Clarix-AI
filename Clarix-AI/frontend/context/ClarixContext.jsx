"use client";

import { createContext, useContext, useState } from 'react';

const ClarixContext = createContext();

export function ClarixProvider({ children }) {
  const [file, setFile] = useState(null);
  const [settings, setSettings] = useState({ mcqCount: 5, difficulty: 'medium' });
  const [result, setResult] = useState(null);

  return (
    <ClarixContext.Provider value={{
      file, setFile,
      settings, setSettings,
      result, setResult
    }}>
      {children}
    </ClarixContext.Provider>
  );
}

export function useClarix() {
  return useContext(ClarixContext);
}
