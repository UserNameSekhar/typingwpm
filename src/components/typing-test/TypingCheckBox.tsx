import { CircleCheckBig } from "lucide-react";
import React from "react";

interface TCBProps {
  completed: boolean;
  totalCharsTyped: number;
  timeLimit: number;
  accuracy: number;
  errors: number;
  startTime: number | null;
  timeLeft: number;
  calculateFinalWpm: () => number;
  calculateFinalCpm: () => number;
}

const TypingCheckBox: React.FC<TCBProps> = ({
  completed,
  totalCharsTyped,
  timeLimit,
  accuracy,
  errors,
  startTime,
  timeLeft,
  calculateFinalWpm,
}) => {
  return (
    <>
      <div className="w-full max-w-3xl mx-auto mb-4 p-4 md:p-6 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl border border-transparent dark:border-gray-800 transition-all duration-300">
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
                {Math.round(totalCharsTyped - 1)}
              </strong>{" "}
              characters &
              <strong className="mx-1 text-base md:text-lg lg:text-xl text-light-textPrimary dark:text-dark-textPrimary font-semibold">
                {Math.round(totalCharsTyped / 5)}
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
                {accuracy.toFixed(2)}%
              </strong>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-5">
            <div className="flex flex-col items-center justify-center gap-1 md:gap-2 border-r-2 border-gray-200 dark:border-gray-700">
              <span className="text-xl md:text-2xl lg:text-3xl  font-extrabold">
                {Math.max(
                  Math.round(
                    (totalCharsTyped - errors) /
                      ((Date.now() - (startTime || Date.now())) / 60000 || 1)
                  ),
                  0
                )}
              </span>
              <span className="text-sm md:text-base  text-lime-600 dark:text-lime-500 font-semibold">
                CPM
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 md:gap-2 border-r-2 border-gray-200 dark:border-gray-700">
              <span className="text-xl md:text-2xl lg:text-3xl  font-extrabold">
                {Math.max(
                  Math.round(
                    (totalCharsTyped / 5 - errors) /
                      ((Date.now() - (startTime || Date.now())) / 60000 || 1)
                  ),
                  0
                )}
              </span>
              <span className="text-sm md:text-base  text-amber-500 dark:text-amber-400 font-semibold">
                WPM
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 md:gap-2 border-r-2 border-gray-200 dark:border-gray-700">
              <span className="text-xl md:text-2xl lg:text-3xl  font-extrabold">
              {accuracy.toFixed(0)}%
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
              <span className="text-sm md:text-base  text-cyan-600 dark:text-cyan-500 font-semibold">
                Time Left
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TypingCheckBox;
