import Link from 'next/link';
import { Layers } from 'lucide-react';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <nav className="fixed w-full h-16 bg-transparent backdrop-blur-md border-b border-border/10 flex items-center justify-between px-6 md:px-12 z-50 text-foreground transition-all duration-300">
      <Link href="/" className="font-bold text-2xl flex items-center gap-2 hover:text-primary transition-colors">
        <Layers className="h-7 w-7 text-primary" />
        <span className="tracking-tight drop-shadow-md">Clarix AI</span>
      </Link>
      
      
      <div className="flex items-center gap-4">
        <Link href="/upload">
          <Button variant="default" size="sm" className="bg-primary text-black font-semibold hover:bg-primary/80 transition-all rounded-full px-6 shadow-md shadow-primary/20">Get Started</Button>
        </Link>
      </div>

      
    </nav>
  );
}
