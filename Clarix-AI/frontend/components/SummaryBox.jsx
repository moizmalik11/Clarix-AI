import { FileText, List } from 'lucide-react';

export default function SummaryBox({ title = "Document Summary", text = "", type = "paragraph" }) {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border transition-all hover:shadow-md h-full">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
        <div className={`p-2 rounded-lg ${type === 'bullet' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>
          {type === 'bullet' ? <List className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
        </div>
        <h3 className="font-bold text-lg text-foreground">{title}</h3>
      </div>
      
      <div className="prose prose-sm md:prose-base text-muted-foreground leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar pr-2 whitespace-pre-line">
        {type === 'bullet' ? (
          <ul>
            {text.split('\n').map((line, idx) => {
              const cleanLine = line.replace(/^[-\*\•]\s*/, '').trim();
              if (cleanLine) {
                return <li key={idx} className="mb-2 list-disc ml-4">{cleanLine}</li>;
              }
              return null;
            })}
          </ul>
        ) : (
          <p>{text || "No content generated."}</p>
        )}
      </div>
    </div>
  );
}
