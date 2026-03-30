import SummaryBox from '../../components/SummaryBox';
import MCQList from '../../components/MCQList';
import ScoreBanner from '../../components/ScoreBanner';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

export default function ResultPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl bg-background min-h-screen mt-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Analysis Complete</h1>
          <p className="text-muted-foreground mt-2">Here is your summary and generated assessment.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/upload">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </Link>
          <Button variant="default">
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
          <SummaryBox />
          <ScoreBanner score={7} total={10} />
        </div>
        
        <div className="lg:col-span-8 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="mb-6 border-b border-border pb-4">
            <h2 className="text-xl font-semibold text-foreground">Knowledge Assessment</h2>
            <p className="text-sm text-muted-foreground mt-1">Answer the questions below based on the generated summary.</p>
          </div>
          <MCQList />
        </div>
      </div>
    </div>
  );
}
