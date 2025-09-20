import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Gamepad2, Target, Timer, Award, Star, ArrowRight } from "lucide-react";
import gamesForest from "@/assets/games-forest.jpg";

interface Game {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  icon: string;
  skills: string[];
  estimatedTime: string;
  to: string;
}

const Games = () => {
  const navigate = useNavigate();

  const games: Game[] = [
    {
      id: "letter-formation",
      title: "Letter Formation Forest",
      description: "Help forest animals trace letters by following magical glowing paths through the trees.",
      difficulty: "Easy",
      category: "Letter Formation",
      icon: "✍️",
      skills: ["Letter shapes", "Fine motor control", "Direction"],
      estimatedTime: "10-15 min",
      to: "/letter-tracing-game"
    },
    {
      id: "spacing-adventure",
      title: "Spacing Adventure",
      description: "Guide a friendly squirrel through the forest, placing acorns at perfect distances to practice word spacing.",
      difficulty: "Medium",
      category: "Spacing",
      icon: "🐿️",
      skills: ["Word spacing", "Visual perception", "Consistency"],
      estimatedTime: "15-20 min",
      to: "/letter-spacing-game"
    },
    {
      id: "Letter Confusion",
      title: "Letter Challenge",
      description: "Paint forest scenes with different brush pressures to create light and dark effects.",
      difficulty: "Medium",
      category: "Letters",
      icon: "🎨",
      skills: ["Writing pressure", "Motor control", "Consistency"],
      estimatedTime: "10-15 min",
      to: "/letter-confusion-game"
    }
    // {
    //   id: "handwriting-olympics",
    //   title: "Handwriting Olympics",
    //   description: "Compete in fun writing challenges with forest creatures in this multi-level competition.",
    //   difficulty: "Hard",
    //   category: "Comprehensive",
    //   icon: "🏆",
    //   skills: ["All handwriting skills", "Speed", "Accuracy"],
    //   estimatedTime: "20-30 min",
    //   to: "/letter-tracingdd-game"
    // },
    // {
    //   id: "line-awareness",
    //   title: "Tightrope Walker",
    //   description: "Help a brave mouse walk the tightrope by staying perfectly on the baseline while writing.",
    //   difficulty: "Easy",
    //   category: "Line Awareness",
    //   icon: "🐭",
    //   skills: ["Baseline awareness", "Size consistency", "Control"],
    //   estimatedTime: "10-15 min",
    //   to: "/letter-tracidsng-game"
    // },
    // {
    //   id: "cursive-creek",
    //   title: "Cursive Creek",
    //   description: "Follow the flowing river path to practice cursive letter connections in beautiful forest scenes.",
    //   difficulty: "Hard",
    //   category: "Cursive Writing",
    //   icon: "🌊",
    //   skills: ["Letter connections", "Fluency", "Rhythm"],
    //   estimatedTime: "15-25 min",
    //   to: "/letter-tracisdsng-game"
    // }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-forest-leaf text-forest-deep";
      case "Medium": return "bg-magic-warm text-forest-deep";
      case "Hard": return "bg-earth-medium text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleGameStart = (path: string) => {
  navigate(path); // ✅ go to the game route
};

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      <div className="bg-gradient-forest py-6 shadow-forest">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground text-center">
            🎮 Forest Games Collection
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero section */}
          <div className="mb-8">
            <img 
              src={gamesForest} 
              alt="Forest creatures playing games"
              className="w-full h-48 md:h-64 object-cover rounded-lg shadow-forest mb-6"
            />
            
            <Card className="p-6 bg-gradient-magic/10 border-magic-warm/40 shadow-gentle">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-forest-deep mb-3">
                  Welcome to the Game Grove! 🌳
                </h2>
                <p className="text-forest-medium text-lg max-w-2xl mx-auto">
                  Practice your handwriting skills through fun games with friendly forest creatures. 
                  Each game is designed to help you improve specific aspects of your writing!
                </p>
              </div>
            </Card>
          </div>

          {/* Games grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {games.map((game) => (
              <Card key={game.id} className="p-6 shadow-gentle border-forest-moss/30 hover:shadow-forest transition-all duration-300 hover:scale-105 bg-card/95 backdrop-blur-sm">
                <div className="space-y-4">
                  {/* Game header */}
                  <div className="text-center">
                    <div className="text-4xl mb-2">{game.icon}</div>
                    <h3 className="text-xl font-semibold text-forest-deep">
                      {game.title}
                    </h3>
                    <div className="flex justify-center gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(game.difficulty)}`}>
                        {game.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-forest-medium text-sm leading-relaxed">
                    {game.description}
                  </p>

                  {/* Skills */}
                  <div>
                    <h4 className="text-sm font-semibold text-forest-deep mb-2 flex items-center gap-1">
                      <Star size={14} className="text-magic-warm" />
                      Skills Practiced:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {game.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-forest-leaf/20 text-forest-deep text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Time and action */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-forest-medium">
                      <span className="flex items-center gap-1">
                        <Timer size={14} />
                        {game.estimatedTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target size={14} />
                        {game.category}
                      </span>
                    </div>
                    
                    <Button 
                      variant="leaf" 
                      className="w-full"
                      onClick={() => handleGameStart(game.to)}
                    >
                      <Gamepad2 size={16} className="mr-2" />
                      Play Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Progress section */}
          <Card className="p-6 shadow-gentle border-forest-moss/30 bg-gradient-earth/10 mb-8">
            <div className="text-center">
              <Award className="mx-auto text-magic-warm mb-4" size={48} />
              <h3 className="text-xl font-semibold text-forest-deep mb-3">
                Track Your Progress 📊
              </h3>
              <p className="text-forest-medium mb-4">
                As you play games, we'll track your improvement and unlock new challenges!
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-forest-deep">12</div>
                  <div className="text-sm text-forest-medium">Games Played</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-forest-deep">3</div>
                  <div className="text-sm text-forest-medium">Skills Mastered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-forest-deep">⭐⭐⭐</div>
                  <div className="text-sm text-forest-medium">Achievement Level</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="earth" 
              onClick={() => navigate('/feedback')}
              className="px-8"
            >
              📊 View My Feedback
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

export default Games;