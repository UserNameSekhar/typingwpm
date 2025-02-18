import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TypingCheckBox from "../../components/typing-test/TypingCheckBox";
import TypingComponent from "../../components/typing-test/TypingComponent";
import TypingTestPageHeader from "../../components/typing-test/TypingTestPageHeader";
import TypingTestResults from "../../components/typing-test/TypingTestResults";
import { typingTestConfig } from "../../config/typingConfig";

interface MistakenWord {
  paragraphIndex: number;
  wordIndex: number;
  mistaken: string;
  correctWord: string;
}

const TypingTestPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get("type") || "Text";
  const level = params.get("level") || "Basic";
  const timeLimit =
    parseInt(params.get("time")?.replace("min", "") || "1") * 60;

  const [paragraph, setParagraph] = useState<string[]>([]);
  const [allParagraphs, setAllParagraphs] = useState<string[][]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState<string>("");
  const [errors, setErrors] = useState(0);
  const [mistakenWords, setMistakenWords] = useState<MistakenWord[]>([]);
  const [wordsMistaken, setWordsMistaken] = useState<MistakenWord[]>([]);
  const [totalCharsTyped, setTotalCharsTyped] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [endTime, setEndTime] = useState<number | null>(null);
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
      setAllParagraphs([["Error: Invalid type."]]);
      return;
    }

    const levelKey = Object.keys(typingTestConfig[typeKey]).find(
      (key) => key.toLowerCase() === level.toLowerCase()
    );

    if (!levelKey) {
      setParagraph(["Error: Invalid level."]);
      setAllParagraphs([["Error: Invalid level."]]);
      return;
    }

    const texts = typingTestConfig[typeKey][levelKey] ?? [];
    if (texts.length > 0) {
      const randomText = texts[Math.floor(Math.random() * texts.length)];
      const words = randomText.split(" ");
      setParagraph(words);
      setAllParagraphs((prev) => [...prev, words]);
      setCurrentWordIndex(0);
      setUserInput("");
      setCharacterErrors(new Array(words.length).fill([]));
      setWordsMistaken([]);
    } else {
      setParagraph(["Error: No text found for this mode."]);
      setAllParagraphs([["Error: No text found for this mode."]]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (completed) return;
    if (!startTime) setStartTime(Date.now());

    const value = e.target.value;

    // Prevent space before typing any character
    if (value === " " && userInput === "") {
      return;
    }

    setUserInput(value); // Set the current input value

    const currentWord = paragraph[currentWordIndex];

    // Character error tracking (including spaces)
    const newCharacterErrors = value.split("").map((char, index) => {
      return index < currentWord.length ? char !== currentWord[index] : false; // Handle input beyond word length
    });

    setCharacterErrors((prev) => {
      const newErrors = [...prev];
      newErrors[currentWordIndex] = newCharacterErrors;
      return newErrors;
    });

    // Word completion logic
    if (value.endsWith(" ")) {
      const enteredWord = value.trim();
      const isCorrect = enteredWord === currentWord;

      setTotalCharsTyped((prev) => prev + value.length); // Count all typed chars including space

      if (!isCorrect) {
        setErrors((prev) => prev + 1);
        setMistakenWords((prev) => [
          ...prev,
          {
            paragraphIndex: allParagraphs.length - 1,
            wordIndex: currentWordIndex,
            mistaken: enteredWord,
            correctWord: currentWord,
          },
        ]);
        setWordsMistaken((prev) => [
          ...prev,
          {
            paragraphIndex: allParagraphs.length - 1,
            wordIndex: currentWordIndex,
            mistaken: enteredWord,
            correctWord: currentWord,
          },
        ]);
      }

      setUserInput(""); // Clear input for the next word
      setCurrentWordIndex((prev) => prev + 1);

      if (currentWordIndex + 1 >= paragraph.length) {
        fetchNewParagraph();
      }
    }

    // Live accuracy calculation (including spaces)
    const totalTypedChars = totalCharsTyped + value.length;
    const accuracyCalc =
      totalTypedChars > 0
        ? Math.max(0, (totalTypedChars - errors) / totalTypedChars) * 100
        : 0;
    setAccuracy(accuracyCalc);
  };

  const restartTest = () => {
    setCurrentWordIndex(0);
    setUserInput("");
    setErrors(0);
    setMistakenWords([]);
    setWordsMistaken([]);
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
    return Math.max(
      Math.round((totalCharsTyped / 5 - errors) / minutesElapsed),
      0
    );
  };

  const calculateFinalCpm = () => {
    if (!startTime || !endTime) return 0;
    const minutesElapsed = (endTime - startTime) / 60000 || 1; // Prevent division by zero
    return Math.max(Math.round(totalCharsTyped / minutesElapsed), 0);
  };

  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 md:px-6 py-6 text-light-textPrimary dark:text-dark-textPrimary bg-gradient-to-tl from-cyan-50 via-cyan-50 dark:from-cyan-950/20 dark:via-cyan-900/20 dark:to-orange-900/20 to-orange-100">
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
        <div className="w-full max-w-3xl mx-auto text-wrap overflow-hidden allow-select p-4 md:p-6 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl border border-transparent dark:border-gray-800 transition-all duration-300">
          <p className="mb-4 text-wrap break-normal whitespace-normal allow-select">
            {paragraph.map((word, wIndex) => (
              <TypingComponent
                key={wIndex}
                word={word}
                cursorPosition={
                  wIndex === currentWordIndex ? userInput.length : 0
                } // Cursor based on userInput
                currentWordIndex={currentWordIndex}
                wordIndex={wIndex}
                characterErrors={characterErrors[wIndex] || []}
                isMistaken={wordsMistaken.some(
                  (mistake) => mistake.wordIndex === wIndex
                )}
                isCurrentWord={wIndex === currentWordIndex}
              />
            ))}
          </p>

          {/* Typing Input - Shows only current word's input */}
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            autoFocus
            placeholder={startTime ? "" : "Start Typing Here..."}
            className="w-full p-4 font-semibold text-lg tracking-wide md:text-xl border-b-2 border-gray-200 hover:border-gray-400 focus:border-gray-500 dark:border-gray-700 dark:hover:border-gray-500 dark:focus:border-gray-400 outline-none rounded-lg bg-white dark:bg-gray-900 whitespace-normal transition-all ease-in-out duration-300 delay-75"
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
            allParagraphs={allParagraphs}
            restartTest={restartTest}
          />
        </>
      )}
    </section>
  );
};

export default TypingTestPage;
