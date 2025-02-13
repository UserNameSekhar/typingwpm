import React from "react";
import { useNavigate } from "react-router-dom";

const AdsBlock: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="ads-block container mx-auto my-2 bg-light-card dark:bg-dark-card shadow-none hover:shadow-md rounded-lg p-4 flex flex-col md:flex-row items-center gap-6 duration-300">
      <img
        src="https://via.placeholder.com/300x150"
        alt="Ad placeholder"
        className="w-full md:w-1/3 rounded-md object-cover"
      />
      <div className="ads-content text-center md:text-left">
        <h3 className="text-light-textPrimary dark:text-dark-textPrimary font-accent text-2xl font-semibold mb-2">
          Your Ad Here!
        </h3>
        <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm mb-4">
          Promote your business and reach thousands of potential customers.
          Advertise with us today!
        </p>
        <button
          onClick={() => navigate("/contact")}
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 bg-light-buttonPrimary dark:bg-dark-primary text-white rounded-md font-support font-medium hover:bg-blue-600 dark:hover:bg-orange-500 transition-colors duration-300"
        >
          Advertise Now
        </button>
      </div>
    </div>
  );
};

export default AdsBlock;
