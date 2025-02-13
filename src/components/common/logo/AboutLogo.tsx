import React from "react";

const AboutLogo: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full p-2 rounded-lg bg-gradient-to-br from-light-card via-light-bg to-light-bg dark:from-dark-card dark:via-dark-bg dark:to-dark-bg font-support">
      <div className="text-center">
        <div className="relative inline-block">
          {/* Logo Icon */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 blur-lg opacity-50 rounded-full"></div>
          <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-full shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16 text-gray-900"
            >
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 13H7a1 1 0 110-2h4a1 1 0 010 2zm6 0h-3a1 1 0 010-2h3a1 1 0 010 2zm0-4H7a1 1 0 110-2h10a1 1 0 010 2z" />
            </svg>
          </div>
        </div>

        {/* Logo Name */}
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold tracking-wide text-white uppercase">
          <span className="text-green-400">Film</span>{" "}
          <span className="text-gray-300">Forest</span>
        </h1>

        {/* Slogan */}
        <p className="mt-2 text-lg text-gray-400">Where Cinema Meets Nature</p>
      </div>
    </div>
  );
};

export default AboutLogo;
