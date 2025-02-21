import { RefreshCw } from "lucide-react";
import React from "react";

interface MistakenWord {
  paragraphIndex: number; // Track which paragraph the mistake belongs to
  wordIndex: number; // Track the word index within the paragraph
  mistaken: string; // The incorrect word typed by the user
  correctWord: string; // The correct word from the paragraph
}

interface TTRProps {
  type: string;
  level: string;
  timeLimit: number;
  totalCharsTyped: number;
  errors: number;
  accuracy: number;
  calculateFinalWpm: () => number;
  mistakenWords: MistakenWord[];
  allParagraphs: string[][]; // Pass all paragraphs
  calculateFinalCpm: () => number;
  restartTest: () => void;
}

const TypingTestResults: React.FC<TTRProps> = ({
  type,
  level,
  timeLimit,
  totalCharsTyped,
  errors,
  accuracy,
  calculateFinalWpm,
  mistakenWords,
  allParagraphs, // Destructure allParagraphs
  calculateFinalCpm,
  restartTest,
}) => {
  return (
    <>
      <div className="w-full max-w-3xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <div className="flex items-center justify-between border-b pb-3 mb-4 border-gray-300 dark:border-gray-700">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary ">
            Test Results
          </h3>

          <button
            onClick={() => restartTest()}
            className=" bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center text-lg font-semibold shadow-md transition-all duration-300"
          >
            <RefreshCw className="mr-2 w-5 h-5" /> Restart Test
          </button>
        </div>

        <div className="space-y-2 text-lg text-gray-700 dark:text-gray-300">
          <p className="capitalize">
            <strong className=" capitalize">Type :</strong> {type}
          </p>
          <p className="capitalize">
            <strong className=" capitalize">Level :</strong> {level}
          </p>
          <p className="capitalize">
            <strong className=" capitalize">Time :</strong> {timeLimit}sec
          </p>
          <p className="capitalize">
            <strong className=" capitalize">Total Typed Words :</strong>{" "}
            {Math.round(totalCharsTyped / 5)}
          </p>
          <p>
            <strong className="">Total Errors :</strong> {errors}
          </p>
          <p>
            <strong className="">Accuracy :</strong> {accuracy.toFixed(2)}%
          </p>
          <p>
            <strong className="">Your Speed :</strong>{" "}
            <span className="text-green-600 dark:text-green-500 font-extrabold text-xl md:text-2xl">
              {calculateFinalWpm()} WPM{" "}
              <strong className="text-lime-600 dark:text-lime-500 text-sm md:text-base font-normal">
                ({calculateFinalCpm()} CPM){" "}
              </strong>
            </span>
          </p>

          {mistakenWords.length > 0 && (
            <div>
              <strong>Mistaken Words : </strong>
              {mistakenWords.length > 0 ? (
                <ol className="mt-2 pl-10 list-decimal space-y-1 text-gray-800 dark:text-gray-300 max-h-[320px] overflow-auto">
                  {mistakenWords.map((mistake, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 font-medium"
                    >
                      <span className="text-gray-700 dark:text-gray-400">
                        {index + 1}.
                      </span>
                      <span className="text-green-600 dark:text-green-400">
                        {mistake.correctWord}
                      </span>
                      <span className="text-gray-500">→</span>
                      <span className="text-red-600 dark:text-red-500">
                        {mistake.mistaken}
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-1 text-green-600 dark:text-green-400">None</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TypingTestResults;
