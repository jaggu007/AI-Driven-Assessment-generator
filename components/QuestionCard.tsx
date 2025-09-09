
import React, { useState } from 'react';
import type { Question } from '../types';
import { QuestionType } from '../types';
import { BulbIcon, CheckIcon, ChevronDownIcon, IncorrectIcon } from './Icons';

interface QuestionCardProps {
  question: Question;
  index: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, index }) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const isMultipleChoice = question.options && question.options.length > 0;
  
  const handleOptionSelect = (option: string) => {
      if (selectedOption === null) {
          setSelectedOption(option);
          setIsAnswerVisible(true);
      }
  }

  const getOptionClasses = (option: string) => {
    if (!isAnswerVisible || selectedOption === null) {
        return "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600";
    }
    if (option === question.answer) {
        return "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 ring-2 ring-green-500";
    }
    if (option === selectedOption && option !== question.answer) {
        return "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 ring-2 ring-red-500";
    }
    return "bg-slate-100 dark:bg-slate-700";
  }

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-md p-6 ring-1 ring-slate-200 dark:ring-slate-700/50 transition-all duration-300">
      <p className="font-semibold text-lg text-slate-800 dark:text-slate-100">
        <span className="text-blue-500 font-bold mr-2">Q{index + 1}:</span>
        {question.question}
      </p>

      {isMultipleChoice && (
        <div className="mt-4 space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleOptionSelect(option)}
              disabled={selectedOption !== null}
              className={`w-full text-left flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${getOptionClasses(option)} disabled:cursor-not-allowed`}
            >
                <span className="flex-grow">{option}</span>
                {isAnswerVisible && option === question.answer && <CheckIcon />}
                {isAnswerVisible && option === selectedOption && option !== question.answer && <IncorrectIcon />}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4">
        {!isAnswerVisible && !isMultipleChoice && (
            <button
            onClick={() => setIsAnswerVisible(!isAnswerVisible)}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            Show Answer <ChevronDownIcon className={`transform transition-transform ${isAnswerVisible ? 'rotate-180' : ''}`} />
          </button>
        )}
        
        {isAnswerVisible && (
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 animate-fade-in">
            <p className="font-semibold text-green-600 dark:text-green-400">
                Correct Answer: <span className="font-bold">{question.answer}</span>
            </p>
            <div className="flex items-start gap-2 mt-2 text-sm text-slate-600 dark:text-slate-300">
              <BulbIcon className="flex-shrink-0 mt-1"/>
              <p>
                <span className="font-semibold">Explanation:</span> {question.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
