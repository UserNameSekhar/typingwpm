import { AnimatePresence, motion } from "framer-motion";
import { ChevronsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoginPopup from "./components/common/login-popup/LoginPopup";
import Header from "./components/layout/Header";
import AboutPage from "./pages/about-page/AboutPage";
import ContactPage from "./pages/contact-page/ContactPage";
import HomePage from "./pages/home-page/HomePage";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import PrivacyPolicy from "./pages/privacy-policy/PrivacyPolicy";
import ProfilePage from "./pages/profile-page/ProfilePage";
import ResourcesPage from "./pages/resources-page/ResourcesPage";
import SettingsPage from "./pages/settings-page/SettingsPage";
import TermsPage from "./pages/terms-page/TermsPage";
import TypingTestPage from "./pages/typingtest/TypingTestPage";
import { logout } from "./redux/slices/authSlice";
import { AppDispatch, RootState, useAppDispatch } from "./redux/store";
import ProtectedRoute from "./routes/ProtectedRoute";
import ScrollToTop from "./utils/ScrollToTop";
import { isTokenExpired } from "./utils/tokenExpiry";

export const movieLanguage =
  localStorage.getItem("selectedLanguage") || "Telugu";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [navigateTo, setNavigateTo] = useState<string>("/");
  const [showScrollButtons, setShowScrollButtons] = useState<boolean>(true);
  const [scrollTimeout, setScrollTimeout] = useState<number | null>(null);
  const dispatch: AppDispatch = useAppDispatch();
  const { isLoggedIn, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const authToken = localStorage.getItem("token");

    if (authToken && isTokenExpired(authToken)) {
      console.log("Token expired, logging out");
      localStorage.removeItem("token");
      dispatch(logout({}));
    } else if (!isLoggedIn && !authToken && !token) {
      console.log("No token and user is not logged in, showing login popup");
    } else if (authToken === null) {
      console.log("Token is null, logging out");
      dispatch(logout({}));
    }
  }, [dispatch, isLoggedIn, token]);

  // Detect scroll position
  // Handle scroll event
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    // Show buttons when scrolling
    setShowScrollButtons(true);

    // Clear any existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Set timeout to hide buttons after 5 seconds of inactivity
    const timeout = window.setTimeout(() => {
      setShowScrollButtons(false);
    }, 2000);

    setScrollTimeout(timeout);

    // Check for scroll position to determine button visibility
    if (scrollPosition === 0) {
      setShowScrollButtons(false); // Hide scroll buttons at the top
    }

    if (scrollPosition + windowHeight >= documentHeight) {
      setShowScrollButtons(false); // Hide scroll buttons at the bottom
    }
  };

  // Add and clean up scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  // Check if the theme preference is already saved in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Function to toggle dark and light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div className="bg-light-bg min-h-screen dark:bg-dark-bg">
      <Header
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        setShowLogin={setShowLogin}
        setNavigateTo={setNavigateTo}
      />
      {showLogin ? (
        <LoginPopup setShowLogin={setShowLogin} navigateTo={navigateTo} />
      ) : null}
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/settings"
            element={
              <SettingsPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            }
          />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/resources" element={<ResourcesPage />} />

          <Route path="/test" element={<TypingTestPage />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Scroll Up and Down Buttons */}
        <div className="fixed flex flex-col gap-2 bottom-4 right-4 z-50">
          <AnimatePresence>
            {showScrollButtons && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="hidden sm:flex flex-col gap-2 "
              >
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  onClick={scrollToTop}
                  className="bg-dark-card/50 dark:bg-light-card/50 z-30 text-dark-textPrimary dark:text-light-textPrimary p-2 rounded-full shadow-xl transition-all ease-in-out duration-200 delay-75"
                  style={{ backdropFilter: "blur(10px)" }}
                >
                  <ChevronsUp className="transition-all ease-in-out duration-200 delay-75" />
                </motion.button>
                {/* <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  onClick={scrollToBottom}
                  className="bg-dark-card/50 dark:bg-light-card/50 z-30 text-dark-textPrimary dark:text-light-textPrimary p-2 rounded-full shadow-xl transition-all ease-in-out duration-200 delay-75"
                  style={{ backdropFilter: "blur(10px)" }}
                >
                  <ArrowDown className="transition-all ease-in-out duration-200 delay-75" />
                </motion.button> */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    </div>
  );
};

export default App;
