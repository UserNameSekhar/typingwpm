import { Menu, Moon, Settings2, Sun } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import Drawer from "../common/drawer/Drawer";
import AppLogo from "../common/logo/AppLogo";
import ThemeOverlay from "../common/theme/ThemeOverlay";

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setNavigateTo: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({
  toggleTheme,
  isDarkMode,
  setShowLogin,
  setNavigateTo,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const [showOverlay, setShowOverlay] = useState(false);

  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const includedPaths = ["/", "/home"];
  const shouldDisplay = includedPaths.includes(location.pathname);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    };

    const handleScroll = () => {
      setIsLanguageOpen(false);
    };

    if (isLanguageOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isLanguageOpen]);

  const handleThemeToggle = () => {
    setShowOverlay(true);
    setTimeout(() => {
      toggleTheme();
    }, 700);
    setTimeout(() => {
      setShowOverlay(false);
    }, 700);
  };

  return (
    <>
      {/* Reusable ThemeOverlay Component */}
      <ThemeOverlay isDarkMode={isDarkMode} showOverlay={showOverlay} />
      <header
        className={`sticky top-0 z-40 bg-gray-50/40 dark:bg-gray-900/40 backdrop-blur-xl  my-auto mt-auto  shadow-sm  px-0 ${
          shouldDisplay ? "h-16 md:h-20 lg:h-20" : "h-16 md:h-[80px]"
        }`}
      >
        {/* Main Header */}
        <div className="container mx-auto flex items-center justify-between h-full pr-4 pl-4 sm:pl-0 py-3 md:py-4">
          <AppLogo />

          {/* Right Section */}
          <div className="flex items-center space-x-4 md:space-x-4">
            <div className="hidden md:flex items-center justify-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture} // The URL of the user's profile picture
                      alt="Profile"
                      onClick={() => {
                        // Handle the profile logic here (open profile dropdown, navigate to profile page, etc.)
                        navigate("/profile"); // Adjust the route as needed
                      }}
                      className="cursor-pointer w-8 h-8 rounded-full object-cover border-2 border-transparent ring-2 ring-gray-200 hover:ring-gray-300 dark:ring-gray-700 dark:hover:ring-gray-600 transition-all duration-300 ease-in-out"
                    />
                  ) : (
                    <div
                      onClick={() => {
                        // Handle the profile logic here (open profile dropdown, navigate to profile page, etc.)
                        navigate("/profile"); // Adjust the route as needed
                      }}
                      className="cursor-pointer flex items-center justify-center text-light-textSecondary dark:text-dark-textSecondary hover:text-light-textPrimary hover:dark:text-dark-textPrimary font-semibold w-[30px] text-[17px] h-[30px] rounded-full border-1 border-transparent bg-gray-100 dark:bg-gray-800 ring-2 ring-gray-200 hover:ring-gray-300 dark:ring-gray-700 dark:hover:ring-gray-600 transition-all duration-300 ease-in-out"
                    >
                      {/* If user has a username, show the first letter, otherwise show 'U' */}
                      {user.firstName ? user.firstName[0].toUpperCase() : "U"}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowLogin(true);
                  }}
                  className="btn3d"
                >
                  Sign In
                </button>
              )}
              <button
                onClick={() => navigate("/about")}
                className="btn3d  rounded-full flex items-center justify-center"
                title={`About`}
              >
                About
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="btn3d  rounded-full flex items-center justify-center"
                title={`Contact`}
              >
                Contact Us
              </button>
              <button
                onClick={handleThemeToggle}
                className="btn3d  rounded-full flex items-center justify-center"
                title={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}
              >
                {isDarkMode ? (
                  <Moon className="p-0.5 " />
                ) : (
                  <Sun className="p-0.5 " />
                )}
              </button>
              <button
                onClick={() => navigate("/settings")}
                className="btn3d  rounded-full flex items-center justify-center"
                title={`Settings`}
              >
                <Settings2 className="p-0.5 " />
              </button>
            </div>
            {/* Menu Icon */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="btn3d flex md:hidden"
            >
              <Menu className="cursor-pointer text-light-textPrimary dark:text-dark-textPrimary filter brightness-200 hover:brightness-125" />
            </button>
          </div>
        </div>
      </header>
      <div className="z-50">
        {/* Drawer */}
        <Drawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          setShowLogin={setShowLogin}
          setNavigateTo={setNavigateTo}
        />
      </div>
    </>
  );
};

export default Header;
