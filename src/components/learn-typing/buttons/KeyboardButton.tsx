import React, { useEffect, useState } from "react";
import "./keyboardButton.css";

interface KBProps {
  text1: string;
  text2?: string;
  clickedKey?: string;
  isKeyPressed?: boolean;
  view?: string;
}

const KeyboardButton: React.FC<KBProps> = ({
  text1,
  text2,
  clickedKey,
  isKeyPressed,
  view,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const isSpaceKey = text1.toLowerCase() === "space";
  const isBigKey = ["shift", "tab", "backspace", "enter"].includes(
    text1.toLowerCase()
  );
  const isMediumKey = ["ctrl", "fn", "alt"].includes(text1.toLowerCase());

  const paddingClass = isSpaceKey
    ? `${
        view === "home"
          ? "px-8 sm:px-12 md:px-14 lg:px-16 xl:px-20"
          : "px-9 sm:px-14 md:px-20 lg:px-24 xl:px-28"
      }`
    : isBigKey
    ? `${
        view === "home"
          ? "px-1.5 sm:px-3 md:px-4"
          : "px-2 sm:px-4 md:px-[20px] lg:px-[22px] xl:px-6"
      }`
    : isMediumKey
    ? `${
        view === "home"
          ? "px-1 sm:px-3 md:px-3.5"
          : "px-2 sm:px-3.5 md:px-[15px] lg:px-[18px] xl:px-5"
      }`
    : `${
        view === "home"
          ? "px-[5px] sm:px-2.5 md:px-3.5"
          : "px-[7px] sm:px-3 md:px-[13px] lg:px-[15px] xl:px-[18px]"
      }`;

  const frontColorClass = isSpaceKey
    ? `${
        view === "home"
          ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          : "bg-indigo-600 dark:bg-indigo-500 text-white dark:text-gray-100"
      }`
    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200";

  const edgeColorClass = isSpaceKey
    ? `${
        view === "home"
          ? "bg-gradient-to-l from-gray-300 via-gray-200 to-gray-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
          : "bg-gradient-to-l from-indigo-950 via-indigo-800 to-indigo-950 dark:from-indigo-900 dark:via-indigo-700 dark:to-indigo-900"
      }`
    : "bg-gradient-to-l from-gray-300 via-gray-200 to-gray-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950";

  // Handle tooltip and active state
  useEffect(() => {
    if (clickedKey) {
      const isKeyMatch =
        clickedKey.toLowerCase() === text1.toLowerCase() ||
        clickedKey.toLowerCase() === text2?.toLowerCase();

      if (isKeyMatch) {
        setIsActive(isKeyPressed!);
        setShowTooltip(isKeyPressed!);
      } else {
        setIsActive(false);
        setShowTooltip(false);
      }
    }
  }, [clickedKey, isKeyPressed, text1, text2]);

  return (
    <button className={`button  outline-none  ${isActive ? "active" : ""}`}>
      {/* Tooltip */}
      {showTooltip && <div className="tooltip visible">{clickedKey}</div>}

      {/* Button Content */}
      <span
        className={`shadow ${
          view === "home"
            ? "rounded-sm sm:rounded-md"
            : "rounded-sm sm:rounded-md lg:rounded-lg"
        } top-[2px] sm:top-[3px] md:top-1 lg:top-[5px]`}
      ></span>
      <span
        className={`edge ${
          view === "home"
            ? "rounded-sm sm:rounded-md"
            : "rounded-sm sm:rounded-md  lg:rounded-lg"
        } ${edgeColorClass} top-[1px] sm:top-[2px] md:top-[3px]`}
      ></span>
      <span
        className={`front ${
          view === "home"
            ? "rounded-sm sm:rounded-md"
            : "rounded-sm sm:rounded-md  lg:rounded-lg"
        } ${paddingClass} ${frontColorClass} ${
          isActive ? "active" : ""
        } truncate ${
          view === "home"
            ? "py-0.5 sm:py-1 md:py-1.5 lg:py-2"
            : "py-1 sm:py-2 md:py-2 lg:py-2.5 xl:py-[11px]"
        } transform -translate-y-[2px] md:-translate-y-[3px] lg:-translate-y-1 ${
          view === "home"
            ? "text-[10px] sm:text-sm"
            : "text-xs sm:text-sm md:text-lg lg:text-xl"
        } font-semibold`}
      >
        {view === "home" ? (
          <></>
        ) : (
          <>
            {text2 && (
              <span className="">
                <span className="text-xs sm:text-sm md:text-base absolute top-[2px] left-1 md:left-[5px] ">
                  {text2}
                </span>
                <span className=" absolute bottom-1 right-1 md:right-[5px]">
                  {text1}
                </span>
                <span className="text-right flex justify-end justify-self-end text-gray-100 dark:text-gray-800">
                  {text1}
                </span>
              </span>
            )}

            {!text2 && text1}
          </>
        )}
        {view === "home" && text1}

        {view !== "home" && (
          <>
            {(text1.toLowerCase() === "f" || text1.toLowerCase() === "j") && (
              <span className="absolute bottom-[3px] sm:bottom-[5px] md:bottom-2 w-[6px] h-[1px] sm:w-[10px] sm:h-[2px] bg-gray-500 dark:bg-gray-400 rounded-full"></span>
            )}
          </>
        )}
      </span>
    </button>
  );
};

export default KeyboardButton;
