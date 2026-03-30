import { FileText } from 'lucide-react';

export default function SummaryBox({ text = "AI generated summary will appear here once the document is processed. This summary typically captures the core concepts, objectives, and findings of the uploaded document, ensuring you grasp the primary topics without reading entirely through the original text." }) {
  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <FileText className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-lg text-foreground">Document Summary</h3>
      </div>
      <div className="prose prose-sm md:prose-base text-muted-foreground leading-relaxed">
        <p>{text}</p>
      </div>
    </div>
  );
}
