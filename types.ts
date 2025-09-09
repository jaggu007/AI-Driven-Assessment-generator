
export enum QuestionType {
  MULTIPLE_CHOICE = 'Multiple Choice',
  TRUE_FALSE = 'True/False',
  SHORT_ANSWER = 'Short Answer',
}

export interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface Assessment {
  topic: string;
  questionType: QuestionType;
  questions: Question[];
}
