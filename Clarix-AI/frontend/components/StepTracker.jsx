import { FileUp, Cpu, GraduationCap } from 'lucide-react';

export default function StepTracker() {
  const steps = [
    { id: 1, name: 'Upload', icon: FileUp, active: true },
    { id: 2, name: 'Processing', icon: Cpu, active: false },
    { id: 3, name: 'Learn', icon: GraduationCap, active: false },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-12 px-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-6 -translate-y-1/2 w-full h-[2px] bg-muted -z-10" />
        
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="flex flex-col items-center bg-background px-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                step.active 
                  ? 'bg-primary border-primary text-primary-foreground shadow-sm shadow-primary/20' 
                  : 'bg-background border-border text-muted-foreground'
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className={`mt-3 text-sm font-medium ${
                step.active ? 'text-foreground' : 'text-muted-foreground'
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
