import MCQCard from './MCQCard';

export default function MCQList({ questions = [] }) {
  if (questions.length === 0) {
    return (
      <div className="space-y-4 text-center py-10 text-muted-foreground">
        <p>No questions generated.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {questions.map((q, idx) => {
        // q.options is [{text, is_correct}]
        const optionsList = q.options.map(opt => opt.text || opt);
        const correctIdx = q.options.findIndex(opt => opt.is_correct === true);
        
        return (
          <MCQCard 
            key={idx} 
            index={idx} 
            question={q.question} 
            options={optionsList} 
            correctAnswerIndex={correctIdx >= 0 ? correctIdx : 0} 
            explanation={q.explanation}
          />
        );
      })}
    </div>
  );
}
