import { ChevronRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-transparent  text-light-textPrimary dark:text-dark-textPrimary text-center py-8 sm:py-10 md:py-20 lg:py-24 px-6 flex flex-col items-center justify-center">
      {/* Background Overlay Effect */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md"></div> */}

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Master Your <span className="text-transparent text-clip bg-clip-text bg-gradient-to-tr from-indigo-800 via-indigo-700 to-indigo-600 dark:from-indigo-600 dark:via-indigo-500 dark:to-indigo-400">Typing Skills</span>
        </h1>
        <p className="text-lg md:text-xl mt-4 text-light-textSecondary dark:text-dark-textSecondary">
          Enhance speed & accuracy with structured lessons and real-time tests.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/learn-typing")}
          className="mt-6 bg-indigo-600 dark:bg-indigo-500 text-white dark:text-gray-50 px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 mx-auto hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:scale-105"
        >
          Start Learning <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
