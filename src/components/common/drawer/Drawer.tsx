import { motion } from "framer-motion";
import {
  Home,
  LogOut,
  MapPinHouse,
  Moon,
  Settings,
  Sun,
  User,
  Voicemail,
  X,
} from "lucide-react"; // Lucide Icons
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { showAlert } from "../../../context/FFAlertContext";
import { useModal } from "../../../context/ModalContext";
import { logout } from "../../../redux/slices/authSlice";
import { AppDispatch, RootState, useAppDispatch } from "../../../redux/store";
import ThemeOverlay from "../theme/ThemeOverlay";

interface DrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTheme: () => void;
  isDarkMode: boolean;
  setShowLogin?: React.Dispatch<React.SetStateAction<boolean>>;
  setNavigateTo: React.Dispatch<React.SetStateAction<string>>;
}
const Drawer: React.FC<DrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  toggleTheme,
  isDarkMode,
  setShowLogin,
  setNavigateTo,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showModal } = useModal();
  const [showOverlay, setShowOverlay] = useState(false);

  const dispatch: AppDispatch = useAppDispatch();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  // console.log(user, "User");

  const menuItems = [
    { id: 1, label: "Home", icon: <Home className="w-5 h-5" />, link: "/" },
    {
      id: 2,
      label: "Profile",
      icon: <User className="w-5 h-5" />,
      link: "/profile",
      restricted: true,
    },

    {
      id: 3,
      label: "About",
      icon: <MapPinHouse className="w-5 h-5" />,
      link: "/about",
    },
    {
      id: 4,
      label: "Contact Us",
      icon: <Voicemail className="w-5 h-5" />,
      link: "/contact",
    },
    {
      id: 5,
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      link: "/settings",
    },
  ];

  // Disable body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isDrawerOpen]);

  const handleLogoutClick = () => {
    showModal(
      "Logout Confirmation!",
      "Are you sure you want to Logout?",
      handleLogoutConfirm
    );
  };

  const handleLogoutConfirm = async () => {
    try {
      const response = dispatch(logout({}));
      const result: any = response.payload;

      if (result.success) {
        showAlert(result.message, "success");
        navigate("/");
        setIsDrawerOpen(false);
      } else {
        showAlert(result.error, "warning");
      }
    } catch (error: any) {
      showAlert(error.message, "error");
    }
  };

  // Handle navigation logic with condition for restricted pages
  const handleMenuClick = (item: (typeof menuItems)[0]) => {
    if (item.restricted && !isLoggedIn) {
      if (setShowLogin) {
        setShowLogin(true);
        setNavigateTo(item.link);
      }
      setIsDrawerOpen(false);
    } else {
      navigate(item.link);
      setIsDrawerOpen(false);
    }
  };

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
      <ThemeOverlay isDarkMode={isDarkMode} showOverlay={showOverlay} />
      {isDrawerOpen && (
        <motion.div
          className={`fixed inset-0 bg-black bg-opacity-40 z-40 min-h-screen`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsDrawerOpen(false)}
        >
          <motion.div
            className={`fixed top-0 right-0 w-80 h-full bg-light-bg dark:bg-dark-bg shadow-lg z-50`}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="border-b p-6 py-5 pb-2  h-[124px] border-light-card dark:border-dark-card">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-primary font-medium text-light-textPrimary dark:text-dark-textPrimary">
                  {isLoggedIn ? (
                    <span>
                      Welcome,{" "}
                      <strong className="font-semibold text-transparent bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 bg-clip-text">
                        {user?.firstName} {user?.lastName || "User"}
                      </strong>
                    </span>
                  ) : (
                    "Hello, Guest"
                  )}
                </h2>
                <X
                  className="w-6 h-6 mr-2 text-light-textPrimary dark:text-dark-textPrimary cursor-pointer"
                  onClick={() => setIsDrawerOpen(false)}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse space-x-3 py-4">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogoutClick}
                    className="flex w-full items-center justify-center gap-2 py-2 bg-gradient-to-r from-dark-primary via-orange-500 to-orange-400 text-white font-medium rounded-lg hover:bg-[position:100%_50%] transition-[background-position] bg-[length:200%_200%] duration-500 ease-in-out"
                  >
                    <LogOut />
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowLogin ? setShowLogin(true) : "";
                      setIsDrawerOpen(false);
                    }}
                    className="w-full py-2 text-white bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 font-medium rounded-lg transition"
                  >
                    Sign In / Register
                  </button>
                )}
              </div>
            </div>

            {/* Menu Items */}
            <div className="px-6 mt-1 pb-4 md:pb-6 pt-1 md:pt-2.5 h-[calc(100%-210px)] overflow-y-auto">
              <ul className="space-y-2">
                {menuItems.map((item, index) => {
                  const selectedNavItem = location.pathname;
                  const isSelected = item.link === selectedNavItem;
                  return (
                    <li
                      key={index}
                      className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-light-card font-primary text-light-textPrimary dark:text-dark-textPrimary dark:hover:bg-dark-card transition group ${
                        isSelected
                          ? "bg-light-card dark:bg-dark-card text-light-primary dark:text-dark-primary hover:text-light-primary dark:hover:text-dark-textPrimary"
                          : ""
                      }`}
                      onClick={() => handleMenuClick(item)}
                    >
                      <div
                        className={`text-light-primary dark:text-dark-primary group-hover:text-light-primary dark:group-hover:text-dark-primary ${
                          isSelected ? "" : ""
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span
                        className={`group-hover:text-light-primary dark:group-hover:text-dark-primary ${
                          isSelected
                            ? "text-light-primary dark:text-dark-primary font-medium"
                            : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 w-full h-[80px] p-6 border-t border-light-card dark:border-dark-card bg-light-bg dark:bg-dark-bg">
              <button
                onClick={handleThemeToggle}
                className="flex items-center justify-center bg-light-card dark:bg-dark-card text-violet-900 dark:text-yellow-400 w-full py-2 text-center font-medium rounded-lg transition"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-5 h-5 mr-2 text-yellow-400 " />
                    Light Theme
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 mr-2 text-violet-900" />
                    Dark Theme
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Drawer;
