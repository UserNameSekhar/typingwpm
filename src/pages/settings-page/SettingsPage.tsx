import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface SettingsProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const SettingsPage: React.FC<SettingsProps> = ({ isDarkMode, toggleTheme }) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.replace("/", "");

  return (
    <div className="bg-gradient-to-b from-light-bg via-light-card to-light-bg dark:from-dark-bg dark:via-dark-card dark:to-dark-bg text-light-textPrimary dark:text-dark-textPrimary min-h-[calc(100vh-100px)]">
      <div className="container mx-auto p-6 py-4 md:py-6 flex flex-col gap-4 md:gap-6">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-light-textSecondary dark:text-dark-textSecondary mb-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center hover:text-light-textPrimary dark:hover:text-dark-textPrimary transition-all ease-in-out duration-200"
            >
              Home
            </button>
            <ChevronRight size={12} className="mx-2" />
            <button className="flex items-center text-light-textPrimary capitalize dark:text-dark-textPrimary cursor-default">
              {path}
            </button>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-primary font-semibold text-light-textPrimary dark:text-dark-textPrimary">
            Settings
          </h1>
        </div>

        {/* Notification Settings Section */}
        <section className="space-y-8">
          <div className="bg-light-bg dark:bg-dark-bg  p-6 rounded-lg">
            <h2 className="text-lg md:text-xl font-semibold text-light-textPrimary dark:text-dark-textPrimary">
              Notification Settings
            </h2>
            <div className="mt-4 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-light-textSecondary dark:text-dark-textSecondary">
                  Email Notifications
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                  />
                  <span className="w-11 h-6 bg-green-600 dark:bg-green-500 rounded-full"></span>
                  <span
                    className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                      emailNotifications ? "transform translate-x-5" : ""
                    }`}
                  ></span>
                </label>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-light-textSecondary dark:text-dark-textSecondary">
                  SMS Notifications
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={smsNotifications}
                    onChange={() => setSmsNotifications(!smsNotifications)}
                  />
                  <span className="w-11 h-6 bg-green-600 dark:bg-green-500 rounded-full"></span>
                  <span
                    className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                      smsNotifications ? "transform translate-x-5" : ""
                    }`}
                  ></span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Theme Settings Section */}
        <section className="space-y-8">
          <div className="bg-light-bg dark:bg-dark-bg p-6 rounded-lg ">
            <h2 className="text-lg md:text-xl font-semibold text-light-textPrimary dark:text-dark-textPrimary">
              Theme Settings
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-light-textSecondary dark:text-dark-textSecondary">
                  {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                  />
                  <span className="w-11 h-6 bg-green-600 dark:bg-green-500 rounded-full"></span>
                  <span
                    className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                      isDarkMode ? "transform translate-x-5" : ""
                    }`}
                  ></span>
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
