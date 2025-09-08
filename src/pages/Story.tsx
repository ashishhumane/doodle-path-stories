import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import storyScene from "@/assets/story-scene.jpg";

const Story = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [story, setStory] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - replace with actual API call to /api/dysgraphia/story
    const fetchStory = async () => {
      try {
        setLoading(true);
        // Placeholder story for demo
        const demoStory = `Once upon a time, in a magical forest, there lived a wise old owl named Oliver. Oliver loved to help young woodland creatures learn new things. One day, he decided to teach them about the importance of practicing their writing.

"Writing is like creating magic," Oliver hooted softly. "Each letter you form is like planting a seed that will grow into wonderful thoughts and stories."

The forest animals gathered around as Oliver continued, "Today, I want you to practice writing about your favorite thing in the forest. It could be the way sunlight dances through the leaves, the sound of the babbling brook, or the feeling of soft moss under your paws."

Help Oliver by writing your own story about what you love most in the forest!`;
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStory(demoStory);
      } catch (error) {
        toast({
          title: "Story Loading Error",
          description: "Unable to fetch story. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      <div className="bg-gradient-forest py-6 shadow-forest">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground text-center">
            📖 Story Time in the Forest
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <Card className="p-8 shadow-gentle border-forest-moss/30">
              <div className="text-center">
                <div className="animate-spin text-4xl mb-4">🌿</div>
                <p className="text-forest-medium text-lg">Gathering stories from the forest...</p>
              </div>
            </Card>
          ) : (
            <>
              {/* Story illustration */}
              <div className="mb-8">
                <img 
                  src={storyScene} 
                  alt="Forest story scene with reading animals"
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-forest"
                />
              </div>

              {/* Story content */}
              <Card className="p-8 mb-8 shadow-gentle border-forest-moss/30 bg-card/95 backdrop-blur-sm">
                <div className="prose prose-lg max-w-none">
                  {story.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-forest-deep leading-relaxed mb-4 text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Card>

              {/* Instructions */}
              <Card className="p-6 mb-8 bg-gradient-leaf/20 border-forest-leaf/40 shadow-gentle">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-forest-deep mb-3">
                    ✍️ Your Writing Adventure Begins!
                  </h3>
                  <p className="text-forest-medium mb-4">
                    Use a pencil and paper to write your own story inspired by Oliver's tale. 
                    When you're done, take a photo of your handwriting and we'll help you improve!
                  </p>
                </div>
              </Card>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="earth" 
                  onClick={() => navigate('/')}
                  className="px-8 py-3"
                >
                  🏠 Back to Forest Entrance
                </Button>
                <Button 
                  variant="magic" 
                  onClick={() => navigate('/upload')}
                  className="px-8 py-3"
                >
                  📸 Upload My Writing
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Story;