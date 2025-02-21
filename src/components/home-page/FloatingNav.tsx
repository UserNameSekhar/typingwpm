import { HelpCircle, Home, Trophy, Type, Waypoints, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const FloatingNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 30, y: 150 });
  const menuRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const sections = [
    { id: "hero", icon: <Home size={20} />, label: "Home" },
    { id: "typing-test", icon: <Type size={20} />, label: "Typing Test" },
    { id: "leaderboard", icon: <Trophy size={20} />, label: "Ranking" },
    { id: "faq", icon: <HelpCircle size={20} />, label: "FAQs" },
  ];

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    startPos.current = { x: clientX - position.x, y: clientY - position.y };

    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      // Get viewport dimensions
      const screenWidth = window.innerWidth - 15;
      const screenHeight = window.innerHeight - 270;
      const buttonSize = 48; // Approximate button size in px
      const headerHeight = 90; // Header height
      const sideMargin = 15; // Margin from left and right

      // Calculate new position with boundaries
      const newX = Math.min(
        Math.max(clientX - startPos.current.x, sideMargin),
        screenWidth - buttonSize
      );
      const newY = Math.min(
        Math.max(clientY - startPos.current.y, headerHeight),
        screenHeight - buttonSize
      );

      setPosition({ x: newX, y: newY });

      e.preventDefault();
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  // Handle click outside to close menu
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //       setIsOpen(false);
  //     }
  //   };
  //   if (isOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="fixed z-[49]"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {/* Floating Button */}
      <div
        className="cursor-grab active:cursor-grabbing touch-none"
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        <button
          className="p-3 bg-gradient-to-br from-orange-50/30 via-orange-100/30 to-cyan-100/30 dark:from-orange-700/10 dark:via-yellow-700/10 dark:to-cyan-500/10 backdrop-blur-md text-gray-800 dark:text-gray-100 rounded-full shadow-lg hover:shadow-xl active:shadow-md transition-all duration-300 ease-in-out"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Waypoints size={24} />}
        </button>
      </div>

      {/* Menu Container */}
      {isOpen && (
        <div className="absolute -left-1 sm:-left-2 md:-left-3 top-14 py-2 bg-gradient-to-br from-orange-50/30 via-orange-100/30 to-cyan-100/30 dark:from-orange-700/10 dark:via-yellow-700/10 dark:to-cyan-500/10 backdrop-blur-md text-gray-800 dark:text-gray-100 rounded-2xl shadow-lg hover:shadow-xl active:shadow-md transition-all duration-300 ease-in-out">
          {sections.map((section) => (
            <div
              key={section.id}
              className="m-1 px-2 py-1 group"
              onClick={() => {
                document
                  .getElementById(section.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-transparent flex flex-col items-center justify-center overflow-hidden cursor-pointer text-gray-900 dark:text-white dark:hover:text-white transition-all duration-500 ease-in-out transform hover:scale-100 active:scale-95 iconContainer group">
                <span className="icon">{section.icon}</span>
                <span className="text hidden md:group-hover:block text-xs truncate text-center">{section.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FloatingNav;
