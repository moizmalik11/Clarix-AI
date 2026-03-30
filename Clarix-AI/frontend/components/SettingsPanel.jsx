"use client";

import { useClarix } from '../context/ClarixContext';
import { Settings2, Wand2 } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function SettingsPanel() {
  const { settings, setSettings, file } = useClarix();
  const router = useRouter();

  const handleGenerate = () => {
    if(!file) {
      alert("Please upload a file first.");
      return;
    }
    // Simulation
    router.push('/result');
  };

  return (
    <div className="bg-card p-6 shadow-sm rounded-2xl border border-border h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
        <Settings2 className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">Configuration</h3>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-medium text-foreground">Question Count</label>
          <span className="text-xs font-semibold bg-muted text-muted-foreground px-2 py-1 rounded-md">
            {settings.mcqCount}
          </span>
        </div>
        <div className="relative flex items-center">
          <input 
            type="range"
            className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            value={settings.mcqCount}
            onChange={(e) => setSettings({ ...settings, mcqCount: parseInt(e.target.value) || 5 })}
            min="1"
            max="20"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Maximum number of MCQs to generate.</p>
      </div>

      <div className="mb-auto mt-4">
        <label className="text-sm font-medium text-foreground block mb-4">Difficulty Level</label>
        <div className="grid grid-cols-3 gap-2 bg-muted/50 p-1 rounded-lg">
          {['easy', 'medium', 'hard'].map((level) => (
            <button
              key={level}
              onClick={() => setSettings({ ...settings, difficulty: level })}
              className={`py-2 text-xs font-medium rounded-md capitalize transition-all ${
                settings.difficulty === level 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <Button onClick={handleGenerate} className="w-full mt-8 group h-12" size="lg" disabled={!file}>
        <Wand2 className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
        Generate Report
      </Button>
    </div>
  );
}
