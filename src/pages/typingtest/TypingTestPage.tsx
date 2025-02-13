import { ArrowLeft, CircleCheckBig, RefreshCcw, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { typingTestConfig } from "../../config/typingConfig";

const TypingTestPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const type = params.get("type") || "Text";
  const level = params.get("level") || "Basic";
  const timeLimit =
    parseInt(params.get("time")?.replace("min", "") || "1") * 60;

  const [paragraph, setParagraph] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState<string>("");
  const [errors, setErrors] = useState(0);
  const [mistakenWords, setMistakenWords] = useState<
    { original: string; mistaken: string }[]
  >([]);
  const [totalWordsTyped, setTotalWordsTyped] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [characterErrors, setCharacterErrors] = useState<boolean[][]>([]);

  useEffect(() => {
    fetchNewParagraph();
  }, [type, level]);

  useEffect(() => {
    if (startTime && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCompleted(true);
      setEndTime(Date.now());
    }
  }, [timeLeft, startTime]);

  const fetchNewParagraph = () => {
    const typeKey = Object.keys(typingTestConfig).find(
      (key) => key.toLowerCase() === type.toLowerCase()
    );

    if (!typeKey) {
      setParagraph(["Error: Invalid type."]);
      return;
    }

    const levelKey = Object.keys(typingTestConfig[typeKey]).find(
      (key) => key.toLowerCase() === level.toLowerCase()
    );

    if (!levelKey) {
      setParagraph(["Error: Invalid level."]);
      return;
    }

    const texts = typingTestConfig[typeKey][levelKey] ?? [];
    if (texts.length > 0) {
      const randomText = texts[Math.floor(Math.random() * texts.length)];
      setParagraph(randomText.split(" "));
      setCurrentWordIndex(0);
      setUserInput("");
      setCharacterErrors(new Array(randomText.split(" ").length).fill([]));
    } else {
      setParagraph(["Error: No text found for this mode."]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (completed) return;
    if (!startTime) setStartTime(Date.now());

    const value = e.target.value;
    setCursorPosition(value.length);

    // Prevent space before typing any character
    if (value === " " && userInput === "") {
      return;
    }

    setUserInput(value);

    const currentWord = paragraph[currentWordIndex];

    // Check each character for correctness
    const newCharacterErrors = value
      .split("")
      .map((char, index) => char !== currentWord[index]);
    setCharacterErrors((prev) => {
      const newErrors = [...prev];
      newErrors[currentWordIndex] = newCharacterErrors;
      return newErrors;
    });

    // Check if the entire word matches exactly
    if (value.endsWith(" ")) {
      if (value.trim() === currentWord) {
        // Correct word
        setTotalWordsTyped((prev) => prev + 1);
      } else {
        // Incorrect word
        setErrors((prev) => prev + 1);
        setMistakenWords((prev) => [
          ...prev,
          { original: currentWord, mistaken: value.trim() },
        ]);
      }

      setUserInput("");
      setCurrentWordIndex((prev) => prev + 1);
      setCursorPosition(0);

      if (currentWordIndex + 1 >= paragraph.length) {
        fetchNewParagraph();
      }
    }

    // Update live WPM and accuracy
    const minutesElapsed = (Date.now() - (startTime || Date.now())) / 60000;
    const totalTypedWords = totalWordsTyped + 1;
    const accuracyCalc =
      Math.max(0, (totalTypedWords - errors) / totalTypedWords) * 100;
    const wpmCalc = Math.round(
      (totalTypedWords - errors) / (minutesElapsed || 1)
    );

    setWpm(wpmCalc);
    setAccuracy(Math.round(accuracyCalc));
  };

  const restartTest = () => {
    setCurrentWordIndex(0);
    setUserInput("");
    setErrors(0);
    setMistakenWords([]);
    setStartTime(null);
    setTimeLeft(timeLimit);
    setWpm(0);
    setAccuracy(0);
    setCompleted(false);
    setTotalWordsTyped(0);
    setEndTime(null);
    setCharacterErrors([]);
    fetchNewParagraph();
  };

  const calculateFinalWpm = () => {
    if (!startTime || !endTime) return 0;
    const minutesElapsed = (endTime - startTime) / 60000 || 1; // Prevent division by zero
    return Math.max(Math.round((totalWordsTyped - errors) / minutesElapsed), 0);
  };

  return (
    <section className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center px-4 md:px-6 py-6 text-light-textPrimary dark:text-dark-textPrimary">
      <div className="w-full max-w-3xl mx-auto  mb-4 p-4 px-0 pb-0 shadow-md bg-white dark:bg-gray-900  rounded-2xl  border border-gray-100 dark:border-gray-800 transition-all duration-300">
        <div className="flex justify-between px-2 md:px-4">
          <button
            onClick={() => navigate("/")}
            className="text-xs md:text-sm flex items-center gap-1 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-textPrimary dark:hover:text-dark-textPrimary transition-all duration-200 ease-in-out"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
          <h2 className="text-lg md:text-xl lg:text-2xl  font-bold text-light-textPrimary dark:text-dark-textPrimary text-center">
            Typing Speed Test
          </h2>
          <button
            onClick={restartTest}
            className="text-xs md:text-sm flex items-center gap-1 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-textPrimary dark:hover:text-dark-textPrimary transition-all duration-200 ease-in-out"
          >
            <RefreshCcw size={18} /> New Test
          </button>
        </div>
        <div className="grid grid-cols-3 mt-6">
          <div className="flex flex-col items-center justify-center gap-1 border-r-2 rounded-l-2xl bg-gradient-to-t  from-orange-50/70 dark:from-orange-800/10 via-transparent to-transparent border-gray-100 dark:border-gray-800 pb-2">
            <span
              className={`text-sm md:text-base lg:text-lg font-bold capitalize  ${
                type.toLowerCase() === "text"
                  ? "text-green-600 dark:text-green-500" // Text - Green
                  : type.toLowerCase() === "numbers"
                  ? "text-indigo-600 dark:text-indigo-500" // Numbers - Blue
                  : type.toLowerCase() === "coding"
                  ? "text-purple-600 dark:text-purple-500" // Coding - Purple
                  : type.toLowerCase() === "symbols"
                  ? "text-orange-600 dark:text-orange-500" // Symbols - Orange
                  : "text-gray-500 dark:text-gray-400" // Default - Gray
              }`}
            >
              {type}
            </span>
            <span className="text-xs md:text-sm  font-semibold">Type</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 border-r-2 bg-gradient-to-t  from-purple-50 dark:from-indigo-900/10 via-transparent to-transparent border-gray-100 dark:border-gray-800 pb-2">
            <span
              className={`text-sm md:text-base lg:text-lg  font-bold capitalize ${
                level.toLowerCase() === "basic"
                  ? "text-green-600 dark:text-green-500" // Basic - Green
                  : level.toLowerCase() === "intermediate"
                  ? "text-orange-500 dark:text-orange-500" // Intermediate - Yellow
                  : level.toLowerCase() === "advanced"
                  ? "text-red-600 dark:text-red-500" // Advanced - Red
                  : "text-gray-500" // Default - Gray
              }`}
            >
              {level}
            </span>
            <span className="text-xs md:text-sm  font-semibold">Level</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-r-2xl bg-gradient-to-t  from-yellow-50 dark:from-yellow-800/10 via-transparent to-transparent pb-2">
            <span
              className={`text-sm md:text-base lg:text-lg  font-bold capitalize ${
                timeLimit === 60
                  ? "text-blue-500 dark:text-yellow-500" // 1min - Medium Blue
                  : timeLimit === 120
                  ? "text-blue-600 dark:text-yellow-400" // 2min - Darker Blue
                  : timeLimit === 180
                  ? "text-blue-700 dark:text-yellow-300" // 3min - Darker Blue
                  : timeLimit === 300
                  ? "text-blue-800 dark:text-yellow-300" // 5min - Darkest Blue
                  : "text-gray-500" // Default - Gray
              }`}
            >
              {timeLimit / 60}min
            </span>
            <span className="text-xs md:text-sm  font-semibold">
              Time Limit
            </span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto mb-4 p-4 md:p-6 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
        {completed ? (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-1 md:gap-2">
              <span className="text-lg md:text-xl lg:text-2xl text-green-600 dark:text-green-500 font-semibold">
                Test Completed
              </span>
              <CircleCheckBig className="text-green-600 dark:text-green-500" />
            </div>
            <p className="text-sm md:text-base lg:text-lg mt-2 text-light-textSecondary dark:text-dark-textSecondary font-medium leading-relaxed text-center">
              You typed
              <strong className="mx-1 text-base md:text-lg lg:text-xl text-light-textPrimary dark:text-dark-textPrimary font-semibold">
                {totalWordsTyped}
              </strong>
              words in
              <strong className="mx-1 text-base md:text-lg lg:text-xl text-light-textPrimary dark:text-dark-textPrimary font-semibold">
                {timeLimit} seconds
              </strong>
              with a speed of
              <strong className="mx-1 text-base md:text-lg lg:text-xl text-green-600 dark:text-green-500 font-extrabold">
                {calculateFinalWpm()} WPM
              </strong>
              and an accuracy of
              <strong className="mx-1 text-base md:text-lg lg:text-xl text-blue-600 dark:text-blue-500 font-extrabold">
                {accuracy}%
              </strong>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4">
            <div className="flex flex-col items-center justify-center gap-1 md:gap-2 border-r-2 border-gray-200 dark:border-gray-700">
              <span className="text-xl md:text-2xl lg:text-3xl  font-extrabold">
                {Math.max(
                  Math.round(
                    (totalWordsTyped - errors) /
                      ((Date.now() - (startTime || Date.now())) / 60000 || 1)
                  ),
                  0
                )}
              </span>
              <span className="text-sm md:text-base  text-yellow-500 dark:text-yellow-400 font-semibold">
                WPM
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 md:gap-2 border-r-2 border-gray-200 dark:border-gray-700">
              <span className="text-xl md:text-2xl lg:text-3xl  font-extrabold">
                {accuracy}%
              </span>
              <span className="text-sm md:text-base  text-green-600 dark:text-green-500 font-semibold">
                Accuracy
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 md:gap-2 border-r-2 border-gray-200 dark:border-gray-700">
              <span className="text-xl md:text-2xl lg:text-3xl  font-extrabold">
                {errors}
              </span>
              <span className="text-sm md:text-base  text-red-600 dark:text-red-500 font-semibold">
                Errors
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
              <span className="text-xl md:text-2xl lg:text-3xl  font-extrabold">
                {timeLeft}s
              </span>
              <span className="text-sm md:text-base  text-indigo-600 dark:text-indigo-500 font-semibold">
                Time Left
              </span>
            </div>
          </div>
        )}
      </div>

      {!completed ? (
        <div className="w-full max-w-3xl mx-auto text-wrap overflow-hidden p-4 md:p-6 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <p className="mb-4 text-wrap break-normal whitespace-normal">
            {paragraph.map((word, wIndex) => {
              let wordClass = "text-gray-600 dark:text-gray-400";

              const isMistaken = mistakenWords.some(
                (mistake) => mistake.original === word
              );

              if (wIndex < currentWordIndex) {
                // Correctly typed words
                if (!isMistaken) {
                  wordClass = "text-green-500 dark:text-green-400"; // Green for correct words
                } else {
                  wordClass = "text-red-500 dark:text-red-400"; // Red for incorrect words
                }
              } else if (wIndex === currentWordIndex) {
                wordClass = "text-gray-950 dark:text-gray-50";
              }

              return (
                <span
                  key={wIndex}
                  className={`mr-2 text-lg lg:text-xl ${wordClass} inline-block tracking-wider  `}
                >
                  {wIndex === currentWordIndex ? (
                    <>
                      {word.split("").map((char, index) => (
                        <span className="relative">
                          <span
                            className={`text-lg lg:text-xl ${
                              characterErrors[currentWordIndex]?.[index]
                                ? "text-red-500 underline"
                                : index < cursorPosition
                                ? "text-green-500 dark:text-green-400"
                                : "text-gray-950 dark:text-gray-50"
                            } inline-block`}
                          >
                            {char}
                          </span>
                          <span
                            className={
                              index === cursorPosition
                                ? "cursor absolute -left-1 bg-black dark:bg-white"
                                : ""
                            }
                          ></span>
                        </span>
                      ))}
                    </>
                  ) : (
                    word
                  )}
                </span>
              );
            })}
          </p>

          {/* Typing Input */}
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            autoFocus
            placeholder={startTime ? "" : "Start Typing Here..."}
            className="w-full p-4 font-semibold text-lg tracking-wide md:text-xl border-b-2 border-gray-200 hover:border-gray-400 focus:border-gray-500 dark:border-gray-700 dark:hover:border-gray-500 dark:focus:border-gray-400 outline-none rounded-lg   bg-white dark:bg-gray-900 whitespace-normal transition-all ease-in-out duration-300 delay-75"
          />
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <div className="flex items-center justify-between border-b pb-3 mb-4 border-gray-300 dark:border-gray-700">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary ">
              Test Results
            </h3>

            <button
              onClick={() => window.location.reload()}
              className=" bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center text-lg font-semibold shadow-md transition-all duration-300"
            >
              <RefreshCw className="mr-2 w-5 h-5" /> Restart Test
            </button>
          </div>

          <div className="space-y-2 text-lg text-gray-700 dark:text-gray-300">
            <p className="capitalize">
              <strong className=" capitalize">Type:</strong> {type}
            </p>
            <p className="capitalize">
              <strong className=" capitalize">Level:</strong> {level}
            </p>
            <p className="capitalize">
              <strong className=" capitalize">Time:</strong> {timeLimit}sec
            </p>
            <p className="capitalize">
              <strong className=" capitalize">Total Typed Words:</strong>{" "}
              {totalWordsTyped}
            </p>
            <p>
              <strong className="">Total Errors:</strong> {errors}
            </p>
            <p>
              <strong className="">Accuracy:</strong> {accuracy}%
            </p>
            <p>
              <strong className="">Your Speed:</strong>{" "}
              <span className="text-green-600 dark:text-green-500 font-extrabold">
                {calculateFinalWpm()} WPM
              </span>
            </p>

            {mistakenWords.length > 0 && (
              <div>
                <strong>Mistaken Words:</strong>
                {mistakenWords.length > 0 ? (
                  <ol className="mt-2 pl-10 list-decimal space-y-1 text-gray-800 dark:text-gray-300 max-h-[320px] overflow-auto">
                    {mistakenWords.map((wordPair, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 font-medium"
                      >
                        <span className="text-gray-700 dark:text-gray-400">
                          {index + 1}.
                        </span>
                        <span className="text-green-600 dark:text-green-400">
                          {wordPair.original}
                        </span>
                        <span className="text-gray-500">→</span>
                        <span className="text-red-600 dark:text-red-500">
                          {wordPair.mistaken}
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="mt-1 text-green-600 dark:text-green-400">
                    None
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default TypingTestPage;
