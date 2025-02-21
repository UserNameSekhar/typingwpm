import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import KeyboardButton from "../../components/learn-typing/buttons/KeyboardButton";
import { keyboardKeys } from "../../config/learntyping";

const LearnTyping: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Learn Text");
  const [selectedLevel, setSelectedLevel] = useState("Level 1: ASDF");
  const [keyboardInput, setKeyboardInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [errors, setErrors] = useState<number[]>([]);
  const [lastTypedKey, setLastTypedKey] = useState<string | null>(null);
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setLastTypedKey(e.key);
      setIsKeyPressed(true);
      handleKeyboardInput(e.key);
    };

    const handleKeyUp = () => {
      setIsKeyPressed(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyboardInput, currentWordIndex]);

  // Sample data for levels
  const categories = ["Learn Text", "Learn Numbers", "Learn Symbols"];
  const levels = [
    "Level 1: ASDF",
    "Level 2: JKL;",
    "Level 3: QWER",
    "Level 4: UIOP",
    "Level 5: ZXCV",
  ];

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedLevel("Level 1: ASDF"); // Reset level on category change
    setWords(["asdf", "asdf", "asdf", "asdf"]); // Reset words
    setKeyboardInput("");
    setCurrentWordIndex(0);
    setErrors([]);
    setLastTypedKey(null);
  };

  // Handle level change
  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    setWords(
      level.includes("ASDF")
        ? ["asdf", "asdf", "asdf", "asdf"]
        : ["jkl;", "jkl;", "jkl;", "jkl;"]
    );
    setKeyboardInput("");
    setCurrentWordIndex(0);
    setErrors([]);
    setLastTypedKey(null);
  };

  // Handle keyboard input
  const handleKeyboardInput = (key: string) => {
    setLastTypedKey(key === " " ? "Space" : key === "Control" ? "ctrl" : key);

    if (key === "Backspace") {
      setKeyboardInput((prev) => prev.slice(0, -1));
    } else if (key === " ") {
      if (keyboardInput === words[currentWordIndex]) {
        setCurrentWordIndex((prev) => prev + 1);
        setKeyboardInput("");
      } else {
        setErrors((prev) => [...prev, currentWordIndex]);
      }
    } else if (key.length === 1) {
      setKeyboardInput((prev) => prev + key);
    }
  };

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyboardInput(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyboardInput, currentWordIndex]);

  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row">
      {/* Sidebar (20%) */}
      <aside className="w-full md:w-1/5 p-6 bg-transparent backdrop-blur-lg">
        <div className="space-y-6">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full p-3 rounded-lg bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-600 outline-none ring-0 text-gray-900 dark:text-gray-100 appearance-none focus:border-gray-300 dark:focus:border-gray-400"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-500 dark:text-gray-400 pointer-events-none" />
          </div>

          {/* Level Buttons */}
          <div className="space-y-3">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => handleLevelChange(level)}
                className={`w-full p-3 rounded-lg text-left transition-all duration-300 ${
                  selectedLevel === level
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-light-textPrimary dark:text-dark-textPrimary"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content (80%) */}
      <main className="w-full md:w-4/5 p-2 sm:p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Level Content */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-light-textPrimary dark:text-dark-textPrimary">{selectedLevel}</h2>
            <div className="flex flex-wrap gap-2">
              {words.map((word, index) => (
                <div
                  key={index}
                  className={`p-4 text-2xl font-bold rounded-lg ${
                    index === currentWordIndex
                      ? "bg-indigo-900 dark:bg-indigo-100"
                      : "bg-indigo-100 dark:bg-indigo-900"
                  }`}
                >
                  {word.split("").map((char, charIndex) => (
                    <span
                      key={charIndex}
                      className={`${
                        index === currentWordIndex &&
                        charIndex < keyboardInput.length
                          ? keyboardInput[charIndex] === char
                            ? "text-lime-400 dark:text-lime-600"
                            : "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="mb-2">
            <input
              type="text"
              value={keyboardInput}
              readOnly // Disable onChange to prevent double input
              placeholder="Start typing here..."
              className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="my-2 mb-6 text-light-textPrimary dark:text-dark-textPrimary ">
            <p>
              <strong>Errors</strong> : {errors}
            </p>
          </div>

          {/* Virtual Keyboard */}
          <div className="bg-gray-200 dark:bg-gray-700 p-6 rounded-2xl relative">
            <div
              className="absolute inset-0  sm:inset-2 rounded-2xl bg-gray-300 dark:bg-gray-700"
              style={{
                boxShadow:
                  "0px 5px 10px rgba(255,255,255,0.2) inset, 5px 0px 10px rgba(0,0,0,0.1) inset, -5px 0px 10px rgba(0,0,0,0.1) inset, 0px -5px 10px rgba(0,0,0,0.1) inset",
              }}
            ></div>
            {keyboardKeys.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex justify-center gap-1 md:gap-[7px] mb-2.5 md:mb-3 lg:mb-4"
              >
                {row.map((key, index) => (
                  <KeyboardButton
                    key={index}
                    text1={key.text1}
                    text2={key?.text2!}
                    clickedKey={lastTypedKey!}
                    isKeyPressed={isKeyPressed}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default LearnTyping;
