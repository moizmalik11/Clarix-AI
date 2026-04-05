"use client";

import { useClarix } from '../../context/ClarixContext';
import SummaryBox from '../../components/SummaryBox';
import MCQList from '../../components/MCQList';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Download, BookOpen, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ResultPage() {
  const { result, activeMode } = useClarix();
  const router = useRouter();

  useEffect(() => {
    if (!result) {
      router.push('/upload');
    }
  }, [result, router]);

  if (!result) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl bg-background min-h-screen mt-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 bg-muted/30 p-6 rounded-2xl border border-border">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            {activeMode === 'study' ? <BookOpen className="w-8 h-8" /> : <BrainCircuit className="w-8 h-8" />}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              {activeMode === 'study' ? 'Study Guide' : 'AI Knowledge Quiz'}
            </h1>
            <p className="text-muted-foreground mt-1 font-medium">
              {activeMode === 'study' 
                ? 'Your customized notes and explanations are ready.' 
                : 'Test your knowledge on the generated material.'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link href="/upload" className="w-full md:w-auto">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Upload New
            </Button>
          </Link>
          <Button variant="default" className="w-full md:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {activeMode === 'study' && result.core_concepts ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="lg:col-span-4 space-y-6">
            <SummaryBox title="Summary" text={result.summary} />
            <SummaryBox title="Key Points" text={result.key_points} type="bullet" />
          </div>
          
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-md">
              <h2 className="text-2xl font-bold text-foreground mb-4 border-b border-border pb-4 flex items-center">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">💡</span>
                Core Concepts
              </h2>
              <div className="prose prose-sm md:prose-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {result.core_concepts}
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-md">
              <h2 className="text-2xl font-bold text-foreground mb-4 border-b border-border pb-4 flex items-center">
                <span className="bg-green-500 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">📝</span>
                Detailed Study Notes
              </h2>
              <div className="prose prose-sm md:prose-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {result.prepared_notes}
              </div>
            </div>
          </div>
        </div>
      ) : activeMode === 'quiz' && result.questions ? (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="bg-card border-t-4 border-t-blue-500 border border-border rounded-2xl p-6 md:p-8 shadow-md">
            <div className="mb-8 border-b border-border pb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Interactive Assessment</h2>
                <p className="text-sm text-muted-foreground mt-2 font-medium">Select the best answer for each question below.</p>
              </div>
              <div className="bg-blue-500/10 text-blue-600 px-4 py-2 rounded-lg font-bold">
                {result.questions.length} Questions
              </div>
            </div>
            <MCQList questions={result.questions} />
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No result data to display.</p>
        </div>
      )}
    </div>
  );
}
