import React, { useState, useEffect, useRef } from "react";
import alarmSound from "../assets/alarm.mp3";
import video from '../letterb.mp4' // ✅ alarm.mp3 is inside src

const allPairs: [string, string][] = [
  ["p", "q"], ["b", "d"], ["m", "n"], ["u", "v"], ["a", "e"], ["c", "e"],
  ["g", "q"], ["h", "n"], ["r", "n"], ["s", "z"], ["x", "k"], ["j", "t"]
];

const allWordPairs: [string, string][] = [
  ["cat", "bat"], ["dog", "fog"], ["sun", "son"], ["car", "bar"], ["pen", "pan"]
];

const wordEmojis: Record<string, string> = {
  cat: "🐱", bat: "🦇", dog: "🐶", fog: "🌫", sun: "☀", son: "👦",
  car: "🚗", bar: "🍻", pen: "✏", pan: "🍳"
};

const getRandomFivePairs = (data: [string, string][]) =>
  [...data].sort(() => 0.5 - Math.random()).slice(0, 5);

export default function App() {
  const [level, setLevel] = useState(1);
  const [pairs, setPairs] = useState<[string, string][]>(getRandomFivePairs(allPairs));
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState(false);
  const [finished, setFinished] = useState(false);
  const [roundComplete, setRoundComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const [popupMsg, setPopupMsg] = useState("");
  const [pauseTimer, setPauseTimer] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [leftLetter, rightLetter] = pairs[currentPairIndex];
  const correctLetter = leftLetter;
  const levelTimers: Record<number, number> = { 1: 15, 2: 12 };

  /* --------- detect first user gesture so audio can play --------- */
  useEffect(() => {
    const markGesture = () => setUserInteracted(true);
    window.addEventListener("click", markGesture, { once: true });
    window.addEventListener("keydown", markGesture, { once: true });
    window.addEventListener("touchstart", markGesture, { once: true });
    return () => {
      window.removeEventListener("click", markGesture);
      window.removeEventListener("keydown", markGesture);
      window.removeEventListener("touchstart", markGesture);
    };
  }, []);

  /* --------- reset timer when pair or level changes --------- */
  useEffect(() => {
    if (selected || finished || roundComplete) return;
    setTimeLeft(levelTimers[level]);
  }, [currentPairIndex, level, selected, finished, roundComplete]);

  /* --------- countdown --------- */
  useEffect(() => {
    if (selected || finished || roundComplete || pauseTimer) return;

    if (timeLeft <= 0) {
      triggerPopup("❗ Oops! Time’s up — you can go to the next.", 1000, () => {
        nextPair();
      });
      return;
    }

    const id = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft, selected, finished, roundComplete, pauseTimer]);

  /* --------- popups & alarm control --------- */
  const triggerPopup = (msg: string, duration = 3000, after: (() => void) | null = null) => {
    setPopupMsg(msg);
    setPauseTimer(true);
    const hide = setTimeout(() => {
      setPopupMsg("");
      setPauseTimer(false);
      if (after) after();
    }, duration);
    return () => clearTimeout(hide);
  };

  useEffect(() => {
    if (timeLeft === 10) {
      triggerPopup("🌟 You are doing great!", 1000);
    }
    if (timeLeft === 5) {
      triggerPopup("⏳ Hurry up, only 5 seconds are left!", 1000);
      if (userInteracted && audioRef.current) {
        audioRef.current.loop = true;
        audioRef.current.play().catch(() => {});
      }
    }
    if (timeLeft === 0 && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [timeLeft, userInteracted]);

  /* --------- drag & drop --------- */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, droppedOnLetter: string) => {
    if (selected) return;
    const draggedLetter = e.dataTransfer.getData("text/plain");
    setMessage(
      draggedLetter === droppedOnLetter
        ? "🎉 Great job! That’s correct!"
        : "🍂 Oops! Wrong. Try again!"
    );
    setSelected(true);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, letter: string) =>
    e.dataTransfer.setData("text/plain", letter);

  const nextPair = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (currentPairIndex < pairs.length - 1) {
      setCurrentPairIndex(i => i + 1);
      setMessage("");
      setSelected(false);
    } else setRoundComplete(true);
  };

  const handlePlayAgain = () => {
    setPairs(level === 1 ? getRandomFivePairs(allPairs) : getRandomFivePairs(allWordPairs));
    setCurrentPairIndex(0);
    setMessage("");
    setSelected(false);
    setFinished(false);
    setRoundComplete(false);
    setTimeLeft(levelTimers[level]);
  };

  const handleNextLevel = () => {
    if (level === 1) {
      setLevel(2);
      setPairs(getRandomFivePairs(allWordPairs));
      setCurrentPairIndex(0);
      setMessage("");
      setSelected(false);
      setRoundComplete(false);
      setTimeLeft(levelTimers[2]);
    }
  };

  if (finished) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-yellow-200 text-center">
        <h2 className="text-2xl font-bold drop-shadow-lg">
          🎉 Congratulations! You completed all 2 levels! 🌳
        </h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-sans overflow-hidden text-yellow-100">
      <video autoPlay muted loop className="absolute top-0 left-0 w-screen h-screen object-cover -z-10">
        <source src={video} type="video/mp4" />
      </video>

      <audio ref={audioRef} src={alarmSound} preload="auto" />

      {/* Home Button */}
      <button
        className="absolute top-4 left-4 bg-green-700 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg shadow-md"
        onClick={() => window.location.reload()}
      >
        🏠 Go to Home
      </button>

      {/* Timer */}
      <div
        className={`absolute top-4 right-4 px-4 py-2 rounded-xl text-2xl font-bold ${
          timeLeft <= 5
            ? "text-red-400 border-2 border-red-400 animate-pulse bg-black/60"
            : "text-white bg-black/60"
        }`}
      >
        ⏳ {timeLeft}s
      </div>

      {/* Popup */}
      {popupMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-xl text-lg animate-slideDownFade z-50">
          {popupMsg}
        </div>
      )}

      <div className="relative z-10 text-center pt-16">
        <h1 className="text-4xl font-extrabold text-green-200 drop-shadow-lg">🌳 Forest Basket Toss</h1>
        <p className="mt-2 text-lg drop-shadow">
          {level === 1
            ? "Level 1 of 2 — Drag the fruit 🍎 to the correct tree with the matching letter!"
            : "Level 2 of 2 — Drag the basket 🧺 to the correct word!"}
        </p>

        {/* Trees */}
        <div className="flex justify-center gap-24 mt-10">
          {[leftLetter, rightLetter].map((letter, idx) => (
            <div
              key={idx}
              className="w-36 h-44 border-2 border-green-300 bg-green-900/40 rounded-lg flex flex-col items-center justify-center hover:scale-105 transition cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, letter)}
            >
              {level === 2 && <div className="text-4xl">{wordEmojis[letter]}</div>}
              <div className="text-3xl text-cyan-200 drop-shadow">{letter}</div>
            </div>
          ))}
        </div>

        {/* Fruit / Basket */}
        <div
          draggable={!selected}
          onDragStart={(e) => handleDragStart(e, correctLetter)}
          className={`mt-10 inline-block px-6 py-4 border-2 border-green-300 rounded-full shadow-lg text-2xl transition ${
            selected ? "opacity-50 cursor-default" : "cursor-grab hover:scale-110"
          }`}
        >
          {level === 1 ? <>🍎 <span className="font-bold">{correctLetter}</span></> : <>🧺 <span className="font-bold">{correctLetter}</span></>}
        </div>

        {/* Feedback */}
        <p className={`mt-6 text-xl font-bold drop-shadow ${message.includes("Oops") ? "text-red-400" : "text-green-300"}`}>
          {message}
        </p>

        {/* Buttons */}
        {message && !roundComplete && (
          <div className="flex justify-center gap-6 mt-6">
            {message.includes("Oops") && (
              <button
                className="px-5 py-2 bg-red-300/30 border-2 border-red-400 rounded-lg text-red-400 font-bold hover:bg-red-400 hover:text-black"
                onClick={() => {
                  setSelected(false);
                  setMessage("");
                }}
              >
                ← Try Again
              </button>
            )}
            <button
              className="px-5 py-2 bg-green-300/30 border-2 border-green-400 rounded-lg text-green-400 font-bold hover:bg-green-400 hover:text-black"
              onClick={nextPair}
            >
              Next →
            </button>
          </div>
        )}

        {/* Round Complete */}
        {roundComplete && (
          <div className="flex justify-center gap-6 mt-6">
            <button
              className="px-5 py-2 bg-yellow-200/30 border-2 border-yellow-300 rounded-lg text-yellow-300 font-bold hover:bg-yellow-300 hover:text-black"
              onClick={handlePlayAgain}
            >
              ← Try Again
            </button>
            {level === 1 ? (
              <button
                className="px-5 py-2 bg-blue-200/30 border-2 border-blue-300 rounded-lg text-blue-300 font-bold hover:bg-blue-300 hover:text-black"
                onClick={handleNextLevel}
              >
                Next Level →
              </button>
            ) : (
              <button
                className="px-5 py-2 bg-purple-200/30 border-2 border-purple-300 rounded-lg text-purple-300 font-bold hover:bg-purple-300 hover:text-black"
                onClick={() => setFinished(true)}
              >
                Finish Game ✔
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
