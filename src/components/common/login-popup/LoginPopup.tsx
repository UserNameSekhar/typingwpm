import { motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import LoginView from "./LoginView";

interface IProps {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  navigateTo?: string;
}

const LoginPopup: React.FC<IProps> = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [loginView, setLoginView] = useState<string>("email");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isLoggedIn ? (
        <div className="bg-light-bg dark:bg-dark-bg min-h-[540px] flex flex-col  h-[540px] mx-4 sm:mx-6 md:mx-8 rounded-xl shadow-lg w-full max-w-5xl p-8 pb-4 gap-6 relative overflow-auto">
          {/* Close Button */}
          {!isOtpSent && (
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400"
            >
              <X size={24} />
            </button>
          )}

          <div className="flex flex-col items-center justify-center h-auto">
            {!isOtpSent ? (
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
                Get Started with{" "}
                <span className="capitalize text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 via-blue-700 to-indigo-700">
                  {loginView}
                </span>
              </h2>
            ) : (
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 flex gap-2">
                <span className="capitalize text-transparent bg-clip-text bg-gradient-to-tr from-green-500 via-green-700 to-lime-500">
                  {loginView}
                </span>
                <span>Verfication!</span>
              </h2>
            )}
            {!isOtpSent ? (
              <p className="text-xs text-center md:text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto mt-2 px-2">
                Enter your email address to receive a one-time password (OTP)
              </p>
            ) : (
              <p className="text-xs text-center md:text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto mt-2 px-2">
                Enter the OTP you received through your {loginView} and verify.
              </p>
            )}
          </div>

          <LoginView
            loginView={loginView}
            setLoginView={setLoginView}
            isOtpSent={isOtpSent}
            setIsOtpSent={setIsOtpSent}
            setShowLogin={setShowLogin}
          />

          {!isOtpSent && (
            <div className=" flex flex-col  items-center text-center  text-light-textSecondary dark:text-dark-textSecondary w-full h-auto">
              <span>I agree to the</span>
              <p className="flex gap-2 text-center">
                <a
                  href="#"
                  className="hover:underline text-light-buttonPrimary filter brightness-125 hover:filter hover:brightness-100 transition-all ease-in-out duration-200 text-xs md:text-sm"
                  onClick={() => {
                    navigate("/terms");
                    setShowLogin(false);
                  }}
                >
                  Terms & Conditions
                </a>{" "}
                <a
                  href="#"
                  className="hover:underline text-light-buttonPrimary filter brightness-125 hover:filter hover:brightness-100 transition-all ease-in-out duration-200 text-xs md:text-sm"
                  onClick={() => {
                    navigate("/privacy-policy");
                    setShowLogin(false);
                  }}
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-light-bg dark:bg-dark-bg w-full max-w-xl min-h-[400px] flex flex-col items-center justify-center gap-4 rounded-xl mx-4 p-4 relative">
          <div className="flex flex-col gap-2 justify-center items-center bg-gradient-to-tr from-blue-400 via-blue-600 to-indigo-700 text-transparent bg-clip-text font-support font-medium text-base md:text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-20 h-20 text-light-textSecondary dark:text-dark-textSecondary"
            >
              <path
                fill="currentColor"
                d="M12 18a3.5 3.5 0 1 1 3.5-3.5A3.504 3.504 0 0 1 12 18"
                opacity="0.5"
              />
              <path
                fill="currentColor"
                d="M14.64 16.772a3.452 3.452 0 0 1-5.28 0A4.99 4.99 0 0 0 7 21a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1a4.99 4.99 0 0 0-2.36-4.228"
              />
              <path
                fill="currentColor"
                d="M21 12a1 1 0 0 1-.664-.252L12 4.338l-8.336 7.41a1 1 0 0 1-1.328-1.496l9-8a1 1 0 0 1 1.328 0l9 8A1 1 0 0 1 21 12"
                opacity="0.5"
              />
              <path
                fill="currentColor"
                d="m12 4.338l-8 7.111V21a1 1 0 0 0 1 1h3a1 1 0 0 1-1-1a4.99 4.99 0 0 1 2.36-4.228A3.47 3.47 0 0 1 8.5 14.5a3.5 3.5 0 0 1 7 0a3.47 3.47 0 0 1-.86 2.272A4.99 4.99 0 0 1 17 21a1 1 0 0 1-1 1h3a1 1 0 0 0 1-1v-9.551Z"
                opacity="0.25"
              />
            </svg>
            <p>You are already logged in...</p>
          </div>
          <button
            className="bg-gradient-to-tr from-blue-500 via-blue-700 to-indigo-700 filter hover:brightness-125 transition-all duration-300 ease-in-out p-2 px-4 rounded-lg text-white "
            onClick={() => {
              navigate("/"), setShowLogin(false);
            }}
          >
            Back to Home
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default LoginPopup;
