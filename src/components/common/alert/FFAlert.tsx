import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface AlertProps {
  message: string;
  type?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
  directions?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  onClose?: () => void;
}

const FFAlert: React.FC<AlertProps> = ({
  message,
  type = "default",
  duration = 3000,
  directions = "top-right",
  onClose,
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => { 
        setShow(false);
        onClose && onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const alertClassNames = {
    default:
      "text-gray-900 dark:text-gray-50 border-l-gray-500 dark:border-l-gray-400",
    success:
      " text-green-600 dark:text-green-400 border-l-green-600 dark:border-l-green-400",
    error:
      " text-orange-600 dark:text-orange-500 border-l-orange-600 dark:border-l-orange-500",
    warning:
      " text-yellow-600 dark:text-yellow-500 border-l-yellow-600 dark:border-l-yellow-500",
    info: "text-teal-600 dark:text-teal-500 border-l-teal-500 dark:border-l-teal-400",
  };

  const alertIcons = {
    default: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M2.53 14.394c-.213 1.353.738 2.292 1.902 2.76c4.463 1.795 10.673 1.795 15.136 0c1.164-.468 2.115-1.407 1.902-2.76c-.13-.832-.777-1.524-1.256-2.2c-.627-.897-.689-1.874-.69-2.915C19.525 5.26 16.157 2 12 2S4.475 5.26 4.475 9.28c0 1.04-.062 2.018-.69 2.914c-.478.676-1.124 1.368-1.255 2.2M9 21c.796.622 1.848 1 3 1s2.204-.378 3-1"
          color="currentColor"
        />
      </svg>
    ),
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path
          fill="currentColor"
          d="M17 3a2 2 0 0 1 2 2v16l-7-3l-7 3V5a2 2 0 0 1 2-2zm-6 11l6.25-6.24l-1.41-1.42L11 11.18L8.41 8.59L7 10z"
        />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            strokeWidth="1.5"
            d="M21.25 7.506v6.607a3.963 3.963 0 0 1-3.964 3.965h-2.643l-2.18 2.18a.636.636 0 0 1-.925 0l-2.18-2.18H6.713a3.964 3.964 0 0 1-3.964-3.965V7.506a3.964 3.964 0 0 1 3.964-3.964h10.572a3.964 3.964 0 0 1 3.964 3.964m-9.244 7.743v-5.05"
          />
          <path strokeWidth="2" d="M11.898 6.994h.006" />
        </g>
      </svg>
    ),
    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path
          fill="currentColor"
          d="M12 6.5a.75.75 0 0 1 .75.75v6.25a.75.75 0 0 1-1.5 0V7.25A.75.75 0 0 1 12 6.5m0 10.998a1 1 0 1 0 0-2a1 1 0 0 0 0 2M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-4.587-1.112l-3.826 1.067a1.25 1.25 0 0 1-1.54-1.54l1.068-3.823A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2m0 1.5A8.5 8.5 0 0 0 3.5 12c0 1.47.373 2.883 1.073 4.137l.15.27l-1.112 3.984l3.987-1.112l.27.15A8.5 8.5 0 1 0 12 3.5"
        />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        >
          <path
            strokeLinejoin="round"
            d="M14 19c3.771 0 5.657 0 6.828-1.172S22 14.771 22 11s0-5.657-1.172-6.828S17.771 3 14 3h-4C6.229 3 4.343 3 3.172 4.172S2 7.229 2 11s0 5.657 1.172 6.828c.653.654 1.528.943 2.828 1.07"
          />
          <path d="M14 19c-1.236 0-2.598.5-3.841 1.145c-1.998 1.037-2.997 1.556-3.489 1.225s-.399-1.355-.212-3.404L6.5 17.5m3.379-8.621L12 11m0 0l2.121 2.121M12 11l2.121-2.121M12 11l-2.121 2.121" />
        </g>
      </svg>
    ),
  };

  // Calculate the position classes based on the direction prop
  const positionClasses = {
    "top-left": "top-5 left-5",
    "top-center": "top-5 left-1/2 transform -translate-x-1/2",
    "top-right": "top-3 right-3",
    "bottom-left": "bottom-5 left-5",
    "bottom-center": "bottom-5 left-1/2 transform -translate-x-1/2",
    "bottom-right": "bottom-5 right-5",
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4 }}
          className={`fixed z-50 max-w-sm md:max-w-md w-auto p-4 rounded-lg shadow dark:bg-gray-900 bg-light-bg border-0 dark:border border-l-4 dark:border-l-4 border-light-primaryLight dark:border-gray-800/50 ${alertClassNames[type]} ${positionClasses[directions]}`}
        >
          <div className="flex justify-between items-center gap-6">
            <div className="flex gap-2 justify-center items-center">
              {alertIcons[type]}
              <p className="font-normal font-primary">{message}</p>
            </div>
            <button
              onClick={() => {
                setShow(false);
              }}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-100 transition-all ease-in-out duration-300  font-bold"
            >
              <X size={19} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FFAlert;
