import Link from 'next/link';
import { Layers } from 'lucide-react';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <nav className="fixed w-full h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 md:px-12 z-50">
      <Link href="/" className="font-semibold text-xl flex items-center gap-2 hover:opacity-90 transition">
        <Layers className="h-6 w-6 text-primary" />
        <span className="tracking-tight">Clarix AI</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <Link href="/upload">
          <Button variant="default" size="sm">Get Started</Button>
        </Link>
      </div>
    </nav>
  );
}
