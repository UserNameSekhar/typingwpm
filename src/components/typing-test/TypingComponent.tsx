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
      className={`mr-3 text-2xl font-mono inline-block relative ${
        wordIndex < currentWordIndex
          ? isMistaken
            ? "text-red-500 dark:text-orange-500"
            : "text-lime-600 dark:text-lime-500"
          : "text-gray-500 dark:text-gray-500"
      }`}
      style={{ position: "relative", letterSpacing: "1px" }}
    >
      {/* Smooth Moving Caret */}
      {isCurrentWord && (
        <span
          className="absolute top-0 -left-[1px] h-full w-[2px] bg-black dark:bg-white animate-blink transition-transform ease-in-out duration-150"
          style={{
            transform: `translateX(${cursorPosition * 14}px)`,
          }}
        ></span>
      )}

      {word.split("").map((char, index) => (
        <span
          key={index}
          className={`relative font-mono inline-block ${
            characterErrors[index] ? "underline" : ""
          } ${
            isCurrentWord
              ? characterErrors[index]
                ? "text-red-500 dark:text-orange-500"
                : index < cursorPosition
                ? "text-lime-600 dark:text-lime-400"
                : "text-black dark:text-white"
              : ""
          }`}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default TypingComponent;
