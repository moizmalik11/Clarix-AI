"use client";

import { useClarix } from '../context/ClarixContext';
import { FileUp, Cpu, GraduationCap } from 'lucide-react';

export default function StepTracker() {
  const { file } = useClarix();
  const currentStep = file ? 2 : 1;

  const steps = [
    { id: 1, name: 'Upload', icon: FileUp, active: currentStep >= 1 },
    { id: 2, name: 'Configuration', icon: Cpu, active: currentStep >= 2 },
    { id: 3, name: 'Learn', icon: GraduationCap, active: currentStep >= 3 },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-12 px-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-6 -translate-y-1/2 w-full h-[2px] bg-muted -z-10">
          <div 
             className="h-full bg-primary transition-all duration-500 ease-in-out" 
             style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
          ></div>
        </div>
        
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="flex flex-col items-center bg-background px-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                step.active 
                  ? 'bg-primary border-primary text-primary-foreground shadow-md shadow-primary/30 scale-110' 
                  : 'bg-background border-border text-muted-foreground'
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className={`mt-3 text-sm font-medium transition-colors duration-300 ${
                step.active ? 'text-foreground font-bold' : 'text-muted-foreground'
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
