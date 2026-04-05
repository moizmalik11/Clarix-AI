"use client";

import { useClarix } from '../context/ClarixContext';
import { FileUp, Cpu, GraduationCap, Check } from 'lucide-react';

export default function StepTracker() {
  const { file, isAnalyzed } = useClarix();
  
  const currentStep = file ? (isAnalyzed ? 2 : 1.5) : 1;

  const steps = [
    { id: 1, name: 'Upload', icon: FileUp, active: currentStep >= 1, completed: file !== null },
    { id: 2, name: 'Configuration', icon: Cpu, active: currentStep >= 1.5, completed: isAnalyzed },
    { id: 3, name: 'Learn', icon: GraduationCap, active: currentStep >= 3, completed: false },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-12 px-4 relative z-0">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-6 -translate-y-1/2 w-[calc(100%-3rem)] mx-6 h-1 bg-muted -z-10 rounded-full overflow-hidden">
          <div 
             className="h-full bg-primary transition-all duration-700 ease-in-out" 
             style={{ width: currentStep === 1 ? '0%' : currentStep === 1.5 ? '25%' : currentStep === 2 ? '50%' : '100%' }}
          ></div>
        </div>
        
        {steps.map((step, idx) => {
          const Icon = step.completed ? Check : step.icon;
          return (
            <div key={idx} className="flex flex-col items-center bg-background px-2 relative z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-[3px] transition-all duration-500 bg-background ${
                step.completed
                  ? 'border-green-500 text-green-500 bg-green-50'
                  : step.active 
                    ? 'border-primary text-primary shadow-md shadow-primary/30 scale-110' 
                    : 'border-border text-muted-foreground'
              }`}>
                <Icon className={`h-5 w-5 ${step.completed ? 'animate-in zoom-in duration-300' : ''}`} strokeWidth={step.completed ? 3 : 2} />
              </div>
              <p className={`mt-3 text-sm font-bold transition-colors duration-300 ${
                step.completed ? 'text-green-600' : step.active ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
