import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b from-light-bg via-light-card to-light-bg dark:from-dark-bg dark:via-dark-card dark:to-dark-bg text-light-textPrimary dark:text-dark-textPrimary min-h-[90vh]">
      <div className="flex flex-col items-center justify-center  min-h-[90vh]  px-4">
        {/* SVG Icon */}
        <div className="mb-8">
          <svg
            className="w-44 h-44 sm:w-48 sm:h-48 lg:w-52 lg:h-52 xl:w-56 xl:h-56 text-dark-primary "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12C24 5.373 18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-16h2v8h-2V6zm0 10h2v2h-2v-2z" />
          </svg>
        </div>

        {/* Message */}
        <h1 className="text-3xl sm:text-4xl font-primary font-bold mb-4 text-center">
          Oops! Page Not Found
        </h1>
        <p className="text-base max-w-sm mx-auto sm:max-w-lg font-support mb-8 text-center">
          The page you are looking for doesn't exist or has been moved.
        </p>

        {/* Back Button */}
        <button
          className="bg-light-buttonPrimary text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-primary text-base md:text-lg hover:bg-dark-buttonPrimary/70 transition duration-300"
          onClick={() => navigate("/")}
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
