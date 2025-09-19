import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Target, TrendingUp, Star, Gamepad2 } from "lucide-react";

interface FeedbackData {
  overallScore: number;
  encouragement:string;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  recommendedGames: string[];
}

const Feedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);

  const data = location.state?.analysis;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">No feedback data available.</p>
      </div>
    );
  }

  const feedback: FeedbackData = {
    overallScore: data.score,
    encouragement:data.encouragement,
    strengths: data.strengths,
    improvements: data.focusAreas,
    suggestions: data.tips,
    recommendedGames: data.recommendedGames,
  };

  useEffect(() => {
    // Simulate AI analysis results
    const simulateAnalysis = async () => {
      setLoading(true);
      
      // Simulate analysis time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock feedback data
      setLoading(false);
    };

    simulateAnalysis();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-sky flex items-center justify-center">
        <Card className="p-12 shadow-gentle border-forest-moss/30 text-center max-w-md">
          <div className="animate-spin text-6xl mb-6">🔍</div>
          <h2 className="text-2xl font-semibold text-forest-deep mb-4">
            Analyzing Your Writing
          </h2>
          <p className="text-forest-medium">
            Our forest AI is carefully examining your handwriting...
          </p>
          <div className="mt-6 space-y-2">
            <div className="text-sm text-forest-medium">Checking letter formation... ✓</div>
            <div className="text-sm text-forest-medium">Analyzing spacing... ✓</div>
            <div className="text-sm text-forest-medium">Evaluating consistency... ⏳</div>
          </div>
        </Card>
      </div>
    );
  }

  if (!feedback) return null;

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      <div className="bg-gradient-forest py-6 shadow-forest">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground text-center">
            🎯 Your Writing Feedback
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Overall Score */}
          <Card className="p-8 shadow-gentle border-forest-moss/30 bg-gradient-magic/10">
            <div className="text-center">
              <div className="text-6xl font-bold text-forest-deep mb-2">
                {feedback && feedback.overallScore}%
              </div>
              <h2 className="text-2xl font-semibold text-forest-deep mb-4">
                Great Job! 🌟
              </h2>
              <p className="text-forest-medium text-lg">
                {feedback && feedback.encouragement}
              </p>
            </div>
          </Card>

          {/* Strengths */}
          <Card className="p-6 shadow-gentle border-forest-leaf/40 bg-gradient-leaf/10">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="text-forest-leaf" size={24} />
              <h3 className="text-xl font-semibold text-forest-deep">
                What You're Doing Great! 🎉
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {feedback && feedback.strengths.map((strength, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-forest-leaf/20 rounded-lg">
                  <Star className="text-magic-warm mt-1 flex-shrink-0" size={16} />
                  <span className="text-forest-deep">{strength}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Areas for Improvement */}
          <Card className="p-6 shadow-gentle border-forest-moss/40 bg-gradient-earth/10">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-earth-medium" size={24} />
              <h3 className="text-xl font-semibold text-forest-deep">
                Areas to Focus On 🎯
              </h3>
            </div>
            <div className="space-y-3">
              {feedback && feedback.improvements.map((improvement, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-earth-light/20 rounded-lg">
                  <TrendingUp className="text-earth-medium mt-1 flex-shrink-0" size={16} />
                  <span className="text-forest-deep">{improvement}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Suggestions */}
          <Card className="p-6 shadow-gentle border-sky-medium/40 bg-gradient-sky/20">
            <h3 className="text-xl font-semibold text-forest-deep mb-4">
              💡 Helpful Tips for Improvement
            </h3>
            <div className="space-y-3">
              {feedback && feedback.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-sky-light/30 rounded-lg">
                  <span className="text-sky-medium font-semibold mt-1">{index + 1}.</span>
                  <span className="text-forest-deep">{suggestion}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recommended Games */}
          <Card className="p-6 shadow-gentle border-magic-warm/40 bg-gradient-magic/10">
            <div className="flex items-center gap-3 mb-4">
              <Gamepad2 className="text-magic-warm" size={24} />
              <h3 className="text-xl font-semibold text-forest-deep">
                Recommended Games for You! 🎮
              </h3>
            </div>
            <p className="text-forest-medium mb-4">
              Based on your handwriting analysis, these games will help you improve:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {feedback && feedback.recommendedGames.map((game, index) => (
                <div key={index} className="p-3 bg-magic-warm/20 rounded-lg text-center">
                  <span className="text-forest-deep font-medium">{game}</span>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                variant="magic" 
                size="lg"
                onClick={() => navigate('/games')}
                className="px-8 py-3"
              >
                🎮 Play Games Now!
              </Button>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="earth" 
              onClick={() => navigate('/upload')}
              className="px-8"
            >
              📸 Upload Another Writing
            </Button>
            <Button 
              variant="forest" 
              onClick={() => navigate('/')}
              className="px-8"
            >
              🏠 Back to Forest Entrance
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;