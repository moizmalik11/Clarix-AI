import './globals.css';
import Navbar from '../components/Navbar';
import { ClarixProvider } from '../context/ClarixContext';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: 'Clarix AI | Enterprise Document Intelligence',
  description: 'AI-powered PDF summarizer and MCQ generator',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cn("dark font-sans", inter.variable)}>
      <body className="antialiased selection:bg-primary selection:text-black">
        <ClarixProvider>
          <Navbar />
          <main className="min-h-screen pt-16 flex flex-col">
            {children}
          </main>
        </ClarixProvider>
      </body>
    </html>
  );
}
