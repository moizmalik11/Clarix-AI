"use client";

import { useClarix } from '../../context/ClarixContext';
import UploadZone from '../../components/UploadZone';
import SettingsPanel from '../../components/SettingsPanel';
import StepTracker from '../../components/StepTracker';
import { FileUp, SlidersHorizontal } from 'lucide-react';

export default function UploadPage() {
  const { file } = useClarix();

  return (
    <div className="container mx-auto px-4 py-12 bg-background min-h-[calc(100vh-80px)]">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          {file ? <SlidersHorizontal className="w-8 h-8 text-primary" /> : <FileUp className="w-8 h-8 text-primary" />}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-3">
          {file ? "Configure Learning Preferences" : "Prepare Your Document"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {file 
            ? "Your file is ready! Choose how you want to study this material." 
            : "Upload your syllabus, notes, or textbook securely to get started."}
        </p>
      </div>
      
      <StepTracker />
      
      <div className="mt-12 max-w-5xl mx-auto transition-all duration-500 ease-in-out">
        {!file ? (
          // Step 1: Upload Only (Centered)
          <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
            <UploadZone />
          </div>
        ) : (
          // Step 2: Show Uploaded File Info + Configuration Options
          <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="lg:w-1/3">
              <UploadZone />
            </div>
            <div className="lg:w-2/3">
              <SettingsPanel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}