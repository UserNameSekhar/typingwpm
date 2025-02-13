import React from "react";
import { useNavigate } from "react-router-dom";

const AppLogo: React.FC = () => {
  const navigate = useNavigate();

  const btnStyle =
    "w-1 h-1 md:w-1.5 md:h-1.5 bg-transparent border border-indigo-300 dark:border-indigo-400 rounded-sm";
  return (
    <>
      {/* Logo */}
      <div
        className="cursor-pointer px-3 py-1"
        onClick={() => navigate("/")}
        style={{ userSelect: "none" }}
      >
        <div className="flex items-center space-x-1.5 m-1">
          {/* Keyboard Icon */}
          <div className="bg-transparent border-2  border-indigo-400 dark:border-indigo-500 rounded-lg relative flex flex-col items-center justify-center p-1 gap-0.5">
            {/* Keyboard Keys */}
            <div className="flex justify-between gap-0.5">
              <div className={`${btnStyle}`}></div>
              <div className={`${btnStyle}`}></div>
              <div className={`${btnStyle}`}></div>
              <div className={`${btnStyle}`}></div>
            </div>
            <div className="flex justify-between gap-0.5">
              <div className={`${btnStyle}`}></div>
              <div className={`${btnStyle}`}></div>
              <div className={`${btnStyle}`}></div>
              <div className={`${btnStyle}`}></div>
            </div>
            <div className="flex justify-between gap-0.5">
              <div className={`${btnStyle}`}></div>
              <div className="w-3 h-1 md:h-1.5 md:w-4 bg-transparent border-2 border-indigo-400 dark:border-indigo-400 rounded-sm"></div>
              <div className={`${btnStyle}`}></div>
            </div>
          </div>
          {/* Text */}
          <h1 className="text-xl sm:text-[22px] md:text-[25px] lg:text-[25px] text-nowrap font-bold text-gray-700 dark:text-white tracking-wide">
            Type
            <span className="text-indigo-600 dark:text-indigo-500 tracking-tighter font-extrabold">
              WPM
            </span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default AppLogo;
