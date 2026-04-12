"use client";

import { useState } from 'react';
import { CheckCircle2, XCircle, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

export default function MCQCard({ index, question, options = [], correctAnswerIndex, explanation }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (idx) => {
    if (selected !== null) return; // Prevent changing answer
    setSelected(idx);
  };

  const getOptionStyle = (idx) => {
    if (selected === null) {
      return 'border-border hover:bg-muted/50 text-foreground';
    }
    
    const correctIdx = correctAnswerIndex !== undefined ? correctAnswerIndex : 1;

    if (idx === correctIdx) {
      return 'border-green-500 bg-green-50 text-green-900 dark:bg-green-500/10 dark:text-green-400 font-bold';
    }
    if (idx === selected && selected !== correctIdx) {
      return 'border-destructive bg-destructive/10 text-destructive';
    }
    
    return 'border-border opacity-50 cursor-not-allowed';
  };

  const getIcon = (idx) => {
    if (selected === null) return null;
    const correctIdx = correctAnswerIndex !== undefined ? correctAnswerIndex : 1;
    
    if (idx === correctIdx) return <CheckCircle2 className="h-5 w-5 text-green-500 ml-auto shrink-0" />;
    if (idx === selected && selected !== correctIdx) return <XCircle className="h-5 w-5 text-destructive ml-auto shrink-0" />;
    return null;
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-border mb-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start gap-4 mb-6">
        <span className="flex items-center justify-center bg-primary text-primary-foreground font-bold rounded-lg h-8 w-8 text-sm mt-0.5 shrink-0 shadow-sm">
          {index + 1}
        </span>
        <h4 className="text-lg font-bold text-foreground leading-relaxed">
          {question}
        </h4>
      </div>
      
      <div className="space-y-3 pl-0 sm:pl-12">
        {options.map((opt, i) => (
          <Button
            variant="outline"
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={cn(
              "w-full h-auto text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 whitespace-normal",
              getOptionStyle(i)
            )}
          >
            <div className="flex items-center gap-3 w-full pr-2 text-left">
              <span className={cn(
                "flex items-center justify-center w-7 h-7 rounded-md border text-xs font-bold shrink-0 shadow-sm bg-background",
                selected !== null ? "border-transparent backdrop-blur-sm" : "border-border text-foreground"
              )}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 leading-snug">{opt}</span>
            </div>
            {getIcon(i)}
          </Button>
        ))}
      </div>

      {selected !== null && explanation && (
        <div className="mt-6 pl-0 sm:pl-12 animate-in fade-in slide-in-from-top-4 duration-500">
           <div className={`p-4 rounded-xl border flex items-start gap-3 ${selected === correctAnswerIndex ? 'bg-green-500/10 border-green-500/20 text-green-800 dark:text-green-300' : 'bg-blue-500/10 border-blue-500/20 text-blue-800 dark:text-blue-300'}`}>
              <Info className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm mb-1">{selected === correctAnswerIndex ? 'Correct!' : 'Explanation'}</p>
                <p className="text-sm leading-relaxed">{explanation}</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
