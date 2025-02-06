import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';

interface ResultProps {
  personality: string;
  description: string;
  onRetake: () => void;
}

const Result = ({ personality, description, onRetake }: ResultProps) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Valentine Personality Test Result',
        text: `I got "${personality}"! ${description}`,
        url: window.location.href,
      }).catch(console.error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card className="p-8 text-center space-y-6 shadow-lg border-2 border-[#FFDEE2]/20">
        <Heart className="w-16 h-16 mx-auto text-[#FFDEE2]" />
        <h1 className="text-3xl font-semibold mb-4">You are a...</h1>
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-[#FFDEE2]">{personality}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            onClick={onRetake}
            variant="outline"
            className="hover:bg-[#FFDEE2]/20 hover:border-[#FFDEE2]"
          >
            Take Again
          </Button>
          <Button
            onClick={handleShare}
            className="bg-[#FFDEE2] hover:bg-[#FFDEE2]/90 text-foreground"
          >
            Share Result
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Result;