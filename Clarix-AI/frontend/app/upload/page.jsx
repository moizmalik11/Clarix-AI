"use client";

import { useState, useEffect } from 'react';
import { useClarix } from '../../context/ClarixContext';
import UploadZone from '../../components/UploadZone';
import SettingsPanel from '../../components/SettingsPanel';
import StepTracker from '../../components/StepTracker';
import { FileUp, SlidersHorizontal, ListChecks, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { uploadFileAPI } from '../../services/api';

export default function UploadPage() {
  const { file, isAnalyzed, setIsAnalyzed, isAnalyzing, setIsAnalyzing, extractedTopics, setExtractedTopics, setExtractedText } = useClarix();
  const [error, setError] = useState(null);

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const response = await uploadFileAPI(file);
      setExtractedTopics(response.topics || ["Introduction to Core Concepts", "Summary"]);
      setExtractedText(response.extracted_text);
      setIsAnalyzed(true);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to extract text from the file.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
      <StepTracker />
      
      <div className="mt-12 max-w-5xl mx-auto transition-all duration-500 ease-in-out">
        {!file ? (
          // Step 1: Upload Only (Centered)
          <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
            <UploadZone />
          </div>
        ) : !isAnalyzed ? (
          // Step 1.5: File Uploaded -> Ready to Analyze
          <div className="max-w-2xl mx-auto flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500">
            <UploadZone />
            
            <div className="bg-card border-2 border-border rounded-xl p-8 shadow-sm flex flex-col items-center">
               {!isAnalyzing ? (
                 <>
                   <h3 className="text-2xl font-bold mb-3">Ready for AI Analysis</h3>
                   <p className="text-muted-foreground text-center mb-6">
                     We will now scan your document to extract topics, headings, and core study material.
                   </p>
                   {error && (
                     <div className="mb-6 p-4 w-full bg-destructive/10 text-destructive border border-destructive/20 rounded-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium">{error}</p>
                     </div>
                   )}
                   <Button size="lg" onClick={startAnalysis} className="h-14 px-10 text-lg font-bold group shadow-lg w-full sm:w-auto">
                     <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                     Analyze Document
                   </Button>
                 </>
               ) : (
                 <div className="w-full flex flex-col items-center py-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
                    <h3 className="text-xl font-bold mb-2">Analyzing your file...</h3>
                    <p className="text-sm text-muted-foreground mb-6">Communicating with AI, extracting text and topics.</p>
                 </div>
               )}
            </div>
          </div>
        ) : (
          // Step 2: Analyzed -> Show Configuration
          <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="lg:w-1/3 flex flex-col gap-6">
              <UploadZone />
              
              {/* Extracted Topics Card */}
              <div className="bg-card w-full border border-border shadow-md rounded-2xl p-5 animate-in fade-in slide-in-from-left duration-700 delay-150 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
                 <h4 className="font-bold flex items-center mb-4 text-lg">
                   <ListChecks className="text-green-500 w-5 h-5 mr-2" />
                   AI Extracted Topics
                 </h4>
                 <p className="text-sm text-muted-foreground mb-4">I have successfully analyzed the following topics. What should we do next?</p>
                 <ul className="space-y-3">
                   {extractedTopics.map((topic, index) => (
                     <li key={index} className="bg-muted/50 border border-border/50 text-sm font-medium px-3 py-2 rounded-lg flex items-center">
                       <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs mr-2 font-bold shrink-0">
                         {index + 1}
                       </span>
                       {topic}
                     </li>
                   ))}
                 </ul>
              </div>
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