import MCQCard from './MCQCard';

export default function MCQList({ questions = [] }) {
  if (questions.length === 0) {
    return (
      <div className="space-y-2">
        <MCQCard 
          index={0} 
          question="What is the primary function of Clarix AI?"
          options={[
            "To edit videos",
            "To summarize text and generate quizzes",
            "To build 3D models",
            "To send emails"
          ]}
          correctAnswerIndex={1}
        />
        <MCQCard 
          index={1}
          question="Which types of documents are currently supported?"
          options={[
            "PDF, DOCX, and TXT",
            "Images and Audio",
            "Excel files only",
            "ZIP archives"
          ]}
          correctAnswerIndex={0}
        />
        <MCQCard 
          index={2}
          question="How does Clarix generate its multiple-choice questions?"
          options={[
            "Randomly guessing words",
            "Human experts review the document",
            "Using advanced Large Language Models (LLMs)",
            "Searching Wikipedia"
          ]}
          correctAnswerIndex={2}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((q, idx) => (
        <MCQCard key={idx} index={idx} question={q.question} options={q.options} correctAnswerIndex={q.correctAnswerIndex} />
      ))}
    </div>
  );
}
