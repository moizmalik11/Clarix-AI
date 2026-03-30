import { Trophy } from 'lucide-react';

export default function ScoreBanner({ score = 7, total = 10 }) {
  if (total === 0) return null;

  const percentage = Math.round((score / total) * 100);

  return (
    <div className="bg-primary text-primary-foreground rounded-2xl shadow-lg p-8 flex flex-col sm:flex-row items-center justify-between overflow-hidden relative">
      <div className="absolute -right-10 -top-10 opacity-10">
        <Trophy className="w-48 h-48" />
      </div>
      
      <div className="flex items-center gap-6 z-10">
        <div className="bg-primary-foreground/20 p-4 rounded-full">
          <Trophy className="w-10 h-10 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-1">Quiz Completed!</h3>
          <p className="text-primary-foreground/80 font-medium">You've successfully finished the assessment.</p>
        </div>
      </div>

      <div className="mt-6 sm:mt-0 text-center z-10 bg-primary-foreground/10 py-4 px-8 rounded-xl backdrop-blur-sm border border-primary-foreground/20">
        <p className="text-sm font-semibold text-primary-foreground/80 uppercase tracking-wider mb-1">Final Score</p>
        <p className="text-4xl font-extrabold flex items-baseline justify-center gap-1">
          {score}
          <span className="text-xl text-primary-foreground/60 font-medium">/ {total}</span>
        </p>
        <p className="text-sm mt-1 font-semibold text-green-300">{percentage}% Accuracy</p>
      </div>
    </div>
  );
}
