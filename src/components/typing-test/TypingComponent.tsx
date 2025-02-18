import React from "react";

interface TypingComponentProps {
  word: string;
  cursorPosition: number;
  currentWordIndex: number;
  wordIndex: number;
  characterErrors: boolean[];
  isMistaken: boolean;
  isCurrentWord: boolean;
}
const TypingComponent: React.FC<TypingComponentProps> = ({
  word,
  cursorPosition,
  currentWordIndex,
  wordIndex,
  characterErrors,
  isMistaken,
  isCurrentWord,
}) => {
  return (
    <span
      className={`mr-2 text-lg lg:text-xl inline-block tracking-wider relative ${
        wordIndex < currentWordIndex
          ? isMistaken
            ? "text-red-500 dark:text-orange-500"
            : "text-emerald-600 dark:text-lime-500"
          : "text-gray-600 dark:text-gray-400"
      }`}
    >
      {word.split("").map((char, index) => (
        <span
          key={index}
          className={`relative inline-block ${char === " " ? " " : ""} ${
            characterErrors[index] ? "underline" : ""
          } ${
            isCurrentWord
              ? characterErrors[index]
                ? "text-red-500 dark:text-orange-500"
                : index < cursorPosition
                ? "text-emerald-700 dark:text-lime-400"
                : "text-gray-950 dark:text-gray-50"
              : ""
          }`}
        >
          {/* Cursor logic - only show on current word and at correct position*/}
          {isCurrentWord && index === cursorPosition && (
            <span className="absolute top-0 left-0 h-full w-[2px] bg-black dark:bg-white animate-blink"></span>
          )}
          {char}
        </span>
      ))}
    </span>
  );
};
export default TypingComponent;
