
import React, { useState, useCallback } from 'react';
import type { Assessment, QuestionType } from './types';
import { generateAssessment } from './services/geminiService';
import AssessmentForm from './components/AssessmentForm';
import AssessmentDisplay from './components/AssessmentDisplay';
import { LogoIcon } from './components/Icons';

const App: React.FC = () => {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (topic: string, numQuestions: number, questionType: QuestionType) => {
    setIsLoading(true);
    setError(null);
    setAssessment(null);
    try {
      const result = await generateAssessment(topic, numQuestions, questionType);
      setAssessment(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console and ensure your API key is set correctly.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 antialiased">
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <LogoIcon />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">
              AI Assessment Generator
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Instantly create quizzes on any topic for study or teaching.
          </p>
        </header>

        <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg p-6 md:p-8 ring-1 ring-slate-200 dark:ring-slate-700/50">
          <AssessmentForm onGenerate={handleGenerate} isLoading={isLoading} />
        </div>

        <div className="mt-10">
          {isLoading && (
            <div className="flex flex-col items-center justify-center text-center p-8">
               <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
               <p className="mt-4 text-slate-600 dark:text-slate-400">Generating your assessment... please wait.</p>
            </div>
          )}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600/50 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Oops! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {assessment && <AssessmentDisplay assessment={assessment} />}
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-slate-500 dark:text-slate-400">
        Powered by Google Gemini
      </footer>
    </div>
  );
};

export default App;
