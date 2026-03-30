"use client";

import { useClarix } from '../context/ClarixContext';
import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

export default function UploadZone() {
  const { file, setFile } = useClarix();

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center bg-card hover:bg-muted/30 transition-colors flex flex-col items-center justify-center min-h-[400px]">
      <div className="p-4 bg-primary/10 text-primary rounded-full mb-6 ring-4 ring-background">
        <UploadCloud className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">Upload your Document</h3>
      <p className="text-muted-foreground mb-8 max-w-sm text-sm">
        We support PDF, DOCX, and TXT files. Select a file from your computer to begin analysis.
      </p>
      
      <input 
        type="file" 
        accept="application/pdf,.docx,.txt"
        className="hidden" 
        id="file-upload"
        onChange={handleUpload}
      />
      
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8">
          Browse Files
        </div>
      </label>
      
      {file && (
        <div className="mt-8 p-3 bg-card border border-border shadow-sm rounded-lg flex items-center gap-3 w-full max-w-xs text-left animate-in zoom-in fade-in duration-300">
          <FileText className="h-5 w-5 text-primary flex-shrink-0" />
          <p className="text-sm font-medium text-foreground truncate flex-1">{file.name}</p>
          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
        </div>
      )}
    </div>
  );
}
