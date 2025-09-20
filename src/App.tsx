import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Story from "./pages/Story";
import Upload from "./pages/Upload";
import Feedback from "./pages/Feedback";
import Games from "./pages/Games";
import NotFound from "./pages/NotFound";
import LetterTracingGame from "./pages/lettertracingGame"
import LetterConfusionGame from "./pages/letterSpacing"
import LetterConfusion from './pages/confusionGame'
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/story" element={<Story />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/games" element={<Games />} />
          <Route path="/letter-tracing-game" element={<LetterTracingGame />} />
          <Route path="/letter-spacing-game" element={<LetterConfusionGame />} />
          <Route path="/letter-confusion-game" element={<LetterConfusion />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
