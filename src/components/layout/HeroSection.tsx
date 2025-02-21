import { ChevronDown, ChevronRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { keyboardKeys } from "../../config/learntyping";
import KeyboardButton from "../learn-typing/buttons/KeyboardButton";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const scrollToTypingTest = () => {
    const element = document.getElementById("typing-test");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero" className="min-h-[calc(100vh-80px)] relative w-full bg-transparent text-light-textPrimary dark:text-dark-textPrimary text-center py-8 sm:py-10 md:py-20 lg:py-24 px-6 flex flex-col items-center justify-center">
      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="text-[40px] sm:text-5xl md:text-6xl font-extrabold leading-tight ">
          Master Your <br className="sm:hidden" />
          <span className="text-transparent text-clip bg-clip-text bg-gradient-to-tr from-indigo-800 via-indigo-700 to-indigo-600 dark:from-indigo-600 dark:via-indigo-500 dark:to-indigo-400">
            Typing Skills
          </span>
        </h1>
        <p className="text-lg md:text-xl mt-4 text-light-textSecondary dark:text-dark-textSecondary mb-2 md:mb-3 lg:mb-4">
          Enhance speed & accuracy with structured lessons and real-time tests.
        </p>
        {/* Virtual Keyboard */}
        <div className="bg-gray-200 max-w-sm mx-auto sm:max-w-none dark:bg-gray-700 py-4 pt-6 px-4 rounded-2xl relative">
          <div
            className="absolute inset-0 rounded-2xl bg-gray-300 dark:bg-gray-700"
            style={{
              boxShadow:
                "0px 5px 10px rgba(255,255,255,0.2) inset, 5px 0px 10px rgba(0,0,0,0.1) inset, -5px 0px 10px rgba(0,0,0,0.1) inset, 0px -5px 10px rgba(0,0,0,0.1) inset",
            }}
          ></div>
          {keyboardKeys.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center gap-1 md:gap-1.5 mb-2 md:mb-3"
            >
              {row.map((key, index) => (
                <KeyboardButton
                  key={index}
                  text1={key.text1}
                  text2={key?.text2!}
                  view={"home"}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-6">
          {/* Start Learning Button */}
          <button
            onClick={() => navigate("/learn-typing")}
            className="text-center bg-indigo-600 dark:bg-indigo-500 text-white dark:text-gray-50  px-9 sm:px-6 md:px-8 py-3.5 sm:py-3.5 md:py-[17px] rounded-full font-semibold text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:scale-105"
          >
            <span>Start Learning</span> <ChevronRight size={28} />
          </button>

          {/* Practice Typing Button */}
          <button
            onClick={scrollToTypingTest}
            className="text-center bg-transparent border-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-500  px-8 sm:px-6 md:px-8 py-3 sm:py-3 md:py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-3 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-gray-50 transition-all duration-300 shadow-lg hover:scale-105"
          >
            <span>Practice Typing</span> <ChevronDown size={28} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
