"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, FileText, GraduationCap, UploadCloud, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Elegant loading screen
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + 1;
      });
    }, 15);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-500 overflow-hidden">
        {/* Background glow for loader */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full animate-pulse"></div>
        <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">
          <div className="relative p-6 bg-black border border-white/10 rounded-2xl mb-8 shadow-[0_0_50px_rgba(255,215,0,0.15)] flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 rounded-2xl animate-ping opacity-30"></div>
            <GraduationCap className="relative w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter mb-4 text-glow">
            Clarix<span className="text-primary text-glow">.</span>AI
          </h1>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-4 relative">
            <div 
              className="absolute left-0 top-0 h-full bg-primary rounded-full shadow-[0_0_15px_rgba(255,215,0,0.8)] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground uppercase tracking-widest font-mono">
            Optimizing Neural Pathways... {progress}%
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative overflow-hidden">
      {/* Background Decorators */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/15 blur-[150px] rounded-full mix-blend-screen -z-10 animate-float"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full mix-blend-screen -z-10 animate-float-delayed"></div>

      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-32 md:py-48 max-w-5xl mx-auto z-10">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 fill-mode-both">
          <div className="inline-flex items-center rounded-full border border-primary/30 px-5 py-1.5 text-sm font-medium bg-black/50 backdrop-blur-md text-foreground mb-8 cursor-default glass-panel hover:bg-black/60 transition-all hover:border-primary/60">
            <Sparkles className="h-4 w-4 text-primary mr-2" />
            <span className="text-primary font-semibold mr-2">New:</span> Real-time Syllabus Generation
          </div>
        </div>
        
        <h1 className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[1.1]">
          Master Any Syllabus <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-primary text-glow inline-block pb-2">
            Intelligently.
          </span>
        </h1>
        
        <p className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both text-lg md:text-xl text-white/60 mb-12 max-w-3xl leading-relaxed font-light">
          Upload your notes or textbooks and let Clarix take over. From deep conceptual tutoring to customized rigorous quizzes, we prepare you for guaranteed success.
        </p>
        
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Link href="/upload">
            <Button size="lg" className="group w-full sm:w-auto h-14 px-8 text-lg font-bold bg-primary text-black hover:bg-primary/90 transition-all rounded-full shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] transform hover:-translate-y-1">
              Start Learning Now 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg border-white/20 hover:border-primary/50 hover:bg-primary/5 bg-black/40 backdrop-blur-lg rounded-full text-white transition-all">
              See How It Works
            </Button>
          </a>
        </div>
      </section>

      {/* How it Works / Features Section */}
      <section id="how-it-works" className="py-32 px-6 border-t border-white/10 bg-black/60 backdrop-blur-3xl relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="inline-block p-4 bg-primary/10 rounded-2xl mb-6 box-glow">
              <BrainCircuit className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-white text-glow">How Clarix Learns With You</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
              Our neural engine transforms flat text into interactive, dynamic learning nodes designed to wire knowledge straight into your brain.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative items-start">
            {/* Step 1 */}
            <div className="glass-panel text-white rounded-3xl p-10 flex flex-col items-start hover:border-primary/50 hover:bg-black/80 hover:-translate-y-2 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl font-black font-mono group-hover:text-primary transition-colors">1</div>
              <div className="p-4 bg-primary/10 rounded-2xl mb-8">
                <UploadCloud className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-2xl mb-4">Feed The Engine</h3>
              <p className="text-white/50 leading-relaxed z-10">
                Upload PDFs, notes, or course outlines. Clarix ingests the raw data, maps the semantic relationships, and breaks it down into learnable chunks.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="glass-panel text-white rounded-3xl p-10 flex flex-col items-start hover:border-primary/50 hover:bg-black/80 hover:-translate-y-2 transition-all duration-300 relative group overflow-hidden md:mt-12 md:bg-gradient-to-b from-primary/5 to-transparent border-primary/20">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl font-black font-mono group-hover:text-primary transition-colors">2</div>
              <div className="p-4 bg-primary/20 rounded-2xl mb-8">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-2xl mb-4">Deep Tutoring</h3>
              <p className="text-white/50 leading-relaxed mb-6 z-10">
                Instead of just summarizing, the AI explains the material like an expert professor.
              </p>
              <ul className="space-y-3 text-sm text-white/70 w-full z-10 font-medium">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-3 text-primary shrink-0" /> Generates concise key summaries</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-3 text-primary shrink-0" /> Simplifies complex terminology</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-3 text-primary shrink-0" /> Connects topics conceptually</li>
              </ul>
            </div>
            
            {/* Step 3 */}
            <div className="glass-panel text-white rounded-3xl p-10 flex flex-col items-start hover:border-primary/50 hover:bg-black/80 hover:-translate-y-2 transition-all duration-300 relative group overflow-hidden md:mt-24">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl font-black font-mono group-hover:text-primary transition-colors">3</div>
              <div className="p-4 bg-primary/10 rounded-2xl mb-8">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-2xl mb-4">Strict Examination</h3>
              <p className="text-white/50 leading-relaxed mb-6 z-10">
                Put your knowledge to the test. Let the AI generate multiple choice quizzes precisely from the text you provided.
              </p>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden z-10">
                <div className="h-full bg-primary w-2/3 shadow-glow"></div>
              </div>
              <span className="text-xs font-mono text-primary mt-2 z-10 uppercase tracking-wider">Pass Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 bg-black z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center opacity-50 space-y-4 md:space-y-0">
          <div className="text-sm font-semibold tracking-wider">
            CLARIX.AI &copy; {new Date().getFullYear()}
          </div>
          <div className="text-xs uppercase tracking-widest font-mono">
            System Online. All Systems Go.
          </div>
        </div>
      </footer>
    </div>
  );
}