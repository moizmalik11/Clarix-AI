import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/40 flex items-center justify-between px-6 md:px-12 lg:px-16 z-50 transition-all duration-300">
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />
      
      <Link href="/" className="font-display font-black text-2xl flex items-center gap-2.5 text-slate-900 hover:opacity-90 transition-opacity">
        <div className="p-2 bg-indigo-50 border border-indigo-100/50 rounded-xl shadow-sm">
          <GraduationCap className="h-6 w-6 text-primary shrink-0" />
        </div>
        <span className="tracking-tight text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-indigo-750">Clarix AI</span>
      </Link>
      
      <div className="flex items-center gap-6">
        <Link href="/upload">
          <Button variant="default" size="default" className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold hover:from-indigo-750 hover:to-indigo-800 transition-all rounded-xl px-6 h-11 shadow-md shadow-indigo-600/10 hover:shadow-lg hover:shadow-indigo-600/20 hover:-translate-y-0.5 active:translate-y-0">
            Start Learning
          </Button>
        </Link>
      </div>
    </nav>
  );
}