import { ChevronRight } from "lucide-react";
import React from "react";

interface AuthBtnProps {
  onClick: () => void;
  svgIcon: React.ReactElement;
  label: string;
  view?: string;
}

const AuthButton: React.FC<AuthBtnProps> = ({
  onClick,
  svgIcon,
  label,
  view,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${view !== "main" ? "w-full" : "max-w-xs w-full"} group  mx-auto shadow-none border border-gray-100 dark:border-gray-800 transition-all duration-300 delay-75 ease-in-out p-3 text-center flex justify-between font-semibold rounded-md items-center`}
    >
      <div className="flex gap-2 md:gap-4 items-center justify-center">
        {svgIcon}
         <span className="text-center">{label}</span>
      </div>
      {/* {view === "main" ? ( */}
        <ChevronRight className="group-hover:transform group-hover:translate-x-2 transition-transform duration-300 ease-in-out" />
      {/* ) : null} */}
    </button>
  );
};

interface BtnProps {
  onClick: () => void;
  view?: string;
}

export const EmailButton: React.FC<BtnProps> = ({ onClick, view }) => {
  return (
    <AuthButton
      onClick={onClick}
      svgIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 md:w-6 h-auto"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="M3.87 4h13.25C18.37 4 19 4.59 19 5.79v8.42c0 1.19-.63 1.79-1.88 1.79H3.87c-1.25 0-1.88-.6-1.88-1.79V5.79c0-1.2.63-1.79 1.88-1.79m6.62 8.6l6.74-5.53c.24-.2.43-.66.13-1.07c-.29-.41-.82-.42-1.17-.17l-5.7 3.86L4.8 5.83c-.35-.25-.88-.24-1.17.17c-.3.41-.11.87.13 1.07z"
          />
        </svg>
      }
      label="Email"
      view={view}
    />
  );
};

export const GoogleButton: React.FC<BtnProps> = ({ onClick, view }) => {
  return (
    <AuthButton
      onClick={onClick}
      svgIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 md:w-6 h-auto"
          viewBox="0 0 48 48"
        >
          <path
            fill="#ffc107"
            d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
          />
          <path
            fill="#ff3d00"
            d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
          />
          <path
            fill="#4caf50"
            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
          />
          <path
            fill="#1976d2"
            d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
          />
        </svg>
      }
      label="Google"
      view={view}
    />
  );
};

export const MobileButton: React.FC<BtnProps> = ({ onClick, view }) => {
  return (
    <AuthButton
      onClick={onClick}
      svgIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 md:w-6 h-auto"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M21.963 18.855a2.74 2.74 0 0 1-.898 1.47a5.36 5.36 0 0 1-3.848 1.602h-.358a11.4 11.4 0 0 1-4.287-1.082c-.326-.153-.643-.296-1.02-.47A19.8 19.8 0 0 1 7.253 17.1a18.6 18.6 0 0 1-4.012-5.451A11.9 11.9 0 0 1 2.15 8.106a6.5 6.5 0 0 1 .418-3.808a7 7 0 0 1 1.174-1.48a2.3 2.3 0 0 1 1.634-.745a2.54 2.54 0 0 1 1.725.95c.47.52 1.02 1.02 1.52 1.55l.644.634c.38.333.615.802.653 1.306c.001.464-.17.911-.48 1.256a9 9 0 0 1-.622.694l-.215.225a1.15 1.15 0 0 0-.286.418c-.052.154-.07.318-.05.48c.164.444.421.848.755 1.184c.52.704 1.02 1.317 1.582 2.042a13.3 13.3 0 0 0 3.4 2.807c.123.1.27.167.428.194c.14.021.281 0 .408-.062a3.5 3.5 0 0 0 1.021-.826c.36-.444.882-.726 1.45-.787a2.04 2.04 0 0 1 1.46.623q.35.302.663.643l.306.327l.317.306c.193.194.377.368.56.572q.5.43.93.929c.293.374.441.842.418 1.317"
          />
        </svg>
      }
      label="Mobile"
      view={view}
    />
  );
};
