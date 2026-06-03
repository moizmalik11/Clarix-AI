"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  const pathname = usePathname();
  
  // Hide global navbar on home page to allow the nested mockup navbar to render
  if (pathname === "/") return null;

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/40 flex items-center justify-between px-6 md:px-12 z-50">
      <Link href="/" className="font-display font-black text-xl flex items-center gap-2 text-slate-900">
        <div className="p-1.5 bg-orange-500 rounded-lg text-white">
          <GraduationCap className="h-4 w-4 shrink-0" />
        </div>
        <span className="tracking-tight">Clarix AI</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <Link href="/upload">
          <Button variant="default" size="sm" className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-5 h-9 text-xs">
            Start Learning
          </Button>
        </Link>
      </div>
    </nav>
  );
}