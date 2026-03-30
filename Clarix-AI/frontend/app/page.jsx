import Link from 'next/link';
import { ArrowRight, BrainCircuit, FileSearch, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-32 md:py-48 max-w-5xl mx-auto">
        <div className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground mb-8">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          Clarix AI 1.0 is Live
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-8">
          Transform Documents into <br className="hidden md:block"/>
          <span className="text-primary">Actionable Knowledge</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl leading-relaxed">
          Upload any PDF or Document. Our AI immediately reads, summarizes, and generates custom multiple-choice quizzes to accelerate your learning process.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/upload">
            <Button size="lg" className="w-full sm:w-auto h-12 px-8">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8">
              View Features
            </Button>
          </a>
        </div>
      </section>

      <section id="features" className="py-24 px-6 border-t border-border bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Core Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Everything you need to digest massive amounts of information efficiently.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card text-card-foreground rounded-xl border border-border shadow-sm p-8 flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="p-3 bg-primary/10 rounded-lg mb-6 text-primary">
                <FileSearch className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Intelligent Summaries</h3>
              <p className="text-muted-foreground leading-relaxed">Skip the fluff. Clarix extracts core concepts, definitions, and key takeaways in seconds.</p>
            </div>
            
            <div className="bg-card text-card-foreground rounded-xl border border-border shadow-sm p-8 flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="p-3 bg-primary/10 rounded-lg mb-6 text-primary">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Dynamic Quizzes</h3>
              <p className="text-muted-foreground leading-relaxed">Turn material into an interactive quiz. Choose your difficulty and the number of questions to test your knowledge.</p>
            </div>
            
            <div className="bg-card text-card-foreground rounded-xl border border-border shadow-sm p-8 flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="p-3 bg-primary/10 rounded-lg mb-6 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground leading-relaxed">Powered by advanced LLMs, processing happens blazingly fast without making you wait for hours.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Clarix AI. Enterprise Grade Document Intelligence.</p>
      </footer>
    </div>
  );
}
