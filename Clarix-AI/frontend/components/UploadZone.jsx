"use client";

import { useClarix } from '../context/ClarixContext';
import { UploadCloud, FileText, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

export default function UploadZone() {
  const { file, setFile } = useClarix();

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const clearFile = (e) => {
    e.preventDefault();
    setFile(null);
  }

  return (
    <div className={`border-2 border-dashed border-border rounded-2xl p-8 text-center bg-card hover:bg-muted/30 transition-colors flex flex-col items-center justify-center ${file ? 'min-h-[300px]' : 'min-h-[400px]'}`}>
      <div className={`p-4 bg-primary/10 text-primary rounded-full mb-6 ring-4 ring-background ${file ? 'scale-75 mb-4' : ''} transition-transform`}>
        {file ? <FileText className="h-8 w-8 text-blue-500" /> : <UploadCloud className="h-8 w-8 text-primary" />}
      </div>
      
      {!file ? (
        <>
          <h3 className="text-2xl font-bold text-foreground mb-3">Upload your Document</h3>
          <p className="text-muted-foreground mb-8 max-w-sm text-base">
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
            <div className="inline-flex items-center justify-center rounded-xl text-md font-bold transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-10 shadow-lg">
              Browse Files
            </div>
          </label>
        </>
      ) : (
        <div className="flex flex-col items-center w-full relative group">
          <h3 className="text-xl font-bold text-foreground mb-4">Document Ready</h3>
          
          <div className="relative p-5 w-full bg-background border border-border shadow-inner rounded-xl flex flex-col items-center gap-3">
             <div className="absolute -top-3 -right-3">
               <CheckCircle2 className="h-6 w-6 text-green-500 fill-green-100" />
             </div>
            <FileText className="h-10 w-10 text-primary flex-shrink-0" />
            <p className="text-md font-semibold text-foreground truncate w-full text-center px-2" title={file.name}>
              {file.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          
          <div className="mt-6 w-full space-y-3">
            <input 
              type="file" 
              accept="application/pdf,.docx,.txt"
              className="hidden" 
              id="file-upload-change"
              onChange={handleUpload}
            />
            <label htmlFor="file-upload-change" className="cursor-pointer w-full block">
              <div className="flex items-center justify-center w-full p-2.5 rounded-lg border-2 border-border text-sm font-medium hover:bg-muted/50 transition-colors">
                <RefreshCw className="w-4 h-4 mr-2 text-muted-foreground" /> Change File
              </div>
            </label>
            <button
               onClick={clearFile}
               className="w-full p-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors font-medium"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
