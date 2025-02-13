import React from "react";

interface NotFoundProps {
  type: string; // Dynamic text type (e.g., 'Movie', 'Actor', 'Director', etc.)
}

const ItemNotFound: React.FC<NotFoundProps> = ({ type }) => {
  const getSvg = () => {
    switch (type.toLowerCase()) {
      case "movie":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-28 h-28 md:w-24 md:h-24 lg:w-48 lg:h-48 text-dark-primary"
            viewBox="0 0 48 48"
          >
            <path
              fill="currentColor"
              d="m38.215 39.983l3.651 3.65a1.25 1.25 0 0 0 1.768-1.767l-37.5-37.5a1.25 1.25 0 1 0-1.768 1.768L7.09 8.857A6.25 6.25 0 0 0 4 14.25v19.5A6.25 6.25 0 0 0 10.25 40h27.5q.235 0 .465-.017M35.732 37.5H10.25a3.75 3.75 0 0 1-3.75-3.75v-19.5a3.75 3.75 0 0 1 2.46-3.522zM44 33.75a6.23 6.23 0 0 1-1.543 4.112l-1.774-1.775c.511-.64.817-1.453.817-2.337v-19.5a3.75 3.75 0 0 0-3.75-3.75H15.096l-2.5-2.5H37.75A6.25 6.25 0 0 1 44 14.25zm-6-1.25c0 .261-.067.507-.184.72l-2.56-2.559A1.499 1.499 0 0 1 38 31.5zm-28-17a1.5 1.5 0 0 1 3 0v1a1.5 1.5 0 0 1-3 0zM36.5 14a1.5 1.5 0 0 0-1.5 1.5v1a1.5 1.5 0 0 0 3 0v-1a1.5 1.5 0 0 0-1.5-1.5M10 23.5a1.5 1.5 0 0 1 3 0v1a1.5 1.5 0 0 1-3 0zM36.5 22a1.5 1.5 0 0 0-1.5 1.5v1a1.5 1.5 0 0 0 3 0v-1a1.5 1.5 0 0 0-1.5-1.5M10 31.5a1.5 1.5 0 0 1 3 0v1a1.5 1.5 0 0 1-3 0z"
            />
          </svg>
        );

      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-28 h-28 md:w-24 md:h-24 lg:w-48 lg:h-48 text-dark-primary"
            viewBox="0 0 24 24"
          >
            <mask id="lineMdPersonSearchFilled0">
              <g
                fill="#fff"
                fillOpacity="0"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path
                  strokeDasharray="20"
                  strokeDashoffset="20"
                  d="M10 5c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.4s"
                    values="20;0"
                  />
                </path>
                <path
                  strokeDasharray="36"
                  strokeDashoffset="36"
                  d="M10 14c4 0 7 2 7 3v2h-14v-2c0 -1 3 -3 7 -3Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.5s"
                    dur="0.5s"
                    values="36;0"
                  />
                </path>
                <circle cx="16" cy="16" r="6" fill="#000" stroke="none">
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="1.7s"
                    dur="0.2s"
                    values="0;1"
                  />
                </circle>
                <path
                  strokeDasharray="20"
                  strokeDashoffset="20"
                  d="M16 19c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3"
                  transform="rotate(-45 16 16)"
                >
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="2.2s"
                    dur="0.5s"
                    values="0;1"
                  />
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="1.7s"
                    dur="0.2s"
                    values="20;0"
                  />
                </path>
                <path
                  strokeDasharray="6"
                  strokeDashoffset="6"
                  d="M16 19v4"
                  transform="rotate(-45 16 16)"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="1.9s"
                    dur="0.2s"
                    values="6;0"
                  />
                </path>
                <animate
                  fill="freeze"
                  attributeName="fill-opacity"
                  begin="1.1s"
                  dur="0.5s"
                  values="0;1"
                />
              </g>
            </mask>
            <rect
              width="24"
              height="24"
              fill="currentColor"
              mask="url(#lineMdPersonSearchFilled0)"
            />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div>{getSvg()}</div>
      <h1 className="mt-4 text-center text-2xl md:text-3xl lg:text-4xl font-semibold text-light-textPrimary dark:text-dark-textPrimary capitalize">
        {type} not found.
      </h1>
    </div>
  );
};

export default ItemNotFound;
