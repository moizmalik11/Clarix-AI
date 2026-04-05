"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, BrainCircuit, FileText, GraduationCap, UploadCloud, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500); // Small delay after hitting 100% before hiding loader
          return 100;
        }
        return prev + 2; // Increase progress
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground transition-opacity duration-500">
        <div className="flex flex-col items-center max-w-sm w-full px-6">
          <div className="p-4 bg-primary/10 rounded-full mb-6">
            <GraduationCap className="w-16 h-16 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 animate-fade-in text-center">
            Welcome to Clarix
          </h1>
          <p className="text-lg text-muted-foreground mb-8 font-medium">
            (study platform)
          </p>
          
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground animate-pulse font-medium">
            Starting your learning journey... {progress}%
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-24 md:py-36 max-w-5xl mx-auto">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        
        <div className="inline-flex items-center rounded-sm border border-border px-3 py-1 text-sm font-medium transition-colors focus:outline-none bg-muted/50 text-foreground mb-10 shadow-sm backdrop-blur-sm">
          <span className="flex h-2.5 w-2.5 rounded-full bg-primary mr-2 animate-pulse"></span>
          Your Personal AI Tutor & Examiner
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-tight">
          Master Any Syllabus with <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
            Intelligent Study Tools
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl leading-relaxed">
          Upload your notes, books, or syllabus and let Clarix take over. From detailed conceptual teaching to generating customized quizzes, we prepare you for guaranteed success.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Link href="/upload">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg border-2 hover:bg-muted/50">
              See How It Works
            </Button>
          </a>
        </div>
      </section>

      {/* How it Works / Core Flow Section */}
      <section id="how-it-works" className="py-24 px-6 border-t border-border bg-card/30 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-10 w-10 text-primary opacity-80" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Platform Overview</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Here's how Clarix turns your raw study material into complete preparation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative items-start">
            {/* Step 1 */}
            <div className="bg-card text-card-foreground rounded-2xl border-2 border-border shadow-md p-8 flex flex-col items-start hover:border-primary/50 transition-colors relative z-10">
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-md border-4 border-background">
                1
              </div>
              <div className="p-4 bg-blue-500/10 rounded-xl mb-6 text-blue-500">
                <UploadCloud className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-2xl mb-4">Upload Content</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bring your own syllabus, lecture notes, or textbooks. Just provide your study material to the platform, and our AI will immediately scan, map, and process the entire document for you.
              </p>
            </div>
            
            {/* Step 2A */}
            <div className="bg-card text-card-foreground rounded-2xl border-2 border-border shadow-md p-8 flex flex-col items-start hover:border-primary/50 transition-colors relative z-10 md:mt-12">
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-md border-4 border-background">
                2A
              </div>
              <div className="absolute top-4 right-4 bg-muted px-2 py-1 rounded-md text-xs font-semibold">Option 1</div>
              <div className="p-4 bg-green-500/10 rounded-xl mb-6 text-green-500">
                <BrainCircuit className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-2xl mb-4">Study Whole Syllabus</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Let the AI become your personal tutor. It reads the complete syllabus and:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground w-full">
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" /> Explains core concepts deeply</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" /> Highlights key takeaways</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" /> Prepares you for exams automatically</li>
              </ul>
            </div>
            
            {/* Step 2B */}
            <div className="bg-card text-card-foreground rounded-2xl border-2 border-border shadow-md p-8 flex flex-col items-start hover:border-primary/50 transition-colors relative z-10 md:mt-24">
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-md border-4 border-background">
                2B
              </div>
              <div className="absolute top-4 right-4 bg-muted px-2 py-1 rounded-md text-xs font-semibold">Option 2</div>
              <div className="p-4 bg-purple-500/10 rounded-xl mb-6 text-purple-500">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-2xl mb-4">Take a Quiz</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Test your knowledge through an AI-generated assessment. You are in control:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground w-full">
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-purple-500 shrink-0 mt-0.5" /> Select specific portions or topics</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-purple-500 shrink-0 mt-0.5" /> Choose the exact number of MCQs</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-purple-500 shrink-0 mt-0.5" /> Get instant corrections & feedback</li>
              </ul>
            </div>
            
            {/* Visual Connecting Lines (Desktop only) */}
            <div className="hidden md:block absolute top-[20%] left-[25%] w-[50%] h-0.5 bg-gradient-to-r from-border via-primary/50 to-border -z-0"></div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 px-6 bg-primary text-primary-foreground text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to upgrade your studying?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Stop struggling with massive PDFs. Upload your material and let Clarix pave your path to success.
          </p>
          <Link href="/upload">
            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold">
              Enter Platform
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-muted-foreground bg-background">
        <div className="flex justify-center items-center mb-4">
           <GraduationCap className="h-6 w-6 mr-2 opacity-50" />
           <span className="font-semibold text-foreground/80">Clarix AI</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Clarix AI - The Smart Study Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
