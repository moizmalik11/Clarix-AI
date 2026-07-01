"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, BookOpen, BrainCircuit, FileText, GraduationCap,
  UploadCloud, CheckCircle, Lightbulb, UserCheck, Search,
  Users, Settings, Bell, MoreHorizontal, Mic, Video,
  ChevronRight, Check
} from "lucide-react";
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
    }, { threshold: 0.05 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out fill-mode-both ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Soft transition loader
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F2F2F2]">
        <div className="flex flex-col items-center max-w-xs w-full animate-pulse">
          <GraduationCap className="w-10 h-10 text-orange-500 mb-4" />
          <h1 className="text-lg font-bold tracking-tight text-neutral-800">
            Clarix Learning
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative bg-[#F2F2F2] text-[#111111] pt-10 pb-16 font-sans selection:bg-orange-500/10 selection:text-orange-600">

      {/* 1. Main Page Browser Chrome Wrapper */}
      <div className="w-full max-w-[760px] mx-auto bg-white border border-[#E0E0E0] rounded-2xl shadow-[0_15px_60px_rgba(0,0,0,0.06)] overflow-hidden mb-12">

        {/* Browser Top Bar */}
        <div className="h-11 bg-[#F0F0F0] border-b border-[#E0E0E0] flex items-center px-4 justify-between shrink-0 select-none">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
          </div>
          <div className="flex-1 max-w-[340px] bg-white border border-[#E0E0E0] rounded-[5px] h-6 flex items-center justify-center text-[10px] text-neutral-500 font-medium tracking-wide">
            www.clarix.ai/home
          </div>
          <div className="w-12"></div>
        </div>

        {/* Browser Content Body */}
        <div className="bg-[#F5F5F5] p-5 pb-0 flex flex-col gap-6">

          {/* Floating Pill Navbar inside browser */}
          <div className="w-full max-w-[660px] bg-white border border-[#E0E0E0] rounded-full px-5 py-2.5 flex items-center justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)] mx-auto mt-2 select-none">
            {/* Logo */}
            <Link href="/" className="font-display font-black text-sm flex items-center gap-1.5 text-[#111111]">
              <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z" />
              </svg>
              <span className="tracking-tight text-xs">Clarix AI</span>
            </Link>

            {/* Nav links */}
            <div className="flex items-center gap-5 text-[11px] font-bold text-[#666666]">
              <Link href="/" className="hover:text-[#111111] transition-colors">Home</Link>
              <a href="#how-it-works" className="hover:text-[#111111] transition-colors">Features</a>
              <a href="#student-guide" className="hover:text-[#111111] transition-colors">Guide</a>
              <Link href="/upload" className="hover:text-[#111111] transition-colors">Tutor</Link>
            </div>

            {/* Login button */}
            <div>
              <Link href="/upload">
                <Button variant="outline" size="sm" className="bg-transparent hover:bg-neutral-50 text-[#111111] border border-[#111111] font-bold rounded-full px-4 h-7 text-[10px] transition-all">
                  Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Gradient Card */}
          <div className="bg-gradient-to-r from-[#F9B9A8] to-[#C9B8F0] rounded-2xl pt-14 px-6 flex flex-col items-center overflow-hidden">

            {/* Eyebrow */}
            <span className="inline-block bg-white/70 border border-neutral-100/40 rounded-full px-3 py-0.5 text-[8.5px] font-bold tracking-[0.15em] text-[#666666] uppercase mb-4 select-none">
              UNLOCK CONVERSATIONAL POWER
            </span>

            {/* H1 Title */}
            <h1 className="font-display text-2xl sm:text-3xl md:text-[34px] font-black text-[#111111] leading-[1.12] text-center max-w-[500px] mb-4 tracking-[-0.01em]">
              Empower Your Conversations with Next-Gen Study Dashboard
            </h1>

            {/* Subtext */}
            <p className="text-[#444444] text-[11.5px] leading-relaxed text-center max-w-[340px] mb-6 font-medium">
              Unlock seamless communication and streamline your messaging experience with our innovative dashboard solution. Study smarter, chat directly with AI.
            </p>

            {/* CTA Button */}
            <Link href="/upload" className="mb-10 shrink-0">
              <Button className="bg-white hover:bg-neutral-50 text-[#111111] border border-[#333333] px-5 py-2 h-9 rounded-full font-bold text-[11px] shadow-sm hover:scale-102 transition-all">
                Get Started
              </Button>
            </Link>

            {/* Dashboard Mockup Card (Cropped at bottom edge) */}
            <div className="w-full max-w-[620px] bg-white border border-[#E0E0E0] rounded-t-xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] flex flex-col h-[240px] overflow-hidden translate-y-px text-[9px] select-none">

              {/* Window body */}
              <div className="flex flex-1 overflow-hidden">

                {/* Panel 1: Sidebar (110px) */}
                <div className="w-[110px] bg-[#FAFAFA] border-r border-[#E0E0E0]/60 p-2.5 flex flex-col gap-3 shrink-0">
                  <div className="flex items-center gap-1.5 px-0.5">
                    <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center font-bold text-[8px] text-orange-700">C</div>
                    <span className="text-[9.5px] font-extrabold text-neutral-850 truncate">Clarix Studio</span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[7px] font-black text-neutral-400 tracking-wider uppercase px-1 mb-0.5">OPTIONS</span>
                    <div className="bg-white border border-neutral-200/50 font-bold px-2 py-1 rounded-md flex items-center gap-1.5 text-neutral-800">
                      <Search className="w-2.5 h-2.5 text-neutral-400" />
                      <span>Search</span>
                    </div>
                    <div className="text-neutral-500 font-semibold px-2 py-1 rounded-md flex items-center gap-1.5 hover:bg-neutral-100/50">
                      <Users className="w-2.5 h-2.5 text-neutral-400" />
                      <span>Members</span>
                    </div>
                    <div className="text-neutral-500 font-semibold px-2 py-1 rounded-md flex items-center gap-1.5 hover:bg-neutral-100/50">
                      <Settings className="w-2.5 h-2.5 text-neutral-400" />
                      <span>Settings</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[7px] font-black text-neutral-400 tracking-wider uppercase px-1 mb-0.5">CHANNELS</span>
                    <div className="text-neutral-800 font-bold px-2 py-0.5 rounded flex items-center gap-1 bg-neutral-200/40">
                      <span># Biology-101</span>
                    </div>
                  </div>
                </div>

                {/* Panel 2: Center Chat */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden">
                  <div className="h-9 border-b border-[#E0E0E0]/60 px-3 flex items-center justify-between shrink-0">
                    <div>
                      <h4 className="text-[10px] font-black text-neutral-900 leading-none mb-0.5"># Biology-101</h4>
                      <span className="text-[7.5px] text-neutral-400 font-semibold">6 Members · 5 Online</span>
                    </div>
                  </div>

                  {/* Message rows */}
                  <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto">
                    <div className="flex gap-2">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-[8px] text-indigo-700 shrink-0">TK</div>
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[9px] font-bold text-neutral-950">Tiana Kerspaard</span>
                          <span className="text-[7px] text-neutral-400">5:20 PM</span>
                        </div>
                        <p className="text-[9px] leading-relaxed text-neutral-600 font-medium">
                          It's going well. We've made some good progress on the design and we're starting to work on the development phase.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center font-bold text-[8px] text-orange-700 shrink-0">CD</div>
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[9px] font-bold text-neutral-950">Corey Dias</span>
                          <span className="text-[7px] text-neutral-400">5:20 PM</span>
                        </div>
                        <p className="text-[9px] leading-relaxed text-neutral-600 font-medium">
                          That's great to hear. Have you run into any issues or roadblocks so far?
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-[8px] text-emerald-700 shrink-0">TR</div>
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[9px] font-bold text-neutral-950">Talan Rosser</span>
                          <span className="text-[7px] text-neutral-400">5:20 PM</span>
                        </div>
                        <p className="text-[9px] leading-relaxed text-neutral-600 font-medium">
                          Not really, everything has been going smoothly. We did have to make some changes to the initial plan, but we were able to adjust quickly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Panel 3: Right Sidebar (120px) */}
                <div className="w-[120px] bg-[#FAFAFA] border-l border-[#E0E0E0]/60 p-2.5 flex flex-col gap-2.5 shrink-0">
                  <h5 className="text-[8px] font-black tracking-wider text-neutral-400 uppercase">Detail Channels</h5>

                  <div className="space-y-0.5">
                    <span className="text-[7px] font-bold text-neutral-400">NAME CHANNEL</span>
                    <div className="text-[9px] font-extrabold text-neutral-900"># Biology-101</div>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[7px] font-bold text-neutral-400">ABOUT</span>
                    <p className="text-[8.5px] leading-relaxed text-neutral-500 font-semibold">
                      Discussion and Creating design with Superb result!
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[7px] font-bold text-neutral-400">MEMBERS</span>
                    <div className="flex flex-col gap-1 text-[8.5px] font-bold text-neutral-700">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span>Tiana K.</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span>Corey D.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grayscale Client Logos Bar inside browser wrapper */}
          <div className="bg-white border-t border-[#E0E0E0] py-4.5 px-6 flex justify-between items-center text-neutral-400 font-display font-black text-[10px] tracking-wider select-none shrink-0">
            <span>amazon</span>
            <span>▲ ATLASSIAN</span>
            <span>GitHub</span>
            <span>LaunchDarkly ➔</span>
            <span>NETFLIX</span>
            <span>Medium</span>
          </div>
        </div>
      </div>

      {/* Restored Student Guide Section (on main page background #F2F2F2) */}
      <section id="student-guide" className="py-16 max-w-[760px] mx-auto w-full px-4 scroll-mt-6">
        <div className="text-center mb-10">
          <span className="text-[9px] font-bold tracking-[0.12em] text-neutral-800 bg-white border border-[#E0E0E0] px-4 py-1 rounded-full shadow-sm uppercase select-none">
            The Student Guide
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold mt-4 text-[#111111] tracking-tight">
            Your First 5 Minutes With Clarix
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: "01", icon: UploadCloud, title: "Upload Book", desc: "Drag and drop your syllabus or chapter notes via PDF/Docx." },
            { num: "02", icon: BrainCircuit, title: "Let AI Read", desc: "Our engine parses and understands the context perfectly." },
            { num: "03", icon: BookOpen, title: "Study Session", desc: "Read the auto-generated summaries grouped by core concept." },
            { num: "04", icon: GraduationCap, title: "Take Quiz", desc: "Finalize your preparation with a tough examiner quiz!" },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 100} className="bg-white border border-[#E0E0E0] p-5 rounded-2xl flex flex-col group hover:border-neutral-300 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-neutral-50 border border-neutral-100 rounded-lg text-neutral-800 group-hover:scale-105 transition-transform duration-300">
                  <stat.icon className="w-4 h-4" />
                </div>
                <span className="font-display text-2xl font-black text-neutral-200 group-hover:text-neutral-300 transition-colors">{stat.num}</span>
              </div>
              <h4 className="font-display font-bold text-sm text-[#111111] mb-1">{stat.title}</h4>
              <p className="text-[11.5px] text-neutral-500 leading-relaxed font-semibold">{stat.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Restored How it Works / Core Features */}
      <section id="how-it-works" className="py-16 max-w-[760px] mx-auto w-full px-4 scroll-mt-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight mb-3 text-[#111111]">
            How Clarix Trains Your Brain
          </h2>
          <p className="text-neutral-500 text-sm max-w-md mx-auto leading-relaxed font-medium">
            We bridge the gap between reading passively and understanding actively using powerful cognitive patterns taught entirely by AI.
          </p>
        </div>

        <div className="space-y-8">
          {/* Feature 1 */}
          <FadeIn>
            <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 hover:border-neutral-300 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
              <div className="flex-1">
                <div className="inline-flex w-12 h-12 bg-neutral-50 border border-neutral-200/50 rounded-xl items-center justify-center text-neutral-800 mb-4 shadow-sm">
                  <BookOpen size={22} />
                </div>
                <h3 className="font-display text-xl font-bold text-[#111111] mb-2.5">Deep Conceptual Tutoring</h3>
                <p className="text-[12.5px] text-neutral-500 leading-relaxed font-medium">
                  We don't just summarize. The AI highlights the most crucial learning points, removes the fluff, and explains concepts simply—like an expert human tutor sitting right next to you.
                </p>
              </div>
              {/* Feature 1 Interactive Mockup Board */}
              <div className="flex-1 w-full md:w-auto h-52 bg-gradient-to-br from-rose-50/20 to-orange-50/20 rounded-xl border border-neutral-200 p-4 flex flex-col justify-between overflow-hidden shadow-inner relative text-[9px]">
                <div className="bg-white border border-neutral-200/60 rounded-xl p-3 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[8.5px] font-bold text-neutral-800 bg-neutral-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Concept Board</span>
                    <span className="text-[8px] font-bold text-slate-400">Core Topic 1.1</span>
                  </div>
                  <h4 className="text-[11px] font-black text-neutral-900">Photosynthesis: Light-dependent Reactions</h4>

                  <div className="space-y-1.5 border-t border-neutral-100 pt-1.5">
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-orange-500 mt-1 shrink-0" />
                      <p className="text-[9.5px] font-semibold text-neutral-550 leading-normal">
                        Occurs in the <strong className="text-neutral-950">thylakoid membrane</strong> of chloroplasts.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-[8.5px] font-bold text-neutral-450 uppercase tracking-widest text-right">Active Conceptual Summary</div>
              </div>
            </div>
          </FadeIn>

          {/* Feature 2 */}
          <FadeIn delay={100}>
            <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row-reverse items-center gap-8 hover:border-neutral-300 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
              <div className="flex-1">
                <div className="inline-flex w-12 h-12 bg-neutral-50 border border-neutral-200/50 rounded-xl items-center justify-center text-neutral-800 mb-4 shadow-sm">
                  <FileText size={22} />
                </div>
                <h3 className="font-display text-xl font-bold text-[#111111] mb-2.5">Strict Document-Based Exams</h3>
                <p className="text-[12.5px] text-neutral-500 leading-relaxed font-medium">
                  When you are ready, challenge yourself. The examiner generates custom Multiple Choice Questions (MCQs) sourced *strictly* from the material you provided. No outside knowledge allowed.
                </p>
              </div>
              {/* Feature 2 Interactive Quiz Feed */}
              <div className="flex-1 w-full md:w-auto h-52 bg-gradient-to-br from-rose-50/20 to-orange-50/20 rounded-xl border border-neutral-200 p-4 flex flex-col justify-between overflow-hidden shadow-inner relative text-[9px]">
                <div className="bg-white border border-neutral-200/60 rounded-xl p-3 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[8.5px] font-bold text-neutral-800 bg-neutral-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Practice Exam</span>
                    <span className="text-[8px] font-bold text-slate-400">MCQ Mock</span>
                  </div>

                  <h4 className="text-[10px] font-black text-neutral-900 leading-snug">What is the primary role of RuBisCO?</h4>

                  <div className="space-y-1">
                    <div className="border border-neutral-100 rounded-md px-2 py-1 text-[8.5px] font-bold text-neutral-500 bg-[#fafafa] flex items-center justify-between">
                      <span>Splitting water molecules</span>
                    </div>
                    <div className="bg-orange-50/50 border border-orange-200 rounded-md px-2 py-1 text-[8.5px] font-bold text-orange-800 flex items-center justify-between">
                      <span>Carbon dioxide fixation in the Calvin cycle</span>
                      <CheckCircle className="w-2.5 h-2.5 text-orange-600 fill-orange-50 shrink-0" />
                    </div>
                  </div>
                </div>

                <div className="text-[8.5px] font-bold text-neutral-450 uppercase tracking-widest text-left">Custom Document verification</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 max-w-[760px] mx-auto w-full px-4 border-t border-neutral-300/40 mt-12 relative">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="font-display text-xs font-black text-neutral-800 tracking-wider flex items-center gap-1.5">
            <div className="p-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-850">
              <GraduationCap className="h-3.5 w-3.5" />
            </div>
            CLARIX AI &copy; {new Date().getFullYear()}
          </div>
          <div className="text-[9.5px] font-bold text-neutral-400 uppercase tracking-widest">
            A smarter way to study.
          </div>
        </div>
      </footer>
    </div>
  );
}