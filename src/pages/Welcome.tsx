import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import forestEntrance from "@/assets/forest-entrance.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  let goToHome = () => {
    window.location.href = "http://localhost:8080";
  }
  return (
    <div className="min-h-screen bg-gradient-sky relative overflow-hidden">
      {/* Background forest image */}
      
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${forestEntrance})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sky-light/30 to-forest-medium/40" />
      </div>
      
      {/* Static decorative elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-magic-glow rounded-full opacity-60" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-magic-warm rounded-full opacity-70" />
      <div className="absolute bottom-32 left-20 w-5 h-5 bg-magic-soft rounded-full opacity-50" />

      <button onClick={goToHome} className="fixed top-5 left-5 z-20 bg-green-500 hover:bg-green-700 text-white p-3 rounded-full shadow-lg text-2xl transition" >Back</button>
      
      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Welcome message */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold text-forest-deep mb-4 drop-shadow-lg">
              Welcome to
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-green-600 bg-clip-text text-transparent drop-shadow-lg">
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
            className="text-xl px-12 py-6 h-auto rounded-full shadow-glow hover:shadow-forest"
          >
            Start Writing Adventure
          </Button>
          
          {/* Decorative elements */}
          <div className="mt-12 flex justify-center space-x-8 opacity-70">
            <div className="text-2xl">🌿</div>
            <div className="text-2xl">🦌</div>
            <div className="text-2xl">✨</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;