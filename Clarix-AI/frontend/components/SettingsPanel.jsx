"use client";

import { useClarix } from '../context/ClarixContext';
import { Settings2, Wand2, BookOpen, BrainCircuit, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { studySyllabusAPI, takeQuizAPI } from '../services/api';

export default function SettingsPanel() {
  const { settings, setSettings, file, extractedText, extractedTopics, setResult, activeMode, setActiveMode } = useClarix();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if(!file || !extractedText) {
      alert("Please upload and analyze a file first.");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      if (activeMode === 'study') {
        const response = await studySyllabusAPI(extractedText, extractedTopics);
        setResult(response);
      } else {
        const response = await takeQuizAPI(extractedText, settings.mcqCount, settings.difficulty);
        setResult(response);
      }
      router.push('/result');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong while generating the material.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card p-6 shadow-md rounded-2xl border-2 border-border h-full flex flex-col relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 border-b border-border pb-4 relative z-10">
        <Settings2 className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-bold text-foreground">What would you like to do?</h3>
      </div>
      
      {/* Mode Selection */}
      <div className="grid grid-cols-2 gap-4 mb-8 mt-2 relative z-10">
        <Button
          variant="outline"
          onClick={() => !loading && setActiveMode('study')}
          className={`h-auto flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
            activeMode === 'study' 
              ? 'border-primary bg-primary/5 shadow-sm scale-105' 
              : 'border-border bg-card hover:bg-muted/50 hover:border-primary/50'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          <BookOpen className={`w-8 h-8 mb-3 ${activeMode === 'study' ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className={`font-semibold ${activeMode === 'study' ? 'text-primary' : 'text-foreground'}`}>
            Study Syllabus
          </span>
          <span className="text-[10px] text-muted-foreground mt-1 text-center font-normal">
            AI Explains & Teaches
          </span>
        </Button>

        <Button
          variant="outline"
          onClick={() => !loading && setActiveMode('quiz')}
          className={`h-auto flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
            activeMode === 'quiz' 
              ? 'border-blue-500 bg-blue-500/5 shadow-sm scale-105' 
              : 'border-border bg-card hover:bg-muted/50 hover:border-blue-500/50'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          <BrainCircuit className={`w-8 h-8 mb-3 ${activeMode === 'quiz' ? 'text-blue-500' : 'text-muted-foreground'}`} />
          <span className={`font-semibold ${activeMode === 'quiz' ? 'text-blue-500' : 'text-foreground'}`}>
            Take a Quiz
          </span>
          <span className="text-[10px] text-muted-foreground mt-1 text-center font-normal">
            AI Generates MCQs
          </span>
        </Button>
      </div>

      {activeMode === 'quiz' ? (
        <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-300 relative z-10">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="font-semibold text-foreground">Question Count</label>
              <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-md">
                {settings.mcqCount} MCQs
              </span>
            </div>
            
            <input 
              type="range"
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 my-2"
              value={settings.mcqCount}
              onChange={(e) => setSettings({ ...settings, mcqCount: parseInt(e.target.value) || 5 })}
              min="1"
              max="50"
              disabled={loading}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1 font-medium">
              <span>1</span>
              <span>Select how many questions you want</span>
              <span>50</span>
            </div>
          </div>

          <div className="mb-auto mt-4">
            <label className="font-semibold text-foreground block mb-3">Difficulty Level</label>
            <div className="grid grid-cols-3 gap-3 bg-muted p-1.5 rounded-xl shadow-inner">
              {['easy', 'medium', 'hard'].map((level) => (
                <Button
                  variant="ghost"
                  key={level}
                  onClick={() => setSettings({ ...settings, difficulty: level })}
                  disabled={loading}
                  className={`h-auto py-2.5 text-sm font-bold rounded-lg capitalize transition-all ${
                    settings.difficulty === level 
                      ? 'bg-background text-primary shadow-sm ring-1 ring-border hover:bg-background' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in slide-in-from-left-4 duration-300 mb-auto relative z-10 bg-primary/5 rounded-xl border border-primary/10">
           <BookOpen className="w-12 h-12 text-primary opacity-50 mb-4" />
           <h4 className="font-bold text-foreground mb-2 px-4">Deep Learning Mode Active</h4>
           <p className="text-sm text-muted-foreground px-6">
             Clarix AI will break down your document into key topics, explain complex concepts, and provide summaries tailored for deep understanding.
           </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg relative z-10 border border-destructive/20 font-medium">
          {error}
        </div>
      )}

      {/* Decorative Blur Background Element */}
      <div className={`absolute -bottom-20 -right-20 w-64 h-64 blur-3xl opacity-20 transition-colors duration-500 rounded-full z-0 pointer-events-none ${activeMode === 'study' ? 'bg-primary' : 'bg-blue-500'}`}></div>

      <Button 
        onClick={handleGenerate} 
        className={`w-full mt-8 group h-14 text-lg font-bold shadow-lg transition-all hover:-translate-y-1 relative z-10 ${
          activeMode === 'quiz' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''
        }`} 
        size="lg" 
        disabled={!file || loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            Generating from AI...
          </>
        ) : (
          <>
            <Wand2 className={`mr-3 h-5 w-5 group-hover:rotate-12 transition-transform ${activeMode === 'study' ? 'animate-pulse' : ''}`} />
            {activeMode === 'study' ? 'Start Studying' : 'Generate Quiz'}
          </>
        )}
      </Button>
    </div>
  );
}
