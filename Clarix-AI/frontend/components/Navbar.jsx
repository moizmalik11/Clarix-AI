import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="fixed w-full h-16 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6 md:px-12 z-50 transition-all duration-300 shadow-sm">
      <Link href="/" className="font-extrabold text-2xl flex items-center gap-2 text-slate-800 hover:text-primary transition-colors">
        <GraduationCap className="h-8 w-8 text-primary shrink-0" />
        <span className="tracking-tight text-xl">Clarix AI</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <Link href="/upload">
          <Button variant="default" size="sm" className="bg-primary text-white font-semibold hover:bg-primary/90 transition-all rounded-full px-6 shadow-md hover:shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5">
            Start Learning
          </Button>
        </Link>
      </div>
    </nav>
  );
}