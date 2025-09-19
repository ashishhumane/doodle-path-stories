import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-sky">
      <div className="text-center">
        <div className="text-6xl mb-4">🌲</div>
        <h1 className="mb-4 text-4xl font-bold text-forest-deep">Lost in the Forest?</h1>
        <p className="mb-4 text-xl text-forest-medium">This path doesn't exist in our magical forest</p>
        <a href="/" className="text-forest-light underline hover:text-forest-moss font-semibold">
          🏠 Return to Forest Entrance
        </a>
      </div>
    </div>
  );
};

export default NotFound;
