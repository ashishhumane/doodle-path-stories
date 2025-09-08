import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import forestEntrance from "@/assets/forest-entrance.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-sky relative overflow-hidden">
      {/* Background forest image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${forestEntrance})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sky-light/30 to-forest-medium/40" />
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-magic-glow rounded-full animate-float opacity-60" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-magic-warm rounded-full animate-float opacity-70" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-20 w-5 h-5 bg-magic-soft rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
      
      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Welcome message */}
          <div className="mb-8 animate-float">
            <h1 className="text-6xl md:text-7xl font-bold text-forest-deep mb-4 drop-shadow-lg">
              Welcome to
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-magic bg-clip-text text-transparent drop-shadow-lg animate-shimmer">
              Doodled Forest
            </h2>
          </div>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-forest-medium mb-8 drop-shadow-sm max-w-lg mx-auto leading-relaxed">
            A magical place where writing becomes an adventure! Join friendly forest creatures on your handwriting journey.
          </p>
          
          {/* Call to action button */}
          <Button 
            variant="magic" 
            size="lg" 
            onClick={() => navigate('/story')}
            className="text-xl px-12 py-6 h-auto rounded-full shadow-glow hover:shadow-forest animate-forest-sway"
          >
            Start Writing Adventure
          </Button>
          
          {/* Decorative elements */}
          <div className="mt-12 flex justify-center space-x-8 opacity-70">
            <div className="text-2xl animate-float" style={{ animationDelay: '0.5s' }}>🌿</div>
            <div className="text-2xl animate-float" style={{ animationDelay: '1.5s' }}>🦌</div>
            <div className="text-2xl animate-float" style={{ animationDelay: '2.5s' }}>✨</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;