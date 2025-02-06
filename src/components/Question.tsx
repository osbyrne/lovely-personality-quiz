import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: number) => void;
  currentQuestion: number;
  totalQuestions: number;
}

const Question = ({ question, options, onAnswer, currentQuestion, totalQuestions }: QuestionProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground mb-2">
          Question {currentQuestion + 1} of {totalQuestions}
        </p>
        <div className="w-full bg-secondary h-2 rounded-full">
          <div 
            className="bg-[#FFDEE2] h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
      
      <Card className="p-6 shadow-lg border-2 border-[#FFDEE2]/20">
        <h2 className="text-2xl font-semibold text-center mb-8">{question}</h2>
        <div className="grid gap-4">
          {options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="p-6 text-lg hover:bg-[#FFDEE2]/20 hover:border-[#FFDEE2] transition-all duration-300"
              onClick={() => onAnswer(index)}
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Question;