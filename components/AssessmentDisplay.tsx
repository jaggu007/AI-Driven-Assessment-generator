
import React from 'react';
import type { Assessment } from '../types';
import QuestionCard from './QuestionCard';

interface AssessmentDisplayProps {
  assessment: Assessment;
}

const AssessmentDisplay: React.FC<AssessmentDisplayProps> = ({ assessment }) => {
  return (
    <div className="space-y-8">
      <header className="pb-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{assessment.topic}</h2>
        <p className="text-md text-slate-500 dark:text-slate-400">{assessment.questionType} Assessment</p>
      </header>
      <div className="space-y-4">
        {assessment.questions.map((q, index) => (
          <QuestionCard key={index} question={q} index={index} />
        ))}
      </div>
    </div>
  );
};

export default AssessmentDisplay;
