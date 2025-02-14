import { ArrowLeft, RefreshCcw } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface TTPHProps {
  type: string;
  level: string;
  timeLimit: number;
  onNewTestClick: () => void;
}

const TypingTestPageHeader: React.FC<TTPHProps> = ({
  type,
  level,
  timeLimit,
  onNewTestClick,
}) => {
  const navigate = useNavigate();
  return (
    <>
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
            onClick={onNewTestClick}
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
    </>
  );
};

export default TypingTestPageHeader;
