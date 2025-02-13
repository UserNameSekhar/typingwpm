import React from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeOverlayProps {
  isDarkMode: boolean;
  showOverlay: boolean;
}

const ThemeOverlay: React.FC<ThemeOverlayProps> = ({
  isDarkMode,
  showOverlay,
}) => {
  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center ${
            isDarkMode ? "bg-white text-black" : "bg-black text-white"
          }`}
          initial={{
            opacity: 0,
            clipPath: "circle(100% at 50% 50%)",
          }}
          animate={{
            opacity: 1,
            clipPath: "circle(100% at 50% 50%)",
          }}
          exit={{
            opacity: 0,
            clipPath: "circle(0% at 50% 50%)",
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <div className="text-center flex flex-col items-center justify-center">
            {/* Theme Icon */}
            {isDarkMode ? (
              <span className="bg-dark-card dark:bg-light-card text-dark-textSecondary dark:text-light-textSecondary transition-all duration-700 delay-100 ease-in-out p-3 rounded-full">
                <Sun size={48} className="" />
              </span>
            ) : (
              <span className="bg-dark-card dark:bg-light-card text-dark-textSecondary dark:text-light-textSecondary transition-all duration-700 delay-100 ease-in-out p-3 rounded-full">
                <Moon size={48} className="" />
              </span>
            )}
            {/* Transition Text */}
            <p className="mt-4 text-xl font-light font-support">
              Switching to {isDarkMode ? "Light" : "Dark"} Mode
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThemeOverlay;
