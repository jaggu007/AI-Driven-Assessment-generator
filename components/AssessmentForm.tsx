
import React, { useState } from 'react';
import { QuestionType } from '../types';
import { GenerateIcon } from './Icons';

interface AssessmentFormProps {
  onGenerate: (topic: string, numQuestions: number, questionType: QuestionType) => void;
  isLoading: boolean;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onGenerate, isLoading }) => {
  const [topic, setTopic] = useState<string>('The Solar System');
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.MULTIPLE_CHOICE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && numQuestions > 0) {
      onGenerate(topic, numQuestions, questionType);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
      <div className="md:col-span-5">
        <label htmlFor="topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Topic
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., World War II, React Hooks"
          className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          required
        />
      </div>

      <div className="md:col-span-3">
        <label htmlFor="numQuestions" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Number of Questions
        </label>
        <input
          type="number"
          id="numQuestions"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Math.max(1, parseInt(e.target.value, 10)))}
          min="1"
          max="20"
          className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          required
        />
      </div>

      <div className="md:col-span-4">
        <label htmlFor="questionType" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Question Type
        </label>
        <select
          id="questionType"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value as QuestionType)}
          className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          {Object.values(QuestionType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-12 mt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 disabled:bg-slate-400 disabled:dark:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <GenerateIcon />
              <span>Generate Assessment</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AssessmentForm;
