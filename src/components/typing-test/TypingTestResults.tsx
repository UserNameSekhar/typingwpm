import { RefreshCw } from "lucide-react";
import React from "react";

interface MistakenWords {
  index: number;
  mistaken: string;
}

interface TTRProps {
  type: string;
  level: string;
  timeLimit: number;
  totalCharsTyped: number;
  errors: number;
  accuracy: number;
  calculateFinalWpm: () => number;
  mistakenWords: MistakenWords[];
  paragraph: string[];
  calculateFinalCpm: () => number
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
  paragraph,
  calculateFinalCpm
}) => {
  return (
    <>
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
            {Math.round(totalCharsTyped / 5)}
          </p>
          <p>
            <strong className="">Total Errors:</strong> {errors}
          </p>
          <p>
            <strong className="">Accuracy:</strong> {accuracy.toFixed(2)}%
          </p>
          <p>
            <strong className="">Your Speed:</strong>{" "}
            <span className="text-green-600 dark:text-green-500 font-extrabold">
              {calculateFinalWpm()} WPM
            </span>
          </p>
          <p>
            <strong className="">Your Speed:</strong>{" "}
            <span className="text-green-600 dark:text-green-500 font-extrabold">
              {calculateFinalCpm()} CPM
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
                        {paragraph[wordPair.index]}
                      </span>
                      <span className="text-gray-500">→</span>
                      <span className="text-red-600 dark:text-red-500">
                        {wordPair.mistaken}
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
