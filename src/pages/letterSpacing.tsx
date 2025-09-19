import React, { useState } from "react";
import forestBg from "../assets/Backgrounddd.jpg";

// ✅ Sentences
const sentences = [
  "thecatranfast",
  "dogjumpedhigh",
  "sunisbrightnow",
  "birdsingsweet",
  "fishswimsdeep",
];

const sentenceMap: Record<string, string[]> = {
  thecatranfast: ["the", "cat", "ran", "fast"],
  dogjumpedhigh: ["dog", "jumped", "high"],
  sunisbrightnow: ["sun", "is", "bright", "now"],
  birdsingsweet: ["bird", "sing", "sweet"],
  fishswimsdeep: ["fish", "swims", "deep"],
};

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedSpaces, setPlacedSpaces] = useState<number[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [completedLevels, setCompletedLevels] = useState(0);

  const currentSentence = sentences[currentIndex];

  const handleDrop = (index: number) => {
    if (!placedSpaces.includes(index)) {
      setPlacedSpaces([...placedSpaces, index]);
    }
  };

  const renderSentence = () => {
    const parts: JSX.Element[] = [];
    for (let i = 0; i < currentSentence.length; i++) {
      parts.push(
        <span key={i} className="text-2xl font-bold text-black mx-1">
          {currentSentence[i]}
        </span>
      );

      if (placedSpaces.includes(i)) {
        parts.push(
          <span
            key={`space-${i}`}
            className="px-4 py-2 rounded-lg bg-green-300 font-bold text-green-900"
          >
            🍃
          </span>
        );
      } else if (i < currentSentence.length - 1) {
        parts.push(
          <span
            key={`drop-${i}`}
            className="border-2 border-dashed border-green-900 px-4 py-2 rounded-lg min-w-[70px] text-center cursor-pointer bg-gradient-to-r from-yellow-50/90 to-green-100/90 hover:scale-105 transition-transform"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(i)}
          ></span>
        );
      }
    }
    return parts;
  };

  const checkAnswer = () => {
    const spaced = currentSentence.split("").reduce((acc, char, i) => {
      acc += char;
      if (placedSpaces.includes(i)) acc += " ";
      return acc;
    }, "");
    const words = spaced.trim().split(" ");

    if (JSON.stringify(words) === JSON.stringify(sentenceMap[currentSentence])) {
      setShowPopup(true);
      return;
    }

    if (placedSpaces.length < sentenceMap[currentSentence].length - 1) {
      alert("⚠ Please complete your sentence before checking!");
      return;
    }

    let correctIndexes: number[] = [];
    let currentIndexChar = -1;
    const correct = sentenceMap[currentSentence];
    for (let w = 0; w < correct.length; w++) {
      for (let j = 0; j < correct[w].length; j++) {
        currentIndexChar++;
      }
      if (placedSpaces.includes(currentIndexChar)) {
        correctIndexes.push(currentIndexChar);
      }
    }
    setPlacedSpaces(correctIndexes);
    alert("❌ Some leaves were misplaced! Try again.");
  };

  const tryAgain = () => {
    setPlacedSpaces([]);
    setShowPopup(false);
  };

  const nextLevel = () => {
    const nextIndex = currentIndex + 1;
    setCompletedLevels(completedLevels + 1);
    if (nextIndex < sentences.length) {
      setCurrentIndex(nextIndex);
    }
    setPlacedSpaces([]);
    setShowPopup(false);
  };

  const finishGame = () => {
    alert("🎉 Game Finished! You did well 🌟");
    setCurrentIndex(0);
    setPlacedSpaces([]);
    setCompletedLevels(0);
    setShowPopup(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white p-6"
      style={{
        backgroundImage: `url(${forestBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-extrabold text-yellow-300 drop-shadow-md mb-2">
        🌲 Word Spacing Puzzle 🌲
      </h1>
      <p className="text-lg font-semibold text-yellow-100 drop-shadow mb-6 text-center">
        Drag and drop the 🍃 <strong>Space Leaf</strong> into the right places!
      </p>

      {/* Sentence */}
      <div className="bg-green-100 p-6 rounded-2xl shadow-xl flex flex-wrap justify-center gap-4 min-w-[70%] mb-6">
        {renderSentence()}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-6 max-w-xl w-full">
        <div
          className="bg-gradient-to-r from-green-600 to-green-800 text-white px-5 py-3 rounded-lg cursor-grab font-bold shadow-md active:cursor-grabbing"
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text", "space")}
        >
          🍃 Space Leaf
        </div>

        <button
          onClick={checkAnswer}
          className="px-6 py-3 text-lg font-bold rounded-xl bg-gradient-to-r from-orange-500 to-red-700 shadow-lg hover:scale-105 transition-transform"
        >
          Check Answer
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 bg-black/85 p-8 rounded-2xl text-center shadow-2xl z-50">
          {completedLevels + 1 === sentences.length ? (
            <>
              <p className="text-2xl mb-6">🎉 You did well! 🌟</p>
              <button
                onClick={finishGame}
                className="px-6 py-3 font-bold bg-green-600 text-white rounded-lg hover:scale-105 transition-transform"
              >
                Finish Game
              </button>
            </>
          ) : (
            <>
              <p className="text-2xl mb-6">
                🌳 Congratulations! Your forest grew bigger!
              </p>
              <div className="flex justify-center gap-6">
                <button
                  onClick={tryAgain}
                  className="px-5 py-3 font-bold bg-green-600 text-white rounded-lg hover:scale-105 transition-transform"
                >
                  Try Again
                </button>
                <button
                  onClick={nextLevel}
                  className="px-5 py-3 font-bold bg-orange-500 text-white rounded-lg hover:scale-105 transition-transform"
                >
                  Next Level
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
