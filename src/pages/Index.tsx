import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Question from '@/components/Question';
import Result from '@/components/Result';
import FlowerDecoration from '@/components/FlowerDecoration';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';

const questions = [
  {
    question: "What's your ideal Valentine's Day date?",
    options: [
      "A cozy night in with movies",
      "A romantic candlelit dinner",
      "An adventurous outdoor activity",
      "A creative DIY date"
    ]
  },
  {
    question: "Pick your favorite love language:",
    options: [
      "Words of affirmation",
      "Physical touch",
      "Acts of service",
      "Quality time"
    ]
  },
  {
    question: "What makes you feel most loved?",
    options: [
      "Surprise gifts and notes",
      "Warm hugs and cuddles",
      "Help with daily tasks",
      "Deep conversations"
    ]
  },
  {
    question: "Choose your perfect romantic gesture:",
    options: [
      "Handwritten love letters",
      "Surprise date planning",
      "Cooking their favorite meal",
      "Creating a photo album"
    ]
  }
];

const personalities = [
  {
    type: "Romantic Dreamer",
    description: "You're a true romantic at heart, always finding magic in the little moments and creating beautiful memories."
  },
  {
    type: "Caring Nurturer",
    description: "Your love runs deep and you show it through thoughtful actions and tender care for those you cherish."
  },
  {
    type: "Playful Sweetheart",
    description: "You bring joy and laughter to relationships, making every moment together feel special and fun."
  },
  {
    type: "Devoted Partner",
    description: "Your loyalty and dedication make you an incredible partner who always puts love first."
  }
];

const Index = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<{type: string, description: string} | null>(null);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Simple personality calculation
      const mostCommonAnswer = newAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as {[key: number]: number});

      const personalityIndex = Object.entries(mostCommonAnswer)
        .sort(([,a], [,b]) => b - a)[0][0];

      setResult(personalities[Number(personalityIndex)]);
    }
  };

  const handleRetake = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <FlowerDecoration />
        <Card className="max-w-lg w-full p-8 text-center space-y-6 shadow-lg border-2 border-[#FFDEE2]/20">
          <Heart className="w-16 h-16 mx-auto text-[#FFDEE2]" />
          <h1 className="text-3xl font-bold mb-4">Valentine's Personality Quiz</h1>
          <p className="text-lg text-muted-foreground">
            Discover your romantic personality type through this fun quiz!
          </p>
          <Button
            onClick={handleStart}
            className="bg-[#FFDEE2] hover:bg-[#FFDEE2]/90 text-foreground mt-4"
          >
            Start Quiz
          </Button>
        </Card>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <FlowerDecoration />
        <Result
          personality={result.type}
          description={result.description}
          onRetake={handleRetake}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <FlowerDecoration />
      <TransitionGroup>
        <CSSTransition
          key={currentQuestion}
          timeout={500}
          classNames="question"
        >
          <Question
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            onAnswer={handleAnswer}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
          />
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default Index;