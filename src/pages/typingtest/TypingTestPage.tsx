import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TypingCheckBox from "../../components/typing-test/TypingCheckBox";
import TypingTestPageHeader from "../../components/typing-test/TypingTestPageHeader";
import TypingTestResults from "../../components/typing-test/TypingTestResults";
import { typingTestConfig } from "../../config/typingConfig";

const TypingTestPage: React.FC = () => {
  const location = useLocation();
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
    { index: number; mistaken: string }[]
  >([]);
  const [totalCharsTyped, setTotalCharsTyped] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);
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
        setTotalCharsTyped((prev) => prev + value.length);
      } else {
        // Incorrect word
        setErrors((prev) => prev + 1);
        setMistakenWords((prev) => [
          ...prev,
          { index: currentWordIndex, mistaken: value.trim() },
        ]);
      }

      setUserInput("");
      setCurrentWordIndex((prev) => prev + 1);
      setCursorPosition(0);

      if (currentWordIndex + 1 >= paragraph.length) {
        fetchNewParagraph();
      }
    }

    // Update live accuracy
    const totalTypedChars = totalCharsTyped + value.length;
    const accuracyCalc =
      Math.max(0, (totalTypedChars - errors) / totalTypedChars) * 100;
    setAccuracy(accuracyCalc);
  };

  const restartTest = () => {
    setCurrentWordIndex(0);
    setUserInput("");
    setErrors(0);
    setMistakenWords([]);
    setStartTime(null);
    setTimeLeft(timeLimit);
    setAccuracy(0);
    setCompleted(false);
    setTotalCharsTyped(0);
    setEndTime(null);
    setCharacterErrors([]);
    fetchNewParagraph();
  };

  const calculateFinalWpm = () => {
    if (!startTime || !endTime) return 0;
    const minutesElapsed = (endTime - startTime) / 60000 || 1; // Prevent division by zero
    return Math.max(Math.round((totalCharsTyped / 5 - errors) / minutesElapsed), 0);
  };

  const calculateFinalCpm = () => {
    if (!startTime || !endTime) return 0;
    const minutesElapsed = (endTime - startTime) / 60000 || 1; // Prevent division by zero
    return Math.max(Math.round(totalCharsTyped / minutesElapsed), 0);
  };

  return (
    <section className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center px-4 md:px-6 py-6 text-light-textPrimary dark:text-dark-textPrimary">
      <TypingTestPageHeader
        type={type}
        level={level}
        timeLimit={timeLimit}
        onNewTestClick={restartTest}
      />

      <TypingCheckBox
        completed={completed}
        totalCharsTyped={totalCharsTyped}
        timeLimit={timeLimit}
        accuracy={accuracy}
        errors={errors}
        startTime={startTime}
        timeLeft={timeLeft}
        calculateFinalWpm={calculateFinalWpm}
        calculateFinalCpm={calculateFinalCpm}
      />

      {!completed ? (
        <div className="w-full max-w-3xl mx-auto text-wrap overflow-hidden allow-select p-4 md:p-6 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <p className="mb-4 text-wrap break-normal whitespace-normal allow-select">
            {paragraph.map((word, wIndex) => {
              let wordClass = "text-gray-600 dark:text-gray-400 allow-select";

              const isMistaken = mistakenWords.some(
                (mistake) => mistake.index === wIndex
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
                            className={`text-lg lg:text-xl allow-select ${
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
        <>
          <TypingTestResults
            type={type}
            level={level}
            timeLimit={timeLimit}
            errors={errors}
            accuracy={accuracy}
            totalCharsTyped={totalCharsTyped}
            mistakenWords={mistakenWords}
            calculateFinalWpm={calculateFinalWpm}
            calculateFinalCpm={calculateFinalCpm}
            paragraph={paragraph}
            restartTest={restartTest}
          />
        </>
      )}
    </section>
  );
};

export default TypingTestPage;