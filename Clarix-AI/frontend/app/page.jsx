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
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-slate-50 text-slate-800 pt-10">

      {/* Modern Mesh Grid Overlay */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid-mask -z-20 opacity-70 pointer-events-none" />

      {/* Decorative Orbs Base */}
      <div className="fixed top-[-10%] right-[-5%] w-[45vw] h-[45vw] bg-indigo-200/30 blur-[130px] rounded-full -z-10 animate-blob pointer-events-none"></div>
      <div className="fixed bottom-10 left-[-10%] w-[35vw] h-[35vw] bg-emerald-250/20 blur-[120px] rounded-full -z-10 animate-blob-reverse pointer-events-none"></div>
      <div className="fixed top-[40%] left-[45%] w-[25vw] h-[25vw] bg-purple-200/20 blur-[100px] rounded-full -z-10 animate-blob pointer-events-none"></div>

      {/* Hero Section: Left Align Text, Right Align Illustration */}
      <section className="relative w-full max-w-7xl mx-auto px-6 pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-36 z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Content */}
          <div className="flex flex-col items-start text-left">
            <FadeIn delay={100} className="inline-flex items-center rounded-full border border-indigo-150 px-4 py-1.5 text-xs font-semibold bg-indigo-50/50 backdrop-blur-md text-indigo-750 mb-6 shadow-sm shadow-indigo-100/50 hover:bg-indigo-50 transition-colors">
              <span className="relative flex h-2.5 w-2.5 mr-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
              </span>
              Your Personal AI Tutor & Examiner
            </FadeIn>

            <FadeIn delay={200}>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-[1.08] lg:max-w-2xl">
                Master Any <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-550 to-blue-500">
                  Syllabus Easily.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={300}>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed font-medium">
                Upload your notes, books, or lectures. Clarix instantly transforms static documents into complete, interactive learning experiences ranging from active tutoring to rigorous mock exams.
              </p>
            </FadeIn>

            <FadeIn delay={400} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/upload" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-bold shadow-xl shadow-indigo-600/25 hover:shadow-2xl hover:shadow-indigo-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl">
                  Start Your Session <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg border-slate-200 text-slate-700 bg-white/60 backdrop-blur hover:bg-slate-50 rounded-xl transition-all duration-300 shadow-sm shadow-slate-100 hover:border-slate-350">
                  See How It Works
                </Button>
              </a>
            </FadeIn>
          </div>

          {/* Right Composite Illustration - High-Fidelity App Mockup */}
          <FadeIn delay={300} className="hidden md:flex relative w-full h-[550px] items-center justify-center">
            {/* Glowing backdrop under the mockup */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-400/20 blur-[80px] rounded-full -z-10 animate-blob pointer-events-none"></div>

            {/* Main Dashboard Window */}
            <div className="absolute w-[520px] h-[390px] bg-white border border-slate-200/80 rounded-2xl shadow-[0_20px_50px_rgba(99,102,241,0.15)] flex flex-col overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-700 ease-out pointer-events-auto">
              {/* Window Header */}
              <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                <div className="mx-auto text-[10px] font-bold text-slate-400 tracking-wider">CLARIX WORKSPACE</div>
              </div>

              {/* Window Body */}
              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-36 bg-slate-50/80 border-r border-slate-100 flex flex-col p-3 gap-2 shrink-0">
                  <div className="flex items-center gap-1.5 px-1.5 py-1 mb-2">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    <span className="text-[11px] font-black tracking-tight text-slate-800">Workspace</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="bg-indigo-50/70 text-indigo-700 font-bold text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-2">
                      <BookOpen className="w-3 h-3 text-indigo-600" />
                      <span>Materials</span>
                    </div>
                    <div className="text-slate-500 font-medium text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-slate-100 transition-colors">
                      <BrainCircuit className="w-3 h-3 text-slate-450" />
                      <span>AI Tutor</span>
                    </div>
                    <div className="text-slate-500 font-medium text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-slate-100 transition-colors">
                      <FileText className="w-3 h-3 text-slate-450" />
                      <span>Quizzes</span>
                    </div>
                  </div>
                </div>

                {/* Main Workspace Area */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden">
                  {/* Workspace Header */}
                  <div className="h-10 border-b border-slate-100 px-4 flex items-center justify-between shrink-0">
                    <span className="text-[10px] font-extrabold text-slate-800">Unit 2: Molecular Biology</span>
                    <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold px-2 py-0.5 rounded-full">ACTIVE STUDY</span>
                  </div>

                  {/* Content Split */}
                  <div className="flex-1 flex overflow-hidden">
                    {/* Chat Pane */}
                    <div className="w-[52%] border-r border-slate-50 p-3 flex flex-col gap-2.5 overflow-y-auto">
                      <div className="flex flex-col gap-1 items-start">
                        <div className="bg-indigo-50/80 border border-indigo-100/50 p-2 rounded-xl rounded-tl-none text-[9px] leading-relaxed text-indigo-950 font-semibold max-w-[92%] shadow-sm">
                          👋 ATP is the cell's energy currency. Do you want to run a quick test on this?
                        </div>
                        <span className="text-[7.5px] text-slate-400 font-bold px-1">Clarix AI • Just now</span>
                      </div>
                      
                      <div className="flex flex-col gap-1 items-end">
                        <div className="bg-slate-100 p-2 rounded-xl rounded-tr-none text-[9px] leading-relaxed text-slate-800 font-semibold max-w-[92%] shadow-sm">
                          Yes, quiz me on it!
                        </div>
                        <span className="text-[7.5px] text-slate-400 font-bold px-1">You • Just now</span>
                      </div>
                    </div>

                    {/* Quiz Preview Pane */}
                    <div className="w-[48%] bg-slate-50/20 p-3 flex flex-col gap-2 overflow-y-auto">
                      <div className="bg-white border border-slate-100 rounded-xl p-2.5 shadow-sm">
                        <div className="text-[7px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Question 1 of 5</div>
                        <h5 className="text-[9px] font-extrabold text-slate-800 mb-2 leading-tight">Where is ATP synthesized?</h5>
                        <div className="flex flex-col gap-1">
                          <div className="border border-slate-100/80 rounded-md p-1.5 text-[8px] font-bold text-slate-500 flex items-center justify-between">
                            <span>Nucleus</span>
                          </div>
                          <div className="bg-emerald-50 border border-emerald-200 rounded-md p-1.5 text-[8px] font-bold text-emerald-800 flex items-center justify-between">
                            <span>Mitochondria</span>
                            <CheckCircle className="w-2.5 h-2.5 text-emerald-600 fill-emerald-100" />
                          </div>
                          <div className="border border-slate-100/80 rounded-md p-1.5 text-[8px] font-bold text-slate-500 flex items-center justify-between">
                            <span>Ribosome</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping Floating Card 1 (Concept Mapped) */}
            <div className="absolute top-10 left-[-30px] glass-card-premium p-3.5 rounded-2xl flex items-center gap-3 animate-float shadow-xl max-w-[210px] border border-white/60 pointer-events-auto">
              <div className="p-2.5 bg-indigo-50 border border-indigo-100/50 rounded-xl text-primary"><BrainCircuit className="w-5 h-5" /></div>
              <div>
                <p className="text-[11px] font-black text-slate-900 leading-tight">Concept Mapped</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[98%] rounded-full"></div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-500">98%</span>
                </div>
              </div>
            </div>

            {/* Overlapping Floating Card 2 (Quiz Result) */}
            <div className="absolute bottom-10 right-[-10px] glass-card-premium p-3.5 rounded-2xl flex items-center gap-3 animate-float-delayed shadow-xl max-w-[200px] border border-white/60 pointer-events-auto">
              <div className="p-2.5 bg-emerald-50 border border-emerald-100/50 rounded-xl text-emerald-600"><CheckCircle className="w-5 h-5" /></div>
              <div>
                <p className="text-[11px] font-black text-slate-900 leading-tight">Mock Exam</p>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200/50 px-2 py-0.5 rounded-full inline-block mt-1">A+ Expected</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Beginner / Student Guide Section */}
      <section className="py-24 bg-white/40 border-y border-slate-200/60 relative z-10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-xs font-bold tracking-widest text-primary uppercase bg-indigo-50/50 border border-indigo-100/50 px-3 py-1 rounded-full">The Student Guide</span>
              <h2 className="font-display text-3xl md:text-4xl font-black mt-3 text-slate-900">Your First 5 Minutes With Clarix</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", icon: UploadCloud, title: "Upload Book", desc: "Drag and drop your syllabus or chapter notes via PDF/Docx." },
              { num: "02", icon: BrainCircuit, title: "Let AI Read", desc: "Our engine parses and understands the context perfectly." },
              { num: "03", icon: BookOpen, title: "Study Session", desc: "Read the auto-generated summaries grouped by core concept." },
              { num: "04", icon: GraduationCap, title: "Take Quiz", desc: "Finalize your preparation with a tough examiner quiz!" },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 150} className="glass-card-premium p-6 rounded-2xl flex flex-col hover:border-indigo-500/20 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full group-hover:bg-indigo-500/10 transition-colors -z-10" />
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 bg-indigo-50 border border-indigo-100/50 rounded-xl text-primary group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="font-display text-4xl font-black text-slate-200 group-hover:text-indigo-100 transition-colors">{stat.num}</span>
                </div>
                <h4 className="font-display font-extrabold text-xl text-slate-900 mb-2">{stat.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{stat.desc}</p>
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
              <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight mb-6 text-slate-900">How Clarix Trains Your Brain</h2>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
                We bridge the gap between reading passively and understanding actively using powerful cognitive patterns taught entirely by AI.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-12">
            {/* Feature 1 */}
            <FadeIn>
              <div className="glass-card-premium rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 hover:border-indigo-500/10">
                <div className="flex-1">
                  <div className="inline-flex w-16 h-16 bg-blue-50 border border-blue-100/50 rounded-2xl items-center justify-center text-blue-600 mb-6 shadow-inner">
                    <BookOpen size={32} />
                  </div>
                  <h3 className="font-display text-3xl font-black text-slate-900 mb-4">Deep Conceptual Tutoring</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">
                    We don't just summarize. The AI highlights the most crucial learning points, removes the fluff, and explains concepts simply—like an expert human tutor sitting right next to you.
                  </p>
                </div>
                {/* Feature 1 Interactive Mockup Board */}
                <div className="flex-1 w-full md:w-auto h-72 bg-gradient-to-br from-indigo-50/30 to-blue-50/30 rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between overflow-hidden shadow-inner relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300/10 blur-2xl rounded-full" />
                  
                  <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Concept Board</span>
                      <span className="text-[9px] font-bold text-slate-400">Core Topic 1.1</span>
                    </div>
                    <h4 className="text-sm font-black text-slate-800">Photosynthesis: Light-dependent Reactions</h4>
                    
                    <div className="space-y-2 border-t border-slate-50 pt-2.5">
                      <div className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <p className="text-[11px] font-semibold text-slate-600 leading-normal">
                          Occurs in the <strong className="text-slate-800">thylakoid membrane</strong> of chloroplasts.
                        </p>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <p className="text-[11px] font-semibold text-slate-600 leading-normal">
                          Light energy is absorbed by chlorophyll, splitting water molecules (photolysis) to release oxygen.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right mt-2">Active Conceptual Summary</div>
                </div>
              </div>
            </FadeIn>

            {/* Feature 2 */}
            <FadeIn delay={200}>
              <div className="glass-card-premium rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row-reverse items-center gap-10 hover:border-emerald-500/10">
                <div className="flex-1">
                  <div className="inline-flex w-16 h-16 bg-emerald-50 border border-emerald-100/50 rounded-2xl items-center justify-center text-emerald-600 mb-6 shadow-inner">
                    <FileText size={32} />
                  </div>
                  <h3 className="font-display text-3xl font-black text-slate-900 mb-4">Strict Document-Based Exams</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">
                    When you are ready, challenge yourself. The examiner generates custom Multiple Choice Questions (MCQs) sourced *strictly* from the material you provided. No outside knowledge allowed.
                  </p>
                  <ul className="space-y-3 font-semibold text-slate-650">
                    <li className="flex items-center"><CheckCircle className="text-emerald-500 w-5 h-5 mr-3 fill-emerald-50" /> Automated Scoring & Grading</li>
                    <li className="flex items-center"><CheckCircle className="text-emerald-500 w-5 h-5 mr-3 fill-emerald-50" /> Immediate Conceptual Explanations</li>
                  </ul>
                </div>
                {/* Feature 2 Interactive Quiz Feed */}
                <div className="flex-1 w-full md:w-auto h-72 bg-gradient-to-br from-emerald-50/20 to-teal-50/20 rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between overflow-hidden shadow-inner relative">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-300/10 blur-2xl rounded-full" />

                  <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col gap-2.5">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Practice Exam</span>
                      <span className="text-[9px] font-bold text-slate-400">MCQ Mock</span>
                    </div>
                    
                    <h4 className="text-xs font-black text-slate-800 leading-snug">What is the primary role of RuBisCO?</h4>

                    <div className="space-y-1.5">
                      <div className="border border-slate-100 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-slate-600 bg-slate-50/50 flex items-center justify-between">
                        <span>Splitting water molecules</span>
                      </div>
                      <div className="bg-emerald-50 border border-emerald-250 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-emerald-800 flex items-center justify-between">
                        <span>Carbon dioxide fixation in the Calvin cycle</span>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 shrink-0" />
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left mt-2">Custom Document verification</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 py-10 px-6 bg-white/70 backdrop-blur z-10 w-full mt-auto relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="font-display text-sm font-black text-slate-800 tracking-wider flex items-center gap-2">
            <div className="p-1 bg-indigo-50 border border-indigo-100 rounded-lg text-primary">
              <GraduationCap className="h-4 w-4" />
            </div>
            CLARIX AI &copy; {new Date().getFullYear()}
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            A smarter way to study.
          </div>
        </div>
      </footer>
    </div>
  );
}