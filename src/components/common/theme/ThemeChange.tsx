import React from "react";

interface ThemeChangeProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeChange: React.FC<ThemeChangeProps> = ({
  isDarkMode,
  toggleTheme,
}) => {
  return (
    <div
      onClick={toggleTheme}
      className="flex py-2.5 flex-row-reverse gap-2 font-medium font-support items-center justify-center cursor-pointer rounded-lg text-purple-950 dark:text-light-accent shadow-none hover:shadow-sm px-4 active:shadow-none bg-light-card  hover:shadow-purple-500/00 dark:shadow-light-accent/0 dark:hover:shadow-light-accent/80 dark:bg-dark-card transition-all ease-in-out duration-300 delay-75 p-2"
      style={{ userSelect: "none" }}
    >
      {!isDarkMode ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor" fillOpacity="0">
              <path d="M15.22 6.03l2.53 -1.94l-3.19 -0.09l-1.06 -3l-1.06 3l-3.19 0.09l2.53 1.94l-0.91 3.06l2.63 -1.81l2.63 1.81l-0.91 -3.06Z">
                <animate
                  fill="freeze"
                  attributeName="fill-opacity"
                  begin="0.7s"
                  dur="0.4s"
                  values="0;1"
                />
              </path>
              <path d="M19.61 12.25l1.64 -1.25l-2.06 -0.05l-0.69 -1.95l-0.69 1.95l-2.06 0.05l1.64 1.25l-0.59 1.98l1.7 -1.17l1.7 1.17l-0.59 -1.98Z">
                <animate
                  fill="freeze"
                  attributeName="fill-opacity"
                  begin="1.1s"
                  dur="0.4s"
                  values="0;1"
                />
              </path>
            </g>
            <path
              fill="none"
              stroke="currentColor"
              strokeDasharray="56"
              strokeDashoffset="56"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 6c0 6.08 4.92 11 11 11c0.53 0 1.05 -0.04 1.56 -0.11c-1.61 2.47 -4.39 4.11 -7.56 4.11c-4.97 0 -9 -4.03 -9 -9c0 -3.17 1.64 -5.95 4.11 -7.56c-0.07 0.51 -0.11 1.03 -0.11 1.56Z"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.6s"
                values="56;0"
              />
            </path>
          </svg>
          <span className="text-sm">Dark</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 18.5a1.5 1.5 0 0 1 1.493 1.356L13.5 20v1a1.5 1.5 0 0 1-2.993.144L10.5 21v-1a1.5 1.5 0 0 1 1.5-1.5m0-17a1.5 1.5 0 0 1 1.493 1.356L13.5 3v1a1.5 1.5 0 0 1-2.993.144L10.5 4V3A1.5 1.5 0 0 1 12 1.5m5.303 3.075a1.5 1.5 0 0 1 2.225 2.008l-.103.114l-.707.707a1.5 1.5 0 0 1-2.225-2.008l.103-.114zm-12.728 0a1.5 1.5 0 0 1 2.008-.103l.114.103l.707.707a1.5 1.5 0 0 1-2.008 2.225l-.114-.103l-.707-.707a1.5 1.5 0 0 1 0-2.122M21 10.5a1.5 1.5 0 0 1 .144 2.993L21 13.5h-1a1.5 1.5 0 0 1-.144-2.993L20 10.5zm-17 0a1.5 1.5 0 0 1 .144 2.993L4 13.5H3a1.5 1.5 0 0 1-.144-2.993L3 10.5z"
              className="duoicon-primary-layer"
            />
            <path
              fill="currentColor"
              d="M12 6c4.619 0 7.506 5 5.196 9A6 6 0 0 1 12 18c-4.619 0-7.506-5-5.196-9A6 6 0 0 1 12 6"
              className="duoicon-secondary-layer"
              opacity="0.3"
            />
            <path
              fill="currentColor"
              d="M5.282 16.596a1.5 1.5 0 0 1 2.225 2.008l-.103.114l-.707.707a1.5 1.5 0 0 1-2.225-2.008l.103-.114zm11.314 0a1.5 1.5 0 0 1 2.008-.103l.114.103l.707.707a1.5 1.5 0 0 1-2.008 2.225l-.114-.103l-.707-.707a1.5 1.5 0 0 1 0-2.122"
              className="duoicon-primary-layer"
            />
          </svg>
          <span className="text-sm">Light</span>
        </>
      )}
    </div>
  );
};

export default ThemeChange;
