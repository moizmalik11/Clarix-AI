"use client";

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export default function MCQCard({ index, question, options = [], correctAnswerIndex }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (idx) => {
    if (selected !== null) return; // Prevent changing answer
    setSelected(idx);
  };

  const getOptionStyle = (idx) => {
    if (selected === null) {
      return 'border-border hover:bg-muted/50 text-foreground';
    }
    
    // When an option is selected, reveal correct/incorrect states
    // In real app, you might wait for submission. Let's just show it immediately for simple demo.
    // Assuming correctAnswerIndex is passed. For mockup, let's treat index 1 as correct if not provided.
    const correctIdx = correctAnswerIndex !== undefined ? correctAnswerIndex : 1;

    if (idx === correctIdx) {
      return 'border-green-500 bg-green-50 text-green-900 dark:bg-green-500/10 dark:text-green-400';
    }
    if (idx === selected && selected !== correctIdx) {
      return 'border-destructive bg-destructive/10 text-destructive';
    }
    
    return 'border-border opacity-50 cursor-not-allowed';
  };

  const IconRender = ({ idx }) => {
    if (selected === null) return null;
    const correctIdx = correctAnswerIndex !== undefined ? correctAnswerIndex : 1;
    
    if (idx === correctIdx) return <CheckCircle2 className="h-5 w-5 text-green-500 ml-auto" />;
    if (idx === selected && selected !== correctIdx) return <XCircle className="h-5 w-5 text-destructive ml-auto" />;
    return null;
  };

  const defaultOptions = ["Option A", "Option B", "Option C", "Option D"];
  const displayOptions = options.length > 0 ? options : defaultOptions;

  return (
    <div className="bg-card p-6 rounded-xl border border-border mb-6 shadow-sm">
      <div className="flex items-start gap-4 mb-5">
        <span className="flex items-center justify-center bg-primary/10 text-primary font-bold rounded-lg h-8 w-8 text-sm mt-0.5 shrink-0">
          {index + 1}
        </span>
        <h4 className="text-lg font-medium text-foreground leading-relaxed">
          {question || "Sample question text goes here?"}
        </h4>
      </div>
      
      <div className="space-y-3 pl-12">
        {displayOptions.map((opt, i) => (
          <button 
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={cn(
              "w-full text-left p-4 rounded-lg border-2 transition-all flex items-center gap-3 font-medium text-sm",
              getOptionStyle(i)
            )}
          >
            <span className={cn(
              "flex items-center justify-center w-6 h-6 rounded-md border text-xs mr-2 shrink-0",
              selected !== null ? "border-transparent" : "border-muted-foreground/30 text-muted-foreground"
            )}>
              {String.fromCharCode(65 + i)}
            </span>
            <span className="flex-1">{opt}</span>
            <IconRender idx={i} />
          </button>
        ))}
      </div>
    </div>
  );
}
