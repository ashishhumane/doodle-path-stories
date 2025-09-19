import React, { useState, useEffect, useRef } from "react";
import backgroundImg from "../assets/Backgrounddd.jpg";

const letters = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

function App() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [tracedPercentage, setTracedPercentage] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [canvasImageData, setCanvasImageData] = useState<ImageData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const minCoverage = 0.7; // 70%
  const maxCoverage = 0.8; // 80%

  useEffect(() => {
    if (selectedLetter && !showCongrats) {
      drawLetterGuide();
      setTracedPercentage(0);

      const utterance = new SpeechSynthesisUtterance(
        `This is the letter ${selectedLetter}`
      );
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
  }, [selectedLetter, showCongrats]);

  const drawLetterGuide = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 220px Arial";
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(selectedLetter || "", 200, 200);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setCanvasImageData(imgData);
  };

  const startDrawing = ({ nativeEvent }: any) => {
    if (showCongrats) return;
    const { offsetX, offsetY } = nativeEvent;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    (canvas as any).isDrawing = true;
  };

  const draw = ({ nativeEvent }: any) => {
    if (!(canvasRef.current as any)?.isDrawing || showCongrats) return;
    const { offsetX, offsetY } = nativeEvent;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const px = ctx.getImageData(offsetX, offsetY, 1, 1).data;
    const [r, g, b, a] = px;

    const insideGuide = a > 0 && r > 200 && g > 200 && b > 200;

    if (insideGuide) {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      calculateCoverage();
    } else {
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    }
  };

  const endDrawing = () => {
    if (!(canvasRef.current as any)?.isDrawing) return;
    (canvasRef.current as any).isDrawing = false;
    calculateCoverage();
  };

  const calculateCoverage = () => {
    const canvas = canvasRef.current;
    if (!canvas || !canvasImageData) return;

    const ctx = canvas.getContext("2d")!;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let drawnPixels = 0;
    let guidePixels = 0;

    for (let i = 0; i < imgData.data.length; i += 4) {
      const [r, g, b, a] = [
        canvasImageData.data[i],
        canvasImageData.data[i + 1],
        canvasImageData.data[i + 2],
        canvasImageData.data[i + 3],
      ];

      const isGuidePixel = a > 0 && r > 200 && g > 200 && b > 200;
      if (isGuidePixel) {
        guidePixels++;
        const dr = imgData.data[i];
        const dg = imgData.data[i + 1];
        const db = imgData.data[i + 2];
        const isDrawnPixel = dr === 0 && dg === 255 && db === 0;
        if (isDrawnPixel) drawnPixels++;
      }
    }

    if (guidePixels === 0) return;

    const coverage = drawnPixels / guidePixels;
    setTracedPercentage(coverage);

    if (coverage >= minCoverage && coverage <= maxCoverage) {
      setShowCongrats(true);
    }
  };

  const handleClearReset = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLetterGuide();
    setTracedPercentage(0);
  };

  const handleTryAgain = () => {
    setShowCongrats(false);
    handleClearReset();
  };

  const handleFinishGame = () => {
    setSelectedLetter(null);
    setShowCongrats(false);
    setTracedPercentage(0);
  };

  // --- First Page (Letter Selection) ---
  if (!selectedLetter) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen text-white text-center"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl font-bold mb-6">Select a Letter</h1>
        <div className="grid grid-cols-6 gap-4 max-w-lg">
          {letters.map((letter) => (
            <button
              key={letter}
              className="px-5 py-4 text-xl font-bold bg-gray-800 text-white rounded-lg hover:scale-110 hover:bg-green-500 transition-transform"
              onClick={() => setSelectedLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // --- Congrats Page ---
  if (showCongrats) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen text-center text-white"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl font-bold text-yellow-400 drop-shadow-lg">
          🎉 Congratulations 🎉
        </h1>
        <p className="text-black font-bold text-3xl mt-4">
          Your forest grew bigger! 🌳
        </p>
        <div className="flex gap-6 mt-6">
          <button
            onClick={handleTryAgain}
            className="px-6 py-3 text-lg font-bold rounded-xl bg-green-500 border-2 border-green-700 shadow-lg hover:bg-green-600"
          >
            ← Try Again
          </button>
          <button
            onClick={handleFinishGame}
            className="px-6 py-3 text-lg font-bold rounded-xl bg-green-500 border-2 border-green-700 shadow-lg hover:bg-green-600"
          >
            Finish Game →
          </button>
        </div>
      </div>
    );
  }

  // --- Tracing Page ---
  return (
    <div
      className="flex items-center justify-center min-h-screen text-white"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-3xl bg-gray-800/90 rounded-2xl p-10 shadow-xl text-center">
        <h1 className="text-4xl font-bold text-yellow-400 drop-shadow-md mb-4">
          Trace the Letter
        </h1>
        <h2 className="text-2xl mb-4">Letter: {selectedLetter}</h2>

        <div className="relative w-[400px] h-[400px] mx-auto bg-gray-600 rounded-lg overflow-hidden mb-6">
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 z-10 cursor-crosshair"
            width="400"
            height="400"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={endDrawing}
          />
        </div>

        <p className="text-lg mb-4">
          Progress / Tracing Accuracy: {(tracedPercentage * 100).toFixed(1)}%
        </p>

        <div className="flex justify-center gap-6">
          <button
            className="px-6 py-3 text-lg font-bold rounded-lg bg-red-500 shadow-lg hover:bg-red-600"
            onClick={handleClearReset}
          >
            Clear & Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
