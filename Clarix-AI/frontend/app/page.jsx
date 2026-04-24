"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, FileText, GraduationCap, UploadCloud, CheckCircle, Lightbulb, UserCheck } from "lucide-react";
import { Button } from "../components/ui/button";

// Animated entry wrapper for scrolling
function FadeIn({ children, delay = 0, className = "" }) {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    }, { threshold: 0.1 });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out fill-mode-both ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Gentle academic loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 600);
          return 100;
        }
        return prev + 2;
      });
    }, 15);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 transition-opacity duration-500 overflow-hidden">
        <div className="relative z-10 flex flex-col items-center max-w-xs w-full">
          <BookOpen className="w-16 h-16 text-primary mb-6 animate-pulse" />
          <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-800">
            Clarix Learning
          </h1>
          <p className="text-sm font-medium text-slate-500 mb-8 tracking-wide">
            Preparing your study environment... {progress}%
          </p>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-slate-50 text-slate-800">
      
      {/* Decorative Orbs Base */}
      <div className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-indigo-200/40 blur-[120px] rounded-full mix-blend-multiply -z-10 animate-float"></div>
      <div className="fixed bottom-10 left-[-10%] w-[30vw] h-[30vw] bg-emerald-200/30 blur-[100px] rounded-full mix-blend-multiply -z-10 animate-float-delayed"></div>

      {/* Hero Section: Left Align Text, Right Align Illustration */}
      <section className="relative w-full max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40 z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start text-left">
            <FadeIn delay={100} className="inline-flex items-center rounded-full border border-primary/20 px-4 py-1.5 text-sm font-medium bg-white/60 backdrop-blur text-primary mb-6 shadow-sm">
              <Lightbulb className="h-4 w-4 mr-2" />
              Your Personal AI Tutor & Examiner
            </FadeIn>
            
            <FadeIn delay={200}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                Master Any <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-blue-500">
                  Syllabus Easily.
                </span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={300}>
              <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed font-medium">
                Upload your notes, books, or lectures. 
                Clarix instantly transforms static documents into complete, interactive learning experiences ranging from active tutoring to rigorous mock exams.
              </p>
            </FadeIn>
            
            <FadeIn delay={400} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/upload" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:-translate-y-0.5 transition-all bg-primary text-white rounded-xl">
                  Start Your Session <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg border-slate-300 text-slate-700 bg-white/50 backdrop-blur-md hover:bg-slate-100 rounded-xl transition-all">
                  See How It Works
                </Button>
              </a>
            </FadeIn>
          </div>

          {/* Right Composite Illustration (CSS/React instead of real image for absolute safety and crisp UI) */}
          <FadeIn delay={300} className="hidden md:flex relative h-[500px] w-full items-center justify-center pointer-events-none">
            <div className="absolute w-[350px] h-[450px] bg-white/40 border border-white/80 rounded-[30px] shadow-2xl backdrop-blur-sm -rotate-3 transition-transform duration-700 hover:rotate-0 flex flex-col p-6 items-center justify-start overflow-hidden">
               <div className="w-full h-4 bg-slate-200 rounded-full mb-4 opacity-50"></div>
               <div className="w-4/5 h-4 bg-slate-200 rounded-full mb-10 opacity-50 place-self-start"></div>

               <div className="w-32 h-32 bg-indigo-100 text-primary rounded-3xl flex items-center justify-center shadow-inner mb-8 mt-4 animate-float">
                  <GraduationCap className="w-16 h-16" />
               </div>

               <div className="w-full bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-4 mt-auto mb-2 animate-float-delayed">
                 <CheckCircle className="text-green-500 w-8 h-8" />
                 <div className="flex-1">
                   <div className="h-3 w-1/2 bg-slate-300 rounded-full mb-2"></div>
                   <div className="h-3 w-3/4 bg-slate-200 rounded-full"></div>
                 </div>
               </div>
            </div>
            
            {/* Floating decoration cards */}
            <div className="absolute -left-12 top-1/4 glass-card p-4 rounded-2xl flex items-center gap-3 animate-float-delayed shadow-xl">
              <div className="p-2 bg-purple-100 rounded-xl"><BrainCircuit className="text-purple-600 w-6 h-6" /></div>
              <div>
                <p className="text-sm font-bold text-slate-800">Concept Mapped</p>
                <p className="text-xs text-slate-500">100% Retained</p>
              </div>
            </div>

             <div className="absolute -right-8 bottom-1/4 glass-card p-4 rounded-2xl flex items-center gap-3 animate-float shadow-xl">
              <div className="p-2 bg-amber-100 rounded-xl"><FileText className="text-amber-600 w-6 h-6" /></div>
              <div>
                <p className="text-sm font-bold text-slate-800">Quiz Generated</p>
                <p className="text-xs text-slate-500">A+ Expected</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Beginner / Student Guide Section */}
      <section className="py-24 bg-white/50 border-y border-slate-200 relative z-10 hidden sm:block">
         <div className="max-w-6xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-16">
                 <span className="text-sm font-bold tracking-widest text-primary uppercase">The Student Guide</span>
                 <h2 className="text-3xl font-extrabold mt-2 text-slate-900">Your First 5 Minutes With Clarix</h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-4 gap-6">
               {[
                 {num:"01", icon:UploadCloud, title:"Upload Book", desc:"Drag and drop your syllabus or chapter notes via PDF/Docx."},
                 {num:"02", icon:BrainCircuit, title:"Let AI Read", desc:"Our engine parses and understands the context perfectly."},
                 {num:"03", icon:BookOpen, title:"Study Session", desc:"Read the auto-generated summaries grouped by core concept."},
                 {num:"04", icon:GraduationCap, title:"Take Quiz", desc:"Finalize your preparation with a tough examiner quiz!"},
               ].map((stat, i) => (
                 <FadeIn key={i} delay={i * 150} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className="text-primary w-8 h-8" />
                      <span className="text-4xl font-black text-slate-100">{stat.num}</span>
                    </div>
                    <h4 className="font-bold text-xl text-slate-800 mb-2">{stat.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{stat.desc}</p>
                 </FadeIn>
               ))}
            </div>
         </div>
      </section>

      {/* How it Works / Core Features */}
      <section id="how-it-works" className="py-32 px-6 relative z-10 w-full">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-slate-900">How Clarix Trains Your Brain</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                We bridge the gap between reading passively and understanding actively using powerful cognitive patterns taught entirely by AI.
              </p>
            </div>
          </FadeIn>
          
          <div className="space-y-12">
            {/* Feature 1 */}
            <FadeIn>
              <div className="glass-card rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                  <div className="inline-flex w-16 h-16 bg-blue-100 rounded-2xl items-center justify-center text-blue-600 mb-6 shadow-inner">
                    <BookOpen size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-4">Deep Conceptual Tutoring</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    We don`t just summarize. The AI highlights the most crucial learning points, removes the fluff, and explains concepts simply—like an expert human tutor sitting right next to you.
                  </p>
                </div>
                <div className="flex-1 w-full md:w-auto h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center">
                   <div className="text-slate-400 font-medium italic">(Summary Concept Board Preview)</div>
                </div>
              </div>
            </FadeIn>

            {/* Feature 2 */}
            <FadeIn delay={200}>
              <div className="glass-card rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row-reverse items-center gap-10">
                <div className="flex-1">
                  <div className="inline-flex w-16 h-16 bg-emerald-100 rounded-2xl items-center justify-center text-emerald-600 mb-6 shadow-inner">
                    <FileText size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-4">Strict Document-Based Exams</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    When you are ready, challenge yourself. The examiner generates custom Multiple Choice Questions (MCQs) sourced *strictly* from the material you provided. No outside knowledge allowed.
                  </p>
                   <ul className="space-y-3 font-medium text-slate-600">
                    <li className="flex items-center"><CheckCircle className="text-green-500 w-5 h-5 mr-3"/> Automated Scoring & Grading</li>
                    <li className="flex items-center"><CheckCircle className="text-green-500 w-5 h-5 mr-3"/> Immediate Conceptual Explanations</li>
                   </ul>
                </div>
                <div className="flex-1 w-full md:w-auto h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center">
                    <div className="text-slate-400 font-medium italic">(Intelligent Quiz Feed Preview)</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 px-6 bg-white z-10 w-full mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm font-bold text-slate-800 tracking-wider flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" /> CLARIX AI &copy; {new Date().getFullYear()}
          </div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            A smarter way to study.
          </div>
        </div>
      </footer>
    </div>
  );
}