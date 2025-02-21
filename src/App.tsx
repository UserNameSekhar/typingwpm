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
import LearnTyping from "./pages/learn-typing/LearnTyping";
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

  // Detect scroll position Handle scroll event
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
    // Initialize scroll button visibility based on the current scroll position
    const scrollPosition = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (scrollPosition > 0 && scrollPosition + windowHeight < documentHeight) {
      setShowScrollButtons(true);
    } else {
      setShowScrollButtons(false);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout, location]);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Define the pages where the scroll button should be shown
  const showScrollButtonPages = ["/", "/about", "/contact","/learn-typing", "/test", "/privacy-policy", "/terms"];

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
    <div className="bg-light-bg dark:bg-dark-bg  min-h-screen">
      <div className="bg-gradient-to-tl from-cyan-50 via-cyan-50 dark:from-cyan-950/20 dark:via-cyan-900/20 dark:to-orange-900/20 to-orange-100">
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
                <SettingsPage
                  isDarkMode={isDarkMode}
                  toggleTheme={toggleTheme}
                />
              }
            />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/resources" element={<ResourcesPage />} />

            <Route path="/test" element={<TypingTestPage />} />
            <Route path="/learn-typing" element={<LearnTyping />} />

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
          {showScrollButtonPages.includes(location.pathname) && (
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
                      className="bg-gradient-to-br from-orange-50/30 via-orange-100/30 to-cyan-100/30 dark:from-orange-700/10 dark:via-yellow-700/10 dark:to-cyan-500/10 backdrop-blur-md text-gray-800 dark:text-gray-100 shadow-lg hover:shadow-xl active:shadow-md transition-all duration-300 ease-in-out z-30  p-2 rounded-full  delay-75"
                      style={{ backdropFilter: "blur(10px)" }}
                    >
                      <ChevronsUp
                        size={42}
                        className="transition-all ease-in-out duration-200 delay-75"
                      />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default App;
